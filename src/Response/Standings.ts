export type Standings = {
    groupId?: number;
    groupName?: string;
    complete: boolean;
    clubs: StandingsTeam[];
};

export type StandingsTeam = {
    id: number;
    partTeamId: number;
    name: string;
    teamOriginal: string;
    shortcut: string;
    position: number;
    ponumbers: number;
    games: number;
    wins: number;
    winsOt: number;
    winsReg: number;
    ties: number;
    lostsOt: number;
    losts: number;
    score1: number;
    score2: number;
    goalsAway: number;
    last10?: string;
    onlyOTwins: number;
    onlySOwins: number;
    onlyOTlosts: number;
    onlySOlosts: number;
    qualified: boolean;
    ppg: string;
};
