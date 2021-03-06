'use strict';
module.exports = (sequelize, DataTypes) => {
  var Product_type = sequelize.define('Product_type', {
    name: { type: DataTypes.STRING, allowNull: false },
	gender: { type: DataTypes.STRING, allowNull: false, defaultValue: 'male' },
	templateFront: { type: DataTypes.STRING, allowNull: false},
	templateBack: { type: DataTypes.STRING, allowNull: false},
	basicPrice: { type: DataTypes.FLOAT(11, 2), allowNull: false }
  }, {
	   timestamps: false
  });

  Product_type.associate = function(models) {
    // associations can be defined here
    // Product_type.hasMany(models.Product);

  };
  return Product_type;
};
