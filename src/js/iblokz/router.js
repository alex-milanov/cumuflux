"use strict";

if(typeof iblokz === "undefined"){ var iblokz = {}; }

iblokz.Router = function(){

	// url, callback, default, view, container
	this._routes = [];

	this._routeChangeListeners = [];

	var router = this;

	this.execRoute = function(urlChain, depth){
		var url = "/";
		var currentChain = urlChain.slice();
		if(depth>0){
			currentChain.splice(depth+1,urlChain.length-depth-1);
			var url = currentChain.join("/");
		}

		var currentStepPromise;

		router._routes.forEach(function(route){
			if(route.url === url){
				if(route.view && route.container){
					if(route.callback){
						currentStepPromise = function(){
							return route.callback(route.view, route.container);
						}
					} else {
						currentStepPromise = function(){
							return helpers.displayWithJade(route.container,route.view,{});
						}
					}
				} else if (route.callback){	
					currentStepPromise = function(){
						return route.callback();
					};
				}
			}
		})

		var nextStepsPromise;

		if(typeof urlChain[depth+1] !== "undefined"){
			nextStepsPromise = function(){
				return router.execRoute(urlChain,depth+1);
			}
		}
		
		if(nextStepsPromise){
			if(currentStepPromise){
				return currentStepPromise().then(nextStepsPromise);
			} 
			return nextStepsPromise();
		}

		return currentStepPromise();
	}

	this.handleHashChange = function(){
		var url = location.hash.slice(1) || '/';

		var urlChain = (url === "/") ? [url] : url.split("/");

		router._routeChangeListeners.forEach(function(listener){
			listener(url, urlChain);
		})
		
		router.execRoute(urlChain, 0);
		
	}

}

iblokz.Router.prototype.addRoute = function(route){
	this._routes.push(route);
	return this;
}

iblokz.Router.prototype.addRouteChangeListener = function(listener){
	this._routeChangeListeners.push(listener);
}

iblokz.Router.prototype.init = function(){
	
	$(window).on("hashchange",this.handleHashChange);

	// trigger default route's callback
	if(location.hash === ""){
		this._routes.forEach(function(route){
			if(route.default === true){
				route.callback();
			}
		})
	} else {
		this.handleHashChange();
	}
}