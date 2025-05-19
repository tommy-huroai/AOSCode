/*---------------------------------------------------------
 * Agent IDE Extension - Demonstrates a simple agent based
 * development cycle consisting of six agents.
 *--------------------------------------------------------*/
import * as vscode from 'vscode';
import { ChatPanel } from './chatPanel';

interface Agent {
    name: string;
    run(): Promise<void>;
}

class DesignAgent implements Agent {
    name = 'DesignAgent';
    async run(): Promise<void> {
        vscode.window.showInformationMessage('DesignAgent: generating design...');
    }
}

class CodeAgent implements Agent {
    name = 'CodeAgent';
    async run(): Promise<void> {
        vscode.window.showInformationMessage('CodeAgent: writing code...');
    }
}

class TestAgent implements Agent {
    name = 'TestAgent';
    async run(): Promise<void> {
        vscode.window.showInformationMessage('TestAgent: running tests...');
    }
}

class ReviewAgent implements Agent {
    name = 'ReviewAgent';
    async run(): Promise<void> {
        vscode.window.showInformationMessage('ReviewAgent: reviewing code...');
    }
}

class BuildAgent implements Agent {
    name = 'BuildAgent';
    async run(): Promise<void> {
        vscode.window.showInformationMessage('BuildAgent: building artifacts...');
    }
}

class DeployAgent implements Agent {
    name = 'DeployAgent';
    async run(): Promise<void> {
        vscode.window.showInformationMessage('DeployAgent: deploying application...');
    }
}

const agents: Agent[] = [
    new DesignAgent(),
    new CodeAgent(),
    new TestAgent(),
    new ReviewAgent(),
    new BuildAgent(),
    new DeployAgent()
];

export function activate(context: vscode.ExtensionContext): void {
    const startCommand = vscode.commands.registerCommand('agentIDE.startDevelopmentCycle', async () => {
        for (const agent of agents) {
            await agent.run();
        }
        vscode.window.showInformationMessage('Agent development cycle completed.');
    });

    context.subscriptions.push(startCommand);

    const chatCommand = vscode.commands.registerCommand('agentIDE.openChat', () => {
        ChatPanel.createOrShow(context.extensionUri);
    });

    context.subscriptions.push(chatCommand);
}

export function deactivate(): void {
    // Clean up resources if necessary
}
