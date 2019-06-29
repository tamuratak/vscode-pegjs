import * as vscode from 'vscode';
import {PegjsDefinitionProvider} from './definitionProvider'

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider(
            { scheme: 'file', language: 'pegjs'},
            new PegjsDefinitionProvider()
        )
    )
}

export function deactivate() {}
