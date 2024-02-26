import { AiOutlineHome, AiOutlineTransaction } from "react-icons/ai";
import { HomeAdmin } from "./home/home";
import Artist from "./home/artist/Artist";
import Songs from "./home/song/Song";
import { GiLoveSong } from "react-icons/gi";
import { BsJournalAlbum } from "react-icons/bs";
import { FaUserGraduate } from "react-icons/fa";
import Album from "./home/album/Album";
import Transaction from "./home/transaction/Transaction";
const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "admin",
    pages: [
      {
        icon: <AiOutlineHome {...icon} />,
        name: "dashboard",
        path: "/dashboard",
        element: <HomeAdmin />,
      },
      {
        icon: <GiLoveSong {...icon} />,
        name: "Song",
        path: "/song",
        element: <Songs />,
      },
      {
        icon: <BsJournalAlbum {...icon} />,
        name: "Album",
        path: "/album",
        element: <Album />,
      },
      {
        icon: <FaUserGraduate {...icon} />,
        name: "Artist",
        path: "/artist",
        element: <Artist />,
      },
      {
        icon: <AiOutlineTransaction {...icon}/>,
        name: "Transaction",
        path: "/transaction",
        element: <Transaction />,
      },
    ],
  },
];

export default routes;
