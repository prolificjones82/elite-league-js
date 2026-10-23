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
