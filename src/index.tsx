import { Action, ActionPanel, Grid, Icon } from "@raycast/api";
import { useEffect, useState } from "react";
import { fetchStations } from "./utils/api";
import { playStation } from "./utils/player";
import { Station } from "./types/station";
import { useFavorites } from "./hooks/useFavorites";
import { getRecentlyPlayed, RecentItem } from "./utils/storage";

export default function Command() {
  const [stations, setStations] = useState<Station[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const { isFavorite, toggleFavoriteStation } = useFavorites();

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsLoading(true);
    const [fetchedStations, recent] = await Promise.all([fetchStations(), getRecentlyPlayed()]);
    setStations(fetchedStations);
    setRecentlyPlayed(recent);
    setIsLoading(false);
  }

  // Filter stations based on search
  const filteredStations = stations.filter((station) => {
    if (!searchText) return true;

    const searchLower = searchText.toLowerCase();
    const nameMatch = station.title.toLowerCase().includes(searchLower);
    const genreMatch = station.genre.toLowerCase().includes(searchLower);
    const descriptionMatch = station.description.toLowerCase().includes(searchLower);

    return nameMatch || genreMatch || descriptionMatch;
  });

  // Separate stations into categories
  const favoriteStations = filteredStations.filter((station) => isFavorite(station.id));
  const recentStations = filteredStations.filter((station) => {
    const isRecent = recentlyPlayed.some((item) => item.stationId === station.id);
    return isRecent && !isFavorite(station.id); // Don't show in recent if already in favorites
  });
  const otherStations = filteredStations.filter((station) => {
    const isRecent = recentlyPlayed.some((item) => item.stationId === station.id);
    return !isFavorite(station.id) && !isRecent;
  });

  // Sort each category
  const sortStations = (stationList: Station[]) => {
    return stationList.sort((a, b) => {
      if (searchText) {
        const searchLower = searchText.toLowerCase();
        const aNameMatch = a.title.toLowerCase().includes(searchLower);
        const bNameMatch = b.title.toLowerCase().includes(searchLower);

        if (aNameMatch && !bNameMatch) return -1;
        if (!aNameMatch && bNameMatch) return 1;
      }
      return a.title.localeCompare(b.title);
    });
  };

  const renderStation = (station: Station) => (
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
      keywords={[station.genre, station.dj]}
      actions={
        <ActionPanel>
          <Action title="Play Station" onAction={() => playStation(station)} />
          <Action
            title={isFavorite(station.id) ? "Remove from Favorites" : "Add to Favorites"}
            icon={Icon.Star}
            onAction={() => toggleFavoriteStation(station.id, station.title)}
            shortcut={{ modifiers: ["cmd"], key: "f" }}
          />
          <Action.CopyToClipboard
            title="Copy Stream URL"
            content={station.playlists.find((p) => p.format === "mp3")?.url || ""}
            shortcut={{ modifiers: ["cmd"], key: "c" }}
          />
          <Action
            title="Refresh Stations"
            icon={Icon.ArrowClockwise}
            onAction={loadData}
            shortcut={{ modifiers: ["cmd"], key: "r" }}
          />
        </ActionPanel>
      }
    />
  );

  return (
    <Grid
      columns={3}
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search stations by name, genre, or description..."
      throttle
    >
      {favoriteStations.length > 0 && (
        <Grid.Section title="Favorites" subtitle={`${favoriteStations.length} stations`}>
          {sortStations(favoriteStations).map(renderStation)}
        </Grid.Section>
      )}

      {recentStations.length > 0 && (
        <Grid.Section title="Recently Played" subtitle={`${recentStations.length} stations`}>
          {sortStations(recentStations).map(renderStation)}
        </Grid.Section>
      )}

      {otherStations.length > 0 && (
        <Grid.Section title="All Stations" subtitle={`${otherStations.length} stations`}>
          {sortStations(otherStations).map(renderStation)}
        </Grid.Section>
      )}

      {filteredStations.length === 0 && !isLoading && (
        <Grid.EmptyView
          icon={Icon.MagnifyingGlass}
          title="No Stations Found"
          description="Try adjusting your search query"
        />
      )}
    </Grid>
  );
}
