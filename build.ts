import protocolJson from './json/protocol.json';
import path from 'path';
import fs from 'fs';

/**
 * This script generates Typescript types from protocol.json.
 */

 /**
  * If 2 protocol domains contain types with the same name we have to rename
  * those types to make them unique when importing them in another module.
  * Set the following flag to true to automatically add the name of the
  * protocol domain to all type imports in the generated files.
  */
const addNamespace = false;

/**
 * Types and type guards for protocol.json
 */

interface SimpleType {
    type: "number" | "integer" | "boolean" | "any";
}

interface StringType {
    type: "string";
    enum?: string[];
}

interface ArrayType {
    type: "array";
    items: SimpleType | StringType | TypeReference;
}

interface TypeReference {
    $ref: string;
}

type PropertyType = (SimpleType | StringType | ArrayType | TypeReference) & {
    name: string;
    description?: string;
    optional?: boolean;
}

interface PlainObjectType {
    type: "object";
    properties?: PropertyType[];
}

interface DerivedObjectType {
    $ref: string;
    properties?: PropertyType[];
}

type ObjectType = PlainObjectType | DerivedObjectType;

function isReferenceType(type: TypeReference | SimpleType | StringType | ArrayType): type is TypeReference {
    return !!(type as any).$ref;
}

type TypeDescription = (SimpleType | StringType | ArrayType | ObjectType) & {
    id: string;
    description?: string;
}

function isObjectTypeDescription(type: TypeDescription): type is ObjectType & { id: string; description?: string; } {
    return (type as any).$ref || ((type as any).type === "object");
}

function isDerivedObjectType(type: ObjectType): type is DerivedObjectType {
    return !!(type as any).$ref;
}

interface CommandDescription {
    name: string;
    description?: string;
    parameters?: PropertyType[];
    returns?: PropertyType[];
}

interface EventDescription {
    name: string;
    description?: string;
    parameters?: PropertyType[];
}

interface Protocol {
    version: {
        major: string;
        minor: string;
    };
    domains: {
        domain: string;
        description: string;
        types?: TypeDescription[];
        commands?: CommandDescription[];
        events?: EventDescription[];
    }[];
}


function convertFlatType(
    type: SimpleType | StringType | ArrayType | TypeReference,
    imports: Map<string, Set<string>>
): string {

    if (isReferenceType(type)) {

        if (type.$ref.indexOf(".") >= 0) {

            const [ domainName, typeName ] = type.$ref.split(".");
            if (!imports.has(domainName)) {
                imports.set(domainName, new Set<string>());
            }
            imports.get(domainName)!.add(typeName);

            return addNamespace ? `${domainName}_${typeName}` : typeName;
        }

        if (type.$ref === "int") {
            return "BigInt";
        }

        return type.$ref;

    } else if ((type.type === "number") || (type.type === "boolean") || (type.type === "any")) {
        return type.type;
    } else if (type.type === "integer") {
        return "number";
    } else if (type.type === "string") {
        if (type.enum) {
            return type.enum.map(t => `"${t}"`).join(" | ");
        } else {
            return "string";
        }
    } else if (type.type === "array") {
        return convertFlatType(type.items, imports) + "[]";
    }
    // we should never end up here
    return "any";
}

function convertPropertyType(property: PropertyType, imports: Map<string, Set<string>>): string {
    let ts = convertDescription(property, "  ");
    const optional = property.optional ? "?" : "";
    ts += `  ${property.name}${optional}: ${convertFlatType(property, imports)};\n`;
    return ts;
}

function convertDescription(d: { description?: string }, indent: string = ""): string {
    if (d.description) {
        const description = d.description.split("\n").join(`\n${indent} * `);
        return `${indent}/**\n${indent} * ${description}\n${indent} */\n`;
    }
    return "";
}

function convertImports(imports: Map<string, Set<string>>, protocolPath: string): string {

    return [ ...imports.keys() ].map(importDomain => {

        const typeNames = [ ...imports.get(importDomain)! ];
        let ts = "import {\n";
        if (addNamespace) {
            ts += typeNames.map(name => `  ${name} as ${importDomain}_${name}`).join(",\n");
        } else {
            ts += typeNames.map(name => `  ${name}`).join(",\n");
        }
        ts += `\n} from "${protocolPath}/${importDomain}";\n`;

        return ts;
    }).join("");
}

