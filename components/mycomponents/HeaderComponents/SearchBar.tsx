"use client";

import { useBreakpoints } from "@/hooks/useBreakPoint";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SearchBarmodal from "./SearchBarmodal";

interface SearchbarProps {
  userName?: string;
  isSearchBarModalOpened: boolean;
  setIsSearchBarModalOpened: Dispatch<SetStateAction<boolean>>;
}

const SearchBar = ({
  isSearchBarModalOpened,
  setIsSearchBarModalOpened,
  userName,
}: SearchbarProps) => {
  const { sm } = useBreakpoints();
  const [inputValue, setInputValue] = useState("");

  const handleSearchBarOpen = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setIsSearchBarModalOpened(true);
  };

  useEffect(() => {
    setInputValue("");
  }, [isSearchBarModalOpened]);

  return (
    <>
      <SearchBarmodal
        userName={userName}
        isSearchBarModalOpened={isSearchBarModalOpened}
        setIsSearchBarModalOpened={setIsSearchBarModalOpened}
      />

      <div
        onClick={() => handleSearchBarOpen()}
        className="relative flex h-10 w-full gap-x-4 rounded-md bg-[#f0f0f0] px-4 py-3 md:h-12 lg:h-14 lg:w-[460px] xl:w-[600px]"
      >
        <span className="flex items-center justify-center text-xl text-gray-400 sm:text-3xl">
          <Search />
        </span>
        <input
          placeholder={
            !sm ? "جستجو ..." : "محصول، برند یا دسته مورد نظرتان را جستجو کنید"
          }
          className="w-full bg-[#f0f0f0] text-[14px] focus:outline-0"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </>
  );
};
export default SearchBar;
