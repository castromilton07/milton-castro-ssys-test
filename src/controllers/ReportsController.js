const ReportsService = require('../services/ReportsService');

const getBySalaryRange = async (_req, res) => {
  const employees = await ReportsService.getBySalaryRange();
  res.status(200).json(employees);
};

module.exports = { getBySalaryRange };
