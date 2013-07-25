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
        this.selected = this.$('option:selected').val()
        this.trigger('change', this.selected)
      }

    , initialize: function() {
        var self = this
          , value_key = self.options.value
          , label_key = self.options.label
          , fetch = self.options.fetch || false

        if (_.isNull(value_key) || _.isUndefined(value_key)) value_key = 'id'
        if (_.isNull(label_key) || _.isUndefined(label_key)) label_key = value_key

        this.items = self.options.items || this.items
        this.filter = self.options.filter || function(x){ return true }
        this.selected = self.options.selected || null

        this.template = function(o) {
          var value = _.result(o, value_key)
          if (value && typeof value === 'object') value = value['@id']
          if (o) {
            return ('<option value="'+ value +'">'
                                     + (_.result(o, label_key) || o.get(label_key)) +'</option>')
          } else {
            return '<option>'+ self.options.placeholder +'</option>'

          }
        }

        if (this.collection) {
          this.listenTo(this.collection, 'reset', this.render)
          if (fetch) {
            this.collection.fetch(
              { reset: true
              , error: function(collection, res, options) {
                  alert('Failed to fetch '+collection.url
                       +': '+res.status+' '+res.responseText)
                }
              }
            )
          }
        } else if (this.model) {
          this.listenTo(this.model, 'sync', this.render)
          if (fetch) {
            this.model.fetch(
              { error: function(model, res, options) {
                  alert('Failed to fetch '+model.url
                       +': '+res.status+' '+res.responseText)
                }
              }
            )
          }
        }
      }

    , remove: function () {
        this.$('option').remove()
        this.stopListening()
        return this
      }

    , items: function () {
        if (this.collection)
          return this.collection.filter(this.filter)
        if (this.model)
          return _.filter(_.pairs(this.model.attributes), this.filter)
      }

    , render: function () {
        this.$el.html(
          (this.options.placeholder ? this.template() : '')
          + this.items().map(this.template).join(''))
        if (this.selected)
          this.$('option[value="'+this.selected+'"]').attr('selected', true)
        this.$el.show()
        this.$el.css('visibility', 'visible')
        this.selected = this.$('option:selected').val()
		    return this
		  }
    })

})(jQuery);
