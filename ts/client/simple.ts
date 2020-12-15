/* Copyright 2020 Record Replay Inc. */

// Simple protocol client for use in writing standalone applications.

import { GenericProtocolClient } from "./build/generic";

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

type EventListener = (ev: any) => void;

interface Deferred {
  promise: Promise<any>;
  resolve(arg?: any): void;
  reject(err: any): void;
}

// SimpleProtocolClient implements the GenericProtocolClient interface.
// However, that interface uses method overloading, which is getting lost
// if we simply write `SimpleProtocolClient implements GenericProtocolClient { ... }`.
// So we're using a trick to tell Typescript to use the GenericProtocolClient
// type for the SimpleProtocolClient class.
interface SimpleProtocolClientConstructor {
  new (webSocket: WebSocket, callbacks: SocketCallbacks, log: (msg: string) => void): GenericProtocolClient;
}

export const SimpleProtocolClient: SimpleProtocolClientConstructor = class {

  private socket: WebSocket;
  private opened: Deferred;
  private eventListeners = new Map<string, EventListener>();
  private pendingMessages = new Map<number, Deferred>();
  private nextMessageId = 1;

  constructor(webSocket: WebSocket, callbacks: SocketCallbacks, private log: (msg: string) => void) {
    this.socket = webSocket;

    this.opened = defer();
    this.socket.onopen = () => this.opened.resolve();

    this.socket.onclose = ({ code, reason }) => callbacks.onClose(code, reason);
    this.socket.onerror = callbacks.onError;
    this.socket.onmessage = (ev: { data: string }) => this.onMessage(JSON.parse(ev.data));
  }

  addEventListener(event: string, listener: EventListener): void {
    if (this.eventListeners.has(event)) {
      throw new Error("Duplicate event listener " + event);
    }
    this.eventListeners.set(event, listener);
  }

  removeEventListener(event: string): void {
    this.eventListeners.delete(event);
  }

  async sendCommand(method: string, params: any, sessionId?: string, pauseId?: string): Promise<any> {
    await this.opened.promise;
    const id = this.nextMessageId++;
    this.socket.send(JSON.stringify({ id, method, params, sessionId, pauseId }));
    const waiter = defer();
    this.pendingMessages.set(id, waiter);
    return waiter.promise;
  }

  onMessage(msg: any): void {
    if (msg.id) {
      const { resolve, reject } = this.pendingMessages.get(msg.id)!;
      this.pendingMessages.delete(msg.id);
      if (msg.result) {
        resolve(msg.result);
      } else {
        reject(msg.error);
      }
    } else {
      const handler = this.eventListeners.get(msg.method);
      if (handler) {
        handler(msg.params);
      } else {
        this.log(`No handler for event: ${JSON.stringify(msg)}`);
      }
    }
  }
}

function defer(): Deferred {
  let resolve, reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject } as any;
}
