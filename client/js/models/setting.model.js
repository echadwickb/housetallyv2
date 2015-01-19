window.Setting = Backbone.Model.extend({
	idAttribute: 'name',
	
	defaults: {
		name: "",
		value: ""
	}
});

window.SettingCollection = Backbone.Collection.extend({
	url: "../api/setting",
	
	model: Setting
});