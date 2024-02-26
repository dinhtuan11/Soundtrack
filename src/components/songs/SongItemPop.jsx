import { useDispatch, useSelector } from "react-redux";
import { playOneSong } from "src/redux/slices/song";
import { empty } from "src/utils/Helper";
import PropTypes from "prop-types";
import { basePath } from "src/config/constants";
import { FiPlay } from "react-icons/fi";

const SongItemPop = ({song}) => {
    const dispatch = useDispatch();
    const { playList, index } = useSelector((state) => state.song);
    return (
        <div
        className="overflow-hidden rounded-xl relative group  cursor-pointer "
        key={song.song_id}
      >
        <img
          src={`${basePath}${
            song.thumbnail_image
              ? song.thumbnail_image
              : song.original_image
          }`}
          className="w-full h-full object-cover hover:scale-105 transition-all"
        />
        <div
          className={` flex justify-center items-center flex-col bg-gray-900/50 h-full w-full top-0 left-0 group-hover:opacity-100 ${
            !empty(playList) && playList[index]?.song_id === song?.song_id
              ? "opacity-100"
              : "opacity-0"
          } absolute transition-opacity`}
        >
          <button
            onClick={() => dispatch(playOneSong([song]))}
            className={`flex rounded-xl items-center justify-center button_play h-14`}
          >
            {!empty(playList) &&
            playList[index]?.song_id === song?.song_id ? (
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
          <p className="text-white text-center w-[90%] overflow-ellipsis line-clamp-2 mobile-md:hidden">{song?.song_name}</p>
        </div>
      </div>
    );
};
SongItemPop.propTypes = {
    song: PropTypes.object
};
export default SongItemPop;