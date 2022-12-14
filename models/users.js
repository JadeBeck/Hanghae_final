'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    id : DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    likePlace : DataTypes.STRING,
    birth : DataTypes.STRING,
    gender : DataTypes.STRING,
    likeGame : DataTypes.STRING,
    salt : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};