// Type definitions for node-spdy 3.4
// Project: https://github.com/indutny/node-spdy
// Definitions by: Anthony Trinh <https://github.com/tony19>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.2

/// <reference types="node" />

import * as http from 'http';
import * as https from 'https';

declare module "spdy" {
    // lib/spdy/agent.js
    namespace agent {
        class Agent extends https.Agent {}
        class PlainAgent extends http.Agent {}
        function create(base: any, options: AgentOptions): Agent | PlainAgent;

        interface AgentOptions extends https.AgentOptions {
            port?: number;
            spdy?: {
                plain?: boolean,
                ssl?: boolean,
                'x-forwarded-for'?: string,
                protocol?: string,
                protocols?: string[]
            };
        }
    }

    // lib/spdy/handle.js
    interface Handle {
        create(options: object, stream: any, socket: Socket): Handle;
        getStream(callback?: (stream: any) => void): any;
        assignSocket(socket: Socket, options: object): void;
        assignClientRequest(req: any): void;
        assignRequest(req: any): void;
        assignResponse(res: any): void;
        emitRequest(): void;
        emitResponse(status: any, headers: any): void;
    }

    // lib/spdy/request.js
    namespace request {
        function onNewListener(type: string): void;
    }

    // lib/spdy/response.js
    namespace response {
        function writeHead(statusCode: number, reason: string, obj: object): void;
        function writeHead(statusCode: number, obj: object): void;
        function end(data: any, encoding: string, callback: () => void): void;
    }

    // lib/spdy/server.js
    namespace server {
        type Server = https.Server;
        type PlainServer = http.Server;
        type IncomingMessage = http.IncomingMessage;
        interface ServerResponse extends http.ServerResponse {
            push(filename: string, options: PushOptions): any;
        }
        function create(base: any,
                               options: https.ServerOptions,
                               handler: (request: IncomingMessage, response: ServerResponse | http.ServerResponse) => void): Server;
        function create(options: https.ServerOptions,
                               handler: (request: IncomingMessage, response: http.ServerResponse) => void): Server;
        function create(handler: (request: IncomingMessage, response: ServerResponse | http.ServerResponse) => void): Server;

        type Protocol =
            'h2'
                | 'spdy/3.1'
                | 'spdy/3'
                | 'spdy/2'
                | 'http/1.1'
                | 'http/1.0';

        interface PushOptions {
            status?: number;
            method?: string;
            request?: any;
            response?: any;
        }

        interface ServerOptions extends https.ServerOptions {
            spdy?: {
                protocols?: Protocol[],
                plain?: boolean,
                'x-forwarded-for'?: boolean,
                connection?: {
                    windowSize?: number,
                    autoSpdy31?: boolean,
                },
            };
        }
    }

    // lib/spdy/socket.js
    namespace socket {
        // tslint:disable-next-line no-empty-interface
        interface Socket {} // net.Socket
    }

    // lib/spdy.js
    type Agent = agent.Agent;
    type PlainAgent = agent.PlainAgent;
    type AgentOptions = agent.AgentOptions;
    type Socket = socket.Socket;
    type Server = server.Server;
    type IncomingMessage = server.IncomingMessage;
    type ServerRequest = server.IncomingMessage;
    type ServerResponse = server.ServerResponse;
    type PlainServer = server.PlainServer;
    type ServerOptions = server.ServerOptions;
    function createAgent(base: any, options: AgentOptions): Agent | PlainAgent;
    function createAgent(options: AgentOptions): Agent | PlainAgent;
    function createServer(base: any,
                                 options: ServerOptions,
                                 handler: (request: IncomingMessage, response: http.ServerResponse) => void): Server;
    function createServer(options: ServerOptions,
                                 handler: (request: IncomingMessage, response: http.ServerResponse) => void): Server;
    function createServer(handler: (request: IncomingMessage, response: http.ServerResponse) => void): Server;
}
