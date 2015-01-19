window.TalliesView = Backbone.View.extend({
	tagname: "div",
	
	className: "tallies",
	
	template: Handlebars.templates.tallies,
	
	events: {
	},
	
	initialize: function () {
		_.bindAll(this, "render");
		this.listenTo(houseTally.houses, "add", this.addHouse);
	},
	
	render: function () {
		
		console.log('Rendering tallies view');
		
		// render the view
		this.$el.html(this.template);	
		
		var self = this;
		
		this.i = 0;
		houseTally.houses.each(function (h) {
			self.addHouse(h);
		});
		
		// best practice
		return this;
	},
	
	i: 0,
	
	addHouse: function (h) {
		console.info('Adding house to tallies view');

		// create the view
		var houseView = new HouseView({model: h});
		
		this.$("div.house-row").eq(Math.floor(this.i / 2))
			.append(houseView.render().el);
		
		this.i++;
	}
});