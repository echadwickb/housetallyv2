window.ConfigHousesView = Backbone.View.extend({
	tagname: "div",
	
	className: "config",
	
	template: Handlebars.templates.config,
	
	events: {
		'click .add': 'add'
	},
	
	initialize: function () {
		_.bindAll(this, "render");
		
		this.listenTo(houseTally.houses, "add", this.addHouses);
	},
	
	render: function () {
		
		console.log('rendering the houses view');
		var self = this;
		
		var info = "Don't setup more than four!";
		
		// render the view
		$(this.el).html(this.template(
			{
				"header" : 'Houses',
				"info": info,
				columns: [{name: "House"},{name: "Color"}]
			}
		));		
		
		this.delegateEvents();
		
		// render any existing members of the houses
		// collection.
		houseTally.houses.each(function (h) {
			
			self.addHouses(h);			
		});
		
		// best practice
		return this;
	},
	
	add: function (e) {

		e.preventDefault();
		
		houseTally.houses.add(new House());
	},
	
	addHouses: function (h) {

		var configHouseView = new ConfigHouseView({model: h});

		this.$("tbody").append(configHouseView.render().el);
	}
});