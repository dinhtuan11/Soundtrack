import { API_URL } from "src/config/constants";
import ArtistPage from "./ArtistPage";
import { getNextPageIndex, getRequest } from "src/utils/CommonRequest";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { useInView } from 'react-intersection-observer';
import { useSetBreadcrumb } from "src/hooks/useSetBreadcrumb";
import { t } from "i18next";
import useTitle from "src/hooks/useTitle";
import RencentPlay from "src/components/sidebar/RencentPlay";

const ArtistContainer = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchKeyQuery, setSearchKeyQuery] = useState(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { ref, inView } = useInView();
  useSetBreadcrumb([
    {
      title: t("home.home_page"),
      url:'/'
    },
    {
      title:t("home.artist"),
      url:"/artist"
    }
  ])
  const { data, isLoading, isFetchingNextPage, isRefetching,fetchNextPage, refetch } =
    useInfiniteQuery(
      ["queryArtist", searchKeyQuery],
      async ({ pageParam = 1 }) => {
        try {
            const param = searchKeyQuery ? {keyword_char : searchKeyQuery} : {}
          const res = await getRequest(API_URL.LIST_ARTIST_API, {
            per_page: 15,
            page: pageParam,
            keyword:debouncedSearchQuery,
            ...param
          });
          return res;
        } catch (error) {
          console.log("error: ", error);
        }
      },
      {
        getNextPageParam: getNextPageIndex,
        staleTime: 60 * 1000,
        refetchOnWindowFocus: false
      }
    );
  useEffect(() => {
    refetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, searchKeyQuery, searchKeyQuery]);
  useEffect(() => {
    if(inView){
        fetchNextPage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);
  const artists = useMemo(
    () => data?.pages?.flatMap((page) => page?.data ?? []) ?? [],
    [data]
  );
  const loading = isLoading || isRefetching;
  useTitle(t("home.profile_Artist"));
  return (
    <>
        <RencentPlay />
        <div className={`flex flex-row justify-between gap-6 px-8 mobile-lg:px-2 py-2 max-h-[80vh]`}>
            <ArtistPage artists={artists} 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery} 
                        isLoading={loading}
                        searchKeyQuery={searchKeyQuery}
                        setSearchKeyQuery={setSearchKeyQuery}
                        refView={ref}
                        isFetchingNextPage={isFetchingNextPage}
                        />
        </div>
    </>
  );
};

export default ArtistContainer;
