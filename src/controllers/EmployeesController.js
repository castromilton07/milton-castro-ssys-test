const EmployeesService = require('../services/EmployeesService');

const getAll = async (_req, res) => {
  const employees = await EmployeesService.getAll();
  res.status(200).json(employees);
};

module.exports = { getAll };
