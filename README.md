# Elite Ice Hockey League (EIHL) JS SDK

An ES module SDK for retrieving schedules and standings from the Elite League
API. Requests use the API's public JSON endpoints and return parsed response
data.

## Requirements

- Node.js 18 or later (for built-in `fetch`)

## Installation

```sh
npm install elite-league-js
```

## Usage

The package currently exports `ScheduleRequest` and `StandingsRequest` from its
root entry point. League values are API IDs:

| League        |  ID |
| ------------- | --: |
| EIHL          |   3 |
| Challenge Cup |   4 |
| Playoffs      |   5 |

```js
import { ScheduleRequest, StandingsRequest } from 'elite-league-js';

const league = 3; // EIHL
const season = 2026;

const scheduleRequest = new ScheduleRequest(null);
const schedule = await scheduleRequest.getLeagueSchedule(league, season);
console.log(schedule.matches);

const teamId = schedule.matches[0].home.id;
const teamSchedule = await scheduleRequest.getTeamSchedule(league, season, teamId);
console.log(teamSchedule.matches);

const standingsRequest = new StandingsRequest(null);
const standings = await standingsRequest.getStandings(league, season);
console.log(standings);
```

### Available methods

- `getLeagueSchedule(league, season)` returns a schedule with a `matches` array.
- `getTeamSchedule(league, season, teamId)` returns a team's schedule with a
  `matches` array.
- `getStandings(league, season)` returns an array of standings groups. Each
  group contains a `clubs` array.

The `league` argument is a league ID from the table above. The `season` and
`teamId` arguments accept either a string or a number. The TypeScript response
types are included with the package.

Requests reject with an `Error` when the HTTP response is unsuccessful or the
API returns an error response.

## Development

```sh
npm install
npm run build
npm run check
npm test
```

`npm test` runs mocked tests and does not require network access. To exercise the
request methods against the live API, run:

```sh
npm run test:live
```

The live test uses EIHL and the current calendar year by default. Set
`ELITE_LEAGUE_SEASON` to select a different season:

```sh
ELITE_LEAGUE_SEASON=2025 npm run test:live
```
