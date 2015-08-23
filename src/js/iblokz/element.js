"use strict";

if(typeof iblokz === "undefined"){ var iblokz = {}; }

iblokz.Element = function(dom, context){

	this._dom = dom;
	this._context = (typeof context === 'undefined') ? {} : context;

};