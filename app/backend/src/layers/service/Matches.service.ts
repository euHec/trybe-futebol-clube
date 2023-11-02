import MatchesModel from '../models/Matches.model';
import IMatchesModel from '../../Interfaces/matches/IMatchesModel';
import IMatches from '../../Interfaces/matches/IMatches';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import IMatchUpdate from '../../Interfaces/matches/IMatchUpdate';
import ITeamModel from '../../Interfaces/team/ITeamModel';
import TeamModel from '../models/Team.model';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
    private teamModel: ITeamModel = new TeamModel(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async findAllByProgress(status: boolean): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAllByProgress(status);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async updateStatus(id: number): Promise<ServiceResponse<IMatchUpdate>> {
    const findID = await this.matchesModel.findByID(id);
    if (!findID) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    if (!findID.inProgress) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} not in progress` } };
    }
    await this.matchesModel.updateStatus(id);

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async createNewMatche(match: Omit<IMatches, 'id'>): Promise<ServiceResponse<IMatches>> {
    const { awayTeamId, homeTeamId } = match;
    if (homeTeamId === awayTeamId) {
      return {
        status: 'UNPROCESSABLE ENTITY',
        data: { message: 'It is not possible to create a match with two equal teams' } };
    }
    const fistTeam = await this.teamModel.findByID(homeTeamId);
    const secondTeam = await this.teamModel.findByID(awayTeamId);
    if (!fistTeam || !secondTeam) {
      return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
    }
    const newMatch = await this.matchesModel.createNewMatche(match);
    if (!newMatch) {
      return { status: 'UNAUTHORIZED', data: { message: 'Match creation was not allowed' } };
    }
    return { status: 'CREATED', data: newMatch };
  }

  public async updateResults(
    id: number,
    home: number,
    away: number,
  ) :Promise<ServiceResponse<IMatchUpdate>> {
    const findID = await this.matchesModel.findByID(id);
    if (!findID) return { status: 'NOT_FOUND', data: { message: `Match ${id} not found` } };
    if (!findID.inProgress) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} not in progress` } };
    }
    await this.matchesModel.updateResults(id, home, away);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
