import {TextDocument, Position, Range, Location, ProviderResult, DefinitionProvider} from 'vscode'
import * as pegjsParser from './parser'

export class PegjsDefinitionProvider implements DefinitionProvider {

    constructor() {}

    public provideDefinition(document: TextDocument, position: Position) : ProviderResult<Location> {
        const idRange = document.getWordRangeAtPosition(position)
        const id = document.getText(idRange)
        const pegjsTable = pegjsParser.parse(document.getText())
        const defLocation = pegjsTable.defs.get(id)
        if (!defLocation) {
            return undefined
        }
        const defRange = new Range(
            defLocation.start.line - 1,
            defLocation.start.column - 1,
            defLocation.end.line - 1,
            defLocation.end.column - 1
        )
        return new Location(document.uri, defRange)
    }
}
