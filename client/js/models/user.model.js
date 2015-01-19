window.User = Backbone.Model.extend({
	urlRoot: "../api/user/login",
	
	idAttribute: "email",
	
	defaults: {
		email: "",
		loggedIn: false,
		loginUrl: "",
		logoutUrl: "",
		admin: false,
		superAdmin: false
	}
});