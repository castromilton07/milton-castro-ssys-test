const { Sequelize, QueryTypes } = require('sequelize');
const configSequelize = require('../database/config/config').test;

const sequelize = new Sequelize(configSequelize);

const queryLowest = 'SELECT * FROM `Employees` ORDER BY salary ASC LIMIT 1';
const queryHighest = 'SELECT * FROM `Employees` ORDER BY salary DESC LIMIT 1';

const getBySalaryRange = async () => {
  const employeeLowest = await sequelize.query(queryLowest, { type: QueryTypes.SELECT });
  const employeeHighest = await sequelize.query(queryHighest, { type: QueryTypes.SELECT });
  delete employeeLowest[0].password;
  delete employeeHighest[0].password;
  const lowestSalary = parseFloat(employeeLowest[0].salary);
  const highestSalary = parseFloat(employeeHighest[0].salary);
  const averageSalary = ((lowestSalary + highestSalary) / 2).toFixed(2);
  let lowestBirthDate = new Date(employeeLowest[0].birth_date);
  let highestBirthDate = new Date(employeeHighest[0].birth_date);
  lowestBirthDate = lowestBirthDate.toLocaleDateString('pt-BR').replaceAll('/', '-');
  highestBirthDate = highestBirthDate.toLocaleDateString('pt-BR').replaceAll('/', '-');
  return {
    lowest: { ...employeeLowest[0], birth_date: lowestBirthDate },
    highest: { ...employeeHighest[0], birth_date: highestBirthDate },
    average: averageSalary,
  };
};

module.exports = { getBySalaryRange };
