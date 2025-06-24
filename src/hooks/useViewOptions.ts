import { useState, useEffect } from "react";
import { LocalStorage } from "@raycast/api";

export type SortOrder = "default" | "listeners";
export type GroupBy = "none" | "genre";

interface ViewOptions {
  sortOrder: SortOrder;
  groupBy: GroupBy;
}

const VIEW_OPTIONS_KEY = "somafm-view-options";

const defaultOptions: ViewOptions = {
  sortOrder: "default",
  groupBy: "none",
};

export function useViewOptions() {
  const [viewOptions, setViewOptions] = useState<ViewOptions>(defaultOptions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadViewOptions();
  }, []);

  async function loadViewOptions() {
    try {
      const stored = await LocalStorage.getItem<string>(VIEW_OPTIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setViewOptions({ ...defaultOptions, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load view options:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateViewOptions(updates: Partial<ViewOptions>) {
    const newOptions = { ...viewOptions, ...updates };
    setViewOptions(newOptions);
    try {
      await LocalStorage.setItem(VIEW_OPTIONS_KEY, JSON.stringify(newOptions));
    } catch (error) {
      console.error("Failed to save view options:", error);
    }
  }

  function toggleSortOrder() {
    const newOrder = viewOptions.sortOrder === "default" ? "listeners" : "default";
    updateViewOptions({ sortOrder: newOrder });
  }

  function toggleGroupBy() {
    const newGroupBy = viewOptions.groupBy === "none" ? "genre" : "none";
    updateViewOptions({ groupBy: newGroupBy });
  }

  return {
    viewOptions,
    isLoading,
    toggleSortOrder,
    toggleGroupBy,
    updateViewOptions,
  };
}
