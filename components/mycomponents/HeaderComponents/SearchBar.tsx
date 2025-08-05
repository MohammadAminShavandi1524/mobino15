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
    <div className="flex gap-x-4 w-full  lg:w-[400px] xl:w-[600px] rounded-md bg-[#f0f0f0] h-10 md:h-12 lg:h-14  px-4 py-3">
      <span className="text-xl sm:text-3xl text-gray-400">
        <Search />
      </span>
      <input
        placeholder={
          is_sm_mediaquery
            ? "جستجو ..."
            : "محصول، برند یا دسته مورد نظرتان را جستجو کنید"
        }
        className="bg-[#f0f0f0] w-full text-[14px] focus:outline-0"
        type="text"
      />
    </div>
  );
};
export default SearchBar;
