'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class plan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      plan.belongsToMany(models.feature, {
        as : "features",
        through : {
          model : "featureplan",
          as : "conjunction"
        }
      })
    }
  };
  plan.init({
    name: DataTypes.STRING,
    amount: DataTypes.BIGINT,
    currency: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'plan',
  });
  return plan;
};