(async () => {

    const protocol = protocolJson as Protocol;

    // generate the types for all domains and write them to one file per domain
    for (const domain of protocol.domains) {

        const imports = new Map<string, Set<string>>();

        const convertedTypes = (domain.types || []).map(type => {

            let ts = convertDescription(type);

            if (isObjectTypeDescription(type)) {

                let ext = isDerivedObjectType(type) ? ` extends ${convertFlatType({ $ref: type.$ref }, imports)}` : "";
                ts += `export interface ${type.id}${ext} {\n\n`;
                ts += (type.properties || []).map(p => convertPropertyType(p, imports)).join("\n");
                ts += "}\n";

            } else {

                ts += `export type ${type.id} = ${convertFlatType(type, imports)};\n`;

            }

            return ts;
        });

        const convertedEvents = (domain.events || []).map(event => {

            let ts = convertDescription(event);

            ts += `export interface ${event.name} {\n\n`;
            ts += (event.parameters || []).map(p => convertPropertyType(p, imports)).join("\n");
            ts += "}\n";

            return ts;
        });

        const convertedCommands = (domain.commands || []).map(command => {

            let ts = `export interface ${command.name}Parameters {\n\n`;
            ts += (command.parameters || []).map(p => convertPropertyType(p, imports)).join("\n");
            ts += "}\n\n";

            ts += `export interface ${command.name}Result {\n\n`;
            ts += (command.returns || []).map(p => convertPropertyType(p, imports)).join("\n");
            ts += "}\n";

            return ts;
        });

        const importStatements = convertImports(imports, ".");

        const convertedDomain = [
            importStatements,
            ...convertedTypes,
            ...convertedCommands,
            ...convertedEvents
        ].join("\n");

        await fs.promises.writeFile(path.join(__dirname, `ts/protocol/${domain.domain}.ts`), convertedDomain);
    }

    let ts = protocol.domains.map(domain => `export * from "./${domain.domain}";\n`).join("");
    await fs.promises.writeFile(path.join(__dirname, "ts/protocol/index.ts"), ts);


    // generate the typing for the generic protocol client
    const imports = new Map<string, Set<string>>();
    let eventDeclarations = "";
    let commandDeclarations = "";
    const namespacedSessionId = addNamespace ? "Session_SessionId" : "SessionId";
    for (const domain of protocol.domains) {

        const domainImports = new Set<string>();
        imports.set(domain.domain, domainImports);

        for (const event of domain.events || []) {
            domainImports.add(`${event.name}`);
            const namespacedEvent = addNamespace ? `${domain.domain}_${event.name}` : event.name;
            eventDeclarations += convertDescription(event, "  ");
            eventDeclarations += `  addEventListener(event: "${domain.domain}.${event.name}", listener: (parameters: ${namespacedEvent}) => void): void;\n\n`;
        }

        for (const command of domain.commands || []) {
            domainImports.add(`${command.name}Parameters`);
            domainImports.add(`${command.name}Result`);
            const namespacedCommand = addNamespace ? `${domain.domain}_${command.name}` : command.name;
            commandDeclarations += convertDescription(command, "  ");
            commandDeclarations += `  sendCommand(command: "${domain.domain}.${command.name}", parameters: ${namespacedCommand}Parameters, sessionId: ${namespacedSessionId}): Promise<${namespacedCommand}Result>;\n\n`;
        }
    }

    imports.get("Session")!.add("SessionId");
    ts = convertImports(imports, "../protocol");
    ts += "\nexport interface GenericProtocolClient {\n\n";
    ts += eventDeclarations;
    ts += "  removeEventListener(event: string): void;\n\n"
    ts += commandDeclarations;
    ts += "}\n";

    await fs.promises.writeFile(path.join(__dirname, "ts/client/generic.ts"), ts);


    // generate the non-generic protocol client
    imports.clear();
    ts = "import { GenericProtocolClient } from \"./generic\";\n\n";
    ts += "export class ProtocolClient {\n";
    ts += "  constructor(\n";
    ts += "    private readonly genericClient: GenericProtocolClient\n";
    ts += "  ) {}\n\n";

    for (const domain of protocol.domains) {

        const domainImports = new Set<string>();
        imports.set(domain.domain, domainImports);

        let methods = "";

        for (const event of domain.events || []) {
            domainImports.add(`${event.name}`);
            const namespacedEvent = addNamespace ? `${domain.domain}_${event.name}` : event.name;
            const uppercaseEvent = event.name.charAt(0).toUpperCase() + event.name.slice(1);
            methods += "\n" + convertDescription(event, "    ");
            methods += `    add${uppercaseEvent}Listener: (listener: (parameters: ${namespacedEvent}) => void) =>\n`;
            methods += `      this.genericClient.addEventListener("${domain.domain}.${event.name}", listener),\n\n`;
            methods += `    remove${uppercaseEvent}Listener: () =>\n`;
            methods += `      this.genericClient.removeEventListener("${domain.domain}.${event.name}"),\n`;
        }

        for (const command of domain.commands || []) {
            domainImports.add(`${command.name}Parameters`);
            const namespacedCommand = addNamespace ? `${domain.domain}_${command.name}` : command.name;
            methods += "\n" + convertDescription(command, "    ");
            methods += `    ${command.name}: (parameters: ${namespacedCommand}Parameters, sessionId: ${namespacedSessionId}) =>\n`;
            methods += `      this.genericClient.sendCommand("${domain.domain}.${command.name}", parameters, sessionId),\n`;
        }

        ts += convertDescription(domain, "  ");
        ts += `  ${domain.domain} = {\n`;
        ts += methods;
        ts += "  }\n\n";
    }

    imports.get("Session")!.add("SessionId");
    ts = convertImports(imports, "../protocol") + ts;
    ts += "}\n";

    await fs.promises.writeFile(path.join(__dirname, "ts/client/client.ts"), ts);
})();
