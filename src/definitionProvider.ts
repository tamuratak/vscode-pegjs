import {TextDocument, Position, Location, ProviderResult, DefinitionProvider} from 'vscode'
import * as pegjsParser from './parser'
import {tokenLocationToRange} from './rangeUtil'

export class PegjsDefinitionProvider implements DefinitionProvider {

    public provideDefinition(document: TextDocument, position: Position): ProviderResult<Location> {
        const idRange = document.getWordRangeAtPosition(position)
        const id = document.getText(idRange)
        const pegjsTable = pegjsParser.parse(document.getText())
        const defLocation = pegjsTable.defs.get(id)
        if (!defLocation) {
            return undefined
        }
        const defRange = tokenLocationToRange(defLocation)
        return new Location(document.uri, defRange)
    }
}
