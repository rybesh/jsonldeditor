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
         app.subject = new app.Subject(null, { url: url })
       }
     })

   app.router = new Workspace()
   Backbone.history.start()

})()