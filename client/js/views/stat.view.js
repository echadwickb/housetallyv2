window.StatView = Backbone.View.extend({
	tagName: "div",
	
	className: 'stat pull-left',
	
	template: Handlebars.templates.stat,
	
	initialize: function () {
		_.bindAll(this,'render');
		
		houseTally.events.on("timeChange", this.render);
	},
	
	render: function () {
		
		console.info("Rendering stat view");
		
		this.model.breakout = _.sortBy(
			_.map(this.model.breakout, function (v, k) {
				v.points = v[houseTally.dateRange + "Points"];
				return v;
			}),
			function (z) { return z.points * -1; }
		);
		
		this.$el.html(this.template(this.model));
		
		return this;
	}
});