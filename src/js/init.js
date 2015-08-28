
$(document).ready(function() {
	
	var router = new iblokz.Router();
	

	var transactions = new cmf.elements.TransactionsCrud(".transactions-crud");

	router
		.addRoute({
			"url": "/",
			"default": true,
			"view": "views/home.jade",
			"container": "section.content",
		})
		.addRoute({
			"url": "/transactions",
			"view": "views/transactions.jade",
			"container": "section.content",
			"callback": function(){
				return transactions.init();
			}
		})
		.addRoute({
			"url": "/projections",
			"view": "views/projections.jade",
			"container": "section.content",
		})

	router.init();

});