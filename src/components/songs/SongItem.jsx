import { BsClockFill, BsHeadphones } from "react-icons/bs";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import PropTypes from "prop-types";
import LikeSong from "./LikeSong";
import { Menu, MenuHandler, MenuList, Tooltip } from "@material-tailwind/react";
import { FiPlay } from "react-icons/fi";
import { API_URL, IS_VIP, LIKE_SONG, basePath } from "src/config/constants";
import { useDispatch, useSelector } from "react-redux";
import { TbPlayerTrackNext } from "react-icons/tb";
import { LuAlbum } from "react-icons/lu";
import { t } from "i18next";
import { IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineFileDownload } from "react-icons/md";
import { pushSongToPlaylist } from "src/redux/slices/song";
import { useCallback, useState } from "react";
import { queryClient } from "src/main";
import { RiPlayListLine } from "react-icons/ri";
import DialogAddPlaylist from "../dialog/DialogPlaylist";
import { createLinkDownload } from "src/utils/services";
import { getRequest } from "src/utils/CommonRequest";
import { toast } from "react-toastify";
import ModalPremium from "../dialog/ModalPremium";
import DialogLogin from "../dialog/DialogLogin";
import { empty, formatNumber } from "src/utils/Helper";
import { HiMiniMusicalNote } from "react-icons/hi2";
  const SongItem = ({ datas, idNumber, handlePlaySong, page, isLastItem = false}) => {
  const [openDialogLogin, setOpenDialogLogin] = useState(false);
  const [openPremium, setOpenPremium] = useState(false);
  const [openDialogPlaylist, setOpenDialogPlaylist] = useState(false)
  const dispatch = useDispatch()
  const {playList, index} = useSelector((state) => state.song);
  const {accessToken, userInfo} = useSelector(state=>state.auth)
  const handleUpdateCacheLike = useCallback((id) => {
    if (accessToken && userInfo) {
      queryClient.setQueryData(["querySongFavorite"], function (oldData) {
        if(empty(oldData)) return oldData;
        let newData = [];
        newData = oldData.filter((song) => {
          if (song.song_id != id) {
            return song;
          }
        });
        return newData;
      });
      queryClient.setQueryData(["querySong"], function (oldData) {
        if(empty(oldData)) return oldData;
        const newValue = JSON.parse(JSON.stringify(oldData));
        newValue.pages.forEach((page)=>{
          page.data.forEach((song)=>{
            if (song.song_id == id) {
              song["favorite"] =
              song["favorite"] == LIKE_SONG.LIKE
                  ? LIKE_SONG.NOT_LIKE
                  : LIKE_SONG.LIKE;
            }
          })
        });
        return newValue;
      })
}
    }, [])
  const isPlay = playList?.[index]?.song_id === datas?.song_id ? "text-primary" : null

  const handleDownload = async () => {
    if (empty(accessToken) || empty(userInfo)) {
      setOpenDialogLogin((pre) => !pre);
      return;
    }
    if (
      userInfo?.is_vip === IS_VIP.VIP
    ) {
      toast.promise(
        async () => {
          try {
            const res = await getRequest(API_URL.DOWNLOAD + datas?.song_path);
            createLinkDownload(res, {
              file_name: datas.song_name,
              format: "mp3",
            });
          } catch (error) {
            toast.error(error?.response?.data?.msg);
          }
        },
        {
          pending: "Đang tải xuống"
        }
      );
    } else {
      setOpenPremium((pre) => !pre);
    }
  };
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center justify-between py-2">
          {playList[index + 1]?.song_id === datas?.song_id ? (
            <TbPlayerTrackNext
              size={20}
              className="inline w-[40px] text-center text-gray-500"
            />
          ) : (
            <p className={`text-xl ${isPlay} text-center w-10`}>{idNumber}</p>
          )}
          <div className="relative flex items-center justify-start gap-2 pl-2 xl:pl-12">
            <img
              src={basePath + datas.thumbnail_image}
              alt=""
              className="w-[54px] h-[54px] rounded-xl object-cover"
            />
            <button
              onClick={() => handlePlaySong(idNumber - 1)}
              className={`absolute bg-gray-900/50 h-full w-[54px] top-0 xl:left-12 left-2 rounded-xl items-center justify-center button_play flex ${
                isPlay ? "opacity-100" : "opacity-0"
              } hover:opacity-100 transition-opacity`}
            >
              {isPlay ? (
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
            <p
              className={`${isPlay} lg:text-lg text-md mobile-lg:max-w-[150px] mobile-md:w-[100px] mobile-lg:truncate `}
            >
              <Tooltip
                content={datas?.song_name}
                className="text-black bg-white shadow-lg"
              >
                {datas?.song_name}
              </Tooltip>
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className={`flex gap-3 items-center ${isPlay} laptop:hidden w-[200px] justify-start`}>
          <HiMiniMusicalNote size={20} />
            <p className=" leading-none">{datas?.category_title}</p>
          </div>
          <div className={`flex gap-3 items-center ${isPlay} laptop:hidden min-w-[50px]`}>
            <BsHeadphones size={20} />
            <p className=" leading-none">{formatNumber(datas?.total_listen)}</p>
          </div>
          <div
            className={`${isPlay} items-center gap-3 px-5 flex laptop-sm:hidden`}
          >
            <BsClockFill />
            <span>{datas.song_duration}</span>
          </div>
          <LikeSong
            isPlay={isPlay}
            size={24}
            onClick={() => handleUpdateCacheLike(datas.song_id)}
            song={datas}
            token={accessToken}
            userInfo={userInfo}
          />
          <div className="flex justify-end "></div>
          <div className="flex justify-end">
            <Menu>
              <MenuHandler>
                <button
                  className={`${isPlay} pr-3 flex items-center hover:bg-transparent hover:text-primary transition-all gap-3 text-base font-normal capitalize tracking-normal`}
                >
                  <BiDotsHorizontalRounded size={24} />
                </button>
              </MenuHandler>
              <MenuList>
                <button
                  onClick={() => dispatch(pushSongToPlaylist(datas))}
                  className="flex items-center w-full gap-2 py-2 text-lg transition-all hover:text-primary"
                >
                  <FiPlay size={20} /> {t("user.play_next")}
                </button>
                <button className="flex items-center w-full gap-2 py-2 text-lg transition-all hover:text-primary">
                  <LuAlbum size={18} /> {t("user.add_album")}
                </button>
                <button
                  onClick={() => setOpenDialogPlaylist((pre) => !pre)}
                  className="flex items-center w-full gap-2 py-2 text-lg transition-all hover:text-primary"
                >
                  <RiPlayListLine size={18} /> {t("user.add_playlist")}
                </button>
                <button className="flex items-center w-full gap-2 py-2 text-lg transition-all hover:text-primary">
                  <IoShareSocialOutline size={18} /> {t("user.share")}
                </button>
                <button onClick={handleDownload} className="flex items-center w-full gap-2 py-2 text-lg transition-all hover:text-primary">
                  <MdOutlineFileDownload size={18}/> {t('user.download')}
                </button>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>

      <div className={`${isLastItem ? '' : 'w-[92%] h-1 border-b-2 border-b-gray-500 mx-auto'}`}></div>
      <DialogAddPlaylist
        open={openDialogPlaylist}
        setOpen={setOpenDialogPlaylist}
        songId={datas?.song_id}
      />
      <ModalPremium isOpen={openPremium} onClose={setOpenPremium} />
      <DialogLogin isOpen={openDialogLogin} setOpen={setOpenDialogLogin} />
    </div>
  );
};

SongItem.propTypes = {
  datas: PropTypes.any,
  idNumber: PropTypes.number,
  handlePlaySong: PropTypes.func,
  page: PropTypes.string,
  isLastItem: PropTypes.bool
};
export default SongItem;
