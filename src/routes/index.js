const express = require('express');
const jwt = require('../auth/jwt');
const EmployeesController = require('../controllers/EmployeesController');
const ReportsController = require('../controllers/ReportsController');

const router = express.Router();

const employeeRoute = '/employees/:id';

router.get('/employees', jwt.validate, EmployeesController.getAll);
router.post('/employees', EmployeesController.create);
router.post('/login', EmployeesController.login);
router.patch(employeeRoute, jwt.validate, EmployeesController.update);
router.delete(employeeRoute, jwt.validate, EmployeesController.removeById);
router.get(employeeRoute, jwt.validate, EmployeesController.getById);

router.get('/reports/employees/salary', jwt.validate, ReportsController.getBySalaryRange);
router.get('/reports/employees/age', jwt.validate, ReportsController.getByAgeRange);

module.exports = router;
