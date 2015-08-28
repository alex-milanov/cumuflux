
$(document).ready(function() {
	
	var router = new iblokz.Router();
	

	var transactions = new cmf.elements.TransactionsCrud(".transactions-crud");

	router
		.addRoute({
			"url": "/",
			"default": true,
			"callback": function(){
				var deferred = Q.defer();
				console.log("Hello World!");
				deferred.resolve();
				return deferred.promise;
			}
		})
		.addRoute({
			"url": "/transactions",
			"callback": function(){
				return transactions.init();
			}
		})

	router.init();

});