const express = require('express');
const jwt = require('../auth/jwt');
const EmployeesController = require('../controllers/EmployeesController');

const router = express.Router();

// const employeeRoute = '/employees/:id';

router.get('/employees', jwt.validate, EmployeesController.getAll);
// router.post('/employees');
// router.post('/login');
// router.patch(employeeRoute);
// router.delete(employeeRoute);
// router.get(employeeRoute);

// router.get('/reports/employees/salary');
// router.get('/reports/employees/age');

module.exports = router;
