import { useEffect, useState } from "react";
import { AiOutlineDown, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { getRequest } from "src/utils/CommonRequest";
import { APP_API, basePath } from "src/config/constants";
import { useQuery } from "@tanstack/react-query";
import { ButtonRounded } from "src/components/ButtonRounded";
import Pagination from "src/components/pagination/Pagination";
import ListSong from "src/components/listItem/ListSong";
import { Spinner } from "@material-tailwind/react";
import ListTHTable from "src/components/listItem/ListTHTable";
import { CreateSong } from "./ActionSong";
import { t } from "i18next";
import useTitle from "src/hooks/useTitle";
import useDebounce from "src/hooks/useDebounce";
import { empty } from "src/utils/Helper";
export function Songs() {
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [songDetail, setSongDetail] = useState({})
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500); 
  const getSongs = async ()=>{
    try {
      const responve = await getRequest(APP_API.ADMIN_LIST_SONG_API + `?page=${page}&per_page=6`, {
        keyword: searchQuery
      }, true)
      return responve
    } catch (error) {
      return error.msg
    }
  }
  const { isLoading, data , refetch , isFetching } = useQuery(['songQuery', page], getSongs, {
    keepPreviousData: true,
    refetchOnWindowFocus:false
  });
  useEffect(() => {
    refetch();
  }, [debouncedSearchQuery, refetch]);
  useTitle(t("admin.song"));
  return (
    <div>
      {isLoading ? (
        <Spinner className="mx-auto h-60 w-36" color="blue" />
      ) : (
        <>
          <CreateSong open={openDialog} setOpen={setOpenDialog} songDetail={!empty(songDetail)&&songDetail}/>
          <section className="p-3 antialiased bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
              <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div className="p-4">
                  <span className="flex gap-1 pr-10 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {data?.current_page + " - " + data?.total_page}
                    </span>
                  </span>
                </div>
                <div className="flex flex-col items-stretch justify-between py-4 mx-4 space-y-3 border-t md:flex-row md:items-center md:space-x-3 md:space-y-0 dark:border-gray-700">
                  <div className="w-full md:w-1/2">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <AiOutlineSearch size={20} />
                      </div>
                      <input
                        type="text"
                        id="simple-search"
                        placeholder="Search Songs..."
                        value={searchQuery}
                        onChange={(e) => {setSearchQuery(e.target.value); setPage(1)}}
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                    <ButtonRounded
                      size="sm"
                      bgColor="bg-blue-400"
                      onClick={() => {
                        setSongDetail({})
                        setOpenDialog(pre=>!pre)
                      }}
                    >
                      <AiOutlinePlus size={20} className="font-semibold" />
                      Add Music
                    </ButtonRounded>
                    <ButtonRounded size="sm" bgColor="bg-gray-600">
                      Filter options
                      <AiOutlineDown />
                    </ButtonRounded>
                  </div>
                </div>
                <div className="overflow-x-auto min-h-[550px]">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <ListTHTable items={["Title", "Album", "Artist", "Category", "Image", "Duration", "Date Create", "Action"]} />
                    </thead>
                    <tbody>
                      {isFetching ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            <Spinner
                              className="mx-auto h-11 w-11"
                              color="blue"
                            />
                          </td>
                        </tr>
                      ) : (
                        <ListSong
                          data={data}
                          filePath={basePath}
                          openDialog={setOpenDialog}
                          setSongDetail={setSongDetail}
                        />
                      )}
                    </tbody>
                  </table>
                </div>
                <nav
                  className="flex flex-col items-start justify-center p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
                  aria-label="Table navigation"
                >
                  <Pagination pageCount={data?.total_page} setPage={setPage} />
                </nav>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Songs;
