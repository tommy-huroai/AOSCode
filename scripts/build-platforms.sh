#!/usr/bin/env bash
# Build AOSCode for multiple platforms
# Usage: build-platforms.sh [all|mac|win|web|ios]
# The script requires Node.js and npm installed.
set -e

if [[ "$OSTYPE" == "darwin"* ]]; then
    realpath() { [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"; }
    ROOT="$(dirname "$(dirname "$(realpath "$0")")")"
else
    ROOT="$(dirname "$(dirname "$(readlink -f "$0")")")"
fi

cd "$ROOT"

function ensure_deps() {
    if [ ! -d node_modules ]; then
        echo "Installing dependencies..."
        npm install
    fi
}

function build_mac() {
    echo "Building AOSCode for macOS (Apple Silicon)..."
    npx gulp vscode-darwin-arm64
    echo "macOS build available in VSCode-darwin-arm64"
}

function build_win() {
    echo "Building AOSCode for Windows 11..."
    npx gulp vscode-win32-x64
    echo "Windows build available in VSCode-win32-x64"
}

function build_web() {
    echo "Building AOSCode for the Web..."
    ./scripts/code-web.sh --host localhost --port 8080 --browser none
    echo "Web build running at http://localhost:8080/"
}

function build_ios() {
    echo "Creating iOS PWA using the Web build..."
    build_web
    echo "On your iOS device, open the URL above in Safari and choose 'Add to Home Screen'"
}

case "$1" in
    mac)
        ensure_deps
        build_mac
        ;;
    win)
        ensure_deps
        build_win
        ;;
    web)
        ensure_deps
        build_web
        ;;
    ios)
        ensure_deps
        build_ios
        ;;
    all|*)
        ensure_deps
        build_mac
        build_win
        build_web
        ;;
esac

