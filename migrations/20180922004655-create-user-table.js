module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nick_name: Sequelize.STRING,
    create_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
  }),

  down: queryInterface => queryInterface.dropTable('user'),
};
