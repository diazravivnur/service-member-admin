'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.profile, {
        as : "profile",
        foreignKey : {
          name : "user_id"
        }
      });
      user.hasMany(models.child, {
        as : "children",
        foreignKey : {
          name : "user_id"
        }
      })
    }
  };
  user.init({
    email: DataTypes.STRING,
    code_country: DataTypes.STRING,
    country: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING,
    status_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};