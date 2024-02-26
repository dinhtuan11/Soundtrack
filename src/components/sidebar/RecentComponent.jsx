import { Carousel } from "@material-tailwind/react";
import { useQuery } from "@tanstack/react-query";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { API_URL, basePath } from "src/config/constants";
import { getRequest } from "src/utils/CommonRequest";
import { empty } from "src/utils/Helper";
import RecentSongItem from "../songs/RecentSongItem";
import { LoadingItemRecent, LoadingSlideRecent } from "../loadingSkeleton/LoadingRecent";
const RecentComponent = () => {
  const [isTablet, setIsTablet] = useState(window.innerWidth <= 1024);
  const [albumId, setAlbumId] = useState(null);
  const handleGetDataAlbum = async () => {
    try {
      const res = await getRequest(API_URL.LIST_ALBUMS_API, {}, true);
      if (!empty(res?.data?.data)) {
        setAlbumId(res.data.data[0].id);
      }
      return res;
    } catch (error) {
      return error.msg;
    }
  };
  const handleGetSongInAlbum = async () => {
    try {
      const res = await getRequest(
        API_URL.LIST_SONG_ALBUM_API,
        {
          album_id: albumId,
        },
        true
      );
      return res;
    } catch (error) {
      return error.msg;
    }
  };
  const { isLoading, data: albumData } = useQuery(
    ["allAlbumsQuery"],
    handleGetDataAlbum,
    {
      keepPreviousData: true,
    }
  );
  const {
    isLoading: loadingSong,
    data: songData,
    isFetching,
  } = useQuery(["songInAlbum", albumId], handleGetSongInAlbum, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: !!albumId,
  });
  useEffect(() => {
    if (!empty(albumData?.data) && !albumId) {
      setAlbumId(albumData?.data[0].id);
    }
  }, [albumData]);
  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      <div
        className={`tablet:hidden w-[317px] tablet:h-[81vh] ${
          !isTablet && "w-[317px]"
        } tablet:fixed tablet:z-10 tablet:right-0 tablet:bg-white transition-all duration-1000`}
      >
        <div className="">
          <div className={`px-8 py-4 mobile-md:hidden`}>
            <div className="flex justify-between">
              <h2 className="text-lg text-[#707070] font-bold">
                {t("home.fan_like")}
              </h2>
            </div>
            {isLoading ? (
              <LoadingSlideRecent/>
            ) : (
              <Carousel className="rounded-xl">
                {!empty(albumData?.data) &&
                  albumData.data.slice(0, 5).map((album) => (
                    <div
                      className="relative w-[250px]"
                      key={album?.id}
                      onClick={() =>setAlbumId(album?.id)}
                    >
                      <img
                        src={basePath + album?.album_image}
                        alt=""
                        className="h-[250px] w-full object-cover rounded-xl"
                      />
                      <div
                        className="absolute w-full text-white bottom-0 h-full custom-recent_avatar px-4 py-4 flex flex-col justify-end pb-10 cursor-pointer"
                        style={{ background: "rgba(0, 0, 0, 0.3)" }}
                      >
                        <h1 className="text-sm font-semibold text-[#FFFFFF]">
                          {album?.title}
                        </h1>
                        <span className="text-xs font-normal text-[#FFFFFFB8]">
                          {album?.artists_name}
                        </span>
                      </div>
                    </div>
                  ))}
              </Carousel>
            )}
          </div>
          <div className={`px-8 py-4 `}>
            <div className="flex justify-between items-center">
              <h2
                className={`text-[#363535] font-bold tablet:text-sm':'text-lg`}
              >
                {t("home.recent_played")}
              </h2>
            </div>
            <div
              className={`overflow-y-scroll max-h-[40vh] tablet:max-h-[38vh] recent-scroll__mobile none-display-scrollbar`}
            >
              {loadingSong || isFetching ? (
                !empty(songData?.data) && (
                  songData?.data.map((_, key) => (
                    <LoadingItemRecent key={key}/>
                  ))
                )
              ) : !empty(songData?.data) ? (
                songData?.data.map((song) => (
                    <RecentSongItem key={song?.song_id} song={song} />
                ))
              ) : (
                <p className="pt-2 text-center">{t('home.song_album_fod')}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentComponent;
