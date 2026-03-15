import React, { useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";

import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/Sidebar";

const MainPage = () => {
  const [Green, setGreen] = useState(false);
  return (
    <>
      <div className="grid grid-cols-12 ">
        {/* side area */}
        <SideBar />
        {/* all chats */}
        <div className="col-span-5 bg-[#161717]">
          <div className="container flex justify-between items-center p-5">
            <h4 className="text-2xl text-white font-semibold">MessageHub</h4>
            <div className="flex items-center justify-center text-white gap-3">
              <div className="relative group hover:bg-[#282929] flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
                <FaRegSquarePlus size={20} />
                <span className="absolute left-full ml-3 px-2 py-1 bg-[#282929] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  New Chat
                </span>
              </div>
              <div className="relative group hover:bg-[#282929] flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
                <BsThreeDotsVertical size={20} />
                <span className="absolute left-full ml-3 px-2 py-1 bg-[#282929] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Menu
                </span>
              </div>
            </div>
          </div>
          <SearchBar />
          <div className="flex p-2 container gap-2">
            <div
              onClick={() => setGreen(true)}
              className={`w-14 h-10  font-semibold border border-gray-500 flex items-center justify-center rounded-full cursor-pointer ${setGreen ? "bg-[#11432F] text-[#D9FDB3]" : "text-[#A4ACA4]"}`}
            >
              All
            </div>
            <div
              onClick={() => setGreen(true)}
              className={`w-20 h-10  font-semibold border border-gray-500 flex items-center justify-center rounded-full cursor-pointer ${setGreen ? "bg-[#11432F] text-[#D9FDB3]" : "text-[#A4ACA4]"}`}
            >
              Unread
            </div>
            <div
              onClick={() => setGreen(true)}
              className={`w-19 h-10  font-semibold border border-gray-500 flex items-center justify-center rounded-full cursor-pointer ${setGreen ? "bg-[#11432F] text-[#D9FDB3]" : "text-[#A4ACA4]"}`}
            >
              Groups
            </div>
            <div
              onClick={() => setGreen(true)}
              className={`w-25 h-10  font-semibold border border-gray-500 flex items-center justify-center rounded-full cursor-pointer ${setGreen ? "bg-[#11432F] text-[#D9FDB3]" : "text-[#A4ACA4]"}`}
            >
              Favourites
            </div>
          </div>
        </div>
        {/* single chat and messages */}
        <div className="col-span-6 bg-black">
          <div className="header bg-[#1A0A2E]"></div>
          <div className="mainchat">
            <img
              className="w-full"
              src="https://camo.githubusercontent.com/c42c83df2fd1e442ef1e0ed69cc20d21f65308fc2f0dca2a8035360738d49c8c/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;
