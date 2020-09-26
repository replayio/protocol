import { GenericProtocolClient } from "./generic";
/**
 * This interface is designed to be compatible with both `WebSocket`
 * as implemented in browsers as well as the `ws` package from npm.
 */
interface WebSocket {
    onopen: ((ev: any) => any) | null;
    onerror: ((err: any) => any) | null;
    onclose: ((ev: any) => any) | null;
    onmessage: ((ev: any) => void) | null;
    send(msg: string): void;
}
interface SocketCallbacks {
    onClose(code: number, reason: string): void;
    onError(err: Error): void;
}
interface SimpleProtocolClientConstructor {
    new (webSocket: WebSocket, callbacks: SocketCallbacks, log: (msg: string) => void): GenericProtocolClient;
}
export declare const SimpleProtocolClient: SimpleProtocolClientConstructor;
export {};
