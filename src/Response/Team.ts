export type Team = {
    id: number;
    name: string;
    shortcut: string;
};

export type TeamStat = {
    shotEfficiency: number;
    ppEfficiency: number;
    shEfficiency: number;
    ppCount: number;
    shCount: number;
    goals: number;
    shotsAttempts: number;
    shotsOnGoal: number;
    shotsMissed: number;
    shotsBlocked: number;
    saves: number;
    savesPercent: number;
    ppGoals: number;
    shGoals: number;
    ppLosses: number;
    penaltyMinutes: number;
    faceOffsWon: number;
    faceOffsWonPercent: number;
    faceOffsTotal: number;
    hits: number;
};
