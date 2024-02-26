import {
  AiOutlineBell,
  AiOutlinePlusCircle,
  AiOutlineShoppingCart,
  AiOutlineCreditCard,
  AiOutlineBank,
} from "react-icons/ai";
import { BiLockOpen } from "react-icons/bi";
export const ordersOverviewData = [
  {
    icon: AiOutlineBell,
    color: "text-green-500",
    title: "$2400, Design changes",
    description: "22 DEC 7:20 PM",
  },
  {
    icon: AiOutlinePlusCircle,
    color: "text-red-500",
    title: "New order #1832412",
    description: "21 DEC 11 PM",
  },
  {
    icon: AiOutlineShoppingCart,
    color: "text-blue-500",
    title: "Server payments for April",
    description: "21 DEC 9:34 PM",
  },
  {
    icon: AiOutlineCreditCard,
    color: "text-orange-500",
    title: "New card added for order #4395133",
    description: "20 DEC 2:20 AM",
  },
  {
    icon: BiLockOpen,
    color: "text-pink-500",
    title: "Unlock packages for development",
    description: "18 DEC 4:54 AM",
  },
  {
    icon: AiOutlineBank,
    color: "text-blue-gray-900",
    title: "New order #9583120",
    description: "17 DEC",
  },
];

export default ordersOverviewData;
