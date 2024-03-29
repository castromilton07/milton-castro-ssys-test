/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Check endpoint GET `/reports/employees/salary` works correctly', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('It will be validated that it is possible to generate the employee report based '
      + 'on salary correctly', async () => {
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
      .get(`${url}/reports/employees/salary`)
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        const { lowest, highest, average } = result;
        expect(lowest.id).toBe(2);
        expect(lowest.name).toBe('Obi-Wan Kenobi');
        expect(lowest.email).toBe('kenobi@ssys.com.br');
        expect(lowest.department).toBe('Back-End');
        expect(lowest.salary).toBe('3000.00');
        expect(lowest.birth_date).toBe('01-01-1977');
        expect(highest.id).toBe(3);
        expect(highest.name).toBe('Leia Organa');
        expect(highest.email).toBe('organa@ssys.com.br');
        expect(highest.department).toBe('DevOps');
        expect(highest.salary).toBe('5000.00');
        expect(highest.birth_date).toBe('01-01-1980');
        expect(average).toBe('4000.00');
      });
  });

  it('It will be validated that it is not possible to generate the employee report based '
      + 'on salary without the token in the request', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/reports/employees/salary`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Unauthorized: Token not found.');
      });
  });

  it('It will be validated that it is not possible to generate employee report based '
      + 'on salary with invalid token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 't0k3n1NvaliD0#.s3Mr3t0rn0d3In-f0',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/reports/employees/salary`)
      .expect('status', 401)
      .then((responseSales) => {
        const { json } = responseSales;
        expect(json.message).toBe('Unauthorized: Expired or invalid token.');
      });
  });
});
