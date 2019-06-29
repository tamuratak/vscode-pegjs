import * as assert from 'assert'
import * as pegjsParser from '../src/parser'

suite('latexParser', () => {
    suite('parse', () => {
        test('parse a simple pegjs grammar.', () => {
            const grammar = `
root = abc
abc = "abc"
            `
            const ret = pegjsParser.parse(grammar)
            assert.ok(ret.defs)
            assert.ok(ret.defs.has('root'))
            assert.ok(ret.defs.has('abc'))
            assert.ok(ret.refs)
            assert.ok(ret.refs.has('abc'))
        })
    })
})
