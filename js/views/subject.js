/*global Backbone, _, ENTER_KEY */

var app = app || {};

(function ($) {
	'use strict';

	app.SubjectView = Backbone.View.extend(
    { el: '#subject'

    , infoTemplate: _.template($('#info-template').html())

    , propertyTemplate: _.template($('#property-template').html())

    , initialize: function () {
        this.$header = this.$('#header')
        this.$editor = this.$('#editor')

        this.listenTo(app.subject, 'sync', this.render);

        app.subject.fetch(
          { reset: true
          , error: function(model, res, options) { 
              alert('Failed to fetch '+model.url()
                    +': '+res.status+' '+res.responseText) 
            }
          })
		  }

    , render: function () {
        this.$header.html(this.infoTemplate({ s: app.subject.id }))

        this.$editor.html('')
        _.each(app.subject.attributes, function(value, key){
            this.$editor.append(this.propertyTemplate({ p:key, o:value }))
        }, this)

        this.$el.show()
        this.$el.css('visibility', 'visible')
      
        return this
      }
    }
  )
})(jQuery)
