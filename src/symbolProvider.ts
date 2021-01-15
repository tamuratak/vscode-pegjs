import {TextDocument, DocumentSymbolProvider, SymbolInformation, SymbolKind} from 'vscode'
import * as pegjsParser from './parser'
import {tokenLocationToRange} from './rangeUtil'


export class PegjsSymbolProvider implements DocumentSymbolProvider {

    provideDocumentSymbols(document: TextDocument) {
        const pegjsTable = pegjsParser.parse(document.getText())
        const defMap = pegjsTable.defs
        const result: SymbolInformation[] = []
        for (const [name, loc] of defMap) {
            const defRange = tokenLocationToRange(loc)
            const sym = new SymbolInformation(name, SymbolKind.Constant, defRange)
            result.push(sym)
        }
        return result
    }
}
