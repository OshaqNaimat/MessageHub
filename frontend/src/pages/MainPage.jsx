import React, { useEffect, useState } from "react";
import { FaRegSquarePlus } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import SearchBar from "../components/SearchBar";
import SideBar from "../components/SideBar";
import axios from "axios";

const FILTERS = ["All", "Unread", "Groups", "Favourites"];

const themes = {
  dark: {
    bg: "#111B21",
    panel: "#202C33",
    border: "#2A3942",
    chatBg: "#0B141A",
    msgIn: "#202C33",
    msgOut: "#005C4B",
    input: "#2A3942",
    sendBtn: "#00A884",
    sendHover: "#00C49A",
    text: "#FFFFFF",
    subtext: "#8696A0",
    icon: "#AEBAC1",
    hoverBg: "#2A3942",
    filterActive: { bg: "#11432F", text: "#D9FDB3", border: "#11432F" },
    filterInactive: { text: "#8696A0", border: "#2A3942" },
  },
  light: {
    bg: "#F0F2F5",
    panel: "#FFFFFF",
    border: "#E9EDEF",
    chatBg: "#EAE6DF",
    msgIn: "#FFFFFF",
    msgOut: "#D9FDD3",
    input: "#F0F2F5",
    sendBtn: "#00A884",
    sendHover: "#017561",
    text: "#111B21",
    subtext: "#667781",
    icon: "#54656F",
    hoverBg: "#F5F6F6",
    filterActive: { bg: "#D9FDD3", text: "#025C4A", border: "#D9FDD3" },
    filterInactive: { text: "#667781", border: "#E9EDEF" },
  },
};

const MainPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedChat, setSelectedChat] = useState(null); // ✅ tracks which chat is open
  const [isDark, setIsDark] = useState(true);
  const [chats, setChats] = useState([]);

  const t = isDark ? themes.dark : themes.light;

  const chatOpen = selectedChat !== null; // ✅ derived — no separate state needed

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleCloseChat = () => {
    setSelectedChat(null);
  };
  // get all the users

  const myUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5174/api/auth/get-all-users",
      );
      setChats(response.data); // ✅ called AFTER await resolves
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    myUser();
  }, []);
  return (
    <div className="h-screen flex overflow-hidden" style={{ background: t.bg }}>
      {/* ── SIDEBAR ── */}
      <div className="hidden md:flex w-16 lg:w-20 flex-shrink-0">
        <SideBar t={t} />
      </div>

      {/* ── CHAT LIST ── */}
      <div
        className={`${chatOpen ? "hidden" : "flex"} md:flex flex-col w-full md:w-80 lg:w-96 flex-shrink-0`}
        style={{ background: t.bg, borderRight: `1px solid ${t.border}` }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-4 py-3"
          style={{ background: t.panel }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className="flex items-center justify-center rounded-full h-9 w-9 transition-all duration-300 cursor-pointer"
              style={{ color: t.icon, background: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = t.hoverBg)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
              title={isDark ? "Switch to Light" : "Switch to Dark"}
            >
              {isDark ? <MdLightMode size={20} /> : <MdDarkMode size={20} />}
            </button>

            <h4
              className="font-semibold text-base hidden lg:block"
              style={{ color: t.text }}
            >
              MessageHub
            </h4>
          </div>
          <div className="flex items-center gap-1" style={{ color: t.icon }}>
            {[
              { icon: <FaRegSquarePlus size={20} />, label: "New Chat" },
              { icon: <BsThreeDotsVertical size={20} />, label: "Menu" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="relative group flex items-center justify-center rounded-full h-10 w-10 cursor-pointer transition-colors"
                style={{ color: t.icon }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = t.hoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {icon}
                <span
                  className="absolute top-full mt-1 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50"
                  style={{ background: t.panel, color: t.text }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-2" style={{ background: t.bg }}>
          <SearchBar t={t} />
        </div>

        {/* Filter Tabs */}
        <div
          className="flex gap-2 px-3 pb-2 overflow-x-auto scrollbar-hide"
          style={{ background: t.bg }}
        >
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className="flex-shrink-0 px-4 h-8 text-sm font-medium rounded-full border transition-all duration-200 cursor-pointer"
              style={
                activeFilter === filter
                  ? {
                      background: t.filterActive.bg,
                      color: t.filterActive.text,
                      borderColor: t.filterActive.border,
                    }
                  : {
                      background: "transparent",
                      color: t.filterInactive.text,
                      borderColor: t.filterInactive.border,
                    }
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto scrollHide">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
              style={{
                borderBottom: `1px solid ${t.border}`,
                // ✅ highlight the active chat on desktop
                background:
                  selectedChat?.id === chat.id ? t.hoverBg : "transparent",
              }}
              onMouseEnter={(e) => {
                if (selectedChat?.id !== chat.id)
                  e.currentTarget.style.background = t.hoverBg;
              }}
              onMouseLeave={(e) => {
                if (selectedChat?.id !== chat.id)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Avatar + online dot */}
              <div className="relative flex-shrink-0">
                <img
                  src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
                  className="w-12 h-12 rounded-full"
                  alt={chat.name}
                />
                {chat.online && (
                  <span
                    className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                    style={{ background: "#25D366", borderColor: t.bg }}
                  />
                )}
              </div>

              {/* Name + message */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span
                    className="font-medium text-sm truncate"
                    style={{ color: t.text }}
                  >
                    {chat.name}
                  </span>
                  <span
                    className="text-xs flex-shrink-0 ml-2"
                    style={{ color: chat.unread > 0 ? "#25D366" : t.subtext }}
                  >
                    {chat.time}
                    Time
                  </span>
                </div>
                <div className="flex justify-between items-center mt-0.5">
                  <p className="text-sm truncate" style={{ color: t.subtext }}>
                    {chat.lastMessage}
                    last messege
                  </p>
                  {chat.unread > 0 && (
                    <span
                      className="flex-shrink-0 ml-2 text-white text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1"
                      style={{ background: "#25D366" }}
                    >
                      {chat.unread}
                      unread
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CHAT WINDOW ── */}
      {selectedChat ? (
        <div
          className={`${chatOpen ? "flex" : "hidden"} md:flex flex-col flex-1`}
          style={{
            background: t.chatBg,
            backgroundImage: isDark
              ? `url("https://camo.githubusercontent.com/c42c83df2fd1e442ef1e0ed69cc20d21f65308fc2f0dca2a8035360738d49c8c/68747470733a2f2f7765622e77686174736170702e636f6d2f696d672f62672d636861742d74696c652d6461726b5f61346265353132653731393562366237333364393131306234303866303735642e706e67")`
              : "none",
            backgroundRepeat: "repeat",
            backgroundSize: "412px",
          }}
        >
          {/* Chat Header — now shows selected chat's info */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: t.panel }}
          >
            <button
              onClick={handleCloseChat}
              className="md:hidden transition-colors mr-1"
              style={{ color: t.icon }}
            >
              <FaArrowLeft size={18} />
            </button>
            {/* ✅ Dynamic avatar */}
            <div className="relative">
              <img
                src="https://cdn-icons-png.flaticon.com/256/149/149071.png"
                className="w-10 h-10 rounded-full"
                alt={selectedChat.name}
              />
              {selectedChat.online && (
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: "#25D366", borderColor: t.panel }}
                />
              )}
            </div>
            <div className="flex-1">
              {/* ✅ Dynamic name */}
              <p className="font-medium text-sm" style={{ color: t.text }}>
                {selectedChat.name}
              </p>
              {/* ✅ Dynamic online status */}
              <p
                className="text-xs"
                style={{ color: selectedChat.online ? "#25D366" : t.subtext }}
              >
                {selectedChat.online ? "online" : "offline"}
              </p>
            </div>
            <div className="flex items-center gap-1" style={{ color: t.icon }}>
              {[<IoSearch size={20} />, <BsThreeDotsVertical size={20} />].map(
                (icon, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-full h-10 w-10 cursor-pointer transition-colors"
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = t.hoverBg)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    {icon}
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
            <div
              className="self-start max-w-xs lg:max-w-md text-sm px-3 py-2 rounded-lg rounded-tl-none shadow"
              style={{ background: t.msgIn, color: t.text }}
            >
              {selectedChat.lastMessage}
              Receiver Messege
              <span
                className="block text-xs mt-1 text-right"
                style={{ color: t.subtext }}
              >
                {selectedChat.time}
                Time
              </span>
            </div>
            <div
              className="self-end max-w-xs lg:max-w-md text-sm px-3 py-2 rounded-lg rounded-tr-none shadow"
              style={{ background: t.msgOut, color: t.text }}
            >
              Sender Messege 👋
              <span
                className="block text-xs mt-1 text-right"
                style={{ color: t.subtext }}
              >
                {selectedChat.time} Time ✓✓
              </span>
            </div>
          </div>

          {/* Input */}
          <div
            className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
            style={{ background: t.panel }}
          >
            <input
              type="text"
              placeholder={`Message ${selectedChat.name}...`}
              className="flex-1 text-sm rounded-lg px-4 py-2.5 outline-none"
              style={{ background: t.input, color: t.text }}
            />
            <button
              className="text-white rounded-full h-10 w-10 flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ background: t.sendBtn }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = t.sendHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = t.sendBtn)
              }
            >
              ➤
            </button>
          </div>
        </div>
      ) : (
        /* ── EMPTY STATE (desktop) ── */
        <div
          className="hidden md:flex flex-col items-center justify-center flex-1 gap-4"
          style={{ background: t.chatBg }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ background: t.panel }}
          >
            <IoSearch size={32} style={{ color: t.subtext }} />
          </div>
          <p className="font-semibold text-lg" style={{ color: t.text }}>
            Select a chat to start messaging
          </p>
          <p className="text-sm" style={{ color: t.subtext }}>
            Choose from your existing conversations
          </p>
        </div>
      )}
    </div>
  );
};

export default MainPage;
