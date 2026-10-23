import { GameStatus, League } from '../Enums';
import { Result } from './Game';
import { Team } from './Team';

export type Schedule = {
    matches: ScheduleGame[];
};

export type ScheduleGame = {
    id: number;
    start_date: Date;
    league_id: League;
    league: string;
    season: number;
    round?: string;
    group?: string;
    home: Team;
    guest: Team;
    status: GameStatus;
    overtimeCount?: number;
    results: Result;
    actual_time_name: string;
    actual_time_alias: string;
    last_event_time: number;
    arena: string;
};
