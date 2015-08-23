"use strict";

if(typeof cmf === "undefined"){ var cmf = {}; }

cmf.App = function(){


}

cmf.App.prototype.init = function(){
	console.log("Hello World");

	this.transactions = new cmf.elements.TransactionsCrud(".transactions-crud");

	this.transactions.init();

}