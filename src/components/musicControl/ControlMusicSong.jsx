import { Tooltip } from "@material-tailwind/react";
import { t } from "i18next";
import PropTypes from "prop-types"
import { basePath } from "src/config/constants";
import defaultImg from "src/assets/images/logo.png";
const ControlMusicSong = ({data}) => {
  return (
    <div className="flex items-center gap-3 mobile-lg:hidden">
      <img
        src={data?.thumbnail_image ? basePath+data?.thumbnail_image : defaultImg}
        alt=""
        key={"img_tg"}
        className="object-cover rounded-lg w-12 h-12 border-2"
      />
      <div key={"aaa"} className="">
        <h1 className="font-bold line-clamp-1 max-w-[200px]">
          <Tooltip
            content={data?.song_name||t("user.no_more_play_list")}
            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10 text-dark"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
          >
            <p>{data?.song_name||t("user.no_more_play_list")}</p>
          </Tooltip>
        </h1>
        <span className="pt-2 block">{data?.artists_name}</span>
      </div>
    </div>
  );
};

ControlMusicSong.propTypes = {
 data: PropTypes.object
}

export default ControlMusicSong;
