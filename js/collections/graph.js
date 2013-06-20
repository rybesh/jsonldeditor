/*global Backbone */

var app = app || {};

(function () {
	'use strict';
	app.Graph = Backbone.Collection.extend(
    { model: app.Triple
      // TODO: set namespace from graph URI
    , initialize: function() {
        if (this.url) {
          this.localStorage = new Backbone.LocalStorage(this.url)
        } else {
          this.localStorage = new Backbone.LocalStorage('|default|')
        }
      }
    , nextOrder: function () {
			  if (!this.length) {
		      return 1
			  }
			  return this.last().get('order') + 1
		  }
    , comparator: function (triple) {
			  return triple.get('order')
		  }
	  })

})()
