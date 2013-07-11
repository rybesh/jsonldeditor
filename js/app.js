/*global $ */
/*jshint unused:false */

var app = app || {}
var ENTER_KEY = 13

$(function () {
	'use strict';

  function on_graph_change(graph_id) {
    console.log('selected graph', graph_id)
    app.graph = app.graphs.get(graph_id)
    app.graph.fetch(
      { reset: true
      , success: render_object_select
      , error: function() { alert('Failed to load graph.') }
      })
  }

  function on_object_change(object_id) {
    console.log('selected object', object_id)
    app.object = app.graph.nodeobjects.get(object_id)
    app.object.fetch(
      { reset: true
      , success: render_object_editor
      , error: function() { alert('Failed to load object.') }
      })
  }

  function render_object_editor(){
    console.log(app.object)
  }

  function render_object_select(){
    console.log(app.graph.nodeobjects)
    console.log('render_object_select')
    new app.SelectView(
      { el: $('#object-select')
      , placeholder: 'select an object'
      , value: 'id'
      , label: 'id'
      , collection: app.graph.nodeobjects
      })
      .on('change', on_object_change)
      .render()
  }

  function render_graph_select() {
    new app.SelectView(
      { el: $('#graph-select')
      , placeholder: 'select a graph'
      , value: 'id'
      , label: 'id'
      , collection: app.graphs
      })
      .on('change', on_graph_change)
      .render()
  }

  app.graphs = new app.Graphs(null, {port:8080})
  app.graphs.fetch(
    { reset: true
    , success: function() {
        render_graph_select()
        Backbone.history.start()                
      }
    , error: function() { alert('Failed to read list of graphs.') }
    })

  // app.predicates = new app.Graph(
  //   [ { s: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'preferred label'
  //     }
  //   , { s: 'http://xmlns.com/foaf/0.1/name'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'name'
  //     }
  //   , { s: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'type'
  //     }
  //   , { s: 'http://www.wikidata.org/wiki/Property:P19'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'place of birth'
  //     }
  //   , { s: 'http://www.wikidata.org/wiki/Property:P17'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'country'
  //     }
  //   , { s: 'http://www.wikidata.org/wiki/Property:P298'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'ISO 3166-1 alpha-3 country code'
  //     }
  //   ], { validate: true })

  // app.objects = new app.Graph(
  //   [ { s: 'http://www.wikidata.org/wiki/Q4115712'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'Kaunas'
  //     }
  //   , { s: 'http://www.wikidata.org/wiki/Q37'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'Lithuania'
  //     }
  //   , { s: 'http://www.wikidata.org/wiki/Q215627'
  //     , p: 'http://www.w3.org/2004/02/skos/core#prefLabel'
  //     , o: 'person'
  //     }
  //   ], { validate: true })

  // new app.AutoCompleteView(
  //   { input: $('#new-p')
  //   , model: app.predicates
  //   }).render()

  // new app.AutoCompleteView(
  //   { input: $('#new-o')
  //   , model: app.objects
  //   }).render()
})
