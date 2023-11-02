import { Request, Response } from 'express';
import mapStatusHTTP from '../../utils/mapStatusHTTP';
import LoginService from '../service/Login.service';

export default class TeamController {
  constructor(private loginService = new LoginService()) { }

  public async findOne(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await this.loginService.findOne(email, password);
    res.status(mapStatusHTTP(status)).json(data);
  }

  public async findRole(req: Request, res: Response) {
    const { id } = req.body;
    const { status, data } = await this.loginService.findRole(id);
    res.status(mapStatusHTTP(status)).json(data);
  }
}
