import { Request, Router, Response } from 'express';
import Validations from '../layers/middleware/Validations';
import MatchesController from '../layers/controller/Matches.controller';

const matchesController = new MatchesController();

const router = Router();

router.get(
  '/',
  (req: Request, res: Response) => matchesController.findAll(req, res),
);

router.post(
  '/',
  Validations.validateToken,
  async (req: Request, res: Response) => matchesController.createNewMatche(req, res),
);

router.patch(
  '/:id/finish',
  Validations.validateToken,
  async (req: Request, res: Response) => matchesController.updateStatus(req, res),
);

router.patch(
  '/:id',
  Validations.validateToken,
  (req: Request, res: Response) => matchesController.updateResults(req, res),
);

export default router;
