const md5 = require('md5');
const { Employee } = require('../database/models');

const errors = require('../util/errors');
const validate = require('../util/validations');

const getAll = async () => {
  const employees = await Employee.findAll({ attributes: { exclude: ['password'] } });
  const ajustedEmployeeBirthDate = [];
  employees.forEach((employee) => {
    const birthDate = new Date(employee.dataValues.birth_date);
    ajustedEmployeeBirthDate.push({
        ...employee.dataValues,
        birth_date: birthDate.toLocaleDateString('pt-BR').replaceAll('/', '-'),
    });
  });
  return ajustedEmployeeBirthDate;
};

const create = async (employeeData) => {
  const employeeError = await validate.requiredEmployeeData(employeeData);
  if (employeeError) return errors.invalidEntries;
  const { email } = employeeData;
  const employee = await Employee.findOne({ where: { email } });
  if (employee) return errors.alreadyRegistered;
  const newEmployee = await Employee.create(employeeData);
  return newEmployee.dataValues;
};

const login = async ({ email, password }) => {
  const employeeError = await validate
    .requiredEmployeeData(null, email, password, null, null, null);
  if (employeeError) return errors.invalidEntries;
  const employee = await Employee.findOne({ where: { email, password: md5(password) } });
  if (!employee) return errors.invalidFields;
  return employee.dataValues;
};

module.exports = { getAll, create, login };
