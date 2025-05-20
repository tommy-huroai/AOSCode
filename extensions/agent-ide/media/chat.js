/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
(function() {
    const vscode = acquireVsCodeApi();
    const form = document.getElementById('form');
    const input = document.getElementById('prompt');
    const messages = document.getElementById('messages');

    form.addEventListener('submit', event => {
        event.preventDefault();
        const text = input.value.trim();
        if (text) {
            appendMessage('User', text);
            vscode.postMessage({ command: 'prompt', text });
            input.value = '';
        }
    });

    window.addEventListener('message', event => {
        const { agent, response } = event.data;
        appendMessage(agent, response);
    });

    function appendMessage(sender, text) {
        const div = document.createElement('div');
        div.textContent = `${sender}: ${text}`;
        messages.appendChild(div);
        messages.scrollTop = messages.scrollHeight;
    }
})();
