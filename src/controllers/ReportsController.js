const ReportsService = require('../services/ReportsService');

const getBySalaryRange = async (_req, res) => {
  const employees = await ReportsService.getBySalaryRange();
  res.status(200).json(employees);
};

const getByAgeRange = async (_req, res) => {
  const employees = await ReportsService.getByAgeRange();
  res.status(200).json(employees);
};

module.exports = { getBySalaryRange, getByAgeRange };
