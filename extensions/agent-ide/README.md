# Agent IDE Extension

This sample extension demonstrates a minimal agent-based development cycle.
It defines six simple agents that run sequentially when the command
`Agent IDE: Start Agent Development Cycle` is executed.

Each agent currently displays an informational message. The agents are:

1. **DesignAgent** – create the initial design
2. **CodeAgent** – generate code
3. **TestAgent** – run tests
4. **ReviewAgent** – review the code
5. **BuildAgent** – build artifacts
6. **DeployAgent** – deploy the application

This extension is intended as a proof of concept for using multiple agents
to automate the development process.
