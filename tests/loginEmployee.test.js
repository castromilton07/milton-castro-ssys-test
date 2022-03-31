/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Check the POST endpoint `/login` works correctly', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('It will be validated that it is possible to login correctly', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'skywalker@ssys.com.br',
          password: 'skywalkerssys123',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.token).not.toBeNull();
      });
  });

  it('It will be validated that it is not possible to login without'
      + 'the `email` field', async () => {
    await frisby
      .post(`${url}/login`,
        {
          password: 'skywalkerssys123',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Bad Request: Invalid entries. Try again.');
      });
  });

  it('It will be validated that it is not possible to login without '
      + 'the `password` field', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'skywalker@ssys.com.br',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Bad Request: Invalid entries. Try again.');
      });
  });

  it('It will be validated that it is not possible to login with '
      + 'the `email` field blank', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: '',
          password: 'skywalkerssys123',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Bad Request: \'email\' address or \'password\' is incorrect.');
      });
  });

  it('It will be validated that it is not possible to login with '
      + 'the `password` field blank', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'skywalker@ssys.com.br',
          password: '',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Bad Request: \'email\' address or \'password\' is incorrect.');
      });
  });

  it('It will be validated that it is not possible to login with '
      + 'a user that does not exist', async () => {
    await frisby
      .post(`${url}/login`,
        {
          email: 'solo@ssys.com.br',
          password: 'solo963',
        })
      .expect('status', 400)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Bad Request: \'email\' address or \'password\' is incorrect.');
      });
  });
});
