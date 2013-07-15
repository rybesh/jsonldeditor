/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';
  app.NodeObjects = Backbone.Collection.extend(
    { model: app.NodeObject 
    , initialize: function(models, options) {
        this.server = options.server
      }
    })
})()
