const errors = {
  alreadyRegistered: {
    error: {
      status: 409,
      message: 'Conflict: Employee already exists in database.',
    },
  },
  lengthData: {
    error: {
      status: 400,
      message: 'length must be',
    },
  },
  invalidEmail: {
    error: {
      status: 400,
      message: 'Bad Request: \'email\' must be a valid email',
    },
  },
  invalidSalary: {
    error: {
      status: 400,
      message: 'Bad Request: \'salary\' must be gratter than 0',
    },
  },
  invalidDate: {
    error: {
      status: 400,
      message: 'Bad Request: \'birth_date\' must be a valid date formated like dd/mm/yyyy',
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
      message: 'Bad Request: \'email\' address or "password" is incorrect.',
    },
  },
  missingToken: {
    error: {
      status: 401,
      message: 'Unauthorized: Token not found.',
    },
  },
  invalidToken: {
    error: {
      status: 401,
      message: 'Unauthorized: Expired or invalid token.',
    },
  },
  employeeNotFound: {
    error: {
      status: 404,
      message: 'Not Found: Employee don\'t exists in database.',
    },
  },
};

module.exports = errors;
