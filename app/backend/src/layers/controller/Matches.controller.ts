import { Request, Response } from 'express';
import mapStatusHTTP from '../../utils/mapStatusHTTP';
import MatchesService from '../service/Matches.service';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress) {
      let statuss = true;
      if (inProgress === 'false') statuss = false;
      const { status, data } = await this.matchesService.findAllByProgress(statuss);
      return res.status(mapStatusHTTP(status)).json(data);
    }
    const { status, data } = await this.matchesService.findAll();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async createNewMatche(req: Request, res: Response) {
    const { id, ...matche } = req.body;
    const { status, data } = await this.matchesService
      .createNewMatche({ ...matche, inProgress: true });
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateStatus(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.matchesService.updateStatus(Number(id));
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async updateResults(req: Request, res: Response) {
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const { id } = req.params;
    const { status, data } = await this.matchesService
      .updateResults(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
