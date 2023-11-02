import MatchesModel from '../models/Matches.model';
import IMatchesModel from '../../Interfaces/matches/IMatchesModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import LeaderBoardUtils, { Results } from '../../utils/leaderBoard';

export interface Leaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async findAll(param: string): Promise<ServiceResponse<Leaderboard[]>> {
    const matches = await this.matchesModel.findAllByProgress(false);

    const groupedMatches: { [teamName: string]: Results[] } = {};

    matches.forEach(({ homeTeam, awayTeam, awayTeamGoals, homeTeamGoals }) => {
      const teamName = param === '/home' ? homeTeam?.teamName : awayTeam?.teamName;
      if (teamName) {
        if (!groupedMatches[teamName]) {
          groupedMatches[teamName] = [];
        }
        groupedMatches[teamName].push({ awayTeamGoals, homeTeamGoals });
      }
    });

    const result = Object.keys(groupedMatches)
      .map((team: string) => {
        const leader = new LeaderBoardUtils(team, groupedMatches[team]);
        leader.leaderBoards();
        return leader.getLeaderboard();
      });

    return { status: 'SUCCESSFUL', data: result };
  }
}
