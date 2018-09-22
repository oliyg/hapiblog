const timestamp = new Date();

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('user', [{
    id: 1,
    nick_name: 'oliver',
    create_at: timestamp,
    updated_at: timestamp,
  }, {
    id: 2,
    nick_name: 'troy',
    create_at: timestamp,
    updated_at: timestamp,
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('user', {
    id: { [Sequelize.Op.in]: [1, 2] },
  }, {}),
};
