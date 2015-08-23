"use strict";

if(typeof cmf === "undefined"){ var cmf = {}; }
if(typeof cmf.elements === "undefined"){ cmf.elements = {}; }

cmf.elements.TransactionsCrud = function(dom, context){
	iblokz.Crud.call(this, dom, context);

	this.resource = new iblokz.Resource("/api/transactions");
}

cmf.elements.TransactionsCrud.prototype = Object.create( iblokz.Crud );
cmf.elements.TransactionsCrud.prototype.constructor = cmf.elements.TransactionsCrud;

cmf.elements.TransactionsCrud.prototype.list = function(){
	
	var crud = this;

	console.log(crud._domTbody);

	crud._domTbody.html("");

	crud._context.list.forEach(function(item){
		
		var domRow = $("<tr></tr>");
		domRow.append($("<td></td>").html(item.type));
		domRow.append($("<td></td>").html(item.title));
		domRow.append($("<td></td>").html(item.occuring));
		domRow.append($("<td></td>").html(item.amount));

		domRow.append(
			$("<td></td>").addClass("actions")
				.append($("<button></button>").text("Edit").addClass("transaction-edit").attr("data-id",item.id))
				.append($("<button></button>").text("Delete").addClass("transaction-delete").attr("data-id",item.id))
		);



		crud._domTbody.append(domRow);
	})
}

cmf.elements.TransactionsCrud.prototype.init = function(){
	iblokz.Crud.prototype.init.call(this);

	var crud = this;

	return this.resource.query().then(function(result){
		crud._context.list = result.list;
		crud.list();
	})

}
