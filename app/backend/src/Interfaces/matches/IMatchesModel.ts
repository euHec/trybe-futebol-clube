import IMatches from './IMatches';

export default interface IMatchesModel {
  findAll(): Promise<IMatches[]>
  findAllByProgress(status: boolean): Promise<IMatches[]>
  findByID(id: number): Promise<IMatches | null>
  updateStatus(id: number): Promise<IMatches | null>
  updateResults(id: number, away: number, home: number): Promise<IMatches | null>
  createNewMatche(match: Omit<IMatches, 'id'>): Promise<IMatches | null>
}
