describe('Graph collection: ', function(){

  describe('when instantiated', function(){
    it('should have a triples method', function(){
      var g = new app.Graph()
      expect(typeof g.triples).toEqual('function')
    })
  })

  describe('when instantiated without a url', function(){
    it('should use the default store', function(){
      var g = new app.Graph()
      expect(g.localStorage.name).toEqual('|default|')
    })
  })

  describe('when instantiated with a url', function(){
    it('should use a store named with that url', function(){
      var g = new app.Graph(null, {url:'http://example.com/g1'})
      expect(g.localStorage.name).toEqual('http://example.com/g1')
    })
  })

  describe('when a null pattern is passed to triples()', function(){
    it('should return all triples', function(){
      var g = new app.Graph()
      g.create({s:'s1',p:'p1',o:'o1'})
      g.create({s:'s1',p:'p2',o:'o2'})
      expect(g.triples(null).length).toBeDefined()
      expect(g.triples(null).length).toEqual(2)
      g.clear()
    })
  })

  describe('when a non-Triple is passed to triples()', function(){
    it('should throw a TypeError', function(){
      var g = new app.Graph()
      expect(function(){ g.triples({s:null,p:null,o:null}) }).toThrow()
    })
  })

  describe('when an empty pattern is passed to triples()', function(){
    it('should return all triples', function(){
      var g = new app.Graph()
        , p = new app.Triple({s:null,p:null,o:null})
      g.create({s:'s1',p:'p1',o:'o1'})
      g.create({s:'s1',p:'p2',o:'o2'})
      expect(g.triples(p).length).toBeDefined()
      expect(g.triples(p).length).toEqual(2)
      g.clear()
    })
  })

  describe('when a pattern is passed to triples(), ', function(){
    beforeEach(function(){
      this.g = new app.Graph()
      this.g.create({s:'s1',p:'p1',o:'o1'})
      this.g.create({s:'s1',p:'p2',o:'o2'})
    })
    afterEach(function(){
      this.g.clear()
    })
    describe('and there are no matches, ', function(){
      it('should return an empty set', function(){
        var p = new app.Triple({s:'s3',p:'p3',o:'o3'})
        expect(this.g.triples(p).length).toBeDefined()
        expect(this.g.triples(p).length).toEqual(0)
      })
    })
    describe('and there is an exact match', function(){
      it('should return a set of size one', function(){
        var p = new app.Triple({s:'s1',p:'p1',o:'o1'})
        expect(this.g.triples(p).length).toBeDefined()
        expect(this.g.triples(p).length).toEqual(1)
        expect(this.g.triples(p)[0].get('s')).toEqual(p.get('s'))
        expect(this.g.triples(p)[0].get('p')).toEqual(p.get('p'))
        expect(this.g.triples(p)[0].get('o')).toEqual(p.get('o'))
      })
    })
    describe('and there is a match on subject', function(){
      it('should return a set of triples with that subject', function(){
        var p = new app.Triple({s:'s1'})
        expect(this.g.triples(p).length).toBeDefined()
        expect(this.g.triples(p).length).toEqual(2)
        expect(this.g.triples(p).every(function(t){
          return (t.get('s') === p.get('s')) })).toBe(true)
      })
    })
    describe('and there is a match on predicate', function(){
      it('should return a set of triples with that predicate', function(){
        var p = new app.Triple({p:'p1'})
        expect(this.g.triples(p).length).toBeDefined()
        expect(this.g.triples(p).length).toEqual(1)
        expect(this.g.triples(p).every(function(t){
          return (t.get('p') === p.get('p')) })).toBe(true)
      })
    })
    describe('and there is a match on subject+object', function(){
      it('should return a set of triples with that subject+object', function(){
        var p = new app.Triple({s:'s1',o:'o2'})
        expect(this.g.triples(p).length).toBeDefined()
        expect(this.g.triples(p).length).toEqual(1)
        expect(this.g.triples(p).every(function(t){
          return (t.get('s') === p.get('s') && 
                  t.get('o') === p.get('o')) })).toBe(true)
      })
    })
    describe('and there is a match on object', function(){
      it('should return a set of triples with that object', function(){
        var p = new app.Triple({o:'o1'})
        expect(this.g.triples(p).length).toBeDefined()
        expect(this.g.triples(p).length).toEqual(1)
        expect(this.g.triples(p).every(function(t){
          return (t.get('o') === p.get('o')) })).toBe(true)
      })
    })
  })

  describe('when get() is called with a triple, ', function(){
    beforeEach(function(){
      this.g = new app.Graph()
      this.g.create({s:'s1',p:'p1',o:'o1'})
      this.g.create({s:'s1',p:'p2',o:'o2'})
    })
    afterEach(function(){
      this.g.clear()
    })
    describe('and there is a match, ', function(){
      it('should return the matching triple', function(){
        var t = this.g.get(new app.Triple({s:'s1',p:'p2',o:'o2'}))
        expect(t).not.toBe(null)
        expect(t.get('s')).toEqual('s1')
        expect(t.get('p')).toEqual('p2')
        expect(t.get('o')).toEqual('o2')
      })
    })
    describe('and there is no match, ', function(){
      it('should return void 0', function(){
        var t = this.g.get(new app.Triple({s:'s3',p:'p3',o:'o3'}))
        expect(t).toBe(void 0)
      })
    })
    describe('and there are multiple matches, ', function(){
      it('should return void 0', function(){
        var t = this.g.get(new app.Triple({s:'s3',p:'p3',o:'o3'}))
        expect(t).toBe(void 0)
      })
    })
  })

  describe('if we try to add an existing triple, ', function(){
    it('should have no effect', function(){
      var g = new app.Graph()
      g.create({s:'s1',p:'p1',o:'o1'})
      g.create({s:'s1',p:'p2',o:'o2'})
      expect(g.length).toEqual(2)
      g.create({s:'s1',p:'p1',o:'o1'})
      expect(g.length).toEqual(2)
      g.clear()
    })
  })


})