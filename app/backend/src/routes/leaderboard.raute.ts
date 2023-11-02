import { Request, Router, Response } from 'express';
import LeaderboardController from '../layers/controller/Leaderboard.controller';

const leaderboardController = new LeaderboardController();

const router = Router();

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.findAll(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.findAll(req, res),
);

export default router;
