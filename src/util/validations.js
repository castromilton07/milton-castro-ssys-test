const errors = require('./errors');

const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
const dateRegex = /^([0-2][0-9]|(3)[0-1])-(((0)[0-9])|((1)[0-2]))-\d{4}$/g;

const requiredMainData = (name, email, password) => {
  if (typeof name === 'undefined' || typeof email === 'undefined'
    || typeof password === 'undefined') return true;
};

const requiredOtherData = (department, salary, birth_date) => {
  if (typeof department === 'undefined' || typeof salary === 'undefined'
    || typeof birth_date === 'undefined') return true;
};

const requiredEmployeeData = ({ name, email, password, department, salary, birth_date }) => {
  const mainDataError = requiredMainData(name, email, password);
  if (mainDataError) return true;
  const otherDataError = requiredOtherData(department, salary, birth_date);
  if (otherDataError) return true;
};

const lengthData = (name, password, department) => {
  if (name.length < 8) return '\'name\'';
  if (password.length < 6) return '\'password\'';
  if (department.length < 6) return '\'department\'';
};

const lengthDataVerification = (name, password, department) => {
  const data = lengthData(name, password, department);
  if (data === '\'name\'') {
    return `Bad Request: ${data} ${errors.lengthData.error.message} at least 8 characters long.`;
  }
  if (data === '\'password\'' || data === '\'department\'') {
    return `Bad Request: ${data} ${errors.lengthData.error.message} 6 characters long.`;
  }
};

const invalidEmail = (email) => {
  if (email.match(emailRegex) === null) return true;
};

const invalidSalary = (salary) => {
  if (salary <= 0) return true;
};

const invalidDate = (birth_date) => {
  if (birth_date.match(dateRegex) === null) return true;
};

const checkIsValidData = ({ name, email, password, department, salary, birth_date }) => {
  const employeeData = { name, email, password, department, salary, birth_date };
  const employeeError = requiredEmployeeData(employeeData);
  if (employeeError) return errors.invalidEntries;
  const lengthError = lengthDataVerification(name, password, department);
  if (lengthError) return { error: { status: 400, message: lengthError } };
  const emailError = invalidEmail(email);
  if (emailError) return errors.invalidEmail;
  const salaryError = invalidSalary(salary);
  if (salaryError) return errors.invalidSalary;
  const dateError = invalidDate(birth_date);
  if (dateError) return errors.invalidDate;
};

module.exports = { requiredEmployeeData, checkIsValidData };
