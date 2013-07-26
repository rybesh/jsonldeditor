An example Backbone application using the
[jsonldstore](https://github.com/rybesh/jsonldstore) API.

What it does:

1. Loads `/graphs`. There may be any number of named graphs in the
   response, but there must be at least:

   * A graph named [`/types`](https://github.com/rybesh/jsonldstore/blob/master/test/data/types.json) 
     containing labels for types.
   * For each type, there may be a empty graph named `/contexts/[TYPE]` 
     that has a context providing terms to be used with that type.
     For example, a graph named [`/contexts/person`](https://github.com/rybesh/jsonldstore/blob/master/test/data/person.json)
     would have a context with terms for the `person` type.

1. Select a graph and a node object within that graph to edit. 

1. The form field for the `@type` property of the node will display a
   select list populated with the node objects in the `/types` graph. 

1. If a term of the node object is
   [typed](http://json-ld.org/spec/latest/json-ld/#typed-values), the
   edit form will display a select list of the graph's node objects of
   that type.

1. Otherwise the edit form will display a text input.

1. New term-value pairs can be added to the node object. The select
   list of available terms is populated using the context of the appropriate
   `/contexts/[TYPE]` graph.

### TODO

1. Associate types and terms using `rdfs:range` rather than graph names.

1. Then the type-specific contexts can just be included in the `/types` graph.