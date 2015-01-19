window.ConfigSettingsView = Backbone.View.extend({
	tagname: "div",
	
	className: "config",
	
	template: Handlebars.templates.configSettings,
	
	events: {},
	
	initialize: function () {
		_.bindAll(this, "render");
		
		houseTally.settings.bind("reset", this.render);
	},
	
	render: function () {
		
		console.log('rendering the settings config view');
		var self = this;
		
		var info = "Default settings for app . . . for when you really want to get in trouble.";
		
		// render the view
		$(this.el).html(this.template(
			{
				"header" : 'HouseTally Settings',
				"info": info,
				columns: [{name: "Setting"},{name: "Value"}]
			}
		));		
		
		houseTally.settings.each(function (setting) {
			console.log('adding a setting row');
			
			var configSettingView = new ConfigSettingView({model: setting});

			self.$("tbody").append(configSettingView.render().el);
		});
		
		// best practice
		return this;
	}
});