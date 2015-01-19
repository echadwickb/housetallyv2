window.HouseUser = Backbone.Model.extend({
	idAttribute: 'email',
	
	defaults: {
		admin: false
	}
});

window.HouseUserCollection = Backbone.Collection.extend({
	url: "../api/user",
	
	model: HouseUser
});