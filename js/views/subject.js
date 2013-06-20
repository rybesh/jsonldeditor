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

    , render: function() {
        this.$header.html(this.infoTemplate({ s: app.subject.url }))
        this.$header.show()

        if (app.subject.length) {
          this.$main.show()
        } else {
          this.$main.hide()
        }
      }

		, addOne: function (statement) {
			  var view = new app.StatementView({ model: statement })
			  $('#statements').append(view.render().el)
		  }

    , addAll: function () {
			  this.$('#statements').html('')
			  app.subject.each(this.addOne, this)
		  }

    , createOnEnter: function(e) {
        if (e.which !== ENTER_KEY 
            || !this.$p.val().trim() 
            || !this.$o.val().trim()) {
          return
        }
        app.subject.create(
          { p: this.$p.val().trim()
          , o: this.$o.val().trim()
          , order: app.subject.nextOrder()
          })
        this.$p.val('')
        this.$o.val('')
        this.$p.focus()
      }
    })

})(jQuery)
