import { Client } from '../Client';

export class GameInfoRequest extends Client {
    async getGameInfoAndRoster(gameId: string | number) {
        const path = `/matches/${String(gameId)}/game-info.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response;
    }

    async getGameEvents(gameId: string | number) {
        const path = `/matches/${String(gameId)}/period-events.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response;
    }

    async getPlayerStats(gameId: string | number, teamId: string | number) {
        const path = `/matches/${String(gameId)}/team-stats/${String(teamId)}.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response;
    }

    async getGoalieStats(gameId: string | number) {
        const path = `/matches/${String(gameId)}/top-goalies.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response;
    }

    async getTeamStats(gameId: string | number, teamId: string | number) {
        const path = `/matches/team-stats/${String(gameId)}/${String(teamId)}.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response;
    }
}
