"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface SearchClientProps {
  onSearch: (query: string) => void;
}

export default function SearchClient({ onSearch }: SearchClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("query") ?? "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    if (initialQuery) {
      onSearch(initialQuery);
    }
  }, [initialQuery, onSearch]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="search-container position-relative mb-5">
      <input
        type="text"
        placeholder="Search by song, artist, genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control form-control-lg pe-5"
        aria-label="Search songs"
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />
      <div
        className="search-icon position-absolute"
        style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
        onClick={handleSearch}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="#98A1BC"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
        </svg>
      </div>
    </div>
  );
}
