import TeamModel from '../models/Team.model';
import ITeamModel from '../../Interfaces/team/ITeamModel';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';
import ITeam from '../../Interfaces/team/ITeam';

export default class TeamService {
  constructor(private teamModel: ITeamModel = new TeamModel()) { }

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async findByID(id: number): Promise<ServiceResponse<ITeam>> {
    const teams = await this.teamModel.findByID(id);
    if (!teams) return { status: 'NOT_FOUND', data: { message: 'No teams found' } };
    return { status: 'SUCCESSFUL', data: teams };
  }
}
