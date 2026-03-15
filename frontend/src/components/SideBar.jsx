import React from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiStatusOnline } from "react-icons/hi";
import { IoLogOut, IoPeople, IoPersonCircle } from "react-icons/io5";

const SideBar = () => {
  return (
    <>
      <div className="col-span-1 bg-[#1D1F1F] ">
        <div className="flex flex-col text-white p-5 items-center justify-between gap-4">
          <div className="relative group hover:bg-[#282929] flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
            <BsFillChatLeftTextFill size={23} />
            <span className="absolute left-full ml-3 px-2 py-1 bg-[#282929] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Chats
            </span>
          </div>

          <div className="relative group hover:bg-[#282929] flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
            <HiStatusOnline size={23} />
            <span className="absolute left-full ml-3 px-2 py-1 bg-[#282929] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Status
            </span>
          </div>

          <div className="relative group hover:bg-[#282929] flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
            <IoPeople size={23} />
            <span className="absolute left-full ml-3 px-2 py-1 bg-[#282929] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              People
            </span>
          </div>

          <div className="relative group hover:bg-[#282929] flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
            <IoLogOut size={23} />
            <span className="absolute left-full ml-3 px-2 py-1 bg-[#282929] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Logout
            </span>
          </div>
          <div className="relative group hover:bg-[#282929] flex items-center justify-center rounded-full h-10 w-10 cursor-pointer">
            <IoPersonCircle size={23} />
            <span className="absolute left-full ml-3 px-2 py-1 bg-[#282929] text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Profile
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
