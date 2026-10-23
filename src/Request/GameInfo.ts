import { Client } from '../Client';
import { GameEventList, GameInfo, GoalieStatList, PlayerStat, TeamStat } from '../Response';

export class GameInfoRequest extends Client {
    async getGameInfoAndRoster(gameId: string | number): Promise<GameInfo> {
        const path = `/matches/${String(gameId)}/game-info.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as GameInfo;
    }

    async getGameEvents(gameId: string | number): Promise<GameEventList> {
        const path = `/matches/${String(gameId)}/period-events.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as GameEventList;
    }

    async getPlayerStats(gameId: string | number, teamId: string | number): Promise<PlayerStat> {
        const path = `/matches/${String(gameId)}/team-stats/${String(teamId)}.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as PlayerStat;
    }

    async getGoalieStats(gameId: string | number): Promise<GoalieStatList> {
        const path = `/matches/${String(gameId)}/top-goalies.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as GoalieStatList;
    }

    async getTeamStats(gameId: string | number, teamId: string | number): Promise<TeamStat> {
        const path = `/matches/team-stats/${String(gameId)}/${String(teamId)}.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as TeamStat;
    }
}
