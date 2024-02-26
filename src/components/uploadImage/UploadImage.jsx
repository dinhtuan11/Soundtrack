import { Typography } from "@material-tailwind/react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { AiOutlineCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import { TYPE_FILE, basePath } from "src/config/constants";
import defaultAvatar from "src/assets/images/defaultImage.png"
import { getExtensionFile } from "src/utils/Helper";
const UploadImage = ({ label, name, defaultValue}) => {
  const [urlImg, setUrlImg] = useState();
  const inputUpload = useRef()
  const [isValue, setIsValue] = useState(defaultValue)
  const { formState, control, setValue, setError } = useFormContext();
  const { errors } = formState;
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  const convertFile = (e) => {
    const files = e.target.files[0];
    if(getExtensionFile(files) != TYPE_FILE.IMG){
      setError(name, {
        message: 'Định dạng file không hợp lệ'
      });
      return;
    }
    if (files) {
      setError(name, {
      });
      const viewImg = URL.createObjectURL(files);
      setUrlImg(viewImg);
      setValue(name, files);
    }
  };
  const cleanUp = () => {
    URL.revokeObjectURL(urlImg);
    if (inputUpload.current) {
      inputUpload.current.value = "";
    }
    setValue(name, "")
    setUrlImg("")
    setIsValue("")
  };
  return (
    <div className="flex flex-col items-center justify-center w-full mobile-lg:h-full">
      <Typography className={`${name === 'cover_img' && "hidden"} pb-1 text-sm mobile-lg:hidden`}>
        <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
          {label}
        </span>
      </Typography>
      {isValue || urlImg ? (
        <ViewImage viewImg={urlImg ? urlImg : basePath+isValue} setClose={cleanUp} />
      ) : (
          <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer h-52 bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
              <AiOutlineCloudUpload color="gray" size={35} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
               PNG AND JPG (MAX. 10MB)
              </p>
            </div>
            <input
              ref={inputUpload}
              {...field}
              name={name}
              type="file"
              value={""}
              id="dropzone-file"
              accept="image/*"
              className="hidden"
              onChange={(e) => convertFile(e)}
            />
          </label>
      )}
      <div className="h-2">
        {!!errors[name] && (
          <p className="text-sm text-left text-red-500">
            {errors[name]?.message}
          </p>
        )}
      </div>
    </div>
  );
};

const ViewImage = ({ viewImg, setClose}) => {
  return (
    <div  className="relative min-w-full overflow-hidden rounded-lg h-52 change_img">
      <button onClick={() => setClose()} className="absolute top-3 right-3">
        <AiOutlineCloseCircle
          size={25}
          color="red"
          className="transition-all hover:scale-110"
        />
      </button>
      <img src={viewImg} alt="" className="block object-cover w-full h-full" onError={({currentTarget}) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultAvatar
            }}/>
    </div>
  );
};

UploadImage.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
    ])
};

ViewImage.propTypes = {
  viewImg: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string
  ]),
  setClose: PropTypes.func,
  defaultValue: PropTypes.string
};

export default UploadImage;
