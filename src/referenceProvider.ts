import {TextDocument, Position, Location, ProviderResult, ReferenceProvider, ReferenceContext} from 'vscode'
import * as pegjsParser from './parser'
import {tokenLocationToRange, uniqueLocations} from './rangeUtil'

export class PegjsReferenceProvider implements ReferenceProvider {

    public provideReferences(document: TextDocument, position: Position, context: ReferenceContext): ProviderResult<Location[]> {
        const idRange = document.getWordRangeAtPosition(position)
        const id = document.getText(idRange)
        const pegjsTable = pegjsParser.parse(document.getText())
        const defLocation = pegjsTable.defs.get(id)
        const refLocations = pegjsTable.refs.get(id) || []
        const ret: Location[] = []

        if (!defLocation) {
            return undefined
        }

        if (context.includeDeclaration) {
            const defRange = tokenLocationToRange(defLocation)
            ret.push(new Location(document.uri, defRange))
        }
        for (const refLoc of refLocations) {
            const refRange = tokenLocationToRange(refLoc)
            ret.push(new Location(document.uri, refRange))
        }
        return uniqueLocations(ret)
    }
}
