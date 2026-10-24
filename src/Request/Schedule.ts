import { Client } from '../Client';
import { League } from '../Enums';
import { Schedule } from '../Response';

export class ScheduleRequest extends Client {
    async getLeagueSchedule(league: League, year: number | string): Promise<Schedule> {
        const path = `/league-matches/${String(year)}/${String(league)}.json`;

        return this.makeRequest<Schedule>('get', path);
    }

    async getTeamSchedule(
        league: League,
        year: number | string,
        team: string | number,
    ): Promise<Schedule> {
        const path = `/league-team-matches/${String(year)}/${String(league)}/${String(team)}.json`;

        return this.makeRequest<Schedule>('get', path);
    }
}
