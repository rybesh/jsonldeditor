/*global Backbone, _ */

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

    , get: function(obj) {
        if (obj == null) { return void 0; }
        if (obj instanceof app.Triple) {
          var matches = this.triples(obj)
          if (matches.length === 1) {
            return matches.at(0)
          }
        }
        return this._byId[obj.id != null ? obj.id : obj.cid || obj];
      }

      // Returns triples that match the given triple pattern.
    , triples: function(pattern) {
        if (!(pattern instanceof app.Triple)) {
          throw new TypeError('pattern must be an app.Triple');
        }        
        return this.filter(function (triple) {
          return (! _.find(['s','p','o'], function (x) {
            // Looking for misses.
            if (! pattern.get('x')) {
              // undefined or null means accept anything, i.e. not a miss.
              return false
            }
            if (triple.get('x') == pattern.get('x')) {
              return false
            }
            return true
          }))
        })
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
