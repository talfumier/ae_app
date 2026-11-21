import { Parser, Store } from 'n3'
import { QueryEngine } from '@comunica/query-sparql-rdfjs'
import turtle from '../data/data.ttl?raw'

const parser = new Parser()
const store = new Store(parser.parse(turtle))
const engine = new QueryEngine()

export async function executeQuery(query) {
  const stream = await engine.queryBindings(query, {
    sources: [store],
  })

  const bindings = await stream.toArray()

  return bindings.map((binding) =>
    Object.fromEntries(Array.from(binding, ([key, value]) => [key.value, value.value])),
  )
}
