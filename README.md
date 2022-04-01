# Welcome to the SSYS Test Repository
### [milton-castro-ssys-test]

---
## Project context

This project consists of a technical challenge/test for a developer position at SYSS, and consists of the development of a CRUD API to manage employee information and generate reports based on the youngest and oldest employees and the average age between them, and also based on the lowest and highest salaries and the average salary. As a bonus, a docker compose must be created to raise the application in the development environment and deploy it to a VM instance (AWS, Azure, GCP, Heroku, among other possibilities).

API information must be persistent in a database, and there must be authentication for using the routes.

This technical challenge will have as evaluation criteria:
- Ability to learn with a new task;
- Quality of the source code delivered: it must be simple and easy to understand;
- The logic implemented: the source must solve the problem correctly;
- The interpretation of the task specification is part of the assessment.

The application can be developed in any programming language and the interpretation of requirements and choices of methods and tools is up to the candidate.

---
## How to install

### Prerequisites:
- [node](https://nodejs.org/en/download/)
- [npm](https://www.npmjs.com/) - Node Package Manager

1. Clone the repository (HTTPS or SSH) and enter in the project folder
- Git Clone ou Download
    - HTTPS `git clone git@github.com:castromilton07/milton-castro-ssys-test.git`
    - SSH `git clone https://github.com/castromilton07/milton-castro-ssys-test.git`.
    - [Download ZIP](https://github.com/castromilton07/milton-castro-ssys-test/archive/refs/heads/main.zip)
- `cd milton-castro-ssys-test`

2. Install dependencies
    - From the project root folder:
- `npm install`

3. Using Sequelize ORM: Create DB, Migrate, Seed/Populate Tables
- `npx sequelize db:create`
- `npx sequelize db:migrate`
- `npx sequelize db:seed:all`

4. Rename `.example.env` file to `.env` an make changes that you deem necessary in the environment variables

---
## How to use

### Prerequisites:
- Command Prompt: bash, zsh, cmd, ps
- [MySQL](https://www.mysql.com/downloads/) (have the MySQL service started)
    - Ex Linux: `/etc/init.d/mysql start`
- API Testig Tool: [insomnia](https://insomnia.rest/download), [postman](https://www.postman.com/downloads/), [thunder client](https://www.thunderclient.com/), [soupui](https://www.soapui.org/downloads/soapui/)

1. Run with node the server.js file located in the path `./src/api/server.js` from the project root folder
    - From the project root folder:
- `npm start`
- or    `node .`
- or    `node ./src/api/server.js`

2. From an API Testing Tool send a request to one of the possible routes
    - Remembering that the API is using a token authentication system (JWT), so you need to login with an employee to get the token or create a new employee

Obs.:
- The back-end (API) is configured to run on port 3001. If you want to use another port, use the `.env.example` file to switch to the desired port. After the change rename the file to `.env`

### Back-End API Routes
    - Ex: http://localhost:3001/
- CRUD (Create-Read-Update-Delete)
    -  `/login` [`POST`]  Log in with an employee
        - Send in JSON body: email and password
    -  `/employees` [`POST`]  Create a new employee
        - Send in JSON body: name, email, password, department, salary and birth_date
    -  `/employees` [`GET`]  List all employees
        - Send in JSON header: Content-Type=application/json and Authorization=RECEIVED_TOKEN
    -  `/employees/:id` [`PATCH`]  Update a specific employee by ID
        - Send in JSON body: name, email, password, department, salary and birth_date
        - Send in JSON header: Content-Type=application/json and Authorization=RECEIVED_TOKEN
    - `/employees/:id` [`DELETE`]  Delete a specific employee by ID
        - Send in JSON header: Content-Type=application/json and Authorization=RECEIVED_TOKEN
    -  `/employees/:id` [`GET`]  List a specific employee by ID
        - Send in JSON header: Content-Type=application/json and Authorization=RECEIVED_TOKEN
- Reports
    -  `/reports/employees/salary` [`GET`]  List an employee report from salary
        - Send in JSON header: Content-Type=application/json and Authorization=RECEIVED_TOKEN
    -  `/reports/employees/age` [`GET`]  List an employee report from age
        - Send in JSON header: Content-Type=application/json and Authorization=RECEIVED_TOKEN

### Outputs
  -  Request to Route Login with an Emplyee
      - In case of success, Response a valid Token
<p align="center">
  <img src="https://bit.ly/01-route-login" alt="Option 0" width="1200px">
</p>

  -  Request to Route Create Employee
      - In case of success, Response a valid Token
<p align="center">
  <img src="https://bit.ly/02-route-create" alt="Option 0" width="1200px">
</p>

  -  Request to Route Get All Employees
      - In case of success, Response an array of objects (similar JSON) of all emplyees info
<p align="center">
  <img src="https://bit.ly/03-route-getall" alt="Option 0" width="1200px">
</p>

  -  Request to Route Update Employee
      - In case of success, Response an object (similar JSON) with: id, name, email, password, department, salary and birthdate of employee
<p align="center">
  <img src="https://bit.ly/04-route-update" alt="Option 0" width="1200px">
</p>

  -  Request to Route Delete Employee
      - In case of success, Response nothing in the body and code 204
<p align="center">
  <img src="https://bit.ly/05-route-delete" alt="Option 0" width="1200px">
</p>

  -  Request to Route Get Emplyee by ID
      - In case of success, Response an object (similar JSON) with: id, name, email, department, salary and birthdate of employee
<p align="center">
  <img src="https://bit.ly/06-route-getbyid" alt="Option 0" width="1200px">
</p>

  -  Request to Route Get Report by Salary
      - In case of success, Response an object (similar JSON) with: employee wuth lowest and highest salary, and the average salary
<p align="center">
  <img src="https://bit.ly/07-route-report_salary" alt="Option 0" width="1200px">
</p>

  -  Request to Route Get Report by Age
      - In case of success, Response an object (similar JSON) with: younger and older employee, and the average age
<p align="center">
  <img src="https://bit.ly/08-route-report_age" alt="Option 0" width="1200px">
</p>

---
## Application Deployment on AWS EC2
- Back-end (API)
    -  [SSYS Employees Manager](http://3.90.61.46:3001/employees)
        - http://3.90.61.46:3001/employees
        - http://ec2-3-90-61-46.compute-1.amazonaws.com:3001/employees
<p align="center">
  <img src="https://bit.ly/18-deploy-aws_ec2" alt="Illustrative Image of Instance Hosted on AWS EC2" width="1200px">
</p>

- Docker Container composed by two images (back-end/api and db)
<p align="center">
  <img src="https://bit.ly/19-docker-container" alt="Illustrative Image of docker-compose Mounting Container" width="800px">
</p>

---
## Structure of files and directories
This repository is organized with the following directory and file structure:

```
.
├── src
│   ├── api
│   │   ├── app.js
│   │   └── server.js
│   ├── auth
│   │   └── jwt.js
│   ├── controllers
│   │   ├── EmployeesController.js
│   │   └── ReportsController.js
│   ├── database
│   │   ├── config
|   |   |   └── config.js
│   │   ├── migrations
|   |   |   └── 20220329233018-create-employees.js
│   │   ├── models
|   |   |   ├── Employee.js
|   |   |   └── index.js
│   │   ├── seeders
|   |   |   └── 20220329233452-employees.js
|   |   └── create_db.sql
│   ├── middlewares
│   |   └── error.js
│   ├── routes
│   |   └── index.js
│   ├── services
|   |   ├── EmployeesService.js
│   |   └── ReportsService.js
│   └── util
|       ├── errors.js
│       └── validations.js
├── tests
|   ├── createEmployee.test.js
|   ├── deleteEmployee.test.js
|   ├── getAllEmployees.test.js
|   ├── getByAgeRange.test.js
|   ├── getBySalaryRange.test.js
|   ├── getEmployeeById.test.js
|   ├── loginEmployee.test.js
|   └── updateEmployee.test.js
├── .dockerignore
├── .eslintignore
├── .eslintrc.json
├── .example.env
├── .gitignore
├── docker-compose.yml
├── Dockerfile
├── package-lock.json
├── package.json
└── README.md
```

---
## Tests
- To run the initial tests, you must have an API launched/running using the below command in a different terminal window/tab
    - From the project root folder:
      - `npm start` or `node .` or `node ./src/api/server.js`

### Execution
1. To run all tests at once
      -  `npm tests`
<p align="center">
  <img src="https://bit.ly/09-test-all" alt="All tests" width="600px">
</p>

2. To run a specific test

  - loginEmployee
    -  `npm run test loginEmployee.test.js`
<p align="center">
  <img src="https://bit.ly/10-test-login-2" alt="Test Login" width="800px">
</p>

  - createEmployee
    -  `npm run test createEmployee.test.js`
<p align="center">
  <img src="https://bit.ly/11-test-create-2" alt="Test Create" width="1200px">
</p>

  - getAllEmployees
    -  `npm run test getAllEmployees.test.js`
<p align="center">
  <img src="https://bit.ly/12-test-getall-2" alt="Test GetAll" width="1200px">
</p>

  - updateEmployee
    -  `npm run test updateEmployee.test.js`
<p align="center">
  <img src="https://bit.ly/13-test-update-2" alt="Test Update" width="1200px">
</p>

  - deleteEmployee
    -  `npm run test deleteEmployee.test.js`
<p align="center">
  <img src="https://bit.ly/14-test-delete-2" alt="Test Delete" width="1200px">
</p>

  - getEmployeeById
    -  `npm run test getEmployeeById.test.js`
<p align="center">
  <img src="https://bit.ly/15-test-getbyid-2" alt="Test GetById" width="1200px">
</p>

  - getBySalaryRange
    -  `npm run test getBySalaryRange.test.js`
<p align="center">
  <img src="https://bit.ly/16-test-report_salary-2" alt="Test Report Salary" width="1200px">
</p>

  - getByAgeRange
    -  `npm run test getByAgeRange.test.js`
<p align="center">
  <img src="https://bit.ly/17-test-report_age-2" alt="Test Report Age" width="1200px">
</p>

---
## Next steps
- Implement a Swagger to improve API documentation;
- Change the use of employee id to a 12 byte-sized BSON hash stored in another table column (DB), to make accessing the employee id more difficult.

---
##  <img src="https://bit.ly/handshake-gif" height="25px"/> Contact information
<p align="center"><a href="https://www.linkedin.com/in/milton-castro/"><img src="https://bit.ly/perfil_150px"/></a></p>
<p align="center">Milton Castro</p>
<p align="center">
  <a href="https://bit.ly/miltoncastro-cv-4"><img src="https://img.shields.io/badge/-Currículo-3423A6?style=flat&logo=Google-Chrome&logoColor=white"/></a>
  <a href="https://www.linkedin.com/in/milton-castro/"><img src="https://img.shields.io/badge/-milton--castro-0077B5?style=flat&logo=Linkedin&logoColor=white"/></a>
  <a href="mailto:castro.milton07@gmail.com"><img src="https://img.shields.io/badge/-castro.milton07@gmail.com-D14836?style=flat&logo=Gmail&logoColor=white"/></a>
  <a href="http://be.net/milton-castro"><img src="https://img.shields.io/badge/-milton--castro-1769FF?style=flat&logo=Behance&logoColor=white"/></a>
  <a href="https://github.com/castromilton07"><img src="https://img.shields.io/badge/-castromilton07-1A1B27?style=flat&logo=Github&logoColor=white"/></a>
  <a href="https://open.spotify.com/user/castro.milton07"><img src="https://img.shields.io/badge/-castro.milton07-1DB954?style=flat&logo=Spotify&logoColor=white"/></a>
</p>
