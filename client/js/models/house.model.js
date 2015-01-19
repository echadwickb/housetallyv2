window.House = Backbone.Model.extend({
	idAttribute: 'name',
	
	pointsAggregated: false,
	
	defaults: {
		color: "",
		points: 0,
		weekPoints: 0,
		monthPoints: 0,
		yearPoints: 0
	},
	
	updatePoints: function (which, points) {
		var attr = which + "Points";
		if (this.has(attr))
		{
			this.set(attr, parseInt(this.get(attr), 10) + parseInt(points, 10));
		}
		
		attr = null;
	}
});

window.HouseCollection = Backbone.Collection.extend({
	url: "../api/house",
	
	model: House
});