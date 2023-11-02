import { Request, Response, NextFunction } from 'express';
import jwtUtils from '../../utils/jwtUtils';
import schema from './schema';

class Validations {
  static validateFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const { error } = schema.validate({ email, password });
    if (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    const token = authorization.split(' ')[1];

    try {
      const validate = jwtUtils.verify(token);
      req.body.id = validate.id;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default Validations;
