import PropTypes from "prop-types";
import { API_URL, basePath } from "src/config/constants";
import { Collapse, Spinner } from "@material-tailwind/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "src/utils/CommonRequest";
import { empty } from "src/utils/Helper";
import RecentSongItem from "src/components/songs/RecentSongItem";
import { t } from "i18next";
const AlbumSong = ({ album }) => {
  const [open, setOpen] = useState(false);
  const handleGetSongInAlbum = async () => {
    try {
      const res = await getRequest(
        API_URL.LIST_SONG_ALBUM_API,
        {
          album_id: album?.id,
        },
        true
      );
      return res.data;
    } catch (error) {
      return error.msg;
    }
  };
  const {
    isLoading: loadingSong,
    data: songData,
    isFetching,
  } = useQuery(["songInAlbum", album?.id], handleGetSongInAlbum, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: open,
  });
  return (
    <div>
      <div onClick={() => setOpen((cur) => !cur)}>
        <img
          className="h-[250px] object-cover rounded-lg mobile-lg:h-[160px] mobile-lg:w-[160px] w-[250px]"
          src={basePath + album?.cover_image}
          alt=""
        />
        <p className="text-center mt-2">{album?.title}</p>
      </div>
      <Collapse open={open}>
        {loadingSong || isFetching ? (
          <Spinner
            color="white"
            className="mx-auto h-8 w-8 text-primary mt-5"
          />
        ) : !empty(songData) ? (
          <div className="h-[250px] overflow-y-auto p-2 custom-scrollbar">
            {songData?.map((song) => (
              <RecentSongItem key={song?.song_id} song={song} />
            ))}
          </div>
        ) : (
          <p className="text-center">{t("home.song_album_fod")}</p>
        )}
      </Collapse>
    </div>
  );
};
AlbumSong.propTypes = {
  album: PropTypes.object,
};
export default AlbumSong;
