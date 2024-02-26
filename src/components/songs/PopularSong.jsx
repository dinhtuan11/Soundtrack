import { getNextPageIndex, getRequest } from 'src/utils/CommonRequest'
import SongItem from './SongItem'
import { APP_API } from 'src/config/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { handlePlayList } from 'src/redux/slices/song'
import { useDispatch } from 'react-redux'
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react'
import LoadingSongItem from '../loadingSkeleton/LoadingSongItem'

function PopularSong() {
    const dispatch = useDispatch();
    const { ref, inView } = useInView();
    const {data, isLoading, isFetchingNextPage, fetchNextPage} = useInfiniteQuery(["querySong"], async ({ pageParam = 1}) => {
        const res = await getRequest(APP_API.ADMIN_LIST_SONG_API, {
            per_page: 10,
            page: pageParam
        })
        return res
    },
    {
        getNextPageParam: getNextPageIndex,
        staleTime: 60 *1000
    },)
    const songs = useMemo(() => data?.pages?.flatMap((page) => page?.data ?? []) ?? [], [data]);
    const checkLastItem = songs.length - 1;
    const handlePlaySong =(songId) => {
        dispatch(handlePlayList({songIndex: songId, data: songs}))
    }
    useEffect(() => {
        if (inView) {
          fetchNextPage();
        }
      }, [fetchNextPage, inView]);
    return (
        <div className="bg-white h-[38vh] none-display-scrollbar overflow-y-scroll rounded-md">
            <>
                {isLoading? <LoadingSongItem/>:songs.map((items, index)=>(
                    <SongItem key={index} idNumber={index+1} handlePlaySong={handlePlaySong} datas={items} isLastItem={index === checkLastItem}/>
                ))}
                <div style={{ height: 1 }} ref={ref}></div>
                {isFetchingNextPage && <LoadingSongItem/>}
            </>
        </div>
    )
}

PopularSong.propTypes = {

}

export default PopularSong

