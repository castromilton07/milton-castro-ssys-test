/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Verifica o endpoint DELETE `/employee/:id` funciona corretamente', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('Será validado que é possível deletar um funcionário com sucesso', async () => {
    let token;
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
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/employees/1`)
      .expect('status', 204);
  });

  it('Será validado que não é possível deletar um funcionário inexistente', async () => {
    let token;
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
        token = result.token;
      });

    await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/employees/7`)
      .expect('status', 404)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Not Found: Employee don\'t exists in database.');
      });
  });

  it('Será validado que não é possível deletar um funcionário sem o token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/employees/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Unauthorized: Token not found.');
      });
  });

  it('Será validado que não é possível deletar um funcionário com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 't0k3n1NvaliD0#.s3Mr3t0rn0d3In-f0',
            'Content-Type': 'application/json',
          },
        },
      })
      .delete(`${url}/employees/1`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Unauthorized: Expired or invalid token.');
      });
  });
});
