import { BASE_URL, CONTENT_TYPE } from "../Constants";
import { EliteLeagueRequest } from "../Request/EliteLeagueRequest";
import { ConnectionInterface } from "./Interface/ConnectionInterface";

export abstract class Client implements ConnectionInterface {
    private headers: HeadersInit;

    constructor(headers: HeadersInit | null) {
        this.headers = {
            'Cache-Control': 'no-cache',
            'Content-Type': CONTENT_TYPE,
        } as HeadersInit;
    }

    /**
     * Get value of headers
     * @returns HeadersInit
     */
    getHeaders(): HeadersInit {
        return this.headers;
    }

    setHeaders(headers: HeadersInit): HeadersInit {
        return this.mergeHeaders(this.headers, headers);
    }

    /**
     * Merge multiple header arrays together
     * @param sources HeadersInit[]
     * @returns Headers
     */
    mergeHeaders(...sources: HeadersInit[]) {
        let result = new Headers();

        for (let headersInit of sources) {
            let headers = new Headers(headersInit);

            for (let [key, value] of headers.entries()) {
                result.set(key, value);
            }
        }

        return result;
    }

    /**
     * Make API Request
     * @param method string
     * @param path string
     * @param data FutureTicketingRequest<RT> | null
     * @param headers HeadersInit
     * @returns T
     */
    async makeRequest<T>(
        method: string,
        path: string,
        req?: EliteLeagueRequest | null,
        headers?: HeadersInit,
    ): Promise<T> {
        const requestHeaders = this.mergeHeaders(this.headers, headers ?? {});
        const params: RequestInit = {
            method,
            headers: requestHeaders,
        };

        if (req) params.body = JSON.stringify(req);

        const requestPath = path.startsWith('/') ? path.slice(1) : path;
        const request = await fetch(`${BASE_URL}/${requestPath}`, params);
        const response = await request.json();

        if (response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as T;
    }
}
