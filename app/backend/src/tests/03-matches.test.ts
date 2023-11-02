import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatches from '../database/models/SequelizeMatches';

import { matchesFromDB } from './mock/matches.mock';
import { validToken } from './mock/user.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o endpoint /matches', () => {

  afterEach(() => {
    sinon.restore();
  });

  it('Retorna status 200 e lista corretamente as partidas', async () => {
    sinon
    .stub(SequelizeMatches, "findAll")
    .resolves(SequelizeMatches.bulkBuild(matchesFromDB));

    const { status, body } = await chai
       .request(app)
       .get('/matches');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(matchesFromDB);
  });

  it('Retorna status 200 e lista corretamente as partidas em progresso', async () => {
    sinon
    .stub(SequelizeMatches, "findAll")
    .resolves(SequelizeMatches.bulkBuild(matchesFromDB.filter((match) => match.inProgress === true)));

    const { status, body } = await chai
       .request(app)
       .get('/matches?inProgress=true');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal([matchesFromDB[1]]);
  });

  it('Retorna status 200 e lista corretamente as partidas finalizadas', async () => {
    sinon
    .stub(SequelizeMatches, "findAll")
    .resolves(SequelizeMatches.bulkBuild(matchesFromDB.filter((match) => match.inProgress === false)));

    const { status, body } = await chai
       .request(app)
       .get('/matches?inProgress=false');
    
    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal([matchesFromDB[0]]);
  });

  // it.only('Retorna status 200 e atualiza status da partida', async () => {
  //   sinon
  //   .stub(SequelizeMatches, "afterUpdate")
  //   .resolves(SequelizeMatches.build({
  //     id: 1,
  //     homeTeamId: 16,
  //     homeTeamGoals: 1,
  //     awayTeamId: 8,
  //     awayTeamGoals: 1,
  //     inProgress: false,
  //   }));

  //   const { status, body } = await chai
  //      .request(app)
  //      .patch('/matches/1/finish')
  //      .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJpYXQiOjE2OTc2NzQ1ODMsImV4cCI6MTY5ODI3OTM4M30.CPDiE5fs0ICaQfE4mI0B6BaOO7rgO2Sp3PJaW5WfBUY`)
  //   console.log(body);
    
  //   expect(status).to.be.equal(200);
  //   expect(body).to.be.deep.equal({ message: 'finished' });
  // });
});