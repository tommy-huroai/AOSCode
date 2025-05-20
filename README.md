# AOSCode

AOSCode is a Huro AI application built on the open-source [Code - OSS](https://github.com/microsoft/vscode) project. This repository contains the source for AOSCode along with customizations that enable agentic AI capabilities.

## Development Setup

1. Install **Node.js 18** or later and ensure `npm` is available in your `PATH`.
2. Clone this repository and install dependencies:

   ```bash
   npm install
   ```

3. Launch the desktop version in development mode:

   ```bash
   ./scripts/code.sh
   ```

   The first run downloads the Electron runtime and built‑in extensions.

### Building AOSCode

Use the helper script to build binaries for multiple platforms:

```bash
./scripts/build-platforms.sh all
```

Individual targets (`mac`, `win`, `web`, or `ios`) can be specified in place of `all`.

### Using Agents

Two sample extensions demonstrate AOSCode's agentic capabilities:

- **Agent IDE** – open the Command Palette and run `Agent IDE: Start Agent Development Cycle` or `Agent IDE: Open Agent Chat` to see a chain of six agents (Design, Code, Test, Review, Build, Deploy) process your prompt.
- **AOSDev** – run `AOSDev: Open Panel` to manage agents or `AOSDev: Create Agent` to scaffold a new one. To package this extension separately execute `./scripts/build-aosdev-extension.sh`.

See the [Agent Marketplace](docs/agent_marketplace.md) for additional built‑in agents.

## Ollama Integration

AOSCode can run a variety of open-source models locally via [Ollama](https://ollama.com). Quick-start models include:

* **huroai/phoenix-r1** ([HuggingFace](https://huggingface.co/huro-ai/phoenix-r1), [Ollama](https://ollama.com/huroai/phoenix-r1))
* **huroai/gabi-master-dev** ([HuggingFace](https://huggingface.co/huro-ai/gabi-master-dev), [Ollama](https://ollama.com/huroai/gabi-master-dev))
* **huroai/beehuroai** ([HuggingFace](https://huggingface.co/huro-ai/beehuroai), [Ollama](https://ollama.com/huroai/beehuroai))
* **huroai/little-huro** ([HuggingFace](https://huggingface.co/huro-ai/little-huro), [Ollama](https://ollama.com/huroai/little-huro))
* **huroai/beehuroai-vision** ([HuggingFace](https://huggingface.co/huro-ai/beehuroai-vision), [Ollama](https://ollama.com/huroai/beehuroai-vision))
 * **huroai/huroai-agent** ([HuggingFace](https://huggingface.co/huro-ai/huroai-agent), [Ollama](https://ollama.com/huroai/huroai-agent))
 * **huroai/phoenixcoder** ([HuggingFace](https://huggingface.co/huro-ai/phoenixcoder), [Ollama](https://ollama.com/huroai/phoenixcoder))
* **AOSM (custom)** – see [AOSM model training guide](docs/AOSM_model_training.md) for instructions

## Agent Marketplace

Browse the [Huro AI Agent Marketplace](docs/agent_marketplace.md) to discover built‑in
agents. Each entry lists the agent's purpose and a themed logo idea so you can
customize visuals for your workflow.

## Development Container

  AOSCode includes a Dev Container configuration. Docker or Codespaces should be provisioned with at least **4 cores and 6&nbsp;GB of RAM (8&nbsp;GB recommended)** to build the project. See [.devcontainer/README.md](.devcontainer/README.md) for details.

## Distribution

See [distribution instructions](docs/distribution.md) for steps to build the application for web, macOS, Windows and other platforms.

## License

AOSCode is provided under the [MIT](LICENSE.txt) license and is based on the MIT-licensed Code&nbsp;-&nbsp;OSS project.
