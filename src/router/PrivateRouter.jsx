import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { getUserInfo } from "src/redux/slices/auth";


const PrivateRoute = () => {
    const { accessToken, userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (accessToken && !userInfo?.name) {
            dispatch(getUserInfo())
        }
    }, [accessToken, dispatch, userInfo?.name]);
   return <Outlet/>;
};

export default PrivateRoute;