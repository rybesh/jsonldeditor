/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';

  app.Context = Backbone.Model.extend(
    { loaded: false
    , initialize: function() {
        var self = this
        self.listenToOnce(self, 'sync', function(){ self.loaded = true })
      }
    , url: function() {
        if (this.has('url'))
          return this.get('url')
        else
          return Backbone.Model.url.call(this)
      }
    , attributes: function() {
        return
      }
    , resolve: function(term) {
        var self = this
        if (!self.loaded)
          throw new Error('Call to resolve(term) on unloaded context')
        return self.get('@context')[term]
      }
    , termsFor: function(url) {
        var self = this
        if (!self.loaded)
          throw new Error('Call to termFor(url) on unloaded context')
        return _.filter(
          _.pairs(self.get('@context')),
          function(pair) {
            return (pair[1] === url || pair[1]['@id'] === url)
          })
      }
    }
  )

})()
