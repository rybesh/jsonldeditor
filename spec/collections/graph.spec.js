describe('Graph collection', function(){
  describe('when instantiated', function(){
    it('should have a triples method', function(){
      var g = new app.Graph()
      expect(typeof g.triples).toEqual('function')
    })
  })
})