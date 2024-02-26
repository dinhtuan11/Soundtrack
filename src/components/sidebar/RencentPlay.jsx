import { t } from "i18next";
import { RiPlayList2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setRecentBar } from "src/redux/slices/settings";
import { empty } from "src/utils/Helper";
import { setIndex } from "src/redux/slices/song";
import RecentPlay from "../songs/RecentPlay";
const RencentPlay = () => {
  const { recentBar } = useSelector((store) => store.settings);
  const{playList} = useSelector(state=>state.song)
  const dispatch = useDispatch();

  return (
    <div>
      <button
        onClick={() => dispatch(setRecentBar())}
        className={`bg-primary text-white fixed top-28 right-3 z-20 p-2 rounded-lg block`}
      >
        <RiPlayList2Line size={30} />
      </button>
      <div
        className={`${!recentBar ? "w-0" : "w-[317px]"} h-[81vh]
        } fixed z-10 right-0 bg-white transition-all duration-1000`}
      >
        <div className="">
          <div className={`px-8 py-4 `}>
            <div className="flex justify-between items-center">
              <h2
                className={`text-[#363535] font-bold tablet:text-sm':'text-lg`}
              >
                {t("profile.playlist")}
              </h2>
            </div>
            <div
              className={`overflow-y-scroll h-[70vh] recent-scroll__mobile none-display-scrollbar`}
            >
              {empty(playList)? <p className="pt-2 text-center">{t('home.no_music_in_the_playlist')}</p>
              :playList.map((item, key)=>(
                  <RecentPlay key={key} onClick={()=>dispatch(setIndex(key))} song={item}/>
              ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RencentPlay;
