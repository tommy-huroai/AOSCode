# AOSDev Extension

The **AOSDev** extension integrates the AOS agentic development workflow directly into the AOSCode editor. It provides a starting point for creating and managing agents and workflows without leaving the IDE.

This initial version exposes commands to open the **AOSDev Panel**, create a placeholder agent, and select which of the built-in AOSCode agents should participate in a coding task. The panel is implemented as a webview and can be extended to host a full React/ReactFlow application for visual workflow editing.

## Commands

- **AOSDev: Open Panel** – Opens the AOSDev management panel.
- **AOSDev: Create Agent** – Prompts for a name and creates a placeholder agent entry.
- **AOSDev: Select Agents** – Choose from a list of predefined AOSCode agents. Supports multi-select to assign multiple agents to a task.

This extension is a foundation for a richer agentic development experience.
