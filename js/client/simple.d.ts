import { GenericProtocolClient } from "./generic";
interface SocketCallbacks {
    onClose(code: number, reason: string): void;
    onError(err: Error): void;
}
interface SimpleProtocolClientConstructor {
    new (address: string, callbacks: SocketCallbacks, log: (msg: string) => void): GenericProtocolClient;
}
export declare const SimpleProtocolClient: SimpleProtocolClientConstructor;
export {};
