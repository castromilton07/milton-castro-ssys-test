const express = require('express');
const jwt = require('../auth/jwt');
const EmployeesController = require('../controllers/EmployeesController');

const router = express.Router();

const employeeRoute = '/employees/:id';

router.get('/employees', jwt.validate, EmployeesController.getAll);
router.post('/employees', EmployeesController.create);
router.post('/login', EmployeesController.login);
router.patch(employeeRoute, jwt.validate, EmployeesController.update);
// router.delete(employeeRoute);
// router.get(employeeRoute);

// router.get('/reports/employees/salary');
// router.get('/reports/employees/age');

module.exports = router;
