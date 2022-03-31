/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Verifica o endpoint POST `/login` funciona corretamente', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('Será validado que é possível fazer login corretamente', async () => {
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

  it('Será validado que não é possível fazer login sem o campo `email`', async () => {
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

  it('Será validado que não é possível fazer login sem o campo `password`', async () => {
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

  it('Será validado que não é possível fazer login com o campo `email` em branco', async () => {
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

  it('Será validado que não é possível fazer login com o campo `password` em branco', async () => {
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

  it('Será validado que não é possível fazer login com um usuário que não existe', async () => {
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
