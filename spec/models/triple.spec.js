describe('Parsing literals', function(){
  
  it('should handle qname for datatype', function() {
    var l = app.parseLiteral('"That Seventies Show"^^xsd:string')
    expect(l.value).toEqual('That Seventies Show')
    expect(l.type).toEqual('xsd:string')
    expect(l.language).toBeUndefined()
  })

  it('should handle uri for datatype', function() {
    var l = app.parseLiteral('"That Seventies Show"^^<http://www.w3.org/2001/XMLSchema#string>')
    expect(l.value).toEqual('That Seventies Show')
    expect(l.type).toEqual('http://www.w3.org/2001/XMLSchema#string')
    expect(l.language).toBeUndefined()
  })

  it('should handle no datatype', function() {
    var l = app.parseLiteral('"That Seventies Show"')
    expect(l.value).toEqual('That Seventies Show')
    expect(l.type).toEqual('http://www.w3.org/2001/XMLSchema#string')
    expect(l.language).toBeUndefined()
  })

  it('should handle language tag', function() {
    var l = app.parseLiteral('"That Seventies Show"@en')
    expect(l.value).toEqual('That Seventies Show')
    expect(l.type).toEqual('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
    expect(l.language).toEqual('en')
  })

  it('should handle single-quoted values', function() {
    var l = app.parseLiteral("'Cette Série des Années Soixante-dix'@fr")
    expect(l.value).toEqual('Cette Série des Années Soixante-dix')
    expect(l.type).toEqual('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
    expect(l.language).toEqual('fr')
  })

  it('should handle region subtags', function() {
    var l = app.parseLiteral("'Cette Série des Années Soixante-dix'@fr-be")
    expect(l.value).toEqual('Cette Série des Années Soixante-dix')
    expect(l.type).toEqual('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString')
    expect(l.language).toEqual('fr-be')
  })

  it('should handle numbers', function() {
    var l = app.parseLiteral(3)
    expect(l.value).toEqual(3)
    expect(l.type).toEqual('http://www.w3.org/2001/XMLSchema#double')
    expect(l.language).toBeUndefined()
  })

  it('should handle strings parsable as numbers', function() {
    var l = app.parseLiteral("3")
    expect(l.value).toEqual(3)
    expect(l.type).toEqual('http://www.w3.org/2001/XMLSchema#double')
    expect(l.language).toBeUndefined()
  })

  it('should return null if value cannot be parsed as a literal', function() {
    var l = app.parseLiteral("http://example.com/emma")
    expect(l).toBeNull()
  })

})