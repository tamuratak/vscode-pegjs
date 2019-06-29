import * as vscode from 'vscode'
import {PegjsDefinitionProvider} from './definitionProvider'
import {PegjsReferenceProvider} from './referenceProvider'
import {PegjsRenameProvider} from './renameProvider'

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            { scheme: 'file', language: 'pegjs'},
            new PegjsDefinitionProvider()
        )
    )
    context.subscriptions.push(
        vscode.languages.registerReferenceProvider(
            { scheme: 'file', language: 'pegjs'},
            new PegjsReferenceProvider()
        )
    )
    context.subscriptions.push(
        vscode.languages.registerRenameProvider(
            { scheme: 'file', language: 'pegjs'},
            new PegjsRenameProvider()
        )
    )
}

export function deactivate() {}
