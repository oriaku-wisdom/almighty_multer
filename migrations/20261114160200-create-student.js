'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull:false
      },
  
      email: {
        type: Sequelize.STRING,
        allowNull:false,
       unique: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull:false
      },
      department: {
        type: Sequelize.STRING,
        allowNull:false
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull:true
      },
      galleryImages: {
        type: Sequelize.JSON,
        allowNull:true
      },
      passportImage: {
        type: Sequelize.STRING,
        allowNull:true
      },
         identityCardImage: {
        type: Sequelize.STRING,
        allowNull:true
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
    await queryInterface.dropTable('students');
  }
};