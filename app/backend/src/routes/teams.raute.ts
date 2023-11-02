import { Request, Router, Response } from 'express';
import TeamController from '../layers/controller/Team.controller';

const teamController = new TeamController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => teamController.findAll(req, res),
);

router.get(
  '/:id',
  (req: Request, res: Response) => teamController.findByID(req, res),
);

export default router;
