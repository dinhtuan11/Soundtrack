import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { BiPause } from "react-icons/bi";
import { BsFillPlayFill} from "react-icons/bs";
import { basePath } from "src/config/constants";
import { empty } from "src/utils/Helper";

const UploadSong = ({name, defaultValue}) => {
  const [urlImg, setUrlImg] = useState("");
  const [audioName, setAudioName] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false);
  const [valueView, setValueView] = useState(!empty(defaultValue)&&defaultValue)
  const audioRef = useRef(null);
  const inputUpload = useRef()
  const { formState, control, setValue } = useFormContext();
  const { errors } = formState;
  const playerAudio = () => {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  }
  const convertFile = (e) => {
    const files = e.target.files[0]
    if (files) {
      const viewImg = URL.createObjectURL(files);
      setUrlImg(viewImg);
      setAudioName(files.name)
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
    setValueView("")
  };
  const { field } = useController({
    name,
    control,
    defaultValue: "",
  });
  return (
    <div>
      <label className="block mb-2 text-sm font-medium dark:text-white after:content-['*'] after:ml-0.5 after:text-red-500">
        Upload Song
      </label>
      {urlImg ||valueView ? (
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <div onClick={()=> playerAudio()} type="button">{isPlaying?<BiPause size={20}/>:<BsFillPlayFill size={20}/>}</div>
            {" | "}
            <p className="text-right truncate w-44">{urlImg?audioName:valueView.song_name}</p> 
          </div>
          <audio ref={audioRef} src={urlImg?urlImg:basePath+valueView.song_path}></audio>
          <button onClick={() => cleanUp()}>Change</button>
        </div>
      ) : (
        <div>
          <input
            ref={inputUpload}
            {...field}
            name={name}
            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            type="file"
            accept="audio/*"
            onChange={convertFile}
          />
          <p
            className="mt-1 text-sm text-gray-500 rounded-md dark:text-gray-300"
            id="file_input_help"
          >
            MP3 (MAX. 15MB).
          </p>
        </div>
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
}

UploadSong.propTypes = {
  name: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ])
};

export default UploadSong;
