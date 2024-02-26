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
import { API_URL, TYPE_FILE, maxSizeImage} from "src/config/constants";
import { createFileValidationSchema, formatDateString } from "src/utils/Helper";
import { postRequest } from "src/utils/CommonRequest";
import Modal from 'react-modal';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { queryClient } from "src/main";
import produce from "immer";
export function CreateAlbum({ open, setOpen, albumDetail }) {
  const [isLoading, setIsLoading] = useState(false)
  const schema = yup.object({
    title: yup
      .string()
      .min(3, t("validate.input_min", { field: "Title", min: "3" }))
      .max(250, t("validate.input_max", { field: "Title", max: "250" }))
      .required(t("validate.input_required", { field: "Title" })),
      artistId: yup
      .string()
      .required(t("validate.input_required", { field: "Artist" })),
      cover_image: createFileValidationSchema("Image cover", maxSizeImage, TYPE_FILE.IMG, albumDetail?"nullable":'required'),
      release_date: yup.date().required(t("validate.input_required", { field: "Release date" }))
  });
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
    const onSubmit = async(data) => {
      const {title, artistId, cover_image, release_date} = data;
      const dateFormat = formatDateString(release_date)
      try {
        setIsLoading(true)
        const requestURL = albumDetail?API_URL.UPDATE_ALBUM+albumDetail?.id:API_URL.NEW_ALBUM
          const response = await postRequest(requestURL, {
            title: title?title:albumDetail?.title,
            artist_id: artistId,
            cover_image: cover_image,
            release_date: dateFormat,
            album_id: albumDetail?.id
          }, true, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          toast.success(response?.msg)
          reset()
          setOpen(pre=>!pre)
          queryClient.setQueriesData(['queryAlbum'], (oldData) => {
            const newObject = JSON.parse(JSON.stringify(oldData));
            if (albumDetail) {
              return produce(oldData, (draft) => {
                const existingAlbum = draft.data.find((album) => album?.id === response?.data?.id);
                if (existingAlbum) {
                  Object.assign(existingAlbum, response.data);
                }
              });
            } else {
              newObject.data = [response.data, ...newObject.data];
            }
            return newObject;
          })
      } catch (error) {
        toast.error(error?.response?.data?.msg)
      }finally{
        setIsLoading(false)
      }
    }
    
    useEffect(()=>{
      const dateParts = albumDetail&&albumDetail?.release_date.split('-');
      const formattedDate = `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;
      const dateFormat = new Date(formattedDate);
      if(albumDetail){
        reset({
          release_date: albumDetail?.release_date?dateFormat:null
        })
      }else{
        reset({release_date: new Date()})
      }
    },[albumDetail, reset])
  return (
    <>
      <Modal ariaHideApp={false} size="sm" isOpen={open} className="absolute bottom-auto right-auto w-4/12 mx-auto mt-8 transition-all bg-transparent shadow-xl top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <Card className="p-5 px-10 mx-auto">
          <div>
            <Typography variant="h4" className="pb-3">
              {albumDetail?'Edit Album':'Create Album'}
            </Typography>
            <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormAction setOpen={setOpen} albumDetail={albumDetail} resetForm={reset} isLoading={isLoading}/>
            </form>
            </FormProvider>
          </div>
        </Card>
      </Modal>
    </>
  );
}

CreateAlbum.propTypes = {
  open: Proptypes.bool,
  setOpen: Proptypes.func,
  albumDetail: Proptypes.oneOfType([
    Proptypes.bool,
    Proptypes.object
  ])
};
