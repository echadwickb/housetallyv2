window.ConfigCategoryView = Backbone.View.extend({
	tagName: "tr",
	
	className: "config-category",
	
	template: Handlebars.templates.configCategory,
	
	events: {
		'keypress input': 'handleKey',
		'keyup': 'handleKey',
		'click .edit': 'editMode',
		'click .remove': 'destroy',
		'click .cancel': 'cancel',
		'click .save': 'save'
	},
	
	initialize: function () {
		_.bindAll(this, "render");
		this.mode = 'display';
		this.model.bind("change", this.render);
	},
	
	render: function () {
		
		console.log('rendering category view');
		
		// render the view
		this.$el.html(this.template(this.model.toJSON()));		
		
		if (this.model.isNew()) {
			this.editMode();
		}
		else
		{
			this.displayMode();
		}
		
		// best practice
		return this;
	},
	
	editMode: function () {
		this.mode = 'edit';
		this.$('.edit-mode, .display-mode').hide();
		this.$('.edit-mode').css('display', 'inline-block');
	},
	
	displayMode: function () {
		this.mode = 'display';
		
		this.$('.edit-mode, .display-mode').hide();
		this.$('.display-mode').css('display', 'inline-block');
	},
	
	handleKey: function (e) {
		
		console.log(e.type, e.which);
		
		if (this.mode == 'edit') {
			if (e.which == 13)
			{
				this.save();			
			}
		}
	}, 
	
	save: function () {
		
		var _self = this;
		
		// don't save unless it validated
		if (this.validate()) {
			
			// update model values
			this.model.set({
				category1: this.$('input.category1').val(),
				category2: this.$('input.category2').val()
			});
			
			
			// save and get xhr
			var xhr = this.model.save();
		}
	},
	
	validate: function () {
		if (this.$('input.category1').val() === '') {
			return false;
		}
		
		if (this.$('input.category2').val() === '') {
			return false;
		}
		
		return true;
	},
	
	destroy: function () {
		console.log('delete category');
		this.model.destroy();
		this.remove();
	},
	
	cancel: function () {
		if (this.model.isNew()) {
			console.log('destroying model');
			this.model.destroy();
			this.remove();
		}
		else
		{
			console.log('canceling edit');
			this.render();
		}
	}
});