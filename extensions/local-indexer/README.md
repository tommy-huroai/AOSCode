# Local Indexer Extension

This extension indexes the current workspace using embeddings computed from your local Ollama models. It provides basic semantic search for code files without relying on any remote service.

## Commands

- **Local Indexer: Build Index** – Generate an embedding index for supported files in the workspace.
- **Local Indexer: Search Index** – Search the index using a natural language query and open the best match.

Embeddings are stored in `.aos/index.json` at the root of your workspace.
