import { Client } from '../Client';
import { League } from '../Enums';
import { Standings } from '../Response';

export class StandingsRequest extends Client {
    async getStandings(league: League, year: string | number): Promise<Standings> {
        const path = `/table/${String(year)}/${String(league)}.json`;

        const req = await fetch(path, this.getFetchParams());
        const response = await req.json();

        if (!response.ok) {
            throw new Error(response.message || 'Unknown API Error');
        }

        return response as Standings;
    }
}
