import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeUser from '../database/models/SequelizeUser';

import { requestInvalidLogin, requestValidLogin, userFromDB, validToken, invalidToken } from './mock/user.mock';
import jwtUtils from '../utils/jwtUtils';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /login', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Realiza o login com sucesso', async () => {
    sinon
    .stub(SequelizeUser, "findOne")
    .resolves(SequelizeUser.build(userFromDB));

    const { status, body } = await chai
       .request(app)
       .post('/login')
       .send(requestValidLogin);

    expect(status).to.be.equal(200);
    expect(body).to.be.haveOwnProperty('token');
  });

  it('Não permite o login com e-mail faltando', async () => {
    sinon
    .stub(SequelizeUser, "findOne")
    .resolves(null);

    const { status, body } = await chai
       .request(app)
       .post('/login')
       .send(requestInvalidLogin[0]);

    expect(status).to.be.equal(400);
    expect(body.message).to.be.deep.equal('All fields must be filled');
  });

  it('Não permite o login com senha faltando', async () => {
    sinon
    .stub(SequelizeUser, "findOne")
    .resolves(null);

    const { status, body } = await chai
       .request(app)
       .post('/login')
       .send(requestInvalidLogin[1]);

       expect(status).to.be.equal(400);
       expect(body.message).to.be.deep.equal('All fields must be filled');
  });
});

describe('Testa requisições com o token', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Não permite a requisição sem o token', async () => {
    const { status, body } = await chai
       .request(app)
       .get('/login/role')

       expect(status).to.be.equal(401);
       expect(body.message).to.be.deep.equal('Token not found');
  });

  it('Não permite a requisição sem o token valido', async () => {
    const { status, body } = await chai
       .request(app)
       .get('/login/role')
       .set('authorization', `Bearer ${invalidToken}`)

       expect(status).to.be.equal(401);
       expect(body.message).to.be.deep.equal('Token must be a valid token');
  });

  it('Retorna os dados com um token valido', async () => {
    sinon.stub(jwtUtils, 'verify').resolves({ id: 1, ...userFromDB});
    
    sinon.stub(SequelizeUser, 'findByPk')
      .resolves(SequelizeUser.build(userFromDB));

    const { status, body } = await chai
       .request(app)
       .get('/login/role')
       .set('authorization', `Bearer ${validToken}`)
      
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ 'role': 'admin' });
  });
});