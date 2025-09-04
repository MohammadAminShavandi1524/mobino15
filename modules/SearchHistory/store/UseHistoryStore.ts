import { create, UseBoundStore, StoreApi } from "zustand";

interface SearchState {
  searches: string[];
  addSearch: (search: string) => void;
  clearSearches: () => void;
  getSearches: () => string[];
}

// cache برای singleton store ها
const searchStores: Record<string, UseBoundStore<StoreApi<SearchState>>> = {};

export const createUserSearchStore = (userId: string) => {
  if (searchStores[userId]) return searchStores[userId];

  const localStorageKey = `searchHistory_${userId}`;

  const store = create<SearchState>((set, get) => ({
    searches: JSON.parse(localStorage.getItem(localStorageKey) || "[]"),

    addSearch: (search) => {
      const trimmedSearch = search.trim();
      if (!trimmedSearch) return;

      const prev = get().searches;

      if (!prev.includes(trimmedSearch)) {
        let updated = [...prev, trimmedSearch];

        if (updated.length > 20) {
          updated = updated.slice(updated.length - 20);
        }

        localStorage.setItem(localStorageKey, JSON.stringify(updated));
        set({ searches: updated });
      }
    },

    clearSearches: () => {
      localStorage.removeItem(localStorageKey);
      set({ searches: [] });
    },

    getSearches: () => get().searches,
  }));

  searchStores[userId] = store;
  return store;
};
