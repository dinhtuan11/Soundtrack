import SongItem from '../songs/SongItem';
import { useState } from 'react';
import { handlePlayList } from 'src/redux/slices/song';
import { useDispatch } from 'react-redux';
import { t } from 'i18next';
import { Typography } from '@material-tailwind/react';
import { getRequest } from 'src/utils/CommonRequest';
import { API_URL } from 'src/config/constants';
import { empty } from 'src/utils/Helper';
import { useQuery } from '@tanstack/react-query';

const ProfileSong = () => {
  const {data} = useQuery(['querySongFavorite'], async () =>{
    const response = await getRequest(API_URL.LIST_FAVORITE, {});
    return response?.data;
  });
  const [render, setRender] = useState(0);
  const dispatch = useDispatch()

  const handlePlaySong =(songId) => {
    dispatch(handlePlayList({songIndex: songId, data: data}))
  } 
  if(empty(data)) return (<Typography className="text-center" variant="h6">{t("profile.favorite")}</Typography>);
  return (
    <>
      {data&&data.map((item, index) => (
        <div key={item.id || index} onClick={()=>{setRender(render+1)}}>
          <SongItem page = {'profile'} key={item.id || index} datas={item} idNumber={index + 1} handlePlaySong={handlePlaySong}/>
        </div>
      ))}
    </>
  );
};

export default ProfileSong;
