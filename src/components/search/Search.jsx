import { Spinner, Typography } from "@material-tailwind/react";
import { t } from "i18next";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { toast } from "react-toastify";
import { FiPlay } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { APP_API, basePath } from "src/config/constants";
import useOnClickOutside from "src/hooks/useOnClickOutside";
import { playOneSong } from "src/redux/slices/song";
import { getRequest } from "src/utils/CommonRequest";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const searchBoxRef = useRef(null);
  const searchResultsRef = useRef(null);
  const {playList} = useSelector((state) => state.song);
  const dispath = useDispatch()
  const handleClickOutside = () => {
    setShowResult(false);
  }
  useOnClickOutside(searchResultsRef, searchBoxRef, handleClickOutside)
  const handleSearchResults = async () =>{
    setLoading(true)
    try {
      const res = await getRequest(
        APP_API.ADMIN_LIST_SONG_API,{
          keyword: searchQuery,
          per_page: 10
        }
      );
      setSearchResults(res?.data);
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    if(searchQuery.trim() !== ''){
      const debounceTimeout = setTimeout(() => {
        handleSearchResults();
      }, 500);
      return () => clearTimeout(debounceTimeout);
    }else{
      setSearchResults([]);
    }
  }, [searchQuery]);
  const isPlay = searchResults.find(result=> result?.song_id===playList[0]?.song_id)
  return (
    <div>
      <div className="relative w-full mobileScreen:fixed mobileScreen:top-2 mobile-md:text-center" ref={searchBoxRef}>
        <div className="absolute inset-y-0 left-0 mobile-md:left-5 flex items-center pl-3 pointer-events-none">
          <AiOutlineSearch size={20} color="#FF5E00" />
        </div>
        <input
          onClick={() => setShowResult((prev) => !prev)}
          type="text"
          className="bg-gray-100 border-none text-gray-700  placeholder:text-gray-700 pl-9 min-h-[50px] min-w-[318px] rounded-xl outline-none"
          placeholder={t('home.search')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {showResult && (
      <div className="bg-[#FDFDFD] z-50 absolute w-full custom-search-rounded overflow-hidden max-h-[450px] overflow-y-scroll custom-scrollbar shadow-md p-3 mobile-md:h-[60vh]" ref={searchResultsRef}>
        {loading ? (
          <div className="px-2 py-3 text-center">
            <Spinner className="m-auto" />
          </div>
        ) : searchResults.length < 1 && searchQuery ? (
          <div className="px-2 py-3 text-center">
            <Typography
              variant="small"
              className="text-[rgba(71, 69, 69, 0.72)] text-sm font-normal"
            >
              {t("home.search_Null")}
            </Typography>
          </div>
        ) : searchResults && searchResults.length > 0 ? (
            <div>
              {searchResults.map((item) => (
                <div
                  key={item?.song_id}
                  className="px-2 py-3 flex justify-between items-center border-b border-gray-400 hover:bg-gray-300 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex py-2 items-center justify-between">
                      <div className="flex items-center gap-2 justify-start relative">
                        <img
                          src={basePath + item?.thumbnail_image}
                          alt={item?.song_name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <button
                          onClick={() => dispath(playOneSong([item]))}
                          className={`absolute bg-gray-900/50 h-full w-10 top-0 left-0 rounded-lg items-center justify-center button_play flex ${
                            isPlay?.song_id === item?.song_id? "opacity-100" : "opacity-0"
                          } hover:opacity-100 transition-opacity`}
                        >
                          {isPlay?.song_id === item?.song_id ? (
                            <div className="loading">
                              <span className="load"></span>
                              <span className="load"></span>
                              <span className="load"></span>
                              <span className="load"></span>
                              <span className="load"></span>
                            </div>
                          ) : (
                            <FiPlay size={20} color="white" />
                          )}
                        </button>
                      </div>
                    </div>
                    <div>
                      <Typography
                        variant="h6"
                        className="text-[#2E2C2C] text-base font-semibold"
                      >
                        {item?.song_name}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-semibold text-[#363535B8] text-[12px]"
                      >
                        {item?.artists_name}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#2D2C2C] text-xs font-normal">
                      {item?.song_duration}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default Search