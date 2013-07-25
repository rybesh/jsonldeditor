/*global Backbone */

var app = app || {};

(function () {
	'use strict';

   var Workspace = Backbone.Router.extend(
     { initialize: function(options) {
// Order matters! More general routes go first. --------------------------------

         this.route(/^g=(.*)$/,        'graphchange')
         this.route(/^g=(.*);s=(.*)$/, 'subjectchange')

//------------------------------------------------------------------------------
         app.graphs = new app.Graphs(null, {port:8080})
         app.graphs.on('reset', function(){
           var types = app.graphs.get('/types')
           if (types) app.types = types.nodeobjects
           Backbone.history.start()
         })
         app.graph_select = new app.SelectView(
           { el: '#graph-select'
           , placeholder: 'select a graph'
           , value: 'id'
           , label: 'id'
           , collection: app.graphs
           , reset: true
           }).on('change', function(graph_id) {
             this.navigate('g='+graph_id, {trigger:true})
           }, this)
       }

     , _change_graph: function(graph_id, callback) {
         if (app.graph && graph_id === app.graph.id)
           return window.setTimeout(function(){ callback(false) }, 0)
         if (app.subject_view) app.subject_view.remove()
         app.graph = app.graphs.get(graph_id)
         app.graph.nodeobjects.on('reset', function(){ callback(true) })
         app.graph_select.selected = graph_id
         if (app.subject_select) app.subject_select.remove()
         app.subject_select = new app.SelectView(
           { el: '#subject-select'
           , placeholder: 'select a subject'
           , value: 'id'
           , label: 'id'
           , collection: app.graph.nodeobjects
           , reset: true
           }).on('change', function(subject_id) {
             this.navigate('g='+app.graph.id+';s='+subject_id, {trigger:true})
           }, this)
       }

     , graphchange: function(graph_id) {
         this._change_graph(graph_id, function(){})
       }

     , subjectchange: function(graph_id, subject_id) {
         this._change_graph(graph_id, function(graph_changed) {
           if ((!graph_changed) && app.subject && subject_id === app.subject.id)
             return
           app.subject = app.graph.nodeobjects.get(subject_id)
           app.subject_select.selected = subject_id
           if (app.subject_view) app.subject_view.remove()
           app.subject_view = new app.SubjectView({})
         })
       }
     })

   app.router = new Workspace()

})()