import {TextDocument, Position, Location, ProviderResult, WorkspaceEdit, RenameProvider} from 'vscode'
import * as pegjsParser from './parser'
import {tokenLocationToRange, uniqueLocations} from './rangeUtil'

export class PegjsRenameProvider implements RenameProvider {

    public provideRenameEdits(document: TextDocument, position: Position, newName: string): ProviderResult<WorkspaceEdit> {
        const idRange = document.getWordRangeAtPosition(position)
        const id = document.getText(idRange)
        const pegjsTable = pegjsParser.parse(document.getText())
        const defLocation = pegjsTable.defs.get(id)
        const refLocations = pegjsTable.refs.get(id) || []
        let result: Location[] = []

        if (!defLocation) {
            return undefined
        }
        const defRange = tokenLocationToRange(defLocation)
        result.push(new Location(document.uri, defRange))
        for (const refLoc of refLocations) {
            const range = tokenLocationToRange(refLoc)
            result.push(new Location(document.uri, range))
        }
        result = uniqueLocations(result)
        let flag = false
        for (const loc of result) {
            flag = flag || loc.range.contains(position)
        }
        if (!flag) {
            return undefined
        }
        const edit = new WorkspaceEdit()
        for (const loc of result) {
            edit.replace(loc.uri, loc.range, newName)
        }
        return edit
    }
}

