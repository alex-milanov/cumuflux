"use strict";

if(typeof cmf === "undefined"){ var cmf = {}; }
if(typeof cmf.elements === "undefined"){ cmf.elements = {}; }

cmf.elements.TransactionsCrud = function(dom, context){
	iblokz.Crud.call(this, dom, context);

	
	this._context.defaultItem = {
		type: "expense",
		occuring: "once"
	};

	var crud = this;

	var crudContextEdit = crud._context.edit;
	var crudContextReset = crud._context.reset;

	crud._context.reset = function(){
		crudContextReset();
		crud._domForm.find("[name='recurrence.startingAt']").val("")
		crud._domForm.find("[name='recurrence.dayOfWeek']").val("");
		crud._domForm.find("[name='recurrence.dayOfMonth']").val("");
		crud._domForm.find("select[name=occuring]").change();
	}

	crud._context.edit = function(_id){
		crud._context.reset();
		return crudContextEdit(_id).then(function(){
			crud._domForm.find("select[name=occuring]").change();
		})
	}

}

cmf.elements.TransactionsCrud.prototype = Object.create( iblokz.Crud.prototype );
cmf.elements.TransactionsCrud.prototype.constructor = cmf.elements.TransactionsCrud;

cmf.elements.TransactionsCrud.prototype.list = function(){
	

	var crud = this;

	return iblokz.Crud.prototype.list.call(this).then(function(){
		crud._domTbody.html("");

		crud._context.list.forEach(function(item){
			
			var domRow = $("<tr></tr>");
			domRow.append($("<td></td>").html(item.type));
			domRow.append($("<td></td>").html(item.title));
			domRow.append($("<td></td>").html(item.occuring+' ('+item.next+')'));
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

	this._resource = new cmf.resources.Transactions("/api/transactions");
	console.log(this._resource);

	var crud = this;

	return iblokz.Crud.prototype.init.call(this).then(function(){
		crud._domForm.find("[name='recurrence.startingAt'],[name='recurrence.dayOfWeek'],[name='recurrence.dayOfMonth']").hide();
		crud._domForm.on("change","select[name=occuring]",function(event){
			console.log($(this).val());
			switch($(this).val()){
				default:
					crud._domForm.find("[name='recurrence.startingAt'],[name='recurrence.dayOfWeek'],[name='recurrence.dayOfMonth']").hide();
					break;
				case "daily":
					crud._domForm.find("[name='recurrence.startingAt']").show();
					crud._domForm.find("[name='recurrence.dayOfWeek'],[name='recurrence.dayOfMonth']").hide();
					break;
				case "weekly":
					crud._domForm.find("[name='recurrence.startingAt'],[name='recurrence.dayOfWeek']").show();
					crud._domForm.find("[name='recurrence.dayOfMonth']").hide();
					break;
				case "monthly":
					crud._domForm.find("[name='recurrence.startingAt'],[name='recurrence.dayOfMonth']").show();
					crud._domForm.find("[name='recurrence.dayOfWeek']").hide();
					break;
			}
		})
	})

	

}
