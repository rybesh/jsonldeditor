/*global Backbone, jQuery, _, ENTER_KEY */

var app = app || {};

(function ($) {
	'use strict';
	app.SelectView = Backbone.View.extend(
    { tagName:  'select'

    , events: {
        'change' : '_onChange'
      }

    , _onChange: function(e) { 
        this.trigger('change', this.$('option:selected').val()) 
      }

    , initialize: function() {
        var self = this
          , value = self.options.value || 'id'
          , label = self.options.label || value
        this.template = function(o) {
          if (o) {
            return ('<option value="'+ _.result(o, value) +'">'
                                     + _.result(o, label) +'</option>')
          } else {
            return '<option>'+ this.options.placeholder +'</option>'
            
          }
        }
      }

    , render: function () {
        this.$el.html(
          (this.options.placeholder ? this.template() : '')
          + this.collection.map(this.template).join(''))
		    return this
		  }
	  })
})(jQuery);
