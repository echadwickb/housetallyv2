window.Points = Backbone.Model.extend({
	
	defaults: {
		points: 0,
		name: "",
		user: "",
		time: null,
		category1: "",
		category2: ""
	}
});

window.PointsCollection = Backbone.Collection.extend({
	url: "../api/points",
	
	model: Points,
	
	since: null,
	
	sinceStart: function () {
		var sinceTime = houseTally.getSinceTime().getTime();
		
		var pointsSince = this.filter(function (p) {
			return p.get("unixTime") >= sinceTime;
		});
		
		return new PointsCollection(pointsSince);
	}
});