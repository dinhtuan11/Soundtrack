import { Carousel } from "@material-tailwind/react";
import ContentSlide from "./ContentSlide";
import { getRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { useQuery } from "@tanstack/react-query";
import LoadingSlide from "../loadingSkeleton/LoadingSlide";
import { useEffect, useState } from "react";
import { handlePlayList } from "src/redux/slices/song";
import { useDispatch } from "react-redux";
import { empty } from "src/utils/Helper";
const SlideBanner = () => {
  const [albumId, setAlbumId] = useState(null);
  const dispatch = useDispatch()
  const handleGetDataAlbum = async () => {
    try {
      const res = await getRequest(
        API_URL.LIST_ALBUMS_API,
        {
          per_page:10
        },
        true
      );
      return res;
    } catch (error) {
      return error.msg;
    }
  };
  const { isLoading, data: albumData } = useQuery(["allAlbumsQuery"], handleGetDataAlbum, {
    keepPreviousData: true,
    refetchOnWindowFocus: false
  });
  const handleGetSongInAlbum = async () => {
    try {
      const res = await getRequest(
        API_URL.LIST_SONG_ALBUM_API,
        {
          album_id: albumId,
        },
        true
      );
      return res?.data;
    } catch (error) {
      return error.msg;
    }
  };
  const queryAlbumDetail = ["albumDetail", albumId]
  const {
    data: songData,
  } = useQuery(queryAlbumDetail, handleGetSongInAlbum, {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: !!albumId,
  });
useEffect(()=>{
  if(!empty(songData)){
    dispatch(handlePlayList({songIndex: 0, data: songData || []}))
  }
  },[songData, dispatch])
  return (
    <div className="h-1/3">
      {isLoading? <LoadingSlide/> : (
        <Carousel
        className="rounded-xl"
        autoplay={true}
        loop={true}
        >
          {albumData?.data.map((items, index)=> (
            <ContentSlide key={index} items={items} setAlbumId={()=>setAlbumId(items?.id)}/>
          ))}
      </Carousel>
      )
      }
      
    </div>
  );
};
export default SlideBanner;
