import * as vscode from 'vscode';

const MODEL = 'huroai/phoenixcoder';
const INDEX_DIR = '.aos';
const INDEX_FILE = 'index.json';

export function activate(context: vscode.ExtensionContext): void {
    context.subscriptions.push(
        vscode.commands.registerCommand('localIndexer.buildIndex', buildIndex),
        vscode.commands.registerCommand('localIndexer.searchIndex', searchIndex)
    );
}

export function deactivate(): void {
    // Nothing to cleanup
}

async function buildIndex(): Promise<void> {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage('No workspace folder open');
        return;
    }
    const folder = vscode.workspace.workspaceFolders[0].uri;
    const files = await vscode.workspace.findFiles('**/*.{ts,js,py,java,go,cpp,cs,txt}', '**/node_modules/**');
    const index: { uri: string; embedding: number[] }[] = [];
    for (const file of files) {
        const data = await vscode.workspace.fs.readFile(file);
        const embedding = await getEmbedding(data.toString());
        if (embedding.length) {
            index.push({ uri: file.toString(), embedding });
        }
    }
    const dir = vscode.Uri.joinPath(folder, INDEX_DIR);
    await vscode.workspace.fs.createDirectory(dir);
    const indexUri = vscode.Uri.joinPath(dir, INDEX_FILE);
    await vscode.workspace.fs.writeFile(indexUri, Buffer.from(JSON.stringify(index, null, 2)));
    vscode.window.showInformationMessage(`Indexed ${index.length} files`);
}

async function searchIndex(): Promise<void> {
    if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage('No workspace folder open');
        return;
    }
    const query = await vscode.window.showInputBox({ prompt: 'Search the index' });
    if (!query) {
        return;
    }
    const folder = vscode.workspace.workspaceFolders[0].uri;
    const indexUri = vscode.Uri.joinPath(folder, INDEX_DIR, INDEX_FILE);
    let raw: Uint8Array;
    try {
        raw = await vscode.workspace.fs.readFile(indexUri);
    } catch {
        vscode.window.showErrorMessage('Index not found. Run Build Index first.');
        return;
    }
    const index: { uri: string; embedding: number[] }[] = JSON.parse(Buffer.from(raw).toString());
    const queryEmbedding = await getEmbedding(query);
    let best: { uri: string; score: number } | undefined;
    for (const item of index) {
        const score = cosineSimilarity(queryEmbedding, item.embedding);
        if (!best || score > best.score) {
            best = { uri: item.uri, score };
        }
    }
    if (best) {
        vscode.window.showTextDocument(vscode.Uri.parse(best.uri));
    } else {
        vscode.window.showInformationMessage('No results');
    }
}

async function getEmbedding(text: string): Promise<number[]> {
    try {
        const res = await fetch('http://localhost:11434/api/embeddings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ model: MODEL, prompt: text })
        });
        const data = await res.json();
        return data.embedding ?? [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

function cosineSimilarity(a: number[], b: number[]): number {
    let dot = 0;
    let na = 0;
    let nb = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
        dot += a[i] * b[i];
        na += a[i] * a[i];
        nb += b[i] * b[i];
    }
    if (na === 0 || nb === 0) {
        return 0;
    }
    return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
