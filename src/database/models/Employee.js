module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    department: DataTypes.STRING,
    salary: DataTypes.DECIMAL(10, 2),
    birth_date: DataTypes.DATE,
  },
  {
    timestamps: false,
    tableName: 'Employees',
  });

  return Employee;
};
