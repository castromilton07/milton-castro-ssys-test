/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Verifica o endpoint GET `/employees/:id` funciona corretamente', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('Será validado que é possível listar um funcionário específico com sucesso', async () => {
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
      .get(`${url}/employees/1`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.id).toBe(1);
        expect(result.name).toBe('Anakin Skywalker');
        expect(result.email).toBe('skywalker@ssys.com.br');
        expect(result.department).toBe('Architecture');
        expect(result.salary).toBe('4000.00');
        expect(result.birth_date).toBe('01-01-1983');
      });
  });

  it('Será validado que não é possível listar um funcionário inexistente', async () => {
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
      .get(`${url}/employees/7`)
      .expect('status', 404)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Not Found: Employee don\'t exists in database.');
      });
  });

  it('Será validado que não é possível listar um determinado funcionário sem o token na requisição', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/employees/1`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Unauthorized: Token not found.');
      });
  });

  it('Será validado que não é possível listar um determinado funcionário com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 't0k3n1NvaliD0#.s3Mr3t0rn0d3In-f0',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/employees/1`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Unauthorized: Expired or invalid token.');
      });
  });
});
