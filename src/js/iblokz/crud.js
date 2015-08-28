"use strict";

if(typeof iblokz === "undefined"){ var iblokz = {}; }

iblokz.Crud = function(dom, context){
	iblokz.Element.call(this, dom, context);

	this._domTbody = {};
	this._domForm = {};

	this._resource = new iblokz.Resource("");

	var crud = this;

	this._context.list = [];
	this._context.item = {};
	this._context.defaultItem = {};

	this._context.edit = function(_id){
		var context = crud._context;
		var resource = crud._resource;
		return resource.view(_id).then(function(item){
			context.item = item;
			for(var key in item){
				var formEl = crud._domForm.find("[name='"+key+"']");
				formEl.val(item[key]);
			}
		})
	}
	this._context.reset = function(){
		var context = crud._context;
		var resource = crud._resource;
		context.item = _.clone(context.defaultItem);
		crud._domForm.find("select, input").each(function(){
			$(this).val(context.item[this.name] || "");
		});
		
	}
	this._context.delete = function(_id){
		var context = crud._context;
		var resource = crud._resource;
		return resource.delete(_id).then(function(){
			console.log("Deleted "+_id+" successfuly!");
			crud.list();
		})
		
	}
	this._context.save = function(){
		var context = crud._context;
		var resource = crud._resource;
		
		var item = _.clone(context.item);
		context.reset();

		var _id = item._id || "";
		delete(item._id);

		// if id update
		if(_id !== ""){
			return resource.update(_id, item)
				.then(function(){
					console.log("Updated Successfuly!")
				})
		} else {
			return resource.create(item)
				.then(function(){
					console.log("Created Successfuly!")
				})
		}
	}
}

iblokz.Crud.prototype = Object.create( iblokz.Element );
iblokz.Crud.prototype.constructor = iblokz.Crud;


iblokz.Crud.prototype.list = function(){
	var crud = this;
	//console.log("crud.list")
	return this._resource.query()
		.then(function(result){
			crud._context.list = result.list;
		});
}

iblokz.Crud.prototype.init = function(){

	//console.log("crud.init");

	iblokz.Element.prototype.init.call(this);

	this._domTbody = $(this._dom).find("tbody");
	this._domForm = $(this._dom).find("form");

	var crud = this;
	var context = this._context;

	this._domForm.on("change","input, select",function(){
		context.item[this.name] = $(this).val();
	})

	this._domForm.on("submit",function(event){
		event.preventDefault();
		crud._context.save().then(function(){
			crud.list();
		});
	})

	this._context.reset();

	return this.list();

}