/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';
  app.Graphs = Backbone.Collection.extend(
    { model: app.Graph 
    , url: '/graphs'
    , initialize: function(models, options) {
        options || (options = {});
        this.scheme = options.scheme || 'http'
        this.host = options.host || 'localhost'
        if (options.port) this.port = options.port
        this.server = (this.scheme+'://'+this.host
                        +(this.port ? ':'+this.port : ''))
        this.url = this.server + this.url
      }
    })
   

})()
