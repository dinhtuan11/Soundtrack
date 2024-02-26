import { useQuery } from "@tanstack/react-query"
import CardPlaylist from "./CardPlaylist"
import { API_URL } from "src/config/constants"
import { getRequest, postRequest } from "src/utils/CommonRequest"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Spinner, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { IoArrowBack } from "react-icons/io5"
import SongItem from "src/components/songs/SongItem"
import { handlePlayList } from "src/redux/slices/song"
import { LuTrash } from "react-icons/lu"
import { t } from "i18next"
import { queryClient } from "src/main"
import PropTypes from 'prop-types'
import { Link } from "react-router-dom"

function ListPlaylist() {
  const {userInfo} = useSelector(state=>state.auth)
  const [isPage, setIsPage] = useState(true)
  const [viewName, setViewName] = useState("")
  const [playlistId, setPlaylistId] = useState(null);
  const getPlaylist = async () => {
    try {
      const res = await getRequest(API_URL.LIST_PLAYLIST, userInfo?.user_id)
      return res?.data
    } catch (error) {
      toast.error(error?.response.data.smg)
    }
  }
  const { data: playlistData, isLoading } = useQuery(["queryPlaylist", userInfo?.user_id], getPlaylist,{
    enabled: !!userInfo
  });
  
    return (
      <>
        {isPage?(
            isLoading?<Spinner className="mx-auto h-14 w-14"/>:playlistData&&playlistData?.length>0?playlistData?.map((items, key)=>
            <CardPlaylist datas={items} setPlaylistId={setPlaylistId} viewName={viewName} set setIsPage={setIsPage} key={key}/>
          ):!userInfo?
            <div className="mx-auto text-center">
              <p>{t("home.not_login")}</p>
              <Link to="/login" className="text-primary">{t("auth.login_now")}</Link>
            </div>:
            <Typography variant="h6" className="mx-auto">{t("home.have_no_playlists")}</Typography>
        ):(
          <DetailComponent playlistId={playlistId} setIsPage={setIsPage} setName={setViewName}/>
        )
        }
      </>
    )
  }

const DetailComponent = ({playlistId, setIsPage}) => {
  const dispatch = useDispatch()
  const removeSongPlaylist = async(songId) => {
    try{
      const res = await postRequest(API_URL.DELETE_SONG_TO_PLAYLIST,{
        song_id: songId,
        playlist_id: playlistId
      })
      if(res){
        queryClient.refetchQueries(["queryPlaylistDetail", playlistId])
        toast.success(t("services.remove_to_success",{field: t("home.song"), target:t("home.playlist")}));
      }
    }catch (error){
      toast.error(error.response.data.msg)
    }
  }
  const getPlaylistDetail = async () => {
    try {
      const res = await getRequest(`${API_URL.GET_PLAYLIST_BY_ID}/${playlistId}`)
      return res;
    } catch (error) {
      console.log(error);
    }
  }
  const { data: playlistDetailData } = useQuery(["queryPlaylistDetail", playlistId], getPlaylistDetail,{
    enabled: !!playlistId
  });
  const handlePlaySong =(songId) => {
    dispatch(handlePlayList({songIndex: songId, data: playlistDetailData?.data}))
  } 
  return (
    <div className="w-full">
      <button onClick={()=>setIsPage(pre=>!pre)} className="hover:text-primary"><IoArrowBack size={25}/></button>
      {playlistDetailData?playlistDetailData?.data.map((item, index)=> (
        <div key={index+1} className="flex items-center gap-4">
          <SongItem idNumber={index+1} datas={item} handlePlaySong={handlePlaySong} />
          <button onClick={()=>removeSongPlaylist(item.song_id)}><LuTrash size={25} className="hover:text-red-500"/></button>
        </div>
      )):<Typography className="text-center" variant="h6">{t("profile.this_empty", {field: t("home.playlist")})}</Typography>}
    </div>
  )
}

DetailComponent.propTypes = {
  playlistId: PropTypes.number,
  setIsPage: PropTypes.func
}


export default ListPlaylist
