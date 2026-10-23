import { EliteLeagueRequest } from "../../Request/EliteLeagueRequest";

export interface ConnectionInterface {
    /**
     * Make an API request
     */
    makeRequest<T>(
        method: string,
        path: string,
        req?: EliteLeagueRequest | null,
        headers?: HeadersInit,
    ): Promise<T>;
}
