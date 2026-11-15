'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student.init({
     id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull:false
      },
  
      email: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
      },
      phone: {
        type: DataTypes.STRING,
        allowNull:false,
        unique: true
      },
      department: {
        type: DataTypes.STRING,
        allowNull:false
      },
      profileImage: {
        type: DataTypes.STRING,
        allowNull:true
      },
      galleryImages: {
        type: DataTypes.JSON,
        allowNull:true
      },
      passportImage: {
        type: DataTypes.STRING,
        allowNull:true
      },
         identityCardImage: {
        type: DataTypes.STRING,
        allowNull:true
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    
  }, {
    sequelize,
    modelName: 'student',
  });
  return student;
};

