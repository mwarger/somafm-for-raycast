import { LaunchProps, showHUD, closeMainWindow } from "@raycast/api";
import { playStation } from "./utils/player";
import { fetchStations } from "./utils/api";

interface PlayStationContext {
  stationId: string;
  stationName: string;
}

export default async function Command(props: LaunchProps<{ launchContext: PlayStationContext }>) {
  const { stationId, stationName } = props.launchContext || {};

  if (!stationId) {
    await showHUD("❌ No station specified");
    return;
  }

  await closeMainWindow();

  try {
    const stations = await fetchStations();
    const station = stations.find((s) => s.id === stationId);

    if (station) {
      await playStation(station);
    } else {
      await showHUD(`❌ Station not found: ${stationName}`);
    }
  } catch {
    await showHUD("❌ Failed to play station");
  }
}
