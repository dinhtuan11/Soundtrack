import { createSlice } from '@reduxjs/toolkit';
import { t } from 'i18next';


const initialState = {
  themeMode: 'light',
  sideBar: false,
  recentBar: false,
  openModalVip: true,
  breadcrumb: [
    {
      title:t("home.home_page"),
      url : '/'
    }
  ],
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
    },
    setSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    setRecentBar: (state)=> {
      state.recentBar = !state.recentBar;
    },
    setOpenModalVip: (state)=> {
      state.openModalVip = !state.openModalVip;
    },
    setBreadcrumb: (state, action)=> {
      state.breadcrumb = [
        ...action.payload
      ];
    },
  }
});

export const { setThemeMode, setSideBar, setRecentBar, setOpenModalVip, setBreadcrumb } = settingsSlice.actions;

export default settingsSlice.reducer;
