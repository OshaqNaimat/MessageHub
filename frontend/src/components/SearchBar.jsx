import React, { useRef } from "react";
import { IoSearch } from "react-icons/io5";

const SearchBar = () => {
  const inputRef = useRef(null);

  return (
    <>
      <style>{`
  @keyframes comet {
    0%   { background-position: 0% 50%; }
    100% { background-position: 200% 50%; }
  }

  .search-wrapper:focus-within::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 9999px;
    background: linear-gradient(90deg, transparent 40%, #25d366, #00ffaa, transparent 60%);
    background-size: 200% 200%;
    animation: comet 1s linear infinite;
    z-index: 0;
  }

  .search-wrapper:focus-within::after {
    content: '';
    position: absolute;
    inset: 1px;
    border-radius: 9999px;
    background: #2E2F2F;
    z-index: 1;
  }

  .search-wrapper > * { position: relative; z-index: 2; }
`}</style>

      <div
        className="search-wrapper flex bg-[#2E2F2F] text-[#A4ACA4] items-center gap-3 text-lg p-2 my-1 mx-3 rounded-full relative cursor-text"
        onClick={() => inputRef.current.focus()}
      >
        <IoSearch />
        <input
          ref={inputRef}
          type="text"
          placeholder="search or start a new chat"
          className="bg-transparent w-full text-white placeholder-[#A4ACA4] focus:outline-none"
        />
      </div>
    </>
  );
};

export default SearchBar;
