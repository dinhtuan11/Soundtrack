import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { useQuery } from "@tanstack/react-query";
import UploadSong from "src/components/uploadImage/uploadSong";
import { Button, Spinner } from "@material-tailwind/react";
import UploadImage from "src/components/uploadImage/uploadimage";
import Input from "src/components/input/Input";
import SelectValidate from "src/components/select/SelectValidate";
import { empty } from "src/utils/Helper";
import SelectValue from "src/components/input/SelectValue";

function FormAction({ setOpen, resetForm, isLoading, dataSong }) {
  const songDetail = dataSong&&dataSong
  const [artistId, setArtistId] = useState(null);
  const {data: categoryData} = useQuery(['categoryQuery'], async()=>{
    try {
      const res = await getRequest(API_URL.GET_CATEGORY, {
        per_page: 9999
      })
      return res?.data??[]
    } catch (error) {
      console.log(error);
    }
  }, {keepPreviousData: true, refetchOnWindowFocus: false})
  const handleGetDataArtist = async () => {
    try {
      const res = await getRequest(API_URL.LIST_ARTIST_API,{per_page: 999});
      return res.data;
    } catch (error) {
      return error.msg;
    }
  };
  const handleGetDataAlbum = async (Id) => {
    try {
      const res = await getRequest(
        API_URL.LIST_ALBUMS_API,{
          artist_id: Id,
          per_page: 99999
        }
      );
      return res?.data ?? [];
    } catch (error) {
      return error.msg;
    }
  };
  const { data: artistData } = useQuery(["artistSelectQuery"], handleGetDataArtist, {
    keepPreviousData: true,
    refetchOnWindowFocus:false
  });
  const albumQueryKey = ["querySelectAlbum", artistId];
  const { data: albumData } = useQuery(
    albumQueryKey,
    () => handleGetDataAlbum(artistId),
    {
      enabled: !!artistData,
      keepPreviousData: true,
      refetchOnWindowFocus:false
    }
  );
  const appendData = empty(albumData) ? [] : albumData;
  const fileSong= songDetail&&{song_path:songDetail.song_path, song_name:songDetail.song_name}
  useEffect(()=>{
    if(songDetail?.song_name){
      resetForm({
        'title' : songDetail?.song_name
      })
    }
  }, [songDetail])
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="mt-2">
          <Input name="title" placeholder="Title Song" valueUpdate={songDetail?.song_name} type="text" />
        </div>
        <div className="flex justify-center gap-5">
          <SelectValidate name="artistId" setId={setArtistId} datas={artistData} defaultValue={songDetail&&songDetail?.artists_id}/>
          <SelectValidate name="album_id" datas={[
            {
              id: null,
              title: 'Không xác định'
            },
            ...appendData
          ]} defaultValue={songDetail?.albums_id}/>
        </div>
        <div className="mt-2">
          <SelectValue name="category_id" placeholder="Category" valueForcus={categoryData} valueUpdate={{title: dataSong?.category_title, id: dataSong?.category_id}}/>
        </div>
        <UploadSong name="fileSong" defaultValue={fileSong}/>
        <div className="flex gap-5">
          <UploadImage name="thumbnail_img" label="thumbnail image" defaultValue={songDetail&&songDetail?.thumbnail_image}/>
          <UploadImage name="original_img" label="original Image" defaultValue={songDetail&&songDetail?.original_image}/>
        </div>
      </div>
      <div className="flex justify-end gap-2 my-3 mt-8">
        <Button
          onClick={() => {
            resetForm({
              'title' : ''
            });
            setOpen((pre) => !pre);
          }}
          className="border !text-gray-900"
          size="md"
          variant="outlined"
        >
          Close
        </Button>
        <Button size="md" type="submit">
          {isLoading ? <Spinner /> : songDetail?'Update':"Submit"}
        </Button>
      </div>
    </>
  );
}


FormAction.propTypes = {
  setOpen: PropTypes.func,
  resetForm: PropTypes.func,
  isLoading: PropTypes.bool,
  dataSong: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ])
};

export default FormAction;
