import React, { useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";

const FILTERS = ["All", "Unread", "Groups", "Favourites"];

const MainPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [chatOpen, setChatOpen] = useState(false); // controls mobile view

  return (
    <div className="h-screen flex overflow-hidden bg-[#111B21]">
      {/* ── SIDEBAR (hidden on mobile) ── */}
      <div className="hidden md:flex w-16 lg:w-20 flex-shrink-0">
        <SideBar />
      </div>

      {/* ── CHAT LIST ── */}
      <div
        className={`
          ${chatOpen ? "hidden" : "flex"} md:flex
          flex-col w-full md:w-80 lg:w-96 flex-shrink-0
          bg-[#111B21] border-r border-[#2A3942]
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-[#202C33]">
          <div className="flex items-center gap-3">
            <img
              src="https://ui-avatars.com/api/?name=Me&background=25D366&color=fff&size=40"
              className="w-10 h-10 rounded-full"
              alt="avatar"
            />
            <h4 className="text-white font-semibold text-base hidden lg:block">
              MessageHub
            </h4>
          </div>
          <div className="flex items-center text-[#AEBAC1] gap-1">
            {[
              { icon: <FaRegSquarePlus size={20} />, label: "New Chat" },
              { icon: <BsThreeDotsVertical size={20} />, label: "Menu" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="relative group flex items-center justify-center rounded-full h-10 w-10 cursor-pointer hover:bg-[#2A3942] transition-colors"
              >
                {icon}
                <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 bg-[#1F2C34] text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2 bg-[#111B21]">
          <SearchBar />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 px-3 pb-2 overflow-x-auto scrollbar-hide bg-[#111B21]">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-4 h-8 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer ${
                activeFilter === filter
                  ? "bg-[#11432F] text-[#D9FDB3] border-[#11432F]"
                  : "text-[#8696A0] border-[#2A3942] hover:border-[#3D5360]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Chat list items (placeholder) */}
        <div className="flex-1 overflow-y-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#202C33] cursor-pointer border-b border-[#1E2A30] transition-colors"
            >
              <img
                src={`https://ui-avatars.com/api/?name=User+${i}&background=random&size=48`}
                className="w-12 h-12 rounded-full flex-shrink-0"
                alt=""
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium text-sm truncate">
                    Contact {i}
                  </span>
                  <span className="text-[#8696A0] text-xs flex-shrink-0 ml-2">
                    12:3{i} PM
                  </span>
                </div>
                <p className="text-[#8696A0] text-sm truncate mt-0.5">
                  Hey! How are you doing today?
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHAT WINDOW ── */}
      <div
        className={`
          ${chatOpen ? "flex" : "hidden"} md:flex
          flex-col flex-1 bg-[#0B141A]
        `}
        style={{
          backgroundImage: `url("https://camo.githubusercontent.com/c42c83df2fd1e442ef1e0ed69cc20d21f65308fc2f0dca2a8035360738d49c8c/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67")`,
          backgroundRepeat: "repeat",
          backgroundSize: "412px",
        }}
      >
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#202C33] flex-shrink-0">
          {/* Back button — mobile only */}
          <button
            onClick={() => setChatOpen(false)}
            className="md:hidden text-[#AEBAC1] hover:text-white transition-colors mr-1"
          >
            <FaArrowLeft size={18} />
          </button>
          <img
            src="https://ui-avatars.com/api/?name=Contact+1&background=random&size=40"
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <div className="flex-1">
            <p className="text-white font-medium text-sm">Contact 1</p>
            <p className="text-[#8696A0] text-xs">online</p>
          </div>
          <div className="flex items-center text-[#AEBAC1] gap-1">
            <div className="flex items-center justify-center rounded-full h-10 w-10 cursor-pointer hover:bg-[#2A3942] transition-colors">
              <IoSearch size={20} />
            </div>
            <div className="flex items-center justify-center rounded-full h-10 w-10 cursor-pointer hover:bg-[#2A3942] transition-colors">
              <BsThreeDotsVertical size={20} />
            </div>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
          {/* Sample messages */}
          <div className="self-start max-w-xs lg:max-w-md bg-[#202C33] text-white text-sm px-3 py-2 rounded-lg rounded-tl-none shadow">
            Hey! How are you? 👋
            <span className="block text-[#8696A0] text-xs mt-1 text-right">
              12:30 PM
            </span>
          </div>
          <div className="self-end max-w-xs lg:max-w-md bg-[#005C4B] text-white text-sm px-3 py-2 rounded-lg rounded-tr-none shadow">
            I'm doing great, thanks! What's up?
            <span className="block text-[#8696A0] text-xs mt-1 text-right">
              12:31 PM ✓✓
            </span>
          </div>
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#202C33] flex-shrink-0">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-[#2A3942] text-white text-sm placeholder-[#8696A0] rounded-lg px-4 py-2.5 outline-none"
          />
          <button className="bg-[#00A884] hover:bg-[#00C49A] transition-colors text-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0">
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
