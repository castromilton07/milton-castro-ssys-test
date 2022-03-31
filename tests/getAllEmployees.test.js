/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Verifica o endpoint GET `/employees` funciona corretamente', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('Será validado que é possível listar todos os usuários', async () => {
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
      .get(`${url}/employees`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        const firstEmployee = json[0];
        const secondEmployee = json[1];
        const thirdEmployee = json[2];
        expect(firstEmployee.name).toBe('Anakin Skywalker');
        expect(firstEmployee.email).toBe('skywalker@ssys.com.br');
        expect(firstEmployee.department).toBe('Architecture');
        expect(firstEmployee.salary).toBe('4000.00');
        expect(firstEmployee.birth_date).toBe('01-01-1983');
        expect(secondEmployee.name).toBe('Obi-Wan Kenobi');
        expect(secondEmployee.email).toBe('kenobi@ssys.com.br');
        expect(secondEmployee.department).toBe('Back-End');
        expect(secondEmployee.salary).toBe('3000.00');
        expect(secondEmployee.birth_date).toBe('01-01-1977');
        expect(thirdEmployee.name).toBe('Leia Organa');
        expect(thirdEmployee.email).toBe('organa@ssys.com.br');
        expect(thirdEmployee.department).toBe('DevOps');
        expect(thirdEmployee.salary).toBe('5000.00');
        expect(thirdEmployee.birth_date).toBe('01-01-1980');
      });
  });

  it('Será validado que não é possível listar usuários sem o token na requisição', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/employees`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Unauthorized: Token not found.');
      });
  });

  it('Será validado que não é possível listar usuários com o token inválido', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 't0k3n1NvaliD0#.s3Mr3t0rn0d3In-f0',
            'Content-Type': 'application/json',
          },
        },
      })
      .get(`${url}/employees`)
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Unauthorized: Expired or invalid token.');
      });
  });
});
