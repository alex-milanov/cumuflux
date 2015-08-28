
$(document).ready(function() {
	
	var router = new iblokz.Router();
	


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
				var transactions = new cmf.elements.TransactionsCrud(".transactions-crud");
				return transactions.init();
			}
		})
		.addRoute({
			"url": "/projections",
			"view": "views/projections.jade",
			"container": "section.content",
			"callback": function(){
				var projections = new cmf.elements.Projections(".projections");
				return projections.init();
			}
		})

	router.init();

});