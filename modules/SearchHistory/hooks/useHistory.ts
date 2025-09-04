import { useEffect, useState } from "react";
import { createUserSearchStore } from "../store/UseHistoryStore";
import { getGuestId } from "@/modules/checkout/hooks/useCart";

export const migrateGuestSearchToUser = (userName: string) => {
  const guestId = getGuestId();
  const guestStore = createUserSearchStore(guestId).getState();
  const userStore = createUserSearchStore(userName).getState();

  const guestSearches = guestStore.getSearches();
  const userSearches = userStore.getSearches();

  const mergedSearches = Array.from(
    new Set([...userSearches, ...guestSearches]),
  );

  guestStore.clearSearches();

  localStorage.removeItem("guest_id");

  const userKey = `searchHistory_${userName}`;
  localStorage.setItem(userKey, JSON.stringify(mergedSearches));

  mergedSearches.forEach((search) => userStore.addSearch(search));
};

export const useSearch = (userName?: string) => {
  const finalUserName = userName || getGuestId();
  const [store] = useState(() => createUserSearchStore(finalUserName));

  const [searches, setSearches] = useState<string[]>(
    store.getState().getSearches(),
  );

  useEffect(() => {
    const unsubscribe = store.subscribe((state) => {
      setSearches(state.getSearches());
    });
    return () => unsubscribe();
  }, [store]);

  return {
    searches,
    addSearch: (search: string) => store.getState().addSearch(search),
    clearSearches: () => store.getState().clearSearches(),
    getSearches: () => store.getState().getSearches(),
    migrateGuestToUser: (userName: string) =>
      migrateGuestSearchToUser(userName),
  };
};
