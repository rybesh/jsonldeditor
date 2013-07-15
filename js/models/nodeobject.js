/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';

  app.NodeObject = Backbone.Model.extend(
    { idAttribute: '@id'
    , url: function() {
        if (this.has('url'))
          return this.collection.server+this.get('url')
        else
          return Backbone.Model.url.call(this)          
      }
    })

})()
