/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
/* eslint-disable sonarjs/no-duplicate-string */

const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('Verifica o endpoint POST `/employee` funciona corretamente', () => {
  beforeEach(() => {
    shell.exec('npx sequelize db:drop');
    shell.exec('npx sequelize db:create');
    shell.exec('npx sequelize db:migrate');
  });

  it('Será validado que é possível cadastrar um funcionário com sucesso', async () => {
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

  it('Será validado que não é possível cadastrar funcionário com o campo `name` menor que 8 caracteres', async () => {
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
        expect(json.message).toBe('Bad Request: \'name\' length must be at least 8 characters long.');
      });
  });

  it('Será validado que não é possível cadastrar funcionário com o campo `email` com formato incorreto', async () => {
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

  it('Será validado que o campo `email` é obrigatório', async () => {
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

  it('Será validado que não é possível cadastrar funcionário com o campo `salary` inválido', async () => {
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

  it('Será validado que não é possível cadastrar funcionário com o campo `birth_date` com formato incorreto', async () => {
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
        expect(json.message).toBe('Bad Request: \'birth_date\' must be a valid date formated like dd-mm-yyyy.');
      });
  });

  it('Será validado que não é possível cadastrar funcionário com o campo `password` menor que 6 caracteres', async () => {
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

  it('Será validado que não é possível cadastrar funcionário com o campo `department` menor que 6 caracteres', async () => {
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

  it('Será validado que o campo `password` é obrigatório', async () => {
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

  it('Validar que não é possível cadastrar um funcionário com email já existente', async () => {
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
