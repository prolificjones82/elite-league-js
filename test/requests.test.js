import assert from 'node:assert/strict';
import test from 'node:test';
import { ScheduleRequest, StandingsRequest } from '../dist/index.js';

const successResponse = { ok: true, data: [] };
const baseUrl = 'https://s3-eu-west-1.amazonaws.com/eihl.hokejovyzapis.cz';

async function assertRequest(t, request, invoke, expectedPath) {
    const calls = [];
    t.mock.method(globalThis, 'fetch', async (...args) => {
        calls.push(args);
        return new Response(JSON.stringify(successResponse));
    });

    const result = await invoke(request);

    assert.deepEqual(result, successResponse);
    assert.equal(calls.length, 1);
    assert.equal(calls[0][0], `${baseUrl}${expectedPath}`);
    assert.equal(calls[0][1].method, 'get');
    assert.deepEqual(Object.fromEntries(new Headers(calls[0][1].headers)), {
        'cache-control': 'no-cache',
        'content-type': 'application/json',
    });
    assert.equal('body' in calls[0][1], false);
}

test('getLeagueSchedule requests the selected league and season', async (t) => {
    await assertRequest(
        t,
        new ScheduleRequest(null),
        (request) => request.getLeagueSchedule(3, 2025),
        '/league-matches/2025/3.json',
    );
});

test('getTeamSchedule requests the selected team, league, and season', async (t) => {
    await assertRequest(
        t,
        new ScheduleRequest(null),
        (request) => request.getTeamSchedule(4, '2024', '17'),
        '/league-team-matches/2024/4/17.json',
    );
});

test('getStandings requests the selected league and season', async (t) => {
    await assertRequest(
        t,
        new StandingsRequest(null),
        (request) => request.getStandings(5, '2023'),
        '/table/2023/5.json',
    );
});

test('request methods reject API errors with the response message', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => ({
        ok: false,
        json: async () => ({ ok: false, message: 'Season not found' }),
    }));

    await assert.rejects(new ScheduleRequest(null).getLeagueSchedule(3, 2025), {
        message: 'Season not found',
    });
});

test('request methods use a fallback message when the API omits one', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => ({
        ok: false,
        json: async () => ({ ok: false }),
    }));

    await assert.rejects(new StandingsRequest(null).getStandings(3, 2025), {
        message: 'Unknown API Error',
    });
});

test('request methods reject API errors returned in a successful HTTP response', async (t) => {
    t.mock.method(globalThis, 'fetch', async () => ({
        ok: true,
        json: async () => ({ ok: false, message: 'Season not found' }),
    }));

    await assert.rejects(new StandingsRequest(null).getStandings(3, 2025), {
        message: 'Season not found',
    });
});
