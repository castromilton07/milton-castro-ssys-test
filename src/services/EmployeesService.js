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

const update = async (id, employeeData) => {
  const employee = await Employee.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!employee) return errors.employeeNotFound;
  const employeeError = await validate.requiredEmployeeData(employeeData);
  if (employeeError) return errors.invalidEntries;
  await Employee.update(employeeData, { where: { id } });
  return Employee.findByPk(id);
};

const removeById = async (id) => {
  const employee = await Employee.findByPk(id, { attributes: { exclude: ['password'] } });
  if (!employee) return errors.employeeNotFound;
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
