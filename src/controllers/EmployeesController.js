const md5 = require('md5');
const EmployeesService = require('../services/EmployeesService');
const jwt = require('../auth/jwt');

const getAll = async (_req, res) => {
  const employees = await EmployeesService.getAll();
  res.status(200).json(employees);
};

const create = async (req, res, next) => {
  const { email, password } = req.body;
  const employee = await EmployeesService.create({ ...req.body, password: md5(password) });
  if (employee.error) return next(employee.error);
  const token = await jwt.generate({ email, password });
  console.log(token);
  res.status(201).json({ token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const employee = await EmployeesService.login({ email, password });
  if (employee.error) return next(employee.error);
  const token = await jwt.generate({ email, password });
  res.status(200).json({ token });
};

const update = async (req, res, next) => {
  const { id } = req.params;
  const { password, birth_date } = req.body;
  const employee = await EmployeesService
    .update(id, { ...req.body, birth_date: new Date(birth_date), password: md5(password) });
  if (employee.error) return next(employee.error);
  res.status(200).json(employee);
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const employee = await EmployeesService.removeById(id);
  if (employee.error) return next(employee.error);
  res.status(204).json();
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const employee = await EmployeesService.getById(id);
  if (employee.error) return next(employee.error);
  res.status(200).json(employee);
};

module.exports = { getAll, create, login, update, removeById, getById };
