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
    , resolve: function(term, callback) {
        var self = this
        if (self.loaded) {
          return window.setTimeout(
            function(){ callback(false, term, self.get('@context')[term]) }, 0)
        } else {
          self.listenToOnce(self, 'sync', function(){
            callback(false, term, self.get('@context')[term])
          })
          self.fetch(
            { error: function(model, res, options) {
                alert('Failed to fetch '+model.url
                     +': '+res.status+' '+res.responseText)
              }
            }
          )
        }
      }
    }
  )

})()
