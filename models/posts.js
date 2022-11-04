'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Posts.init({
    postId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    userId: {type: DataTypes.INTEGER, allowNull: false,},
    nickname: {type: DataTypes.STRING, allowNull: false,},
    title: {type: DataTypes.STRING, allowNull: false,},
    content: {type: DataTypes.STRING, allowNull: false,},
    location: {type: DataTypes.STRING, allowNull: false,},
    cafe: {type: DataTypes.STRING, allowNull: false,},
    date: {type: DataTypes.STRING, allowNull: false,},
    time: {type: DataTypes.STRING, allowNull: false,},
    map: {type: DataTypes.STRING, allowNull: false,},
    partyMember: {type: DataTypes.INTEGER, allowNull: false,}
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};