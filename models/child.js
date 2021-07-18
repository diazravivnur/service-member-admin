'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class child extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      child.belongsTo(models.user, {
        as  : "user",
        foreignKey : {
          name  :"user_id"
        }
      })
    }
  };
  child.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    type_user: DataTypes.STRING,
    age: DataTypes.STRING,
    dob: DataTypes.STRING,
    status_child: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'child',
  });
  return child;
};