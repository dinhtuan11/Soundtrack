import { createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { API_URL } from 'src/config/constants';
import axiosInstance from 'src/utils/axios';
import instanceAdmin from 'src/utils/axiosAdmin';
export const getUserInfo =   () =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await axiosInstance.get(API_URL.USER_INFO, {
        timeout: 5000 // 5s
      });
      dispatch(setUserInfo(response?.data));
    } catch (error) {
      dispatch(setAccessToken(null));
    } finally {
      dispatch(setIsLoading(false));
    }
};
export const getAdminInfo = () =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await instanceAdmin.get(API_URL.ADMIN_INFO, {
        timeout: 5000 // 5s
      });
      dispatch(setAdminInfo(response?.data));
    } catch (error) {
      dispatch(setAdminToken(null));
    } finally {
      dispatch(setIsLoading(false));
    }
};

const initialState = {
  userInfo: {},
  accessToken: "",
  adminInfo : {},
  adminToken: "",
  isLoading: false
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      state.accessToken = action.payload?.accessToken || state.accessToken;
    },
    setAdminInfo: (state, action) => {
      state.adminInfo = action.payload;
      state.adminToken = action.payload?.accessToken || state.adminToken;
    },
    setAdminToken: (state, action) => {
      state.adminToken = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    logoutUser: (state) => {
      state.userInfo = {};
      state.accessToken = ""
    },
    logoutAdmin: (state) => {
      state.adminInfo = {};
      state.adminToken = ""
    }
  },
});

const { actions, reducer } = authSlice
export const { setAccessToken, setIsLoading, setUserInfo, setAdminInfo, setAdminToken, logoutUser, logoutAdmin } = actions;
export default reducer;

export const login =
  () =>
  async (dispatch) => {
    dispatch(setIsLoading(true));
    try {
      const response = await axiosInstance.post('/');
      return response;
    } catch (error) {
      throw new AxiosError
    } finally {
      dispatch(setIsLoading(false));
    }
  };
