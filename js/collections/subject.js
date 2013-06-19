/*global Backbone */

var app = app || {};

(function () {
	'use strict';
	app.Subject = Backbone.Collection.extend(
    { model: app.Statement
    , localStorage: new Backbone.LocalStorage('triplejs-backbone')
    , nextOrder: function () {
			  if (!this.length) {
		      return 1
			  }
			  return this.last().get('order') + 1
		  }
    , comparator: function (statement) {
			  return statement.get('order')
		  }
    , create: function(model, options) {
        if (!('s' in model) && 'url' in this) {
          model.s = this.url
        }
        return Backbone.Collection.prototype.create.apply(
          this, [model, options])
      }
	  })

})()
