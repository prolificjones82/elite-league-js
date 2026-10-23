export interface Player {
    name: string;
    surname: string;
    jersey: number;
    position: string;
}

export interface PlayerStat extends Player {
    id: number;
    firstname: string;
    birthdate: Date;
    active: boolean;
    stick: string;
    weight: number;
    height: number;
    birthCountry: string;
    nationality: string;
    nationalityShort: string;
    statistics: {
        teamShortcut: string;
        games: number;
        goals: PlayerStatPoint;
        assists: PlayerStatPoint;
        points: PlayerStatPoint;
        penaltyMinutes: number;
        positive: number;
        negative: number;
        pointsPerGame: number;
        shotEfficiency: number;
        penaltyMinutesPerGame: number;
        ppGoals: number;
        shGoals: number;
        gwGoals: number;
        shotsAttempts: number;
        shotsOnGoal: PlayerStatPoint;
        shotsMissed: number;
        shotsBlocked: number;
        blockedShotsByPlayer: number;
        faceoffsWin: number;
        faceoffsLosses: number;
        faceoffsCount: number;
        timeonice: number;
        timeoniceEQ: number;
        timeonicePP: number;
        timeoniceSH: number;
        hits: number;
    };
}

export type PlayerStatPoint = {
    home: number;
    away: number;
};

export type GoalieStatList = {
    data: GoalieStat[];
};

export interface GoalieStat extends Player {
    playerId: number;
    birthdate: Date;
    teamId: number;
    teamName: string;
    teamShortcut: string;
    matches: number;
    wonMatches: number;
    lostMatches: number;
    saves: number;
    goalsAgainst: number;
    savesPercent: number;
    average: number;
    zeros: number;
    timeOnIce: number;
    secondsPerGame: number;
    minutesInPlay: number;
    visibleGames: boolean;
    visibleShutouts: boolean;
    visibleWins: boolean;
    starsGames: number;
    starsShutouts: number;
    starsWins: number;
    milestoneGames: number;
    milestoneShutouts: number;
    milestoneWins: number;
}
