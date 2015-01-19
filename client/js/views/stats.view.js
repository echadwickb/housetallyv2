window.StatsView = Backbone.View.extend({
	tagName: "div",
	
	className: "stats",
	
	events: {},
	
	stats: [],
	
	initialize: function () {
		_.bindAll(this,'render');
		
		this.listenTo(houseTally.points, "reset", this.render);
	},
	
	render: function () {
		
		console.info("Rendering stats view");
		
		this.$el.empty();
		
		var self = this;
		
		this.createStats("name", "category1");
		this.createStats("name", "category2");
		this.createStats("category1", "name");
		this.createStats("category1", "category2");
		this.createStats("category2", "name");		
		this.createStats("category2", "category1");
		
		return this;
	},
	
	createStats: function (attr1, attr2) {
		
		var agg = {};
		
		houseTally.points.each(function (p) {
			
			var a1 = p.get(attr1);
			var a2 = p.get(attr2);
			var t = p.get("time");
			var pts = p.get("points");
			
			agg[a1] = agg[a1] || {};
			agg[a1][a2] = agg[a1][a2] || {
				name: a2,
				weekPoints: 0,
				monthPoints: 0,
				yearPoints: 0
			};
			
			if (t > houseTally.weekStart.getTime()) 
				agg[a1][a2].weekPoints += parseInt(pts, 10);
			
			if (t > houseTally.monthStart.getTime()) 
				agg[a1][a2].monthPoints += parseInt(pts, 10);
			
			if (t > houseTally.yearStart.getTime()) 
				agg[a1][a2].yearPoints += parseInt(pts, 10);
		});
		
		var objToArr = function (o) {
			return _.map(o, function (k, v) { return k; });
		};
		
		var titles = _.sortBy(_.keys(agg), function (title) { return title; });
		
		for (var i=0;i<titles.length;i++) {
			var m = { "title": titles[i], "breakout": objToArr(agg[titles[i]]) };
			var statView = new StatView({model: m});
			this.$el.append(statView.render().el);			
		}	
		
		if (titles.length > 0)
			this.$el.append('<div class="clearfix"></div>');
	}
});