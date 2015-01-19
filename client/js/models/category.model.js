window.Category = Backbone.Model.extend({

	defaults: {
		category1: "",
		category2: ""
	}
});

window.CategoryCollection = Backbone.Collection.extend({
	url: "../api/category",
	
	model: Category,
	
	getDistinct: function () {		
		
		return _.uniq(this.pluck('category1'));
	},
	
	getByCategory1: function (category1) {
		
		var filteredCategories = this.filter(function (c) {
			return c.get('category1') === category1;
		});
		
		return new CategoryCollection(filteredCategories);
	}
});