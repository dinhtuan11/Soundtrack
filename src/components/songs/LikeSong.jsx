import { t } from "i18next";
// import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { API_URL } from "src/config/constants";
import { postRequest } from "src/utils/CommonRequest";
import PropTypes from "prop-types";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const LikeSong = ({song, onClick, token, userInfo, isPlay}) => {
  const LikeOrUnlike = async () => {
    if(token && userInfo){
      try {
        onClick()
        await postRequest(API_URL.LIKE_OR_UNLIKE, {
          song_id: song.song_id,
        });
      } catch (error) {
          console.log(error);
      }
    }else{
      toast.error(t("home.auth_Songlike"));
    }
  };
  return (
    <div>
      {song.favorite==0 ||!song.favorite ?<FaRegHeart onClick={LikeOrUnlike} className={`cursor-pointer ${isPlay}`} />:<FaHeart onClick={LikeOrUnlike} color="Red" className="cursor-pointer"/>}
    </div>
  )
};
LikeSong.propTypes = {
    song: PropTypes.shape({
      number: PropTypes.number,
      image: PropTypes.string,
      name: PropTypes.string,
      time: PropTypes.number,
      song_id: PropTypes.number,
      favorite: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    token: PropTypes.string,
    userInfo: PropTypes.object,
    onClick:PropTypes.func,
    isPlay: PropTypes.string
  }
export default LikeSong;