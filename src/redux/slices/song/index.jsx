import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playList: [],
  index: 0,
};
const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setPlayList: (state, action) => {
      state.playList = action.payload;
    },
    setIndex: (state, action) => {
      state.index = action.payload
    },
    handlePlayList: (state, action) => {
      const {songIndex, data} = action.payload
       const selectedSong = data[songIndex];
       const newPlayList = [selectedSong, ...data.slice(songIndex + 1)];
       state.playList = newPlayList
       state.index = 0
     },
    pushSongToPlaylist: (state, action)=> {
      const datas = action.payload
      const updatedPlayList = [...state.playList];
      const isSongInPlaylist = updatedPlayList.some((song) => song.song_id === datas.song_id);
      if (!isSongInPlaylist) {
        updatedPlayList.splice(state.index + 1, 0, datas);
      } else {
        const existingSongIndex = updatedPlayList.findIndex((song) => song.song_id === datas.song_id);
          if (existingSongIndex !== -1) {
              if(existingSongIndex < state.index) {
                // nằm sau bài đang phát
                  updatedPlayList.splice(state.index+1, 0, datas);
                  updatedPlayList.splice(existingSongIndex, 1);
                  state.index = state.index -1
              }else{
                //nằm trước bài đang phát
                  updatedPlayList.splice(state.index +1, 0, datas);
                  updatedPlayList.splice(existingSongIndex +1, 1);
              }
          } 
      }
      state.playList = updatedPlayList;
    },
    playOneSong: (state, action) => {
      const index = state.index
      if(index>0){
        state.index = 0
      }
      state.playList = action.payload
    },
    removeSongFromPlayListById: (state, action)=> {
      const {playList, index} = state
      const updatedPlayList = playList.filter((song) => song.song_id !== action.payload);
      state.playList = updatedPlayList;
      if (index > 0) {
        state.index = index - 1
      }
    }
  },
});

const { actions, reducer } = songSlice
export const { setPlayList, setIndex, handlePlayList, pushSongToPlaylist, playOneSong, removeSongFromPlayListById } = actions;
export default reducer;

