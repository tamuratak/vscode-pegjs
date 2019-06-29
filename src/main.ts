import * as vscode from 'vscode';
import {PegjsDefinitionProvider} from './definitionProvider'
import {PegjsReferenceProvider} from './referenceProvider'

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
}

export function deactivate() {}
