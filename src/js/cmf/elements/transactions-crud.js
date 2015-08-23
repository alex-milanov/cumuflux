"use strict";

if(typeof cmf === "undefined"){ var cmf = {}; }
if(typeof cmf.elements === "undefined"){ cmf.elements = {}; }

cmf.elements.TransactionsCrud = function(dom, context){
	iblokz.Crud.call(this, dom, context);

	
	this._context.defaultItem = {
		type: "expense",
		occuring: "once"
	};
}

cmf.elements.TransactionsCrud.prototype = Object.create( iblokz.Crud );
cmf.elements.TransactionsCrud.prototype.constructor = cmf.elements.TransactionsCrud;

cmf.elements.TransactionsCrud.prototype.list = function(){
	

	var crud = this;

	return iblokz.Crud.prototype.list.call(this).then(function(){
		crud._domTbody.html("");

		crud._context.list.forEach(function(item){
			
			var domRow = $("<tr></tr>");
			domRow.append($("<td></td>").html(item.type));
			domRow.append($("<td></td>").html(item.title));
			domRow.append($("<td></td>").html(item.occuring));
			domRow.append($("<td></td>").html(item.amount));

			domRow.append(
				$("<td></td>").addClass("actions")
					.append($("<button></button>").text("Edit")
						.addClass("crud-edit-trigger")
						.attr("type","button")
						.attr("data-trigger-id",item._id)
						.attr("data-trigger-method","edit")
					)
					.append($("<button></button>").text("Delete")
						.addClass("crud-delete-trigger")
						.attr("type","button")
						.attr("data-trigger-id",item._id)
						.attr("data-trigger-method","delete")
					)
			);

			crud._domTbody.append(domRow);
		})
	})
}

cmf.elements.TransactionsCrud.prototype.init = function(){

	this._resource = new iblokz.Resource("/api/transactions");

	return iblokz.Crud.prototype.init.call(this);

}
