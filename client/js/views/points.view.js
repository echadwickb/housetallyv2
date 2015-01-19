window.PointsView = Backbone.View.extend({
	tagName: "div",
	
	className: "points",
	
	template: Handlebars.templates.points,
	
	events: {
		"click .update-points": "update",
		"change .category1": "setCategory2"
	},

	initialize: function () {
		_.bindAll(this, 'update','render');
		
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model, "error", this.error);
	},
	
	render: function () {
		
		// get a distinct list of category1
		var categories1 = houseTally.categories.getDistinct();
		
		// take the first option from category1
		// and get it's values
		var categories2 = houseTally.categories.getByCategory1(categories1[1]).toJSON();
		
		console.log(categories2);
		
		this.$el.html(this.template({
			points: this.model,
			category1: houseTally.settings.findWhere({name: 'category1'}).get('value'),
			category2: houseTally.settings.findWhere({name: 'category2'}).get('value'),			
			"categories1": categories1,			
			"categories2": categories2
		}));
		
		return this;
	},
	
	update: function () {

		this.model.set({
			points: this.$('input.points-input').val(),
			time: new Date(),
			user: houseTally.user.get('email'),
			category1: this.$('select.category1 option:selected').val(),
			category2: this.$('select.category2 option:selected').val()
		});
		
		houseTally.points.create(this.model);
		
		houseTally.houses.get(this.model.get("name")).updatePoints("week", this.model.get("points"));
		houseTally.houses.get(this.model.get("name")).updatePoints("month", this.model.get("points"));
		houseTally.houses.get(this.model.get("name")).updatePoints("year", this.model.get("points"));
		
	},
	
	error: function (p, xhr) {
		console.error('Error saving points');
	},
	
	setCategory2: function () {
		var category1 = this.$('.category1').val();
		
		this.$('.category2').html('');
		
		houseTally.categories.getByCategory1(category1).each(function (c) {
			this.$('.category2').append(
				$('<option>')
					.val(c.get('category2'))
					.html(c.get('category2'))
			);
		});
	}
});