window.ConfigUsersView = Backbone.View.extend({
	tagname: "div",
	
	className: "config",
	
	template: Handlebars.templates.config,
	
	events: {
		'click .add': 'add'
	},
	
	initialize: function () {
		_.bindAll(this, "render");
		
		// grab the users 
		this.houseUsers = new HouseUserCollection();
		
		this.houseUsers.fetch();
		
		this.listenTo(this.houseUsers, "add", this.addHouseUser);
	},
	
	render: function () {
		
		console.log('rendering house users view');
		var self = this;
		
		// render the view
		this.$el.html(this.template(
			{
				"header" : 'Users',
				"info": "Users listed here can add points. Admin status means they can manage users, categories and houses.",
				columns: [{name: "Email"},{name: "Admin"}]
			}
		));		
		
		this.delegateEvents();
		this.houseUsers.each(function (u) {
			console.log('adding a house users row');
			
			self.addHouseUser(u);
		});
		
		// best practice
		return this;
	},
	
	add: function (e) {

		e.preventDefault();
		
		console.info('clicked add on houseuser');
		this.houseUsers.add(new HouseUser());
	},
	
	addHouseUser: function (u) {
		console.info('adding config users view');
		
		var configUserView = new ConfigUserView({model: u});

		this.$("tbody").append(configUserView.render().el);
	}
});