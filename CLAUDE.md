# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Raycast extension for playing SomaFM radio stations. Raycast is a macOS productivity launcher that allows custom extensions.

## Development Commands

```bash
npm run dev        # Start development mode (hot-reload)
npm run build      # Build the extension
npm run lint       # Run ESLint
npm run fix-lint   # Auto-fix linting issues
npm run publish    # Publish to Raycast Store
```

## Architecture

### Extension Structure
- **Commands**: Extensions expose functionality through commands defined in `package.json`
- **Entry Points**: Each command maps to a TypeScript file in `src/` (e.g., `play-synpheara` → `src/play-synpheara.ts`)
- **Modes**: Commands can run in different modes:
  - `no-view`: Executes without UI (current implementation)
  - `view`: Shows a UI window
  - `menu-bar`: Adds to menu bar

### Current Implementation Status
The extension is in early development. The `play-synpheara` command currently only copies the date to clipboard - it doesn't actually play any radio station yet.

### Raycast API Patterns
- Import from `@raycast/api` for UI components and utilities
- Use `showHUD()` for quick notifications
- Commands export a default async function as entry point
- TypeScript with strict mode is enforced

## Adding SomaFM Functionality

To implement actual radio playback:
1. Commands will need to use system audio players (e.g., via `open` command or AppleScript)
2. SomaFM provides streaming URLs at https://somafm.com/channels.json
3. Consider adding a list view to browse/search stations instead of individual commands per station