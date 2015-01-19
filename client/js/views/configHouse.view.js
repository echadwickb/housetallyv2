window.ConfigHouseView = Backbone.View.extend({
	tagName: "tr",
	
	className: "config-house",
	
	template: Handlebars.templates.configHouse,
	
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
		
		console.log('rendering house view');
		
		// render the view
		this.$el.html(this.template(this.model.toJSON()));	
		
		if (this.model.isNew())
		{
			console.info('model is new');
			this.editMode();
		}
		else
		{
			console.info('model is not new');
			this.displayMode();
		}		
		
		// best practice
		return this;
	},
	
	editMode: function () {
		this.mode = 'edit';
		this.$('.edit-mode, .display-mode').hide();
		this.$('.edit-mode').css('display', 'inline-block');
		
		this.$("input.color").spectrum({ 
			showInput: true,
			className: "full-spectrum",
			showInitial: true,
			showPalette: true,
			showSelectionPalette: true,
			maxPaletteSize: 10,
			preferredFormat: "hex"
		});
		
	},
	
	displayMode: function () {
		this.mode = 'display';
		
		this.$('.edit-mode, .display-mode').hide();
		this.$('.display-mode').css('display', 'inline-block');
		
		this.$("span.color").css({
			'background-color': this.model.get('color'),
			'width' : '200px'
		});
		
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
				name: this.$('input.name').val(),
				color: this.$('input.color').val()
			});
			
			
			// save and get xhr
			var xhr = this.model.save();
		}
	},
	
	validate: function () {
		// regex a valid email address
		if (this.$('input.name').val() === '') {
			return false;
		}
		
		if (this.$('input.color').val() === '') {
			return false;
		}
		return true;
	},
	
	destroy: function () {
		console.log('delete house');
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