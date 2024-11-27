import { RiHome4Line } from "react-icons/ri"; // Ri prefix indicates the Remix Icon set
import { FiHash } from "react-icons/fi";     // Fi prefix indicates the Feather Icon set
import { FiMail } from "react-icons/fi";     // Fi prefix for Feather Icon set
import { FaTwitter } from "react-icons/fa";  // Fa prefix indicates the Font Awesome Icon set
import { IoMdNotificationsOutline } from "react-icons/io"; // Io prefix for Ionicons
import { BsBookmark } from "react-icons/bs"; // Bs prefix for Bootstrap Icons
import { CgProfile } from "react-icons/cg";  // Cg prefix for CSS.gg Icons


const sidebarLinks = [
  {
    text: "",
    path: "/",
    icon: FaTwitter,
    class: "twitter",
  },
  {
    text: "Home",
    path: "/home",
    icon: RiHome4Line,
    class: "home",
  },
  {
    text: "Explore",
    path: "/explore",
    icon: FiHash,
    class: "explore",
  },
  {
    text: "Notification",
    path: "/notifications",
    icon: IoMdNotificationsOutline,
    class: "notification",
  },
  {
    text: "Message",
    path: "/messages",
    icon: FiMail,
    class: "message",
  },
  {
    text: "Bookmark",
    path: "/bookmarks",
    icon: BsBookmark,
    class: "bookmark",
  },

  {
    text: "Profile",
    path: "/profile/",
    icon: CgProfile,
    class: "profile",
  },
  {
    text: "Tweet",
    path: "/tweet",
    icon: "",
    class: "tweet",
  },
];

export default sidebarLinks;
