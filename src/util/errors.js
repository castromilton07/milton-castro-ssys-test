const errors = {
  alreadyRegistered: {
    error: {
      status: 409,
      message: 'Conflict: Employee already exists in database.',
    },
  },
  invalidEntries: {
    error: {
      status: 400,
      message: 'Bad Request: Invalid entries. Try again.',
    },
  },
  invalidFields: {
    error: {
      status: 400,
      message: 'Bad Request: Invalid fields',
    },
  },
  missingToken: {
    error: {
      status: 401,
      message: 'Unauthorized: Token not found',
    },
  },
  invalidToken: {
    error: {
      status: 401,
      message: 'Unauthorized: Expired or invalid token',
    },
  },
  employeeNotFound: {
    error: {
      status: 404,
      message: 'Not Found: Employee don\'t exists in database',
    },
  },
};

module.exports = errors;
