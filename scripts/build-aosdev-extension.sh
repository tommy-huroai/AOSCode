#!/usr/bin/env bash
# Build the AOSDev VSCode extension
set -e

if [[ "$OSTYPE" == "darwin"* ]]; then
    realpath() { [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"; }
    ROOT="$(dirname "$(dirname "$(realpath "$0")")")"
else
    ROOT="$(dirname "$(dirname "$(readlink -f "$0")")")"
fi

EXT_NAME="aos-dev"
EXT_DIR="$ROOT/extensions/$EXT_NAME"

cd "$ROOT"

# Create the extension if it doesn't exist
if [ ! -d "$EXT_DIR" ]; then
    echo "Creating $EXT_NAME extension with yo code..."
    npx --yes yo code \
        --extensionName "$EXT_NAME" \
        --extensionDisplayName "AOSDev Tools" \
        --extensionDescription "Agentic development workflow integration for AOSCode" \
        --pkgManager npm \
        --extensionType ts \
        --no-insiders
fi

# Install dependencies for the root and extension
if [ ! -d node_modules ]; then
    npm install
fi

if [ ! -d "$EXT_DIR/node_modules" ]; then
    npm install --prefix "$EXT_DIR"
fi

# Compile the extension
npm run --prefix "$EXT_DIR" compile

# Package the extension as a VSIX
npx --yes vsce package --out "$EXT_DIR/$EXT_NAME.vsix" -C "$EXT_DIR"
