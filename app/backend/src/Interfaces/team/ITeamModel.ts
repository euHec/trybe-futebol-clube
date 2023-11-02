import ITeams from './ITeam';

export default interface ITeamModel {
  findAll(): Promise<ITeams[]>
  findByID(id: number): Promise<ITeams | null>
}
