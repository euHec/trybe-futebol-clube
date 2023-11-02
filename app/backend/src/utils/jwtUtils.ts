import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  email: string,
};

const jwtConfig: jwt.SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

function sign(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
}

function verify(token: string): TokenPayload {
  const data = jwt.verify(token, secret) as TokenPayload;
  return data;
}

export default {
  sign,
  verify,
};
