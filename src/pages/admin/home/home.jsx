import useTitle from "src/hooks/useTitle";
import StatisticsCard from "src/components/widgets/cards/statistics-card";
import { t } from "i18next";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { empty } from "src/utils/Helper";
import { FaUserCheck, FaMicrophoneAlt } from "react-icons/fa";
import { TfiHeadphone } from "react-icons/tfi";
import { GiLoveSong } from "react-icons/gi";
import { GiMusicalScore } from "react-icons/gi";
const dataMap = [
  {
    icon: <FaUserCheck />,
    title: "Người dùng",
    color: "blue",
    key: 'user'
  },
  {
    icon: <FaMicrophoneAlt />,
    title: "Ca sĩ",
    color: "pink",
    key: 'artist'
  },
  {
    icon: <TfiHeadphone />,
    title: "Lượt nghe",
    color: "green",
    key: 'log_listen'
  },
  {
    icon: <GiLoveSong />,
    title: "Bài hát",
    color: "blue",
    key: 'song'
  },
  {
    icon: <GiMusicalScore />,
    title: "Album",
    color: "yellow",
    key: 'album'
  },
];
export const HomeAdmin = () => {
  useTitle(t("admin.home_admin"));
  const { data } = useQuery(["dashboardQuery"], async () => {
    const response = await getRequest(API_URL.DASHBOARD, {}, true);
    return response?.data;
  });
  if (empty(data)) return <></>;
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-3 xl:grid-cols-5">
        {dataMap.map((items) => (
            <StatisticsCard
              items ={items}
              data={data[items.key]}
              key={items.key}
            />
        ))}
      </div>
    </div>
  );
};

