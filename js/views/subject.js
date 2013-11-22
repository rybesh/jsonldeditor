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
        console.log('_addPredicate')
        var term = this.predicate_select.selectedLabel()
        // Can't just use value because we need the expanded
        // definition of the term (with @type info), not just the URL.
        this._addField(term, app.types.context.resolve(term))
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
                  , collection: app.types.nodeobjects
                  , filter: function(node) {
                      return (node.get('@type') === 'class')
                    }
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

    , _initialize_predicate_select: function() {
        var self = this
        self.predicate_select = new app.SelectView(
          { el: '#predicates'
          , value: '@id'
          , label: 'term'
          , collection: app.types.nodeobjects
          , filter: function (node) {
              return (app.subject.get('@type') === node.get('domain') ||
                      _.contains(app.subject.get('@type'), node.get('domain')))
            }
          , items: function() {
              return this.collection.filter(this.filter).map(
                function(node) {
                  return {
                    '@id': app.types.context.resolve(node.get('@id')),
                    'term': node.get('@id') }
                }
              )
            }
          , fetch: true
          })
      }

    , _add_fields: function() {
        var self = this
        _.each(app.subject.attributes, function(value, term){
          if (term === '@id' || term === 'url') return
          self._addField(term, app.graph.context.resolve(term), value)
        })
      }

    , render: function () {
        var self = this

        self.$header.html(self.infoTemplate(
          { g: app.graph.id
          , s: app.subject.id
          }))

        if (app.types.context.loaded) {
          self._initialize_predicate_select()
        } else {
          self.listenToOnce(
            app.types.context, 'sync',
            self._initialize_predicate_select)
        }

        self._add_fields()

        self.$el.show()
        self.$el.css('visibility', 'visible')

        return self
      }
    }
  )
})(jQuery)
