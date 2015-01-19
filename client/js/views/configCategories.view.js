window.ConfigCategoriesView = Backbone.View.extend({
	tagname: "div",
	
	className: "config",
	
	template: Handlebars.templates.config,
	
	events: {
		'click .add': 'add'
	},
	
	initialize: function () {
		_.bindAll(this, "render");
		
		this.listenTo(houseTally.categories, "add", this.addCategory);
	},
	
	render: function () {
		
		console.log('rendering categories view');
		var self = this;
		
		var info = "Points can be assigned the following categories.";
		info += " Changes are not retro-active, so be careful about editing existing categories.";
		
		// Category descriptions are configurable, so get
		// from settings
		
		var category1 = houseTally.settings.findWhere({name: 'category1'}).get('value');
		var category2 = houseTally.settings.findWhere({name: 'category2'}).get('value');
		// render the view
		$(this.el).html(this.template(
			{
				"header" : 'Categories',
				"info": info,
				columns: [{name: category1},{name: category2}]
			}
		));	
		
		this.delegateEvents();
		
		houseTally.categories.each(function (c) {
			self.addCategory(c);
		});
		
		// best practice
		return this;
	},
	
	add: function (e) {

		e.preventDefault();
		
		houseTally.categories.add(new Category());
	}, 
	
	addCategory: function (c) {
		console.log('adding a category row');
		
		var configCategoryView = new ConfigCategoryView({model: c});

		this.$("tbody").append(configCategoryView.render().el);
	}
});