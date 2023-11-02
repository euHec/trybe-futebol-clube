import { Request, Router, Response } from 'express';
import Validations from '../layers/middleware/Validations';
import LoginController from '../layers/controller/Login.controller';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  Validations.validateFields,
  (req: Request, res: Response) => loginController.findOne(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => loginController.findRole(req, res),
);

export default router;
