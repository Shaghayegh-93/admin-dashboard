"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { MdSearch } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const searchHandler = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", 1);
    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 300);
  return (
    <div>
      <div className="flex items-center bg-[#2e374a] p-3 gap-2 rounded-md cursor-pointer">
        <MdSearch />
        <input
          type="text"
          placeholder={placeholder}
          className="outline-none border-none bg-transparent text-text-color placeholder:text-text-color"
          onChange={searchHandler}
        />
      </div>
    </div>
  );
};

export default Search;
