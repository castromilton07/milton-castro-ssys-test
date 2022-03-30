const { Sequelize, QueryTypes } = require('sequelize');
const configSequelize = require('../database/config/config').test;

const sequelize = new Sequelize(configSequelize);

const queryLowest = 'SELECT * FROM `Employees` ORDER BY salary ASC LIMIT 1';
const queryHighest = 'SELECT * FROM `Employees` ORDER BY salary DESC LIMIT 1';
const queryYounger = 'SELECT * FROM `Employees` ORDER BY birth_date DESC LIMIT 1';
const queryOlder = 'SELECT * FROM `Employees` ORDER BY birth_date ASC LIMIT 1';

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

const getByAgeRange = async () => {
  const employeeYounger = await sequelize.query(queryYounger, { type: QueryTypes.SELECT });
  const employeeOlder = await sequelize.query(queryOlder, { type: QueryTypes.SELECT });
  delete employeeYounger[0].password;
  delete employeeOlder[0].password;
  let youngerBirthDate = new Date(employeeYounger[0].birth_date);
  let olderBirthDate = new Date(employeeOlder[0].birth_date);
  const diffTimeYounger = Math.abs(Date.now() - youngerBirthDate);
  const youngerAge = Math.floor((diffTimeYounger / (1000 * 60 * 60 * 24)) / 365);
  const diffTimeOlder = Math.abs(Date.now() - olderBirthDate);
  const olderAge = Math.floor((diffTimeOlder / (1000 * 60 * 60 * 24)) / 365);
  const averageAge = ((youngerAge + olderAge) / 2).toFixed(2);
  youngerBirthDate = youngerBirthDate.toLocaleDateString('pt-BR').replaceAll('/', '-');
  olderBirthDate = olderBirthDate.toLocaleDateString('pt-BR').replaceAll('/', '-');
  return {
    younger: { ...employeeYounger[0], birth_date: youngerBirthDate },
    older: { ...employeeOlder[0], birth_date: olderBirthDate },
    average: averageAge,
  };
};

module.exports = { getBySalaryRange, getByAgeRange };
