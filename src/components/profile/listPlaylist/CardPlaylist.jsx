import { Button, DialogBody, DialogFooter, Spinner, Tooltip, Typography } from "@material-tailwind/react";
import { AiOutlineDelete } from "react-icons/ai";
import PropTypes from "prop-types";
import { t } from "i18next";
import { API_URL, basePath } from "src/config/constants";
import { useState } from "react";
import { deleteRequest, getRequest} from "src/utils/CommonRequest";
import { toast } from "react-toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DialogMultimedia from "src/components/dialog/DialogMultimedia";
import { BiDetail } from "react-icons/bi";
import { handlePlayList } from "src/redux/slices/song";
import logo from "src/assets/images/logo.png";
import { useDispatch } from "react-redux";
const CardPlaylist = ({datas, setPlaylistId, setIsPage}) => {
  const [openDialog, setOpenDialog] = useState(false)
  const dispatch = useDispatch()
  const getPlaylistDetail = async () => {
      try {
        const res = await getRequest(`${API_URL.GET_PLAYLIST_BY_ID}/${datas?.playlist_id}`)
        return res;
      } catch (error) {
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      }
    }
   const { data: playlistDetailData } = useQuery(["queryPlaylistDetail", datas?.playlist_id], getPlaylistDetail,{
    enabled: !!datas?.playlist_id
   });
   const songName = 
   playlistDetailData?.data.length > 0
   ? playlistDetailData?.data.map((items) => items.song_name + ", ")
   : t("profile.this_empty", {field: t("home.playlist")})
   const handlePlaySong =() => {
    dispatch(handlePlayList({songIndex: 0, data: playlistDetailData?.data}))
  } 
  return (
      <div className="group w-[230px] mobile-md:w-[150px] bg-[#F5F5F5] rounded-[15px]">
        <div className="px-[15px] py-3">
            <div className="relative w-full h-44 mobile-md:h-32 flex justify-center items-center rounded-[20px] overflow-hidden">
              <img
                src={datas?.original_image?basePath+datas?.original_image: logo}
                alt=""
                className={`object-cover ${!datas?.original_image?'w-24':'w-full h-full'}`}
              />
              <button onClick={()=>
                {
                  setPlaylistId(datas?.playlist_id)
                  setIsPage(pre=>!pre)
                }
                } className="absolute top-0 h-full w-full bg-gray-900/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer">
                <BiDetail size={40} color="white"/>
              </button>
            </div>
          <div className="flex relative -top-3 right-5 justify-end gap-3">
            <DialogAlert open={openDialog} setOpen={setOpenDialog} detail={datas}/>
            <button onClick={()=>setOpenDialog(pre=>!pre)} className="hover:text-primary transition-all custom-profile-icon bg-[#FFFBFB] border rounded-full w-[30px] h-[30px] flex justify-center items-center">
              <AiOutlineDelete size={20}/>
            </button>
          </div>
          <div className="w-full mb-2">
            <p className="font-semibold w-[90%] truncate">
              <Tooltip
                content={datas.title}
                className="bg-white text-black shadow-lg"
              >
                {datas.title}
              </Tooltip>
            </p>
            <p className="text-base font-normal w-full line-clamp-2 mobile-md:hidden">{songName}</p>
          </div>
          <Button onClick={handlePlaySong} className="bg-[#FF5E00] rounded-[20px] h-9 flex items-center justify-center">
            {t("profile.play")}
          </Button>
        </div>
      </div>
  );
}

const DialogAlert = ({detail, open, setOpen}) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false)
  const refreshData = () => {
    queryClient.invalidateQueries(['queryPlaylist']);
  };
  const deletePlaylist = async() => {
    try{
      setIsLoading(true)
      const res = await deleteRequest(API_URL.DELETE_PLAYLIST+`/${detail.playlist_id}`)
      if(res){
        toast.success(res.msg)
        setOpen(pre=>!pre)
        refreshData()
      }
    }catch(error){
      toast.error(error?.response.data.msg)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <DialogMultimedia sizeTitle="h6" isOpen={open} setOpen={setOpen} titleHeading={t("user.delete_multimedia", {field: t("home.playlist")})}>
      <DialogBody className="text-primary text-center flex items-center gap-3 justify-center">
        <img src={detail?.original_image?basePath+detail?.original_image: logo} alt="" className="h-[41px] w-[41px] object-cover rounded-md"/>
        <Typography variant="h6">{detail.title?detail.title:""}</Typography>
      </DialogBody>
      <DialogFooter className="gap-4 justify-center">
        <Button onClick={()=>setOpen(pre=>!pre)} variant="outlined">Cancel</Button>
        <Button onClick={()=>deletePlaylist()} color="red">{isLoading?<Spinner/>:"Delete"}</Button>
      </DialogFooter>
    </DialogMultimedia>
  )
}
DialogAlert.propTypes={
  detail: PropTypes.object,
  open: PropTypes.bool,
  setOpen: PropTypes.func
}
CardPlaylist.propTypes = {
  datas: PropTypes.object,
  setPlaylistDetail: PropTypes.func,
  setIsPage: PropTypes.func,
  setPlaylistId: PropTypes.func
}
export default CardPlaylist