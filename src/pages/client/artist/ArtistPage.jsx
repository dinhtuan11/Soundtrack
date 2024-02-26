import { AiOutlineSearch } from "react-icons/ai";
import PropTypes from "prop-types";
import { basePath } from "src/config/constants";
import LoadingPopularRelease from "src/components/loadingSkeleton/LoadingPopularRelease";
import { empty } from "src/utils/Helper";
import { t } from "i18next";
import { Link } from "react-router-dom";
const keySearch = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const ArtistPage = ({ artists, searchQuery, setSearchQuery, isLoading, searchKeyQuery, setSearchKeyQuery, refView, isFetchingNextPage }) => {
  return (
    <div className="w-full p-3 flex flex-col gap-5">
      <div className="flex justify-between items-center gap-10 w-full tablet:flex-col">
        <div className="relative border tablet:w-full w-[35vh] border-gray-400 pl-8 pr-2 rounded-xl overflow-hidden h-[50px] flex items-center">
          <AiOutlineSearch
            size={20}
            color="#FF5E00"
            className="absolute left-2"
          />
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            className="w-full h-full outline-none"
            placeholder={t('home.search_Artist')}
            value={searchQuery}
          />
        </div>
        <div className="gap-5 flex flex-wrap mobile-lg:hidden">
          <p onClick={() => setSearchKeyQuery(null)} className={`text-lg cursor-pointer ${!searchKeyQuery ? 'text-primary font-semibold' : ''}`}>{t('home.see_all')}</p>
          {keySearch.map((item, index) => (
            <p
            onClick={() => setSearchKeyQuery(item)}
              className={`text-2xl font-medium  cursor-pointer ${searchKeyQuery === item ? 'text-primary font-semibold' : 'text-gray-600'}`}
              key={index}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="flex gap-14 mobile-lg:gap-8 flex-wrap overflow-y-scroll max-h-[70vh] none-display-scrollbar">
        {isLoading ? (
          <LoadingPopularRelease />
        ) : (
          empty(artists) ? (
            <p className="text-center font-bold text-xl">{t('artist.search_not_found')}</p>
          ) : (
            artists.map((artist) => (
            <Link
              to={'/artist/'+artist.id}
              key={artist.id}
              className="card-item__artist bg-[#F5F5F5] h-[320px] w-[240px] mobile-lg:w-[160px] mobile-lg:h-[160px] overflow-hidden rounded-xl pb-4 relative cursor-pointer"
            >
              <div className="w-full h-[250px] overflow-hidden">
                <img
                  className="flex-1 object-cover w-full h-full transition-all hover:scale-105"
                  src={basePath + artist?.avatar}
                  alt=""
                />
              </div>
              <p className="absolute bottom-4 mobile-lg:bottom-0 mobile-lg:text-white p-3 mobile-lg:p-1 text-2xl mobile-lg:text-[1rem] font-medium truncate w-full mobile-lg:bg-gray-900/50">
                {artist.name}
              </p>
            </Link>
          ))
          )
        )}
        {isFetchingNextPage && (
            <LoadingPopularRelease />
        )}
        <div ref={refView} className="h-1"></div>
      </div>
    </div>
  );
};
ArtistPage.propTypes = {
  artists: PropTypes.array,
  searchQuery: PropTypes.string,
  setSearchQuery: PropTypes.func,
  searchKeyQuery: PropTypes.string,
  setSearchKeyQuery: PropTypes.func,
  isLoading: PropTypes.bool,
  refView: PropTypes.elementType,
  isFetchingNextPage: PropTypes.bool
};
export default ArtistPage;