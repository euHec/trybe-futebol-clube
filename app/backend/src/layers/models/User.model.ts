import IUserModel from '../../Interfaces/user/IUserModel';
import SequelizeUser from '../../database/models/SequelizeUser';
import IUser from '../../Interfaces/user/IUser';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findOne(email: string): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });
    if (!dbData) return null;
    return dbData?.dataValues;
  }

  async findByPk(id: number): Promise<IUser | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;
    return dbData?.dataValues;
  }
}
