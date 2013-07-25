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
                callback('Failed to fetch '+model.url
                     +': '+res.status+' '+res.responseText)
              }
            }
          )
        }
      }
    , _url_to_term: function(url) {
        var self = this
        return _.first(_.filter(_.pairs(self.get('@context')), function(pair) {
                         return (pair[1] === url || pair[1]['@id'] === url)
                       }))
      }
    , compact: function(url, callback) {
        var self = this
          , term_and_uri_or_obj
        if (self.loaded) {
          term_and_uri_or_obj =  self._url_to_term(url)
          return window.setTimeout(
            function(){ callback(false, term_and_uri_or_obj[0], term_and_uri_or_obj[1]) }, 0)
        } else {
          self.listenToOnce(self, 'sync', function(){
            term_and_uri_or_obj =  self._url_to_term(url)
            callback(false,  term_and_uri_or_obj[0], term_and_uri_or_obj[1])
          })
          self.fetch(
            { error: function(model, res, options) {
                callback('Failed to fetch '+model.url
                     +': '+res.status+' '+res.responseText)
              }
            }
          )
        }
      }
    }
  )

})()
