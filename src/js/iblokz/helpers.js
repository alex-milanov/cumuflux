"use strict";

if(typeof iblokz === "undefined"){ var iblokz = {}; }

iblokz.helpers = function(){

	var displayWithJade = function(container, fileName, data){

		// if passed string create a jquery object
		if(typeof container === "string"){
			container = $(container);
		}

		if(typeof data === "undefined"){
			data = {};
		}

		// get the file with jquery
		return Q($.get(fileName)).then(function(jadeCode){

			// render jade to html	
			var renderedHtml = jade.render(jadeCode, data);

			// append the html to the container
			container.html(renderedHtml);
		})

	}

	var getDataFromForm = function(form){

		var formArray = form.serializeArray();

		var data = {};

		formArray.forEach(function(field){
			data[field.name] = field.value;
		})
		return data;
	}

	return {
		displayWithJade: displayWithJade,
		getDataFromForm: getDataFromForm
	}

}()