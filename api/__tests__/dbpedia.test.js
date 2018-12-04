import { query, getPopulationQuery } from '../dbpedia';

describe('query', () => {
  it('resolves json of a valid response', () => {
    global.fetch = jest.fn(() => new Promise(resolve => resolve({
       status: 200,
       json: () => new Promise(resolve => resolve('result'))
     })));

    expect.assertions(1);
    return expect(query())
      .resolves.toBe('result');
  })

  it('rejects a non-200 response and returns body', () => {
    global.fetch = jest.fn(() => new Promise(resolve => resolve({
      status: 500,
      text: () => new Promise(resolve => resolve('error message'))
    })));

    expect.assertions(1);
    return expect(query())
      .rejects.toEqual({ 'message': 'error message'});
  })
});

describe('getPopulationQuery', () => {
  it('returns a valid query for a valid country', () => {
    expect(getPopulationQuery('US')).toBe(
      `SELECT * WHERE {\n\tOPTIONAL {<http://dbpedia.org/resource/United_States> dbo:populationTotal ?populationTotal.}\n}`
    )
  })

  it('returns null for an invalid country', () => {
    expect(getPopulationQuery('ZZ')).toBeNull()
  })
})
