/*global Backbone, jQuery, _, ENTER_KEY */

var app = app || {};

(function ($) {
	'use strict';

	app.SubjectView = Backbone.View.extend(
    { el: '#subject'

    , infoTemplate: _.template($('#info-template').html())

    , events: 
      { 'keypress #new-p': 'createOnEnter'
      , 'keypress #new-o': 'createOnEnter'
      }

    , initialize: function () {
        this.$p = this.$('#new-p')
        this.$o = this.$('#new-o')
        this.$header = this.$('#header')
        this.$main = this.$('#main')

			  this.listenTo(app.subject, 'add', this.addOne)
        this.listenTo(app.subject, 'reset', this.addAll)
        this.listenTo(app.subject, 'all', this.render);

        app.subject.fetch()
		  }

    , render: function () {
        this.$header.html(this.infoTemplate({ s: app.subject.url }))
        this.$header.show()

        this.$p.focusin(_.bind(this.clearInvalidInput, this))
        this.$o.focusin(_.bind(this.clearInvalidInput, this))

        if (app.subject.length) {
          this.$main.show()
        } else {
          this.$main.hide()
        }

        return this
      }

    , clearInvalidInput: function () {
        if (! this.$p.data('uri')) {
          this.$p.val('')
        }
        if (! this.$o.data('uri')) {
          this.$o.val('')
        }
        this.$p.keyup()
        this.$o.keyup()
      }

		, addOne: function (triple) {
			  var view = new app.StatementView({ model: triple })
			  $('#statements').append(view.render().el)
		  }

    , addAll: function () {
			  this.$('#statements').html('')
			  app.subject.each(this.addOne, this)
		  }

    , createOnEnter: function(e) {
        if (e.which !== ENTER_KEY
            || !this.$p.data('uri')
            || !this.$p.data('uri').trim()
            || !this.$o.data('uri')
            || !this.$o.data('uri').trim()) {
          return
        }
        app.subject.create(
          { s: app.subject.url
          , p: this.$p.data('uri').trim()
          , o: this.$o.data('uri').trim()
          , order: app.subject.nextOrder()
          })
        this.$p.val('')
        this.$p.data('uri', '')
        this.$o.val('')
        this.$o.data('uri', '')
        this.$p.focus()
      }
    })

})(jQuery)
