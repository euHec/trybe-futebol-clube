import { Request, Response } from 'express';
import mapStatusHTTP from '../../utils/mapStatusHTTP';
import LeaderBoardService from '../service/LeaderBoard.service';

export default class TeamController {
  constructor(private leaderBoardService = new LeaderBoardService()) { }

  public async findAll(req: Request, res: Response) {
    console.log(req.url);
    const { status, data } = await this.leaderBoardService.findAll(req.url);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
