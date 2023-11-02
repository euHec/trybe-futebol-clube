import { Request, Response } from 'express';
import mapStatusHTTP from '../../utils/mapStatusHTTP';
import LeaderBoardService from '../service/LeaderBoard.service';

export default class TeamController {
  constructor(private leaderBoardService = new LeaderBoardService()) { }

  public async findAll(req: Request, res: Response) {
    const { status, data } = await this.leaderBoardService.findAll();
    res.status(mapStatusHTTP(status)).json(data);
  }
}
