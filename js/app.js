/*global $ */
/*jshint unused:false */

var app = app || {}
var ENTER_KEY = 13

$(function () {
	'use strict';

  app.predicates = new app.Graph(
    [ { s: 'http://www.w3.org/2004/02/skos/core#prefLabel'
      , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
      , o: 'preferred label'
      }
    , { s: 'http://xmlns.com/foaf/0.1/name'
      , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
      , o: 'name'
      }
    , { s: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
      , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
      , o: 'type'
      }
    , { s: 'http://www.wikidata.org/wiki/Property:P19'
      , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
      , o: 'place of birth'
      }
    , { s: 'http://www.wikidata.org/wiki/Property:P17'
      , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
      , o: 'country'
      }
    , { s: 'http://www.wikidata.org/wiki/Property:P298'
      , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
      , o: 'ISO 3166-1 alpha-3 country code'
      }
    ], { validate: true })

  new app.AutoCompleteView(
    { input: $('#new-p')
    , model: app.predicates
    }).render()
})
