# AOSDev Extension

The **AOSDev** extension integrates the AOS agentic development workflow directly into the AOSCode editor. It provides a starting point for creating and managing agents and workflows without leaving the IDE.

This initial version exposes a command to open the **AOSDev Panel** and a simple command for creating an agent. The panel is implemented as a webview and can be extended to host a full React/ReactFlow application for visual workflow editing.

## Commands

- **AOSDev: Open Panel** – Opens the AOSDev management panel.
- **AOSDev: Create Agent** – Prompts for a name and creates a placeholder agent entry.

This extension is a foundation for a richer agentic development experience.

## Building

Run the helper script from the repository root to install dependencies, compile, and package the extension:

```bash
./scripts/build-aosdev-extension.sh
```
The script will compile the TypeScript sources and produce an `aos-dev.vsix` file inside the extension directory.

- **AOSDev: Select Agents** – Choose from a list of predefined AOSCode agents. Supports multi-select to assign multiple agents to a task.

