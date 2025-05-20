/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
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

// ---- inside your activate(context: vscode.ExtensionContext) ----

const selectAgentsCommand = vscode.commands.registerCommand(
  'aosDev.selectAgents',
  async () => {
    // Load agent list from marketplace.json packaged with the extension
    const marketplacePath = path.join(context.extensionPath, 'marketplace.json');
    let agents: string[] = [];

    try {
      const raw = fs.readFileSync(marketplacePath, 'utf8');
      const data = JSON.parse(raw) as Array<{ name: string }>;
      agents = data.map(a => a.name);
    } catch (err) {
      console.error('Failed to load marketplace.json', err);
    }

    if (agents.length === 0) {
      agents = ['CEO Agent']; // sensible fallback
    }

    const picks = await vscode.window.showQuickPick(agents, {
      canPickMany: true,
      placeHolder: 'Select agents for this coding task',
    });

    vscode.window.showInformationMessage(
      picks && picks.length > 0
        ? `Assigned agents: ${picks.join(', ')}`
        : 'No agents selected'
    );
  }
);

// register every command with VS Code
context.subscriptions.push(openCommand, createAgentCommand, selectAgentsCommand);
}

export function deactivate(): void {
    // Cleanup if needed
}
