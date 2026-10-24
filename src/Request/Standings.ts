import { Client } from '../Client';
import { League } from '../Enums';
import { Standings } from '../Response';

export class StandingsRequest extends Client {
    async getStandings(league: League, year: string | number): Promise<Standings> {
        const path = `/table/${String(year)}/${String(league)}.json`;

        return this.makeRequest<Standings>('get', path);
    }
}
