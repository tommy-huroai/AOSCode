/*---------------------------------------------------------
 * AOSDev Extension - Provides agent and workflow utilities
 *--------------------------------------------------------*/
import * as vscode from 'vscode';
import { AOSDevPanel } from './panel';

export function activate(context: vscode.ExtensionContext): void {
    const openCommand = vscode.commands.registerCommand('aosDev.openPanel', () => {
        AOSDevPanel.createOrShow(context.extensionUri);
    });

    const createAgentCommand = vscode.commands.registerCommand('aosDev.createAgent', async () => {
        const name = await vscode.window.showInputBox({ prompt: 'Enter agent name' });
        if (name) {
            vscode.window.showInformationMessage(`Creating agent "${name}" (placeholder).`);
        }
    });

    context.subscriptions.push(openCommand, createAgentCommand);
}

export function deactivate(): void {
    // Cleanup if needed
}
