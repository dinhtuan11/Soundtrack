import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ADMIN_URL } from "src/config/constants";
import { getAdminInfo } from "src/redux/slices/auth";


const PrivateAdminRoute = () => {
    const { adminToken, adminInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        if (adminToken && !adminInfo?.name) {
            dispatch(getAdminInfo())
        }
    }, [adminInfo?.name, adminToken, dispatch]);
   return adminToken && adminInfo?.name? <Outlet /> : <Navigate to={ADMIN_URL.ADMIN_LOGIN} />;
};

export default PrivateAdminRoute;