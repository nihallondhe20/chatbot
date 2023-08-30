'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Conversations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chid: {
        type: Sequelize.INTEGER
      },
      desc: {
        type: Sequelize.STRING
      },
      t1: {
        type: Sequelize.STRING
      },
      t2: {
        type: Sequelize.STRING
      },
      t3: {
        type: Sequelize.STRING
      },
      t4: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Conversations');
  }
};