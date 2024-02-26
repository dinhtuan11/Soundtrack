import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@material-tailwind/react";
import { useController, useFormContext } from "react-hook-form";
import Input from "src/components/input/Input";
import UploadImage from "src/components/uploadImage/UploadImage";
import DateInput from "src/components/input/DateInput";

function FormAction({ setOpen, albumDetail, resetForm }) {
  useEffect(()=>{
    if(albumDetail?.title){
      resetForm({
        'title' : albumDetail?.title
      })
    }
  }, [albumDetail])
  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="mt-2">
          <Input name="title" placeholder="Title album" type="text" valueUpdate={albumDetail?.title}/>
        </div>
        <div className="flex items-center gap-5">
          <Selected name="artistId" valueUpdate={albumDetail?.artist_id}/>
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-900 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Release date</p>
          <DateInput name="release_date" limitDate="minDate"/>
        </div>
        <div className="flex gap-5 w-6/12 mx-auto">
          <UploadImage name="cover_image" label="Image cover" />
        </div>
      </div>
      <div className="flex gap-2 my-3 mt-8 justify-end">
        <Button
          onClick={() => {
            setOpen((pre) => !pre)
            resetForm({
              title:''
            })
          }}
          className="border !text-gray-900"
          size="md"
          variant="outlined"
        >
          Close
        </Button>
        <Button size="md" type="submit">
          {albumDetail?'Update':'Submit'}
        </Button>
      </div>
    </>
  );
}

const Selected = ({ name, valueUpdate }) => {
  const handleGetDataArtist = async () => {
    try {
      const res = await getRequest(API_URL.LIST_ARTIST_API,{per_page: 9999});
      return res;
    } catch (error) {
      return error.msg;
    }
  };
  const { data: artistData } = useQuery(["artistQuery"], handleGetDataArtist, {
    keepPreviousData: true,
  });
  const artist_data = artistData?.data.filter(aritst=>aritst?.id!==1)
  const [arId, setArId] = useState(valueUpdate?valueUpdate:artist_data[0]?.id);
  const { formState, control, setValue } = useFormContext();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  useEffect(()=>{
    if(valueUpdate){
      setValue(name, valueUpdate, { shouldValidate: true });
    }else{
      setValue(name, arId, { shouldValidate: true });
    }
  },[setValue, valueUpdate, name, ])
  return (
    <>
      <div className="">
        <label
          htmlFor="artistId"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500"
        >
          Select Artist
        </label>
          <select
          {...field}
          name={name}
          value={arId||""}
          onChange={(e) => {
            setArId(e.target.value);
            setValue(name, e.target.value, { shouldValidate: true })
          }}
          id="artistId"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {artist_data&&artist_data.map((items) => (
            <option key={items.id} value={items.id}>
              {items.name}
            </option>
          ))}
        </select>
        <div className="h-2">
          {!!errors[name] && (
            <p className="text-red-500 text-left text-sm">
              {errors[name]?.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

FormAction.propTypes = {
  setOpen: PropTypes.func,
  children: PropTypes.node,
  albumDetail: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object
  ]),
  resetForm: PropTypes.func,
};
Selected.propTypes = {
  name: PropTypes.string,
  valueUpdate: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.number
  ])
};
export default FormAction;
