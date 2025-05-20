# AOSCode

AOSCode is a Huro AI application built on the open-source [Code - OSS](https://github.com/microsoft/vscode) project. This repository contains the source for AOSCode along with customizations that enable agentic AI capabilities.

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

## Development Container

  AOSCode includes a Dev Container configuration. Docker or Codespaces should be provisioned with at least **4 cores and 6&nbsp;GB of RAM (8&nbsp;GB recommended)** to build the project. See [.devcontainer/README.md](.devcontainer/README.md) for details.

## Distribution

See [distribution instructions](docs/distribution.md) for steps to build the application for web, macOS, Windows and other platforms.

## License

AOSCode is provided under the [MIT](LICENSE.txt) license and is based on the MIT-licensed Code&nbsp;-&nbsp;OSS project.
