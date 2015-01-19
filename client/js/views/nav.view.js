window.NavView = Backbone.View.extend({
	tagName: "ul",
	
	className: 'nav',
	
	template: Handlebars.templates.nav,
	
	events: {
		'click li a': 'toggleNav'
	},
	
	initialize: function () {
		houseTally.user.bind("change", this.render, this);
	},
	
	render: function () {
		
		console.log('rendering the navigation bar');
		
		var hasAdmin = houseTally.user.get('superAdmin') || houseTally.user.get('admin');
			
		console.log('hasAdmin: ' + hasAdmin);
		
		this.$el.html(this.template({"hasAdmin": hasAdmin}));
		
		return this;
	},
	
	toggleNav: function (e) {
		$('ul.nav li').removeClass('active');
		
		$(e.target).parent().addClass('active');
	}
});