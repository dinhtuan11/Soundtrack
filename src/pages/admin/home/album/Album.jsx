import { useState } from "react";
import { AiOutlineDown, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { getRequest } from "src/utils/CommonRequest";
import { API_URL } from "src/config/constants";
import { useQuery } from "@tanstack/react-query";
import Pagination from "src/components/pagination/pagination";
import { Spinner } from "@material-tailwind/react";
import ListAlbum from "src/components/listItem/ListAlbum";
import ListTHTable from "src/components/listItem/ListTHTable";
import { ButtonRounded } from "src/components/ButtonRounded";
import { t } from "i18next";
import useTitle from "src/hooks/useTitle";
import { CreateAlbum } from "./ActionAlbum";
import { empty } from "src/utils/Helper";

export function Album() {
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [artistId, setArtistId] = useState();
  const [albumDetail, setAlbumDetail] = useState()
  const handleGetDataArtist = async ( ) =>{
    try {
      const res = await getRequest(API_URL.LIST_ARTIST_API, {
        per_page: 9999
      }, true);
      return res
    } catch (error) {
      return error.msg;
    }
  }
  const handleGetDataAlbum = async (artist_id) => {
      try {
        const res = await getRequest(API_URL.LIST_ALBUMS_API, {
          page,
          artist_id,
          per_page: 8
        }, true)
        return res
      } catch (error) {
        return error.msg
      }
      
  } 
  const { isLoading, data:artistData } = useQuery(["artistQuery"], handleGetDataArtist, {
    keepPreviousData: true,
    refetchOnWindowFocus:false
  });
  const albumQueryKey = ['queryAlbum', artistId, page];

const { data: albumData, isFetching } = useQuery(albumQueryKey, () => handleGetDataAlbum(artistId), {
  enabled: !!artistData, 
  keepPreviousData: true,
  refetchOnWindowFocus:false
});
  useTitle(t("admin.album"));
  return (
    <div>
      {isLoading ? <Spinner className="h-60 w-36 mx-auto" color="blue"/> : (
        <>
          <CreateAlbum open={openDialog} setOpen={setOpenDialog} albumDetail={!empty(albumDetail)&&albumDetail}/>
          <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="p-4">
                <span className="text-sm flex gap-1 font-normal text-gray-500 dark:text-gray-400">
                  Showing
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {albumData?.current_page+ ' - ' +albumData?.total}
                  </span>
                </span> 
                </div>
              <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
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
                      placeholder="Search htmlFor products"
                      required=""
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <select name="artist" value={artistId} className=" border-2 py-2 rounded-md text-sm" onChange={(e) => setArtistId(e.target.value)}>
                    <option value={0} >Tất cả</option>
                    {artistData?.data.map((artist)=>{
                      return(
                        <option value={artist.id}  key={artist.id}>{artist.name}</option>
                      )
                    })}
                  </select>
                  <ButtonRounded onClick={()=> {
                    setOpenDialog(pre=>!pre)
                    setAlbumDetail()
                  }} size="sm" bgColor="bg-blue-400">
                    <AiOutlinePlus size={20} className="font-semibold" />
                    Add Album
                  </ButtonRounded>
                  <ButtonRounded size="sm" bgColor="bg-gray-600">
                    Filter options
                    <AiOutlineDown/>
                  </ButtonRounded>
                </div>
              </div>
              <div className="overflow-x-auto min-h-[580px]">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <ListTHTable items={["Title", "Release Date", "Artist Name", "Action"]}/>
                  </thead>
                  <tbody>
                    {isFetching ? (<tr>
                          <td colSpan="8" className="text-center">
                            <Spinner
                              className="mx-auto h-11 w-11"
                              color="blue"
                            />
                          </td>
                        </tr>) : (<ListAlbum data={albumData} openDialog={setOpenDialog} setAlbumDetail={setAlbumDetail}/>)}
                  </tbody>
                </table>
              </div>
              <nav
                className="flex flex-col md:flex-row justify-center items-start md:items-center space-y-3 md:space-y-0 p-4"
                aria-label="Table navigation"
              >
                {albumData?<Pagination pageCount={albumData?.total_page} setPage={setPage}></Pagination>:""}
              </nav>
            </div>
          </div>
          </section>
        </>
      )}
    </div>
  );
}

export default Album;
