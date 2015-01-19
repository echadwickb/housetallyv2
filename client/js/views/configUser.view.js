window.ConfigUserView = Backbone.View.extend({
	tagName: "tr",
	
	className: "config-user",
	
	template: Handlebars.templates.configUser,
	
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

		this.listenTo(this.model, "change", this.render);
	},
	
	render: function () {
		
		console.log('rendering config view');
		
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
			
			console.info(this.model.attributes);
			
			// update model values
			this.model.set({
				email: this.$('input.email').val(),
				admin: this.$('input.admin').is(':checked')
			});
			
			console.info(this.model.attributes);
			
			// save and get xhr
			var xhr = this.model.save();
		}
	},
	
	validate: function () {
		// regex a valid email address
		if (this.$('input.email').val() === '') {
			return false;
		}
		
		return true;
	},
	
	destroy: function () {
		console.log('delete house user');
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