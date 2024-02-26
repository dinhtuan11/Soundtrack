import { yupResolver } from "@hookform/resolvers/yup";
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import Proptypes from "prop-types";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { t } from "i18next";
import FormAction from "./FormAction";
import { API_URL, TYPE_FILE, maxSizeAudio, maxSizeImage } from "src/config/constants";
import { createFileValidationSchema } from "src/utils/Helper";
import { postRequest } from "src/utils/CommonRequest";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { useState } from "react";
import { queryClient } from "src/main";
import produce from "immer";


export function CreateSong({ open, setOpen, songDetail }) {
  const [isLoading, setIsLoading] = useState(false)
  const checkCategoryId = songDetail?yup.string():yup.string().required(t("validate.input_required", { field: "category" }))
  .required(t("validate.input_required", { field: "Category" }))
  const schema = yup.object({
    title: yup
      .string()
      .min(3, t("validate.input_min", { field: "Title", min: "3" }))
      .max(250, t("validate.input_max", { field: "Title", max: "250" }))
      .required(t("validate.input_required", { field: "Title" })),
    artistId: yup
      .string()
      .required(t("validate.input_required", { field: "Artist" })),
    album_id: yup.string(),
    fileSong: createFileValidationSchema("Song upload", maxSizeAudio, TYPE_FILE.AUDIO, songDetail?"nullable":'required'),
    thumbnail_img: createFileValidationSchema("Thumbnail Image", maxSizeImage, TYPE_FILE.IMG, songDetail?"nullable":'required'),
    original_img: createFileValidationSchema("Original Image", maxSizeImage, TYPE_FILE.IMG, songDetail?"nullable":'required'),
    category_id: checkCategoryId,
  });

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async (data) => {
    const { artistId, fileSong, original_img, thumbnail_img, title, album_id, category_id} = data;
    const songId = songDetail? {song_id :songDetail?.song_id} : {}
    const alBumId = album_id?{album_id: album_id}:songDetail?.albums_id?{album_id: songDetail?.albums_id}:{}
    const categoryId = category_id?{category_id}:songDetail?.category_id?{category_id: songDetail?.category_id}:{}
    try {
      setIsLoading(true)
      const requestURL = songDetail ? API_URL.UPDATE_SONG + songDetail?.song_id : API_URL.NEW_SONG
      const response = await postRequest(requestURL, {
          title: title ? title : songDetail.song_name,
          artist_id: artistId,
          ...alBumId,
          ...categoryId,
          song: fileSong,
          thumbnail_image: thumbnail_img,
          original_image: original_img,
        ...songId
      }, true, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(response?.msg)
      setOpen(pre => !pre)
      reset()
      queryClient.setQueriesData(['songQuery'], (oldData) => {
        const newObject = JSON.parse(JSON.stringify(oldData));
        if (songDetail) {
          return produce(oldData, (draft) => {
            const existingSong = draft.data.find((song) => song?.song_id === songDetail?.song_id);
            if (existingSong) {
              Object.assign(existingSong, response.data);
            }
          });
        } else {
          newObject.data = [response.data, ...newObject.data];
        }
        return newObject;
      })
    } catch (error) {
      toast.error(error.response.data.msg)
    }finally{
      setIsLoading(false)
    }
  };
  return (
    <>
      <Modal ariaHideApp={false} size="sm" isOpen={open} className="absolute bottom-auto right-auto w-4/12 mx-auto mt-8 transition-all bg-transparent shadow-xl top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4" >
        <Card className="p-5 px-10 mx-auto">
          <div>
            <Typography variant="h4" className="pb-3">
              {songDetail?'Edit Song':'Create Song'}
            </Typography>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormAction setOpen={setOpen} resetForm={reset} isLoading={isLoading} dataSong={songDetail}/>
              </form>
            </FormProvider>
          </div>
        </Card>
      </Modal>
    </>
  );
}

CreateSong.propTypes = {
  open: Proptypes.bool,
  setOpen: Proptypes.func,
  songDetail: Proptypes.oneOfType([
    Proptypes.bool,
    Proptypes.object
  ])
};
