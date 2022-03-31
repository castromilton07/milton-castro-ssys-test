/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Check PATCH endpoint `/employee/:id` works correctly', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
    shell.exec('npx sequelize db:seed:all');
  });

  it('It will be validated that it is possible to edit an employee successfully', async () => {
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
      .patch(`${url}/employees/1`, {
        name: 'Anakin Skywalker',
        email: 'skywalker@ssys.com.br',
        password: 'skywalkerssys123',
        department: 'Architecture',
        salary: 6000.00,
        birth_date: '01-01-1983',
      })
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.id).toBe(1);
        expect(json.name).toBe('Anakin Skywalker');
        expect(json.email).toBe('skywalker@ssys.com.br');
        expect(json.password).toBe('skywalkerssys123');
        expect(json.department).toBe('Architecture');
        expect(json.salary).toBe('6000.00');
        expect(json.birth_date).toBe('01-01-1983');
      });
  });

  it('It will be validated that it is not possible to edit an employee with another '
      + 'employee', async () => {
    let token;
    await frisby
      .post(`${url}/login`,
        {
          email: 'kenobi@ssys.com.br',
          password: 'kenobissys456',
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
      .patch(`${url}/employees/1`, {
        name: 'Obi-Wan Kenobi',
        email: 'kenobi@ssys.com.br',
        password: 'skywalkerssys123',
        department: 'Sr. Back-End',
        salary: 4000.00,
        birth_date: '01-01-1977',
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message)
          .toBe('Unauthorized: this employee dont\'t have previliege to perform this action.');
      });
  });

  it('It will be validated that it is not possible to edit an employee without '
      + 'a token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: '',
            'Content-Type': 'application/json',
          },
        },
      })
      .patch(`${url}/employees/1`, {
        name: 'Anakin Skywalker',
        email: 'skywalker@ssys.com.br',
        password: 'skywalkerssys123',
        department: 'Architecture',
        salary: 6000.00,
        birth_date: '01-01-1983',
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Unauthorized: Token not found.');
      });
  });

  it('It will be validated that it is not possible to edit an employee with '
      + 'an invalid token', async () => {
    await frisby
      .setup({
        request: {
          headers: {
            Authorization: 't0k3n1NvaliD0#.s3Mr3t0rn0d3In-f0',
            'Content-Type': 'application/json',
          },
        },
      })
      .patch(`${url}/employees/1`, {
        name: 'Anakin Skywalker',
        email: 'skywalker@ssys.com.br',
        password: 'skywalkerssys123',
        salary: 6000.00,
        birth_date: '01-01-1983',
      })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Unauthorized: Expired or invalid token.');
      });
  });

  it('It will be validated that it is not possible to edit an employee without '
      + 'any of the fields', async () => {
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
      .patch(`${url}/employees/1`, {
        name: 'Anakin Skywalker',
        email: 'skywalker@ssys.com.br',
        password: 'skywalkerssys123',
        salary: 6000.00,
        birth_date: '01-01-1983',
      })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Bad Request: Invalid entries. Try again.');
      });
  });
});
