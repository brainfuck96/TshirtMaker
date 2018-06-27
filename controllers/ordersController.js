var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var controller = {};
var models = require('../models');
var settingsController = require('../controllers/settingsController');
var productTypesController = require('../controllers/productTypesController');
var productsController = require('../controllers/productsController');
var usersController = require('../controllers/usersController');
var designsController = require('../controllers/designsController');

controller.getAll = function(callback){
    models.Order
    .findAll({
		where: {
			status: {[Op.not]: 'deleted'}
		}
	})
    .then(function(orders){
		orders.forEach(function(order){
			productsController.getById(order.productId, function(product){
				order.product = product;
			});
			usersController.getById(order.userId, function(user){
				order.user = user;
			});
		});

		setTimeout(callback, 1000, orders);

    })
};

controller.getById = function(id, callback){
    models.Order
    .findOne({
		where: {
			id: id
		}
	})
    .then(function(order){
		productsController.getById(order.productId, function(product){
			order.product = product;
		});
		usersController.getById(order.userId, function(user){
			order.user = user;
		});
		designsController.getById(order.designId, function(design){
			order.design = design;
		});
		settingsController.getSetting('tax', function(tax){
			order.tax = tax.value;
		});
		settingsController.getSetting('frontDesignPrice', function(front){
			order.frontDesignPrice = front.value;
		});
		settingsController.getSetting('backDesignPrice', function(back){
			order.backDesignPrice = back.value;
		});

		setTimeout(callback, 1000, order);
    })
};

controller.getAllByUserId = function(userId, status, callback){
    models.Order
    .findAll({
        where: {
            UserId: userId,
            status: status
        },
        order: [
            ['id', 'DESC']
        ]
    })
    .then(function(objects){
        callback(objects);
    })
};

controller.getQtyAndSize = function(order, callback){
    callback({productQty: order.qty, productSize: order.size})
}

// controller.addNew = function(comment, articleId, callback){
//     models.Comment
//     .create({
//         comment: comment,
//         ArticleId: articleId
//     })
//     .then(function(comments){
//         callback(comments);
//     })
// };

controller.delete = function(id, callback){
    models.Order
    .destroy({
        where: {id:id}
    })
    .then(function(order){
        callback(order);
    })
};

controller.update = function(id, object, callback){
    models.Order
    .update(
        object,
        { where: {id: id} }
    )
    .then(function(order){
        callback(order);
    })
};

// controller.update = function(id, comment, callback){
//     models.Comment
//     .update(
//         {
//             comment: comment
//         },
//         { where: {id: id} }
//     )
//     .then(function(comment){
//         callback(comment);
//     })
// };

module.exports = controller;
