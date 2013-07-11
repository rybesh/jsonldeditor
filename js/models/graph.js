/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';

  app.Graph = Backbone.Model.extend(
    { idAttribute: '@id'
    , initialize: function() {
        if (this.has('url')) {
          this.nodeobjects = new app.NodeObjects(
            this.get('@graph'), { url: this.url() + '/objects' })
          this.nodeobjects.graph = this
        }
      }
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
    , fetch: function(options) {
        if (this.nodeobjects)
          this.nodeobjects.fetch(options)
        else
          Backbone.Model.fetch.call(this, options)
      }
    }
  )

})()
