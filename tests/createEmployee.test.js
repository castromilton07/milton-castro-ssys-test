/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Check POST endpoint `/employee` works correctly', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
  });

  it('It will be validated that it is possible to register an employee successfully', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          password: 'solo963',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.token).not.toBeNull();
      });
  });

  it('It will be validated that it is not possible to register an employee with '
      + 'the `name` field less than 8 characters', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Sol',
          email: 'solo@ssys.com.br',
          password: 'solo963',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message)
          .toBe('Bad Request: \'name\' length must be at least 8 characters long.');
      });
  });

  it('It will be validated that it is not possible to register an employee with '
      + 'the `email` field with incorrect format', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys',
          password: 'solo963',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Bad Request: \'email\' must be a valid email.');
      });
  });

  it('It will be validated that the `email` field is mandatory', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          password: 'solo963',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Bad Request: Invalid entries. Try again.');
      });
  });

  it('It will be validated that it is not possible to register an employee '
      + 'with an invalid `salary` field', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          password: 'solo963',
          department: 'Front-End',
          salary: -1500.69,
          birth_date: '02/02/1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Bad Request: \'salary\' must be greater than 0.');
      });
  });

  it('It will be validated that it is not possible to register an employee '
      + 'with the `birth_date` field with incorrect format', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          password: 'solo963',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '35/20/1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message)
          .toBe('Bad Request: \'birth_date\' must be a valid date formated like dd-mm-yyyy.');
      });
  });

  it('It will be validated that it is not possible to register an employee with '
      + 'the `password` field shorter than 6 characters', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          password: 'solo9',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Bad Request: \'password\' length must be 6 characters long.');
      });
  });

  it('It will be validated that it is not possible to register an employee with '
      + 'the `department` field less than 6 characters', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          password: 'solo963',
          department: 'Front',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Bad Request: \'department\' length must be 6 characters long.');
      });
  });

  it('It will be validated that the `password` field is mandatory', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Bad Request: Invalid entries. Try again.');
      });
  });

  it('Validate that it is not possible to register an employee with an '
      + 'existing email', async () => {
    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          password: 'solo963',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/employees`,
        {
          name: 'Han Solo',
          email: 'solo@ssys.com.br',
          password: 'solo963',
          department: 'Front-End',
          salary: 7000.00,
          birth_date: '02-02-1965',
        })
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Conflict: Employee already exists in database.');
      });
  });
});
