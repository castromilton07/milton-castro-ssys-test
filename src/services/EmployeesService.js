/* eslint-disable max-lines-per-function */

const md5 = require('md5');
const { Employee } = require('../database/models');

const errors = require('../util/errors');
const validate = require('../util/validations');

const getByEmail = async (email) => {
  const employee = await Employee.findOne({ where: { email } });
  return employee.dataValues.id;
};

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
  const invalidDataError = validate.checkIsValidData(employeeData);
  if (invalidDataError) return invalidDataError;
  const { email, password, birth_date } = employeeData;
  const employee = await Employee.findOne({ where: { email } });
  if (employee) return errors.alreadyRegistered;
  const formatedEmpoyeeData = {
    ...employeeData,
    password: md5(password),
    birth_date: new Date(birth_date),
  };
  const newEmployee = await Employee.create(formatedEmpoyeeData);
  return newEmployee.dataValues;
};

const login = async ({ email, password }) => {
  const employeeError = validate.requiredEmployeeData(
    { name: null, email, password, department: null, salary: null, birth_date: null },
  );
  if (employeeError) return errors.invalidEntries;
  const employee = await Employee.findOne({ where: { email, password: md5(password) } });
  if (!employee) return errors.invalidFields;
  return employee.dataValues;
};

const update = async (id, email, employeeData) => {
  let employee = await Employee.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!employee) return errors.employeeNotFound;
  const employeeId = await getByEmail(email);
  if (parseInt(id, 10) !== parseInt(employeeId, 10)) return errors.invalidAccess;
  const invalidDataError = validate.checkIsValidData(employeeData);
  if (invalidDataError) return invalidDataError;
  const { password, birth_date } = employeeData;
  const formatedEmpoyeeData = {
    ...employeeData,
    password: md5(password),
    birth_date: new Date(birth_date),
  };
  await Employee.update(formatedEmpoyeeData, { where: { id } });
  employee = await Employee.findByPk(id);
  const birthDate = new Date(employee.dataValues.birth_date);
  return {
    ...employee.dataValues,
    birth_date: birthDate.toLocaleDateString('pt-BR').replaceAll('/', '-'),
    password,
  };
};

const removeById = async (id, email) => {
  const employee = await Employee.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!employee) return errors.employeeNotFound;
  const employeeId = await getByEmail(email);
  if (parseInt(id, 10) !== parseInt(employeeId, 10)) return errors.invalidAccess;
  const deletedEmployee = await Employee.destroy({ where: { id } });
  return deletedEmployee;
};

const getById = async (id) => {
  const employee = await Employee.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!employee) return errors.employeeNotFound;
  const birthDate = new Date(employee.dataValues.birth_date);
  return {
    ...employee.dataValues,
    birth_date: birthDate.toLocaleDateString('pt-BR').replaceAll('/', '-'),
  };
};

module.exports = { getAll, create, login, update, removeById, getById };
