/*global Backbone, jQuery, _, ENTER_KEY */

var app = app || {};

(function ($) {
	'use strict';
	app.StatementView = Backbone.View.extend(
    { tagName:  'li'

    , template: _.template($('#statement-template').html())

	  , events: 
      {
      }

		, initialize: function () {
			  this.listenTo(this.model, 'destroy', this.remove)
		  }

    , render: function () {
        this.$el.html(this.template(this.model.toJSON()))
        this.$p = this.$('.edit input[name="p"]')
        this.$o = this.$('.edit input[name="o"]')
		    return this
		  }

		, clear: function () {
			  this.model.destroy()
		  }
	  })
})(jQuery);
