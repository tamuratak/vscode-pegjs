import {Range, Location} from 'vscode'
import * as parser from './parser'

export function tokenLocationToRange(loc: parser.Location): Range {
    return new Range(
        loc.start.line - 1,
        loc.start.column - 1,
        loc.end.line - 1,
        loc.end.column - 1
    )
}

export function uniqueLocations(locationArray: Location[]): Location[] {
    const result: Location[] = []
    for (const loc of locationArray) {
        const range = loc.range
        let hasIntersection = false
        for (const cur of result) {
            hasIntersection = cur.range.intersection(range) ? true : hasIntersection
        }
        if (!hasIntersection) {
            result.push(loc)
        }
    }
    return result
}
