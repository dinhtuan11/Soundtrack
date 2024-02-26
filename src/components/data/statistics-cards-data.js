import {
  AiOutlineBank,
  AiOutlineUserAdd,
} from "react-icons/ai";
import {BiUserPlus} from "react-icons/bi";
import {FaChartBar} from "react-icons/fa";

export const statisticsCardsData = [
  {
    color: "blue",
    icon: AiOutlineBank,
    title: "Today's Money",
    value: "$53k",
    footer: {
      color: "text-green-500",
      value: "+55%",
      label: "than last week",
    },
  },
  {
    color: "pink",
    icon: AiOutlineUserAdd,
    title: "Today's Users",
    value: "2,300",
    footer: {
      color: "text-green-500",
      value: "+3%",
      label: "than last month",
    },
  },
  {
    color: "green",
    icon: BiUserPlus,
    title: "New Clients",
    value: "3,462",
    footer: {
      color: "text-red-500",
      value: "-2%",
      label: "than yesterday",
    },
  },
  {
    color: "orange",
    icon: FaChartBar,
    title: "Sales",
    value: "$103,430",
    footer: {
      color: "text-green-500",
      value: "+5%",
      label: "than yesterday",
    },
  },
];

export default statisticsCardsData;
