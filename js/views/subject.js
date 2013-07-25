/*global Backbone, _, ENTER_KEY */

var app = app || {};

(function ($) {
	'use strict';

	app.SubjectView = Backbone.View.extend(
    { el: '#subject'

    , infoTemplate: _.template($('#info-template').html())

    , initialize: function () {
        this.$header = this.$('#header')
        this.$fields = this.$('#fields')

        this.listenTo(app.subject, 'sync', this.render);

        function on_error(model, res, options) {
          alert('Failed to fetch '+model.url()
                +': '+res.status+' '+res.responseText)
        }

        app.subject.fetch({ error: on_error })
		  }

    , remove: function () {
        this.stopListening()
        this.$fields.find('label').remove()
        this.$el.hide()
        return this
      }

    , render: function () {
        var self = this

        self.$header.html(self.infoTemplate(
          { g: app.graph.id
          , s: app.subject.id
          }))

        _.each(app.subject.attributes, function(value, key){
          if (key === '@id' || key === 'url') return

          app.graph.context.resolve(key, function(err, term, uri_or_obj){
            if (err) alert(err)

            if (uri_or_obj instanceof Object && '@type' in uri_or_obj) {
              self.$fields.append(
                Backbone.$('<label>'+key+' </label>').append(
                  new app.SelectView(
                    { placeholder: 'select a value'
                    , value: 'id'
                    , label: 'label'
                    , selected: value
                    , collection: app.graph.nodeobjects
                    , filter: function(node) {
                        return node.get('@type') === uri_or_obj['@type']
                      }
                    }).render().el
                )
              )

            } else if (term === '@type') {
              app.graph.context.resolve(value, function(err, term, uri){
                if (err) alert(err)
                self.$fields.append(
                  Backbone.$('<label>'+key+' </label>').append(
                    new app.SelectView(
                      { placeholder: 'select a value'
                      , value: 'id'
                      , label: 'label'
                      , selected: uri
                      , collection: app.types
                      , reset: true
                      }).el
                  )
                )
              })

            } else {
              self.$fields.append(
                Backbone.$('<label>'+key+' <input name="'+key+'" value="'+value+'"></label>'))
            }
          })
        })

        self.$el.show()
        self.$el.css('visibility', 'visible')

        return self
      }
    }
  )
})(jQuery)
