/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Verifica o endpoint GET `/reports/employees/age` funciona corretamente', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('Será validado que é possível gerar o relatório de funcionários com base na idade corretamente', async () => {
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
      .get(`${url}/reports/employees/age`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const { younger, older, average } = result;
        expect(younger.id).toBe(1);
        expect(younger.name).toBe('Anakin Skywalker');
        expect(younger.email).toBe('skywalker@ssys.com.br');
        expect(younger.department).toBe('Architecture');
        expect(younger.salary).toBe('4000.00');
        expect(younger.birth_date).toBe('01-01-1983');
        expect(older.id).toBe(2);
        expect(older.name).toBe('Obi-Wan Kenobi');
        expect(older.email).toBe('kenobi@ssys.com.br');
        expect(older.department).toBe('Back-End');
        expect(older.salary).toBe('3000.00');
        expect(older.birth_date).toBe('01-01-1977');
        expect(average).toBe('42.00');
      });
  });

  it('Será validado que não é possível gerar o relatório de funcionários com base na idade sem o token na requisição', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/reports/employees/age`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Unauthorized: Token not found.');
      });
  });

  it('Será validado que não é possível gerar o relatório de funcionários com base na idade com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 't0k3n1NvaliD0#.s3Mr3t0rn0d3In-f0',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/reports/employees/age`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Unauthorized: Expired or invalid token.');
      });
  });
});
