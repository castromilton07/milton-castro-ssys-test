const { Employee } = require('../database/models');

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

module.exports = { getAll };
