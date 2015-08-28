"use strict";

if(typeof cmf === "undefined"){ var cmf = {}; }
if(typeof cmf.elements === "undefined"){ cmf.elements = {}; }

cmf.elements.Projections = function(dom, context){
	iblokz.Element.call(this, dom, context);

	
}

cmf.elements.Projections.prototype = Object.create( iblokz.Element.prototype );
cmf.elements.Projections.prototype.constructor = cmf.elements.Projections;

cmf.elements.Projections.prototype.init = function(){

	//iblokz.Element.call(this, dom, context);
	var projections = this;

	var resource = new cmf.resources.Transactions("/api/transactions");
	return resource.query().then(function(result){

		console.log(result);

		var nextWeekAmount = 0;
		var nextMonthAmount = 0;


		result.list.forEach(function(item){
			console.log(item);
			switch(item.occuring){
				case "weekly":
					if(item.next >= moment().day(1).add(1, 'weeks') && item.next <= moment().day(7).add(1, 'weeks')){
						nextWeekAmount += item.amount;
					}
					nextMonthAmount += item.amount*4;
					break;
				case "monthly":
					if(item.next) {
						if(item.next >= moment().day(1).add(1, 'weeks') && item.next <= moment().day(7).add(1, 'weeks')){
							nextWeekAmount += item.amount;
						}
						if(item.next >= moment().set('date',1).add(1, 'months') && item.next < moment().set('date',1).add(2, 'months')){
							nextMonthAmount += item.amount;
						}
					}
					break;
			}

			$(projections._dom).find(".next-week").text(nextWeekAmount);
			$(projections._dom).find(".next-month").text(nextMonthAmount);
		});
	});

};