window.AppRouter = Backbone.Router.extend({
	
	routes: {
		"":			"tallies",
		"tallies":	"tallies",
		"stats":	"stats",
		"config/user":	"configUser",
		"config/category": "configCategory",
		"config/house": "configHouse",
		"config/setting": "configSetting"
	},
	
	initialize: function () {
		// get the user from the server
		houseTally.user = new User();
		houseTally.user.fetch();
		
		// render the user view
		var userView = new UserView({model: houseTally.user});

		$(".user-actions").html(userView.el);
		
		var navView = new NavView();
		
		$(".navigation").html(navView.el);
		
		// listen for change in date range
		var self = this;
		$(".date-range").click(function (e) {
			// don't follow the button link!
			e.preventDefault();
			
			// grab the button that was pushed
			var btn = $(e.currentTarget);
			
			// don't react to clicks on currently selected button
			if (btn.hasClass("disabled") === false)
			{
				// clear the disabled buttons
				$("a.date-range").removeClass("disabled");
				
				// disable the button that was just clicked
				btn.addClass("disabled");
				
				// set the global to affect all views
				houseTally.dateRange = btn.data("dateRange");
				
				// trigger the event on the houses
				houseTally.events.trigger("timeChange");
				
				console.log("showing " + houseTally.dateRange + " points");
			}
		});		
		
	},
	
	tallies: function () {
		
		if (!this.talliesView)
		{
			console.log("Creating tallies view");
			this.talliesView = new TalliesView();			
			
		}
		
		this.talliesView.render();
		
		$(".main-stuff").html(this.talliesView.el);
	},
	
	stats: function () {
		if (!this.statsView)
		{
			console.info("Creating stats view");
			this.statsView = new StatsView();
		}
		
		this.statsView.render();
		
		$(".main-stuff").html(this.statsView.el);
	},
	
	configUser: function (configType) {
		
		if (!this.configUsersView)
		{
			this.configUsersView = new ConfigUsersView();
			
		}
		
		this.configUsersView.render();
		
		$(".main-stuff").html(this.configUsersView.el);
	},
	
	configCategory: function () {
		
		if (!this.configCategoriesView)
		{
			this.configCategoriesView = new ConfigCategoriesView();
			
		}
		
		this.configCategoriesView.render();
		
		$(".main-stuff").html(this.configCategoriesView.el);
	},
	
	configHouse: function () {
		
		if (!this.configHousesView)
		{
			this.configHousesView = new ConfigHousesView();
			
		}
		
		this.configHousesView.render();
		$(".main-stuff").html(this.configHousesView.el);
	},
	
	configSetting: function () {
		
		if (!this.configSettingsView)
		{
			this.configSettingsView = new ConfigSettingsView();
			
		}
		
		this.configSettingsView.render();
		$(".main-stuff").html(this.configSettingsView.el);
	}
});