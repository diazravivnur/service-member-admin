'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class featureplan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  featureplan.init({
    planId: DataTypes.INTEGER,
    featureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'featureplan',
  });
  return featureplan;
};