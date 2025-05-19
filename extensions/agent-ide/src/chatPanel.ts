import * as vscode from 'vscode';

export class ChatPanel {
    public static currentPanel: ChatPanel | undefined;
    private disposables: vscode.Disposable[] = [];

    private constructor(
        private readonly panel: vscode.WebviewPanel,
        private readonly extensionUri: vscode.Uri
    ) {
        this.initialize();
    }

    public static createOrShow(extensionUri: vscode.Uri): void {
        const column = vscode.ViewColumn.Beside;
        if (ChatPanel.currentPanel) {
            ChatPanel.currentPanel.panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel(
            'agentChat',
            'Agent Chat',
            column,
            { enableScripts: true }
        );
        ChatPanel.currentPanel = new ChatPanel(panel, extensionUri);
    }

    private initialize(): void {
        this.panel.webview.html = this.getHtml();
        this.panel.webview.onDidReceiveMessage(
            message => {
                if (message.command === 'prompt') {
                    this.runAgents(message.text);
                }
            },
            undefined,
            this.disposables
        );
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    }

    private async runAgents(prompt: string): Promise<void> {
        const agents = [
            'DesignAgent',
            'CodeAgent',
            'TestAgent',
            'ReviewAgent',
            'BuildAgent',
            'DeployAgent'
        ];

        for (const agent of agents) {
            const response = await callOllama(`${agent}: ${prompt}`);
            this.panel.webview.postMessage({ agent, response });
        }
    }

    private getHtml(): string {
        const nonce = getNonce();
        const scriptUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.js'));
        const styleUri = this.panel.webview.asWebviewUri(vscode.Uri.joinPath(this.extensionUri, 'media', 'chat.css'));
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}';">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link nonce="${nonce}" href="${styleUri}" rel="stylesheet" />
    <title>Agent Chat</title>
</head>
<body>
    <div id="messages"></div>
    <form id="form">
        <input type="text" id="prompt" placeholder="Enter request" />
        <button type="submit">Send</button>
    </form>
    <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
</html>`;
    }

    public dispose(): void {
        ChatPanel.currentPanel = undefined;
        this.panel.dispose();
        while (this.disposables.length) {
            const d = this.disposables.pop();
            if (d) {
                d.dispose();
            }
        }
    }
}

async function callOllama(prompt: string): Promise<string> {
    try {
        const res = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: 'huroai/huroai-agent', prompt, stream: false })
        });
        const data = await res.json();
        return data.response ?? '';
    } catch (err) {
        console.error(err);
        return String(err);
    }
}

function getNonce(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
