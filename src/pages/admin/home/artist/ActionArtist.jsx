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
import { createFileValidationSchema } from "src/utils/Helper";
import { postRequest } from "src/utils/CommonRequest";
import { toast } from "react-toastify";
import Modal from 'react-modal';
import { useState } from "react";
import { queryClient } from "src/main";
import produce from "immer";

export function ActionArtist({ open, setOpen, artistDetail }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(null)
  const schema = yup.object({
    name: yup
      .string()
      .min(3, t("validate.input_min", { field: "Artist name", min: "3" }))
      .max(250, t("validate.input_max", { field: "Artist name", max: "250" }))
      .required(t("validate.input_required", { field: "Artist name" })),
    gender: yup
      .mixed()
      .required(t("validate.input_required", { field: "Gender" })),
    avatar: createFileValidationSchema("Original Image", maxSizeImage, TYPE_FILE.IMG, artistDetail?"nullable":'required'),
  });
  
  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const { handleSubmit, reset } = methods;
  const onSubmit = async(data) => {
    const {gender, name, avatar} = data
    const requestURL = artistDetail ? API_URL.UPDATE_ARTIST + artistDetail?.id : API_URL.NEW_ARTIST
    const artistId = artistDetail?{artist_id:artistDetail?.id}:{}
    try {
      setIsLoading(true)
      const response = await postRequest(requestURL, {
        avatar: avatar,
        name: name,
        gender: gender,
        ...artistId
      }, true, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setOpen(pre => !pre)
      reset()
      toast.success(response?.msg)
      queryClient.setQueriesData(['artistQuery'], (oldData) => {
        const newObject = JSON.parse(JSON.stringify(oldData));
        if (artistDetail) {
          return produce(oldData, (draft) => {
            const existingArtist = draft.data.find((artist) => artist?.id === artistDetail?.id);
            if (existingArtist) {
              Object.assign(existingArtist, response.data);
            }
          });
        } else {
          newObject.data = [response.data, ...newObject.data];
        }
        return newObject;
      })
    } catch (error) {
      toast.error(error?.response.data.msg)
      setIsError(error?.response?.data?.msg)
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <>
      <Modal ariaHideApp={false} size="sm" isOpen={open} className="absolute bottom-auto right-auto w-4/12 mx-auto mt-8 transition-all bg-transparent shadow-xl top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
        <Card className="p-5 px-10 mx-auto">
          <div>
            <Typography variant="h4" className="pb-3">
              {artistDetail?'Edit Artist':'Create Artist'}
            </Typography>
            <FormProvider {...methods}>
              {isError&&<p className="text-red-500 text-sm">{isError}</p>}
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormAction setOpen={setOpen} isLoading={isLoading} dataArtist={artistDetail} reset={{resetForm: reset, resetError:setIsError}}/>
            </form>
            </FormProvider>
          </div>
        </Card>
      </Modal>
    </>
  );
}

ActionArtist.propTypes = {
  open: Proptypes.bool,
  setOpen: Proptypes.func,
  artistDetail: Proptypes.oneOfType([
    Proptypes.bool,
    Proptypes.object
  ]),
};
