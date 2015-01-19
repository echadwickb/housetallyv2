window.UserView = Backbone.View.extend({
	tagName: "div",
	
	template: Handlebars.templates.user,
	
	initialize: function () {
		this.model.bind("change", this.render, this);
	},
	
	render: function () {
		
		this.$el.html(this.template(this.model.toJSON()));
		
		return this;
	}
});