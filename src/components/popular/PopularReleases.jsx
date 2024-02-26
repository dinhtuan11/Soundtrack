import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { toast } from "react-toastify";
import { API_URL } from "src/config/constants";
import { getRequest } from "src/utils/CommonRequest";
import LoadingPopularRelease from "../loadingSkeleton/LoadingPopularRelease";
import { useInView } from 'react-intersection-observer';
import SongItemPop from "../songs/SongItemPop";

const PopularReleases = () => {
  const { ref, inView } = useInView();

  const { data: songs, isLoading } = useQuery(
    ["querySongPopular"],
    async () => {
      try {
        const res = await getRequest(API_URL.LIST_POPULAR);
        return res;
      } catch (error) {
        toast.error(error?.response.data.msg);
      }
    },
    {
      keepPreviousData: true,
      enabled:inView
    }
  );

  return (
    <div className="pt-11 pb-24 px-2">
      <div className="pb-5">
        <h1 className="text-[#000] text-3xl font-semibold font-manrope-600">
          {t("home.popular_release")}
        </h1>
      </div>
      <div className={` ${isLoading?"flex flex-wrap gap-8":"grid grid-cols-4 gap-8 mobile-lg:grid-cols-2"}`}>
        {isLoading ? (
            <LoadingPopularRelease/>
        ) : (
          songs?.data.map((song) => (
            <SongItemPop song={song} key={song.song_id}/>
          ))
        )}
      </div>
      <div ref={ref}></div>
    </div>
  );
};

export default PopularReleases;
