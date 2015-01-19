/**
 * main.js is the starting point for the app.
 * 
 */

// Declare the global houseTally object
// and set some defaults
var houseTally = {
	events: _.extend({}, Backbone.Events),
	debug: false,
	dateRange: "year",
	weekStart: {},
	monthStart: {},
	yearStart: {},
	settings: new SettingCollection([
        { name: "category1",value: "Category 1" },
        { name: "category2",value: "Category 2" },
        { name: "yearStartMonth",value: "8" }
    ]),
    houses: new HouseCollection(),
    points: new PointsCollection(),
    categories: new CategoryCollection(),
	getSinceTime: function () {
		
		if (houseTally[houseTally.dateRange + "Start"])
		{
			return houseTally[houseTally.dateRange + "Start"];
		}
		else
		{
			return houseTally.weekStart;
		}
	},
	setTimePeriods: function (settings) {
		// get the month the app year starts with
		var yearStartMonth = houseTally.settings.findWhere({ name: "yearStartMonth" }).get("value") - 1;
		
		// if they set it to January (aka 0), then set to December (aka 11)
		yearStartMonth = (yearStartMonth < 0) ? 11 : yearStartMonth;
		
		// calc the year/month/week start dates as unix time
		var currD = new Date();
	
		// get first day of week
		houseTally.weekStart = new Date(
				currD.getFullYear(), 
				currD.getMonth(), 
				currD.getDate() - currD.getDay() + 1,
				0, 0, 0, 0
		);
	
		// get first day of month
		houseTally.monthStart = new Date(
				currD.getFullYear(),
				currD.getMonth(),
				1, 0, 0, 0, 0
		);
	
		// set first day of year
		houseTally.yearStart = new Date(
				currD.getFullYear() - (currD.getMonth() < yearStartMonth ? 1 : 0) ,
				yearStartMonth,
				1, 0, 0, 0, 0
		);
	},
	aggregatePoints: function () {
		
		var h = {};
		// aggregate each houses points by week/month/year
		houseTally.points.each(function (p) {
			var t = p.get("time");
			var pts = parseInt(p.get("points"), 10);
			var n = p.get("name");
			
			if (!h[n]) 
				h[n] = { week: 0, month: 0, year: 0 };
			
			if (t > houseTally.weekStart.getTime()) 
				h[n].week += pts;
			
			if (t > houseTally.monthStart.getTime()) 
				h[n].month += pts;
			
			if (t > houseTally.yearStart.getTime()) 
				h[n].year += pts;
		});
		
		for (var name in h) {
			houseTally.houses.get(name).set({
				weekPoints: h[name].week,
				monthPoints: h[name].month,
				yearPoints: h[name].year
			});
		}
	}
};

// override logging
if (!houseTally.debug) {
	var console = {};
	console.log = function () {};
	console.warn = function () {};
	console.info = function () {};
	console.error = function () {};
}

// Get data
houseTally.categories.fetch();

// update settings from server
houseTally.settings.fetch({ 
	remove: false, 
	success: function (settings, xhr) {
	
		houseTally.setTimePeriods();
		
		// this creates a version of the aggregation 
		// function that doesn't run until it's been
		// called twice. Essentially, it lets us wait
		// until houses fetch and points fetch complete
		// before initiating the aggregation
		var firsTimeAggregation = _.after(2, houseTally.aggregatePoints);
		
		// get houses and points from server. Then trigger
		// the first aggregation of points
		houseTally.houses.fetch({ success: firsTimeAggregation });
		houseTally.points.fetch({ 
			data: "sinceTime=" + houseTally.yearStart.getTime(),
			success: firsTimeAggregation,
			reset: true
		});
			
	}
});


// kick the app off
$(document).ready(function () {
	var app = new AppRouter();

	Backbone.history.start();

});