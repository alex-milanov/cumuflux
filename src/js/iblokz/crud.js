"use strict";

if(typeof iblokz === "undefined"){ var iblokz = {}; }

iblokz.Crud = function(dom, context){
	iblokz.Element.call(this, dom, context);

	this._domTbody = {};
	this._domForm = {};
}

iblokz.Crud.prototype = Object.create( iblokz.Element );
iblokz.Crud.prototype.constructor = iblokz.Crud;


iblokz.Crud.prototype.list = function(){

}

iblokz.Crud.prototype.init = function(){

	this._domTbody = $(this._dom).find("tbody");
	this._domForm = $(this._dom).find("form");

}