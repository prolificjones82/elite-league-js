import { EventType, PenaltyType } from '../Enums';
import { Player } from './Player';
import { Team } from './Team';

export type Result = {
    extra_time: boolean;
    shooting: boolean;
    contumacy: boolean;
    score: GamePeriods;
};

export type GamePeriods = {
    final: GamePeriodScore;
    first_period: GamePeriodScore;
    second_period: GamePeriodScore;
    third_period: GamePeriodScore;
    overtime?: GamePeriodScore;
    shootout?: GamePeriodScore;
};

export type GamePeriodScore = {
    score_home: number;
    score_guest: number;
};

export type GameInfo = {
    actualTimeName: string;
    actualTimeAlias: string;
    stadium: string;
    numberOfViewers: number;
    referees: {
        headReferee1?: string;
        headReferee2?: string;
        lineReferee1?: string;
        lineReferee2?: string;
    };
    teamInfo: {
        home: Team;
        visitor: Team;
    };
    trainers: {
        homeHeadCoach?: string;
        visitorHeadCoach?: string;
    };
    teamBilance: {
        homeWin: number;
        visitorWin: number;
    };
    results: {
        extra_time: boolean;
        shooting: boolean;
        contumacy: boolean;
        score: GamePeriods;
    };
    roster: {
        home: GamePlayer;
        visitor: GamePlayer;
    };
};

export interface GamePlayer extends Player {
    playerId: number;
    matchPlayerId: number;
    roster: string;
}

export type GameEventList = {
    period_one: PeriodEvent[];
    period_two: PeriodEvent[];
    period_three: PeriodEvent[];
    overtime: PeriodEvent[];
    shootout: ShootoutEvent[];
    last_event_time: number;
};

export interface BaseEvent {
    time: number;
    type: EventType;
}

export interface GoalkeeperChangeEvent extends BaseEvent {
    data: {
        id: number;
        team: string;
        time: number;
        player: GamePlayer;
        outgoingGoalkeeper?: GamePlayer;
    };
}

export interface GoalEvent extends BaseEvent {
    data: {
        id: number;
        team: string;
        currentScore: string;
        realTime: Date;
        scoreboardTime: number;
        balance: string;
        ea: boolean;
        en: boolean;
        shooting: boolean;
        technical: boolean;
        scorer: GamePlayer;
        assistants: GamePlayer[];
        attendants: {
            positive: GamePlayer[];
            negative: GamePlayer[];
        };
    };
}

export interface PenaltyEvent extends BaseEvent {
    data: {
        id: number;
        team: string;
        createTime: number;
        disciplinedPlayer: GamePlayer;
        replacedPlayer?: GamePlayer;
        fouledPlayer?: GamePlayer;
        from?: PenaltyTime;
        to?: PenaltyTime;
        duration: number;
        shooting: boolean;
        disciplined_functionary: boolean;
        disciplined_bm: boolean;
        codename: PenaltyType;
    };
}

export type PenaltyTime = {
    realTime: Date;
    scoreboardTime: number;
};

export interface ShootoutEvent extends BaseEvent {
    data: {
        id: number;
        team: string;
        scorer: GamePlayer;
        goalkeeper: GamePlayer;
        order: number;
        scored: boolean;
        currentScore: string;
    };
}

export type PeriodEvent = GoalkeeperChangeEvent | GoalEvent | PenaltyEvent;
