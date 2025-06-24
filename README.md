# SomaFM for Raycast

Browse and play [SomaFM](https://somafm.com) internet radio stations directly from Raycast.

<!-- Add a screenshot of your extension in action -->

## Features

### 🎵 Stream Playback
- **Smart Player Detection**: Automatically plays streams in your preferred media player
  - Supports IINA, VLC, and Music.app
  - Falls back to system default if no supported player is found
- **High-Quality Streams**: Uses MP3 format for best compatibility
- **Quick Feedback**: Shows loading status and confirms which player opened

### 🎨 Beautiful Interface
- **Grid View**: Visual 3-column layout with station artwork
- **List View**: Compact view with listener counts
- **Toggle Views**: Switch between grid and list with `⌘+Shift+V`
- **Station Details**: See genre, current listeners, and descriptions

### ⭐ Favorites & History
- **Favorites**: Star your favorite stations for quick access
  - Favorites appear at the top of the list
  - Toggle with `⌘+F` or the star action
  - Persists between sessions
- **Recently Played**: Automatically tracks your last 5 played stations
  - Helps you rediscover stations you enjoyed
  - Separate section for easy access

### 🔍 Smart Search
- Search by station name, genre, or description
- Prioritizes name matches for better results
- Real-time filtering as you type

### ⌨️ Keyboard Shortcuts
- `Enter` - Play selected station
- `1-9` - Quick play stations 1-9
- `⌘+F` - Toggle favorite
- `⌘+Shift+V` - Switch between grid/list view
- `⌘+C` - Copy stream URL
- `⌘+R` - Refresh station list

## Installation

1. Install [Raycast](https://www.raycast.com/) (macOS only)
2. Clone this repository
3. Run `npm install && npm run build`
4. Import the extension into Raycast

## Recommended Media Players

For the best experience, install one of these media players:
- [IINA](https://iina.io/) - Modern media player for macOS (recommended)
- [VLC](https://www.videolan.org/vlc/) - Cross-platform media player

Without these, streams will open in Music.app or your default browser.

## Usage

1. Open Raycast (`⌘+Space` by default)
2. Type "soma" or "Browse SomaFM Stations"
3. Browse stations in the grid or search for specific genres/stations
4. Press `Enter` or use number keys `1-9` to play
5. Use `⌘+F` to favorite stations you love

## About SomaFM

SomaFM is a listener-supported, commercial-free internet radio station broadcasting from San Francisco. With over 30 unique channels of underground/alternative radio, SomaFM has been serving up electronic music, indie rock, and more since 2000.

Consider [supporting SomaFM](https://somafm.com/support/) if you enjoy their stations!

## Development

This extension is built with:
- [Raycast API](https://developers.raycast.com/)
- TypeScript
- React

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` to ensure code quality
5. Submit a pull request

## License

MIT - See LICENSE file for details

## Credits

- Station data and streams provided by [SomaFM](https://somafm.com)
- Extension icon and station artwork © SomaFM
- Built with ❤️ using [Raycast](https://www.raycast.com/) 