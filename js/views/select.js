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
        this.trigger('change', this.selected())
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
        this._selected = self.options.selected || null

        this.template = function(o) {
          var value, label
          if (! o) {
            return '<option>'+ self.options.placeholder +'</option>'
          }
          value = _.result(o, value_key) || o.get(value_key)
          label = _.result(o, label_key) || o.get(label_key)
          if (value && typeof value === 'object') value = value['@id']
          return ('<option value="'+ value +'">'+ label +'</option>')
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

    , selected: function() {
        return this.$('option:selected').val()
      }

    , selectedLabel: function() {
        return this.$('option:selected').text()
      }

    , render: function () {
        this.$el.html(
          (this.options.placeholder ? this.template() : '')
          + this.items().map(this.template).join(''))
        if (this._selected)
          this.$('option[value="'+this._selected+'"]').attr('selected', true)
        this.$el.show()
        this.$el.css('visibility', 'visible')
		    return this
		  }
    })

})(jQuery);
