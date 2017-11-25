import axios from 'axios';
import * as Table from 'cli-table2';
import cfg from '../config';
import { Fixture, Player, Team } from '../models';
import { ITeamJson } from '../models/Team';

export const get = (teamName: string, options: any): void => {
  axios
    .get(cfg.apiBaseUrl + teamName, cfg.axiosConfig)
    .then((teamRes: any) => {
      const team = new Team(teamRes.data);
      team.print();

      if (options.fixtures) {
        const table = new Table({
          head: ['Home - Away', 'Score', 'Status', 'Date'],
          style: { head: [], border: [] },
        }) as Table.HorizontalTable;

        axios
          .get(team.links.fixtures, cfg.axiosConfig)
          .then((fixtureRes: any) => {
            fixtureRes.data.fixtures.forEach((fix: any) => {
              const fixture = new Fixture(fix);
              table.push(fixture.toRow());
            });

            console.log(table.toString());
          })
          .catch(err => console.log(err.response.data.error));
      }

      if (options.players) {
        const table = new Table({
          head: ['Name', 'Jersey', 'Position', 'Nationality', 'Date of Birth'],
          style: {
            head: [],
            border: [],
          },
        }) as Table.HorizontalTable;

        axios
          .get(team.links.players, cfg.axiosConfig)
          .then((playersRes: any) => {
            playersRes.data.players.forEach((p: any) => {
              const player = new Player(p);
              table.push(player.toRow());
            });

            console.log(table.toString());
          })
          .catch(err => console.log(err.response.data.error));
      }
    })
    .catch(err => console.log(err.response.data.error));
};