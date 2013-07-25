/*global Backbone, _, ENTER_KEY */

var app = app || {};

(function ($) {
	'use strict';

	app.SubjectView = Backbone.View.extend(
    { el: '#subject'

    , events: {
        'click #add-predicate' : '_addPredicate'
      }

    , _addPredicate: function() {
        var self = this
        app.graphs.get('/contexts/'+app.subject.get('@type')).context.compact(
          self.predicate_select.selected,
          function (err, term, uri_or_obj) {
            console.log(err, term, uri_or_obj)
            if (err) alert(err)
            self._addField(term, uri_or_obj, '')
          })
      }

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
        this.predicate_select.remove()
        this.$el.hide()
        return this
      }

    , _addField: function (term, uri_or_obj, value) {
        var self = this
        if (uri_or_obj instanceof Object && '@type' in uri_or_obj) {
          // typed relation target select
          self.$fields.append(
            Backbone.$('<label>'+term+' </label>').append(
              new app.SelectView(
                { placeholder: 'select a value'
                , value: 'id'
                , label: 'label'
                , selected: value
                , collection: app.graph.nodeobjects
                , filter: function(node) {
                    if (_.isArray(node.get('@type')))
                      return (node.get('@type').indexOf(uri_or_obj['@type']) >= 0)
                    return node.get('@type') === uri_or_obj['@type']
                  }
                }).render().el
            )
          )

        } else if (term === '@type') {
          // type select
          app.graph.context.resolve(value, function(err, term, uri){
            if (err) alert(err)
            self.$fields.append(
              Backbone.$('<label>type </label>').append(
                new app.SelectView(
                  { placeholder: 'select a value'
                  , value: 'id'
                  , label: 'label'
                  , selected: uri
                  , collection: app.types
                  , fetch: true
                  }).el
              )
            )
          })

        } else {
          // text input
          self.$fields.append(
            Backbone.$('<label>'+term+' <input name="'+term+'" value="'+value+'"></label>'))
        }
      }

    , render: function () {
        var self = this

        self.$header.html(self.infoTemplate(
          { g: app.graph.id
          , s: app.subject.id
          }))

        self.predicate_select = new app.SelectView(
          { el: "#predicates"
          , value: 1
          , label: 0
          , model: app.graphs.get('/contexts/'+app.subject.get('@type')).context
          , items: function() {
              return _.filter(_.pairs(this.model.get('@context')), this.filter)
            }
          , fetch: true
          })

        _.each(app.subject.attributes, function(value, key){
          if (key === '@id' || key === 'url') return
          app.graph.context.resolve(key, function(err, term, uri_or_obj){
            if (err) alert(err)
            self._addField(term, uri_or_obj, value)
          })
        })

        self.$el.show()
        self.$el.css('visibility', 'visible')

        return self
      }
    }
  )
})(jQuery)
