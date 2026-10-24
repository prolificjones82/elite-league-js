import assert from 'node:assert/strict';
import test from 'node:test';
import { ScheduleRequest, StandingsRequest } from '../dist/index.js';

const season = process.env.ELITE_LEAGUE_SEASON ?? String(new Date().getFullYear());
const league = 3;

test(
    'schedule and standings methods return data from the live API',
    { skip: process.env.ELITE_LEAGUE_LIVE_TEST !== '1' },
    async () => {
        const scheduleRequest = new ScheduleRequest(null);
        const standingsRequest = new StandingsRequest(null);

        const schedule = await scheduleRequest.getLeagueSchedule(league, season);
        assert.ok(Array.isArray(schedule.matches), 'league schedule should contain matches');
        assert.ok(schedule.matches.length > 0, 'league schedule should not be empty');

        const teamId = schedule.matches[0].home.id;
        const teamSchedule = await scheduleRequest.getTeamSchedule(league, season, teamId);
        assert.ok(Array.isArray(teamSchedule.matches), 'team schedule should contain matches');
        assert.ok(teamSchedule.matches.length > 0, 'team schedule should not be empty');
        assert.ok(
            teamSchedule.matches.every(
                (match) => match.home.id === teamId || match.guest.id === teamId,
            ),
            'team schedule should only contain matches involving the selected team',
        );

        const standings = await standingsRequest.getStandings(league, season);
        assert.ok(Array.isArray(standings), 'standings should contain groups');
        assert.ok(standings.length > 0, 'standings should not be empty');
        assert.ok(
            standings.every((group) => Array.isArray(group.clubs)),
            'each standings group should contain clubs',
        );
    },
);
