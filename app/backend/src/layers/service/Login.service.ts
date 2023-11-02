import * as bcrypt from 'bcryptjs';
import jwtUtils from '../../utils/jwtUtils';
import IToken from '../../Interfaces/IToken';
import IRole from '../../Interfaces/IRole';
import UserModel from '../models/User.model';
import { ServiceResponse } from '../../Interfaces/ServiceResponse';

export default class LoginService {
  constructor(private userModel: UserModel = new UserModel()) { }

  public async findOne(email: string, password: string): Promise<ServiceResponse<IToken>> {
    const user = await this.userModel.findOne(email);

    if (!user || !(bcrypt.compareSync(password, user?.password))) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    const payload = { id: user.id, email: user.email };

    const token = jwtUtils.sign(payload);

    return { status: 'SUCCESSFUL', data: { token } };
  }

  public async findRole(id: number): Promise<ServiceResponse<IRole>> {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    }

    return { status: 'SUCCESSFUL', data: { role: user.role } };
  }
}
