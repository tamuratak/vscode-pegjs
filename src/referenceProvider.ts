import {TextDocument, Position, Range, Location, ProviderResult, ReferenceProvider, ReferenceContext} from 'vscode';
import * as pegjsParser from './parser'

export class PegjsReferenceProvider implements ReferenceProvider {

    constructor() {}

    public provideReferences(document: TextDocument, position: Position, context: ReferenceContext): ProviderResult<Location[]> {
        const idRange = document.getWordRangeAtPosition(position)
        const id = document.getText(idRange)
        const pegjsTable = pegjsParser.parse(document.getText())
        const defLocation = pegjsTable.defs.get(id)
        const refLocations = pegjsTable.refs.get(id) || []
        const ret: Location[] = []

        if (!defLocation){
            return undefined
        }

        if (context.includeDeclaration) {
            const defRange = new Range(
                defLocation.start.line - 1,
                defLocation.start.column - 1,
                defLocation.end.line - 1,
                defLocation.end.column - 1
            )
            ret.push(new Location(document.uri, defRange))
        }
        for (const refLoc of refLocations) {
            const refRange = new Range(
                refLoc.start.line - 1,
                refLoc.start.column - 1,
                refLoc.end.line - 1,
                refLoc.end.column - 1
            )
            ret.push(new Location(document.uri, refRange))
        }
        return ret
    }
}