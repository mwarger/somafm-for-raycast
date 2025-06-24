# SomaFM for Raycast

Browse and play [SomaFM](https://somafm.com) internet radio stations directly from Raycast.

<!-- Add a screenshot of your extension in action -->

## Features

### 🚀 Quick Access
- **Quick Play Shortcuts**: Create Raycast Quicklinks for instant access to favorite stations
  - Type "Play Groove Salad" directly in Raycast
  - Assign custom names and global hotkeys
  - Press `⌘+Shift+S` on any favorite station to create a shortcut
- **Menu Bar Access**: Always-visible menu bar icon shows your favorite stations
  - Click the 🎵 icon in your menu bar
  - Play any favorite station with one click
  - Updates automatically when you add/remove favorites

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
  - Shows ALL recently played stations (including favorites)
  - Stations appear in both Recently Played AND their regular section
  - Clear history with the menu action when needed
  - Helps you quickly return to stations you just discovered

### 🔍 Smart Search
- Search by station name, genre, or description
- Prioritizes name matches for better results
- Real-time filtering as you type

### 📊 Organization & Sorting
- **Sort Options**: 
  - Sort by Name (`⌘+1`) - A-Z or Z-A
  - Sort by Listeners (`⌘+2`) - Least to most or most to least
- **Genre Grouping**: Toggle genre groups with `⌘+G`
- **Station Sections**: Favorites → Recently Played → All Stations

### ⌨️ Keyboard Shortcuts
- `Enter` - Play selected station
- `1-9` - Quick play stations 1-9
- `⌘+F` - Toggle favorite
- `⌘+Shift+S` - Create quick play shortcut (favorites only)
- `⌘+Shift+C` - Copy quick play link (favorites only)
- `⌘+Shift+V` - Switch between grid/list view
- `⌘+1` - Sort by name
- `⌘+2` - Sort by listeners
- `⌘+G` - Group by genre
- `⌘+⌥+C` - Copy stream URL
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

### Browse & Play
1. Open Raycast (`⌘+Space` by default)
2. Type "soma" or "Browse SomaFM Stations"
3. Browse stations in the grid or search for specific genres/stations
4. Press `Enter` or use number keys `1-9` to play
5. Use `⌘+F` to favorite stations you love

### Quick Play Shortcuts
1. Favorite a station with `⌘+F`
2. Press `⌘+Shift+S` to create a quick play shortcut
3. Name it whatever you want (e.g., "Play Groove Salad", "Chill", "Work Music")
4. Now type that name directly in Raycast to play instantly
5. Optionally assign a global hotkey for even faster access

### Menu Bar
1. Look for the 🎵 icon in your menu bar
2. Click to see all your favorite stations
3. Click any station to play immediately
4. The menu updates automatically when you add/remove favorites

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