import { FiPlay } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { empty } from "src/utils/Helper";
import PropTypes from "prop-types";
import { basePath } from "src/config/constants";
import { Tooltip } from "@material-tailwind/react";
import { playOneSong } from "src/redux/slices/song";

const RecentSongItem = ({song}) => {
  const dispatch = useDispatch();
  const {playList, index} = useSelector((state) => state.song);

  return (
    <div
      key={song?.song_id}
      className="flex justify-between items-center cursor-pointer"
      onClick={() => dispatch(playOneSong([song]))}
    >
      <div className="flex gap-3 pt-4">
        <div className="w-11 h-11 rounded-lg overflow-hidden relative group">
          <img
            src={basePath + song.thumbnail_image}
            alt=""
            className="w-full h-full rounded-xl object-cover"
          />
          <button
            className={`absolute bg-gray-900/50 h-full w-full rounded-xl items-center justify-center button_play top-0 flex ${
              !empty(playList) && playList[index]?.song_id === song?.song_id
                ? "opacity-100"
                : "opacity-0"
            } group-hover:opacity-100 transition-opacity`}
          >
            {!empty(playList) && playList[index]?.song_id === song?.song_id ? (
              <div className="loading">
                <span className="load"></span>
                <span className="load"></span>
                <span className="load"></span>
                <span className="load"></span>
                <span className="load"></span>
              </div>
            ) : (
              <FiPlay size={30} color="white" />
            )}
          </button>
        </div>
        <div>
          <h1 className="text-[#2E2C2C] text-sm w-36 truncate font-bold">
            <Tooltip
              content={song?.song_name}
              className="bg-white text-black shadow-lg"
            >
              {song?.song_name}
            </Tooltip>
          </h1>
          <span className="text-[#474545B8] font-normal text-xs">
            {song?.artists_name}
          </span>
        </div>
      </div>
      <div className={`delay-1000`}>
        <span className="text-[#2D2C2C] text-xs font-normal">
          {song?.song_duration}
        </span>
      </div>
    </div>
  );
};
RecentSongItem.propTypes = {
    song: PropTypes.object,
    isLoading:PropTypes.bool
  };
export default RecentSongItem;
