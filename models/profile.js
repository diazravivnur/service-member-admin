'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      profile.belongsTo(models.user, {
        as : "user",
        foreignKey :{
          name : "user_id"
        }
      })
    }
  };
  profile.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    photo: DataTypes.STRING,
    type_user: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};