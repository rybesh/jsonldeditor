/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';

  app.NodeObject = Backbone.Model.extend(
    { idAttribute: '@id'
    , url: function() {
        if (this.has('url')) {
          return (_.result(this.collection, 'url')
                   .split('/')
                   .slice(0,3)
                   .join('/') + this.get('url'))
        }
        else {
          return Backbone.Model.url.call(this)          
        }
      }
    })

})()
