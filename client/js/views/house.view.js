window.HouseView = Backbone.View.extend({
	tagName: "div",
	
	className: "house",
	
	template: Handlebars.templates.house,
	
	events: {
		"click":		"addPoints"
	},

	initialize: function () {
		_.bindAll(this, 'addPoints','render');
		this.listenTo(this.model, "change", this.render);
		this.listenTo(houseTally.user, "change", this.render);

		houseTally.events.on("timeChange", this.render);
	},
	
	render: function () {
		
		console.log('Rendering house view');
			
		// instead of the model's JSON, we'll create
		// a JS object to pass to the view so we 
		// can control which points are displayed
		var viewData = {
				name:	this.model.get("name"), 
				points:	this.model.get(houseTally.dateRange + "Points")
		};
		
		// load the view . . .
		this.$el.html(this.template(viewData));
		
		// set the color
		this.$el
			.css("background-color", this.model.get("color"))
			.addClass(this.model.get('name').toString().toLowerCase() + " span6");
		
		// if the user is logged in and authorized 
		// make the element click-able
		if (houseTally.user.get('email'))
		{
			this.$el.addClass('clickable');
		}

		return this;
	},
	
	addPoints: function () {
		if (houseTally.user.get('email'))
		{
			var points = new Points({name: this.model.get('name')});
			
			var pointsView = new PointsView({model: points, house: this.model});
			
			$(pointsView.render().el).modal();
			
			$(".points-input").focus();
			
			$(pointsView.el).on("hidden", function () {
				pointsView.remove();
				pointsView.unbind();
			});			
		}
		else
		{
			console.log("User not authorized");
		}
	}
});