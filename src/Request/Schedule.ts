import { Client } from '../Client';
import { League } from '../Enums';
import { Schedule } from '../Response';

export class ScheduleRequest extends Client {
    async getLeagueSchedule(league: League, year: number | string): Promise<Schedule> {
        const path = `/league-matches/${String(year)}/${String(league)}.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as Schedule;
    }

    async getTeamSchedule(
        league: League,
        year: number | string,
        team: string | number,
    ): Promise<Schedule> {
        const path = `/league-team-matches/${String(year)}/${String(league)}/${String(team)}.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as Schedule;
    }
}
