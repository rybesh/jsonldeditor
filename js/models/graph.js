/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';

  app.Graph = Backbone.Model.extend(
    { idAttribute: '@id'
    , initialize: function() {
        var context_url
        if (this.has('objects')) {
          this.nodeobjects = new app.NodeObjects(
            this.get('@graph'), 
            { server: this.collection.server
            , url: this.collection.server+this.get('objects') })
        }
        if (this.has('@context')) {
          context_url = this.get('@context')
          if (!/^https?:\/\//i.test(context_url))
            context_url = this.collection.server+context_url
          this.context = new app.Context({ url: context_url })
        } 
      }
    , url: function() {
        if (this.has('url'))
          return this.collection.server + this.get('url')
        else
          return Backbone.Model.url.call(this)          
      }
    }
  )

})()
