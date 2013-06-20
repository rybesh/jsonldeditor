/*global Backbone */

var app = app || {};

(function () {
	'use strict';
	app.Statement = Backbone.Model.extend(
    { defaults: 
      { s: undefined
      , p: undefined
      , o: undefined
		  }
    , validate: function(attrs, options) {
        if (!('s' in attrs && 'p' in attrs && 'o' in attrs)) {
          return 'invalid statement: ' + attrs
        }
      }
    , label: function() {
        if (this.get('p') === 'http://www.w3.org/2004/02/skos/core#prefLabel') {
          return this.get('o')
        } else {
          return 'none'
        }
      }
    })

})()
