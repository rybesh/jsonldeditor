/*global Backbone, jQuery, _, ENTER_KEY */

var app = app || {};

(function ($) {
	'use strict';

	app.SubjectView = Backbone.View.extend(
    { el: '#subject'

    , events: 
      { 'keypress #new-p': 'createOnEnter'
      , 'keypress #new-o': 'createOnEnter'
      }

    , initialize: function () {
        this.$p = this.$('#new-p')
        this.$o = this.$('#new-o')
        this.$main = this.$('#main')
			  this.listenTo(app.subject, 'add', this.addOne)
        this.listenTo(app.subject, 'reset', this.addAll)
		  }

    , render: function() {
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
      }
    })

})(jQuery)