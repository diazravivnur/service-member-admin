'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      feature.belongsToMany(models.plan, {
        as : "plans",
        through : {
          model : "featureplan",
          as : "conjunction"
        }
      })
    }
  };
  feature.init({
    feature_name: DataTypes.STRING,
    configuration: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feature',
  });
  return feature;
};