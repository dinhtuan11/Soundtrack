import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/auth'
import songReducer from './slices/song'
import settingsReducer from './slices/settings'
const persistAuthConfig = {
  key: 'auth',
  storage,
  whitelist: ['accessToken', 'adminToken'],
  blacklist:['userInfo', 'adminInfo']
};
const persistSongConfig = {
  key: 'song',
  storage,
  whitelist: ['playList'],
};

const persistSettingsConfig = {
  key: 'settings',
  storage,
  whitelist: ['themeMode', 'sideBar', 'recentBar']
};
const rootReducer = combineReducers({
  auth: persistReducer(persistAuthConfig, authReducer),
  song: persistReducer(persistSongConfig, songReducer),
  settings: persistReducer(persistSettingsConfig, settingsReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false
    })
});
export const persistor = persistStore(store);

export default store;
