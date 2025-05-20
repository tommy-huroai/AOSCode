# AOSCode Distribution Guide

This document outlines how to build AOSCode for different platforms. The steps mirror the upstream Visual Studio Code build process with minor adjustments for AOSCode.

## Prerequisites

- **Node.js** 18 or later and `npm` available in your `PATH`.
- A POSIX shell (macOS or Linux) or PowerShell on Windows.
- For macOS and Windows builds, run the commands in a terminal with the required developer tools installed (Xcode on macOS, Visual Studio Build Tools on Windows).

## Build Steps

Clone the repository and install dependencies:

```bash
npm install
```

You can build all supported targets (macOS, Windows, and web) with:

```bash
./scripts/build-platforms.sh all
```

### macOS (Apple Silicon)

```bash
# Build the application for macOS ARM64
npx gulp vscode-darwin-arm64

# The signed application will appear in `VSCode-darwin-arm64` in the project root.
```

To create a universal build (combining x64 and ARM64), run:

```bash
npx gulp vscode-darwin-arm64
npx gulp vscode-darwin-x64
node build/darwin/create-universal-app.js .build
```

### Windows 11

```powershell
# From an elevated PowerShell prompt
npx gulp vscode-win32-x64
# Output will be in `VSCode-win32-x64`
```

For ARM64 builds use `vscode-win32-arm64` instead of `vscode-win32-x64`.

### Web

The project includes a script to start the web version locally. This is useful for testing or deploying AOSCode as a Progressive Web App (PWA).

```bash
./scripts/code-web.sh --host localhost --port 8080
```

The web server will host the application at `http://localhost:8080/`.

### iOS (iPhone/iPad)

AOSCode does not currently ship a native iOS application. You can access AOSCode on iPhone or iPad via the web build. Open the URL from the **Web** section in Safari and choose *Add to Home Screen* to install it as a PWA.

## Packaging

After running the platform-specific build tasks, the resulting directory can be zipped or packaged using standard tools. For example on macOS:

```bash
zip -r AOSCode-macOS.zip VSCode-darwin-arm64
```

For Windows you can create an installer using [Inno Setup](https://jrsoftware.org/isinfo.php) or distribute the ZIP archive directly.

## Notes

- The build tasks mirror those used by the Code - OSS project and may take some time to complete on the first run.
- Ensure you have the required native toolchains installed for each platform.
