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

    const selectAgentsCommand = vscode.commands.registerCommand('aosDev.selectAgents', async () => {
        const agents = [
            'CEO Agent',
            'COO Agent',
            'CTO Agent',
            'CFO Agent',
            'CMO Agent',
            'TechWorker',
            'SupportBot',
            'EscalationBot',
            'RefundAgent',
            'Compliance',
            'SecurityAuditor',
            'ProjectManager',
            'TaskRouter',
            'Development Team',
            'Design Team',
            'Quality Assurance'
        ];

        const picks = await vscode.window.showQuickPick(agents, {
            canPickMany: true,
            placeHolder: 'Select agents for this coding task'
        });

        if (picks && picks.length > 0) {
            vscode.window.showInformationMessage(`Assigned agents: ${picks.join(', ')}`);
        } else {
            vscode.window.showInformationMessage('No agents selected');
        }
    });

    context.subscriptions.push(openCommand, createAgentCommand, selectAgentsCommand);
}

export function deactivate(): void {
    // Cleanup if needed
}
