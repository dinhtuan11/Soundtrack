import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import ControlMusicSong from './ControlMusicSong';
import { useSelector, useDispatch } from 'react-redux';
import { setIndex } from 'src/redux/slices/song';
import { useCallback, useState } from 'react';
import { basePath } from 'src/config/constants';
import ControlHeader from './ControlHeader';
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from 'react-icons/fa';
const ControlMusic = () => {
  const { playList, index } = useSelector((state) => state.song);
  const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
    const handleMusic = useCallback((e) => {
      const newIndex =
        e === 1 ? (index >= playList.length - 1 ? 0 : index + 1) 
        : 
        e === -1 ? Math.max(0, index - 1) : index;
      dispatch(setIndex(newIndex));
    }, [index, dispatch, playList]);
    const onEnded = () => {
      const newIndex = index >= playList.length - 1 ? index : index + 1
      dispatch(setIndex(newIndex));
    }
  return (
    <div className={`fixed bottom-2  ${!open ? 'mobile-lg:bottom-[.5rem]' : 'mobile-lg:bottom-6'} w-full audio-play z-40 ${!open ? 'h-0' : 'h-[96px]'} transition-all `}>
    <div className='absolute right-0 bg-primary text-white rounded-lg flex justify-center items-center laptop-sm:text-[2.5rem] laptop-sm:right-4 laptop-sm:-top-[2rem] laptop-sm:text-primary laptop-sm:w-auto laptop-sm:h-auto laptop-sm:bg-transparent w-10 h-10 z-50 -top-10 cursor-pointer' onClick={() => setOpen((prev) => !prev)}>
      {open ? (
        <FaAngleDown />
      ) : (
        <FaAngleUp />
      )}
    </div>
      <AudioPlayer
        autoPlay
        customProgressBarSection={[
          RHAP_UI.CURRENT_TIME,
          RHAP_UI.PROGRESS_BAR,
          RHAP_UI.DURATION,
        ]}
        customControlsSection={[
          RHAP_UI.ADDITIONAL_CONTROLS,
          RHAP_UI.LOOP,
          RHAP_UI.MAIN_CONTROLS,
          RHAP_UI.VOLUME_CONTROLS,
        ]}
        onEnded={()=>onEnded()}
        onClickNext={()=>handleMusic(1)}
        onClickPrevious={()=>handleMusic(-1)}
        showSkipControls={true}
        autoPlayAfterSrcChange={true}
        header={<ControlHeader itemPlay={playList[index]}/>}
        customAdditionalControls={[<ControlMusicSong key={"test"} data={playList[index]}/>]}
        src={basePath+playList[index]?.song_path}
      />
    </div>
  );
};

export default ControlMusic;
