"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiSearch } from "react-icons/ci";
import {
  clearSearch,
  fetchSearchResults,
} from "@/app/store/slices/searchSlice";
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { loading, category, products } = useSelector((state) => state.search);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(fetchSearchResults(query));
    } else {
      dispatch(clearSearch());
    }
  };
  return (
    <>
      <div className="relative w-100">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="w-full bg-white p-3 pr-24 rounded-md shadow-2xl"
        />
        <button
          onClick={handleSearch}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 topbar-btn text-white shadow-2xl flex items-cente transition"
        >
          <CiSearch size={22} className="mr-1" />{" "}
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
     
    </>
  );
};

export default SearchBar;
