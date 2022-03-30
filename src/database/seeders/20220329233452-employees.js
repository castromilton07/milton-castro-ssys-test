module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('Employees',
    [
      {
        id: 1,
        name: 'Anakin Skywalker',
        email: 'skywalker@ssys.com.br',
        password: '2dfe886b7515ff7795c7879b844ee899', //skywalkerssys123
        department: 'Architecture',
        salary: 4000.00,
        birth_date: new Date('01-01-1983'),
      },
      {
        id: 2,
        name: 'Obi-Wan Kenobi',
        email: 'kenobi@ssys.com.br',
        password: 'bd39f3a44be2614a3f29c3cde63d1e16', //kenobissys456
        department: 'Back-End',
        salary: 3000.00,
        birth_date: new Date('01-01-1977'),
      },
      {
        id: 3,
        name: 'Leia Organa',
        email: 'organa@ssys.com.br',
        password: 'a2adfc6bd34666b617dd484c8f6a4708', //organassys789
        department: 'DevOps',
        salary: 5000.00,
        birth_date: new Date('01-01-1980'),
      },
    ]
  )},

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};