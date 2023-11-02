import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeTeam from '../database/models/SequelizeTeam';

import { getAllTeamsFromDB, getOneTeam } from './mock/teams.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /teams', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Retorna status 200 e lista correta de times', async () => {
    sinon
    .stub(SequelizeTeam, "findAll")
    .resolves(SequelizeTeam.bulkBuild(getAllTeamsFromDB));

    const { status, body } = await chai
       .request(app)
       .get('/teams');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getAllTeamsFromDB);
  });

  it('Retorna status 200 na busca por um time', async () => {
    sinon
    .stub(SequelizeTeam, "findByPk")
    .resolves(SequelizeTeam.build(getOneTeam));

    const { status, body } = await chai
       .request(app)
       .get('/teams/1');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getOneTeam);
  });
});