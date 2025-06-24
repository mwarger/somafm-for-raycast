import { showHUD, closeMainWindow, showToast, Toast } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import { Station } from "../types/station";

const execAsync = promisify(exec);

async function checkPlayerInstalled(player: string): Promise<boolean> {
  try {
    await execAsync(`which ${player}`);
    return true;
  } catch {
    return false;
  }
}

async function getDirectStreamUrl(plsUrl: string): Promise<string | null> {
  try {
    const response = await fetch(plsUrl);
    const plsContent = await response.text();

    // Parse PLS file to find first stream URL
    const match = plsContent.match(/File1=(.*)/);
    if (match && match[1]) {
      return match[1].trim();
    }
  } catch (error) {
    console.error("Failed to parse PLS file:", error);
  }
  return null;
}

export async function playStation(station: Station): Promise<void> {
  // Find MP3 stream URL
  const mp3Stream = station.playlists.find((playlist) => playlist.format.toLowerCase() === "mp3");

  if (!mp3Stream) {
    await showHUD(`No MP3 stream available for ${station.title}`);
    return;
  }

  try {
    // Show loading toast
    await showToast({
      style: Toast.Style.Animated,
      title: `Opening ${station.title}...`,
    });

    // Try different playback methods

    // Method 1: Try IINA (popular macOS media player)
    if (await checkPlayerInstalled("iina")) {
      await execAsync(`iina "${mp3Stream.url}"`);
      await showHUD(`Playing ${station.title} in IINA`);
      await closeMainWindow();
      return;
    }

    // Method 2: Try VLC
    if (await checkPlayerInstalled("vlc")) {
      await execAsync(`vlc "${mp3Stream.url}" --intf dummy --play-and-exit`);
      await showHUD(`Playing ${station.title} in VLC`);
      await closeMainWindow();
      return;
    }

    // Method 3: Try to get direct stream URL and use Music.app
    const directUrl = await getDirectStreamUrl(mp3Stream.url);
    if (directUrl) {
      // Try opening direct stream URL in Music.app
      await execAsync(`open -a "Music" "${directUrl}"`);
      await showHUD(`Playing ${station.title} in Music`);
      await closeMainWindow();
      return;
    }

    // Method 4: Fallback to default behavior (will likely download)
    await execAsync(`open "${mp3Stream.url}"`);
    await showHUD(`Opening ${station.title}`);
    await closeMainWindow();
  } catch (error) {
    await showToast({
      style: Toast.Style.Failure,
      title: `Failed to play ${station.title}`,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
