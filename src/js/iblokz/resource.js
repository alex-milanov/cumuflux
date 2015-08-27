"use strict";

if(typeof iblokz === "undefined"){ var iblokz = {}; }

iblokz.Resource = function(url) {
  this.url = url;
}

iblokz.Resource.prototype.query = function(queryParams) {

	return Q($.ajax({
		url: this.url, // api endpoint
		method: "get",		  // method
		data: queryParams,
		dataType: "json"		// data type
	}));
}

iblokz.Resource.prototype.create = function(data) {
	return Q($.ajax({
		url: this.url, // api endpoint
		method: "post",		  // method
		data: data,
		dataType: "json"		// data type
	}));
}

// api/students/:id -> GET, PUT, DELETE

iblokz.Resource.prototype.view = function(id) {
	return Q($.get(this.url+"/"+id));
}

iblokz.Resource.prototype.update = function(id, data) {
	return Q($.ajax({
		url: this.url+"/"+id, // api endpoint
		method: "put",		  // method
		data: data,
		dataType: "json"		// data type
	}));
}

iblokz.Resource.prototype.delete = function(id) {
	return Q($.ajax({
		url: this.url+"/"+id, // api endpoint
		method: "delete",
		dataType: "json"		// data type
	}));
}