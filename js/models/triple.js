/*global Backbone, _ */

var app = app || {};

(function () {
	'use strict';

  app.Literal = function(value, language, type) {
    if (value instanceof Object) {
      this.json = value
    } else {
      this.json = 
        { '@value': value
        , '@language': language
        , '@type': type
        }
    }
    Object.defineProperty(this, 'value', 
      { get: function() { return this.json['@value'] }})
    Object.defineProperty(this, 'language', 
      { get: function() { return this.json['@language'] }})
    Object.defineProperty(this, 'type', 
      { get: function() { return this.json['@type'] }})
    this.toJSON = function() {
      return this.json
    }
    this.toString = function() {
      var s = '"' +  String(this.value) + '"'
      if (this.lang) {
        s += ('@' + this.language)
      } else if (this.type) {
        if (this.type.indexOf('http') === 0) {
          s += ('^^<' + this.type + '>')
        } else {
          s += ('^^' + this.type)
        }
      }
      return s
    }
  }

  var _literal_re = /^("[^"]*"|'[^']*')(@.+|\^\^.+)?$/
  app.parseLiteral = function(value) {
    var s = String(value)
      , m = _literal_re.exec(s)
    if (m) {
      if (m[2]) {
        switch (m[2].charAt(0)) {
          case '@':
            return new app.Literal({ '@value': m[1].slice(1,-1)
                   , '@language': m[2].slice(1)
                   , '@type': 'http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'
                   })
          case '^':
            if (m[2].charAt(2) === '<' && m[2].charAt(m[2].length-1) === '>') {
              return new app.Literal({ '@value': m[1].slice(1,-1)
                     , '@type': m[2].slice(3,-1)
                     })
            } else {
              return new app.Literal({ '@value': m[1].slice(1,-1)
                     , '@type': m[2].slice(2)
                     })
            }
        }
      }
      return new app.Literal({ '@value': m[1].slice(1,-1)
             , '@type': 'http://www.w3.org/2001/XMLSchema#string'
             })
    }
    var f = parseFloat(s)
    if (isNaN(f)) { return null }
    return new app.Literal({ '@value': f
           , '@type': 'http://www.w3.org/2001/XMLSchema#double'
           })
  }

	app.Triple = Backbone.Model.extend(
    { defaults: 
      { s: undefined
      , p: undefined
      , o: undefined
		  }
    , validate: function(attrs, options) {
        if (!('s' in attrs && 'p' in attrs && 'o' in attrs)) {
          return 'invalid triple: ' + attrs
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
