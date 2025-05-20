import * as vscode from 'vscode';

export class AOSDevPanel {
    public static currentPanel: AOSDevPanel | undefined;
    private disposables: vscode.Disposable[] = [];

    private constructor(
        private readonly panel: vscode.WebviewPanel
    ) {
        this.initialize();
    }

    public static createOrShow(_extensionUri: vscode.Uri): void {
        const column = vscode.ViewColumn.Beside;
        if (AOSDevPanel.currentPanel) {
            AOSDevPanel.currentPanel.panel.reveal(column);
            return;
        }
        const panel = vscode.window.createWebviewPanel(
            'aosDevPanel',
            'AOSDev Panel',
            column,
            { enableScripts: true }
        );
        AOSDevPanel.currentPanel = new AOSDevPanel(panel);
    }

    private initialize(): void {
        this.panel.webview.html = this.getHtml();
        this.panel.onDidDispose(() => this.dispose(), null, this.disposables);
    }

    private getHtml(): string {
        const nonce = getNonce();
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; script-src 'nonce-${nonce}' https:; style-src 'nonce-${nonce}' https:;">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AOSDev Panel</title>
    <style nonce="${nonce}">
        body { font-family: sans-serif; padding: 10px; }
        #root { height: 400px; border: 1px solid #ccc; }
    </style>
</head>
<body>
    <h2>AOSDev Panel</h2>
    <div id="root">Workflow editor placeholder</div>
    <script nonce="${nonce}">
        // Placeholder for React/ReactFlow app
        console.log('AOSDev panel loaded');
    </script>
</body>
</html>`;
    }

    public dispose(): void {
        AOSDevPanel.currentPanel = undefined;
        this.panel.dispose();
        while (this.disposables.length) {
            const d = this.disposables.pop();
            if (d) {
                d.dispose();
            }
        }
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
