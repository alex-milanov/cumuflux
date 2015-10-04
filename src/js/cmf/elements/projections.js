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

		var nextWeekAmount = 0;
		var thisMonthAmount = 0;
		var nextMonthAmount = 0;

		var nextWeekStart = moment().startOf('isoweek').add(1, 'weeks');
		var nextWeekEnd = moment().endOf('isoweek').add(1, 'weeks');

		var thisMonth =  {
			start: moment().startOf("month"),
			end: moment().endOf("month")
		}

		var nextMonth =  {
			start: thisMonth.start.clone().add(1, 'month'),
			end: thisMonth.end.clone().add(1, 'month')
		}

		result.list.forEach(function(item){
			switch(item.occuring){
				case "weekly":
					if(item.next >= nextWeekStart && item.next <= nextWeekEnd){
						nextWeekAmount += item.amount;
					}
					thisMonthAmount += item.amount*4;
					nextMonthAmount += item.amount*4;
					break;
				case "monthly":
					if(item.next) {
						if(item.next >= nextWeekStart && item.next <= nextWeekEnd){
							nextWeekAmount += item.amount;
						}
						if(item.occuredAt <= thisMonth.end){
							thisMonthAmount += item.amount;
						}
						if(item.occuredAt <= nextMonth.end){
							nextMonthAmount += item.amount;
						}
					}
					break;
				case "once":
					if(item.occuredAt) {
						if(item.occuredAt  >= nextWeekStart && item.occuredAt <= nextWeekEnd){
							nextWeekAmount += item.amount;
						}
						if(item.occuredAt >= thisMonth.start && item.occuredAt < thisMonth.end){
							thisMonthAmount += item.amount;
						}
						if(item.occuredAt >= nextMonth.start && item.occuredAt < nextMonth.end){
							nextMonthAmount += item.amount;
						}
					}
					break;
			}

			$(projections._dom).find(".next-week").text(nextWeekAmount);
			$(projections._dom).find(".this-month").text(thisMonthAmount);
			$(projections._dom).find(".next-month").text(nextMonthAmount);
		});
	});

};