import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchStations } from "./utils/api";
import { playStation } from "./utils/player";
import { Station } from "./types/station";

export default function Command() {
  const [stations, setStations] = useState<Station[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadStations();
  }, []);

  async function loadStations() {
    setIsLoading(true);
    const fetchedStations = await fetchStations();
    setStations(fetchedStations);
    setIsLoading(false);
  }

  const filteredStations = stations
    .filter((station) => {
      const searchLower = searchText.toLowerCase();
      const nameMatch = station.title.toLowerCase().includes(searchLower);
      const genreMatch = station.genre.toLowerCase().includes(searchLower);
      const descriptionMatch = station.description.toLowerCase().includes(searchLower);

      // Prioritize name matches by returning them first
      return nameMatch || genreMatch || descriptionMatch;
    })
    .sort((a, b) => {
      // Sort by name match first, then alphabetically
      const searchLower = searchText.toLowerCase();
      const aNameMatch = a.title.toLowerCase().includes(searchLower);
      const bNameMatch = b.title.toLowerCase().includes(searchLower);

      if (aNameMatch && !bNameMatch) return -1;
      if (!aNameMatch && bNameMatch) return 1;
      return a.title.localeCompare(b.title);
    });

  return (
    <Grid
      columns={3}
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search stations by name, genre, or description..."
      throttle
    >
      {filteredStations.map((station) => (
        <Grid.Item
          key={station.id}
          content={{
            value: {
              source: station.xlimage || station.largeimage || station.image,
              fallback: Icon.Music,
            },
            tooltip: station.description,
          }}
          title={station.title}
          subtitle={station.genre}
          actions={
            <ActionPanel>
              <Action title="Play Station" onAction={() => playStation(station)} />
              <Action.CopyToClipboard
                title="Copy Stream URL"
                content={station.playlists.find((p) => p.format === "mp3")?.url || ""}
                shortcut={{ modifiers: ["cmd"], key: "c" }}
              />
              <Action
                title="Refresh Stations"
                icon={Icon.ArrowClockwise}
                onAction={loadStations}
                shortcut={{ modifiers: ["cmd"], key: "r" }}
              />
            </ActionPanel>
          }
        />
      ))}
    </Grid>
  );
}
