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

		var nextWeek = {
			start: moment().startOf('isoweek').add(1, 'weeks'),
			end: moment().endOf('isoweek').add(1, 'weeks')
		}

		var thisMonth =  {
			start: moment().startOf("month"),
			end: moment().endOf("month")
		}

		var nextMonth =  {
			start: thisMonth.start.clone().add(1, 'month'),
			end: thisMonth.end.clone().add(1, 'month')
		}

		function getOccurenceInMonth(isoWeekday, startOfMonth, endOfMonth){
			var occurance = 0;
			var date = startOfMonth.clone();
			if(date.isoWeekday() > isoWeekday){
				date.add(1, 'weeks').isoWeekday(isoWeekday);
			} else {
				date.isoWeekday(isoWeekday);
			}
			while(date < endOfMonth){
				console.log(date.format());
				occurance++;
				date.add(1, 'weeks');
			}
			return occurance;
		}

		result.list.forEach(function(item){
			console.log(item);
			switch(item.occuring){
				case "weekly":
					if(item.occuredAt <= nextWeek.end){
						nextWeekAmount += item.amount;
					}
					thisMonthAmount += item.amount * getOccurenceInMonth(item.recurrence.dayOfWeek, thisMonth.start, thisMonth.end);
					nextMonthAmount += item.amount * getOccurenceInMonth(item.recurrence.dayOfWeek, nextMonth.start, nextMonth.end);
					break;
				case "monthly":
					if(item.next) {
						if(item.next >= nextWeek.start && item.next <= nextWeek.end){
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
						if(item.occuredAt  >= nextWeek.start && item.occuredAt <= nextWeek.end){
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