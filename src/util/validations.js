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

module.exports = { requiredEmployeeData };
