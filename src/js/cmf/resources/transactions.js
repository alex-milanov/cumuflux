"use strict"

if(typeof cmf === "undefined"){ var cmf = {}; }
if(typeof cmf.resources === "undefined"){ cmf.resources = {}; }


cmf.resources.Transactions = function(url) {
	iblokz.Resource.call(this, url);
}

cmf.resources.Transactions.prototype = Object.create( iblokz.Resource.prototype );
cmf.resources.Transactions.prototype.constructor = cmf.resources.Transactions;

cmf.resources.Transactions.prototype.query = function(queryParams){
	return iblokz.Resource.prototype.query.call(this, queryParams).then(function(result){
		
		result.list.forEach(function(item, index){
			switch(item.occuring){
				case 'monthly':
					if(item.recurrence && item.recurrence.dayOfMonth){
						item.next = moment().set('date', item.recurrence.dayOfMonth);
						if(item.next < moment())
							item.next.add(1, 'months');
					}
					break;
				case 'weekly':
					if(item.recurrence && item.recurrence.dayOfWeek){
						item.next = moment().day(item.recurrence.dayOfWeek);
						if(item.next < moment())
							item.next.add(1, 'weeks');
					}
					break;
				case 'daily':
					item.next = moment().add(1,'days');
					break;
			}
			

		})


		return result;
	})
}

cmf.resources.Transactions.prototype.preSave = function(data){

	data.recurrence = {
		startingAt: data["recurrence.startingAt"] || Date.now(),
		dayOfMonth: data["recurrence.dayOfMonth"] || 1,
		dayOfWeek: data["recurrence.dayOfWeek"] || 1,
	}

	delete(data["recurrence.startingAt"]);
	delete(data["recurrence.dayOfMonth"]);
	delete(data["recurrence.dayOfWeek"]);

	return data;
}

cmf.resources.Transactions.prototype.create = function(data){
	data = this.preSave(data);
	return iblokz.Resource.prototype.create.call(this, data);
}

cmf.resources.Transactions.prototype.update = function(id, data){
	data = this.preSave(data);
	return iblokz.Resource.prototype.update.call(this, id, data);
}

cmf.resources.Transactions.prototype.view = function(id){
	return iblokz.Resource.prototype.view.call(this, id).then(function(data){
		for(var field in data.recurrence){
			data["recurrence."+field] = data.recurrence[field];
		}
		delete(data.recurrence);

		if(data['recurrence.startingAt']){
			data['recurrence.startingAt'] = moment(data['recurrence.startingAt']).format("YYYY-MM-DD");
		}
		return data;
	})
}
