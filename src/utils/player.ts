import { showHUD, closeMainWindow } from "@raycast/api";
import { exec } from "child_process";
import { promisify } from "util";
import { Station } from "../types/station";

const execAsync = promisify(exec);

export async function playStation(station: Station): Promise<void> {
  // Find MP3 stream URL
  const mp3Stream = station.playlists.find((playlist) => playlist.format.toLowerCase() === "mp3");

  if (!mp3Stream) {
    await showHUD(`No MP3 stream available for ${station.title}`);
    return;
  }

  try {
    // Use open command to play the stream
    await execAsync(`open "${mp3Stream.url}"`);
    await showHUD(`Playing ${station.title}`);
    await closeMainWindow();
  } catch {
    await showHUD(`Failed to play ${station.title}`);
  }
}
