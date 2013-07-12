/*global Backbone, $, _, ENTER_KEY */

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

        this.selected = null

        this.template = function(o) {
          if (o) {
            return ('<option value="'+ _.result(o, value) +'">'
                                     + _.result(o, label) +'</option>')
          } else {
            return '<option>'+ self.options.placeholder +'</option>'
            
          }
        }

        this.listenTo(this.collection, 'reset', this.render)

        this.collection.fetch(
          { reset: true
          , error: function(collection, res, options) { 
              alert('Failed to fetch '+collection.url
                    +': '+res.status+' '+res.responseText) 
            }
          })
      }

    , render: function () {
        this.$el.html(
          (this.options.placeholder ? this.template() : '')
          + this.collection.map(this.template).join(''))
        if (this.selected)
          this.$('option[value="'+this.selected+'"]').attr('selected', true)  
        this.$el.show()
        this.$el.css('visibility', 'visible')
		    return this
		  }
    })

})(jQuery);
