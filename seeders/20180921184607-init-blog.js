const timestamps = new Date();

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('blog', [{
    id: 1, title: 'blog title 1', author: 'oliver', tag: 'tag1;tag2;tag3', count: 34, created_at: timestamps, updated_at: timestamps,
  }, {
    id: 2, title: 'blog title 2', author: 'troy', tag: 'tag1;tag2', count: 20, created_at: timestamps, updated_at: timestamps,
  }, {
    id: 3, title: 'blog title 3', author: 'oli', tag: 'tag1', count: 14, created_at: timestamps, updated_at: timestamps,
  }]),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('blog', {
    id: { [Sequelize.Op.in]: [1, 2, 3] },
  }, {}),
};
