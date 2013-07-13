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
        this.$fields = this.$('#fields')

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

        this.$header.html(this.infoTemplate(
          { g: app.graph.id
          , s: app.subject.id 
          }))

        this.$('.property-view').remove()
        _.each(app.subject.attributes, function(value, key){
          if (key === '@id' || key === 'url') return
          this.$fields.append(this.propertyTemplate({ p:key, o:value }))
        }, this)

        this.$el.show()
        this.$el.css('visibility', 'visible')
      
        return this
      }
    }
  )
})(jQuery)
