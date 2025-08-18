"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const SearchBar = () => {
  function useMediaQuery(query: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;

      const media = window.matchMedia(query);
      setMatches(media.matches);

      const listener = () => setMatches(media.matches);
      media.addEventListener("change", listener);

      return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
  }

  const is_sm_mediaquery = useMediaQuery("(max-width: 640px)");

  return (
    <div className="flex h-10 w-full gap-x-4 rounded-md bg-[#f0f0f0] px-4 py-3 md:h-12 lg:h-14 lg:w-[400px] xl:w-[600px]">
      <span className="flex items-center justify-center text-xl text-gray-400 sm:text-3xl">
        <Search />
      </span>
      <input
        placeholder={
          is_sm_mediaquery
            ? "جستجو ..."
            : "محصول، برند یا دسته مورد نظرتان را جستجو کنید"
        }
        className="w-full bg-[#f0f0f0] text-[14px] focus:outline-0"
        type="text"
      />
    </div>
  );
};
export default SearchBar;
