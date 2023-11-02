import SequelizeTeam from '../../database/models/SequelizeTeam';
import ITeam from '../../Interfaces/team/ITeam';
import ITeamModel from '../../Interfaces/team/ITeamModel';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeam;

  async findAll(): Promise<ITeam[]> {
    const dbData = await this.model.findAll();
    return dbData;
  }

  async findByID(id: number): Promise<ITeam | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return dbData?.dataValues;
  }
}
