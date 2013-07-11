/*global Backbone */

var app = app || {};

(function () {
	'use strict';

   var Workspace = Backbone.Router.extend(
     { routes:
       { '*subject': 'setSubject'
       }
     , setSubject: function(url) {
         if (url) { url = url.trim() }
         //app.subject = new app.Node({ '@id':url })
         if (app.view) {
           app.view.initialize()
           app.view.addAll()
         } else {
           //app.view = new app.SubjectView()
         }
       }
     })
   app.router = new Workspace()

})()