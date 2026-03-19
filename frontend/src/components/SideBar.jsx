import React from "react";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { HiStatusOnline } from "react-icons/hi";
import { IoLogOut, IoPeople, IoPersonCircle } from "react-icons/io5";

const NAV_ITEMS = [
  { icon: <BsFillChatLeftTextFill size={23} />, label: "Chats" },
  { icon: <HiStatusOnline size={23} />, label: "Status" },
  { icon: <IoPeople size={23} />, label: "People" },
  { icon: <IoLogOut size={23} />, label: "Logout" },
  { icon: <IoPersonCircle size={23} />, label: "Profile" },
];

const SideBar = ({ t }) => {
  return (
    <div
      className="flex flex-col items-center py-5 px-2 gap-4 w-full transition-colors duration-300"
      style={{
        background: t?.panel ?? "#1D1F1F",
        borderRight: `1px solid ${t?.border ?? "#2A3942"}`,
      }}
    >
      {NAV_ITEMS.map(({ icon, label }) => (
        <div
          key={label}
          className="relative group flex items-center justify-center rounded-full h-10 w-10 cursor-pointer transition-colors duration-200"
          style={{ color: t?.icon ?? "#FFFFFF" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = t?.hoverBg ?? "#282929")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          {icon}
          {/* Tooltip */}
          <span
            className="absolute left-full ml-3 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50"
            style={{
              background: t?.hoverBg ?? "#282929",
              color: t?.text ?? "#FFFFFF",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SideBar;
