import SequelizeTeam from '../../database/models/SequelizeTeam';
import SequelizeMatches from '../../database/models/SequelizeMatches';
import IMatches from '../../Interfaces/matches/IMatches';
import IMatchesModel from '../../Interfaces/matches/IMatchesModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll(
      {
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          {
            model: SequelizeTeam,
            as: 'awayTeam',
            attributes: ['teamName'],
          },
        ],
      },
    );
    return dbData;
  }

  async findByID(id: number): Promise<IMatches | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return dbData;
  }

  async findAllByProgress(status: boolean): Promise<IMatches[]> {
    const dbData = await this.model.findAll(
      { where: { inProgress: status },
        include: [
          {
            model: SequelizeTeam,
            as: 'homeTeam',
            attributes: ['teamName'],
          },
          {
            model: SequelizeTeam,
            as: 'awayTeam',
            attributes: ['teamName'],
          },
        ],
      },
    );
    return dbData;
  }

  async updateStatus(id: number): Promise<IMatches | null> {
    const [affectedRowns] = await this.model.update(
      {
        inProgress: false,
      },
      {
        where: { id },
      },
    );
    if (affectedRowns === 0) return null;
    return this.model.findByPk(id);
  }

  async updateResults(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<IMatches | null> {
    const [affectedRowns] = await this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    if (affectedRowns === 0) return null;
    return this.model.findByPk(id);
  }

  async createNewMatche(match: Omit<IMatches, 'id'>): Promise<IMatches | null> {
    const { dataValues } = await this.model.create(match);
    if (!dataValues) return null;
    return this.model.findByPk(dataValues.id);
  }
}
