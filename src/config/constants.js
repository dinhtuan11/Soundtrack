export const ROLE = {
    USER: 1,
    ADMIN: 2
}
export const APP_URL = {
    CLIENT_LOGIN: "/login",
    CLIENT_HOME: "/"
}
export const TYPE_REMOVE = {
    CHANGE_INFO : 2,
    DELETE_HARD: 1
}
export const APP_API = {
    API_REGISTER: "/user/register",
    API_VERIFY_REGISTER: "/user/verify-code",
    ADMIN_LIST_SONG_API: "/song/list",
    API_FILE: "/file?filePath="
}

export const ADMIN_URL = {
    ADMIN_LOGIN: "/admin/login",
    ADMIN_HOME: "/admin/dashboard",
    API_CREATE_SONG: "/admin/create-song"
}
export const IS_VIP = {
    VIP: 1,
    NOT_VIP: 0
}
export const API_URL = {
    LOGIN_API: "/user/login",
    USER_INFO: "/user",
    ADMIN_INFO: "admin/info",
    CONFIRM_ACCOUNT: "/user/verify-code",
    ADMIN_LOGIN_API: "/admin/login",
    LIST_ALBUMS_API: "/album/list",
    LIST_SONG_ALBUM_API: "/album/list-song",
    LIST_ARTIST_API: "/artist/list",
    NEW_SONG:"/admin/create-song",
    NEW_ALBUM:"/admin/create-album",
    API_PAYMENT: "/user/payment",
    LIKE_OR_UNLIKE:'user/like-dislike/song',
    LIST_PLAYLIST: "/user/playlist/list",
    GET_PLAYLIST_BY_ID: "/user/playlist",
    CREATE_PLAYLIST: "/user/playlist",
    ADD_SONG_TO_PLAYLIST: "/user/add/song-playlist",
    DELETE_PLAYLIST: "/user/delete/playlist",
    DELETE_SONG_TO_PLAYLIST: "/user/remove/song-playlist",
    NEW_ARTIST: "/admin/create-artist",
    DASHBOARD: "admin/dashboard",
    LIST_FAVORITE: 'user/favorite/song',
    UPDATE_ARTIST: '/admin/update-artist/',
    UPDATE_SONG: '/admin/update-song/',
    UPDATE_ALBUM: '/admin/update-album/',
    DELETE_SONG: 'admin/delete-song',
    DELETE_ARTIST: 'admin/delete-artist',
    DELETE_ALBUM: 'admin/delete-album',
    CHANGE_PASSWORD: '/user/change-password',
    GET_CATEGORY: "/song/list-category",
    LIST_POPULAR: 'song/list-popular',
    DETAIL_ARTIST: 'artist/detail',
    DOWNLOAD: "/user/download?song_path=",
}
export const ACCOUNT_STATUS = {
    NOT_VETIFY: 0,
    VETIFY: 2
}
export const TYPE_FILE = {
    IMG : 1,
    AUDIO: 2
}
export const MATCH_TYPE_FILE = {
    1: ["image/jpeg","image/jpg", "image/png"],
    2: ["audio/mp3", "audio/mpeg"],
};

export const SUPPORTED_IMG_FORMATS = [
    "image/jpg",
    "image/png",
];

export const SUPPORTED_AUDIO_FORMATS = [
    "audio/mp3",
];
export const LIKE_SONG = {
    LIKE: 1,
    NOT_LIKE:0
};
export const TYPE_PAYMENT ={
    THREE_DAY : 1,
    ONE_MONTH: 3,
    SIX_MONTH: 4,
    ONE_YEAR: 2
}
export const basePath = import.meta.env.VITE_BASE_API+APP_API.API_FILE
export const maxSizeAudio = 15000000; // 15MB
export const maxSizeImage = 10000000; // 10MB
