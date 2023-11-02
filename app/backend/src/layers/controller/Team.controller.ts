import { Request, Response } from 'express';
import mapStatusHTTP from '../../utils/mapStatusHTTP';
import TeamsService from '../service/Team.service';

export default class TeamController {
  constructor(private teamsService = new TeamsService()) { }

  public async findAll(req: Request, res: Response) {
    const { status, data } = await this.teamsService.findAll();
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async findByID(req: Request, res: Response) {
    const { id } = req.params;
    const { status, data } = await this.teamsService.findByID(Number(id));
    res.status(mapStatusHTTP(status)).json(data);
  }
}
