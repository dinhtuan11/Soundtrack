import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "src/assets/images/logo.png";
import donutInform from "src/assets/images/donut_inform.png";
import donutBg from "src/assets/images/donut_bg.png";
import astronaut from "src/assets/images/astronaut.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { APP_URL } from "src/config/constants";
import { t } from "i18next";

const AuthLayout = () => {
  const {accessToken, userInfo} = useSelector((state) => state.auth);
  const navigate = useNavigate() 
useEffect(()=> {
  if (accessToken && userInfo?.name) {
    navigate(APP_URL.CLIENT_HOME)
  }
},[accessToken, navigate, userInfo])
  return (
      <div className="relative flex items-center justify-center w-11/12 min-h-screen mx-auto sm:p-10 login-container md:p-2 xs:p-0 xs:w-10/12">
        <div className="hidden md:block absolute md:bottom-0 md:right-0 z-[-2] ">
          <img
            src={donutBg}
            width={170}
            height={170}
            alt="donut"
            className="hidden md:block"
          />
          <img
            src={astronaut}
            width={170}
            height={170}
            alt="astronaut"
            className="block md:hidden"
          />
        </div>
        <div className="w-full gap-5 overflow-hidden bg-white border border-primary login-content min-h-[619px] md:flex md:p-0 rounded-3xl md:w-10/12">
          <div className="hidden w-11/12 p-5 lg:p-10 login-side__left bg-primary md:block md:w-7/12">
            <Link to="/">
              <div className="flex items-center gap-4 text-left cursor-pointer">
                <img src={logo} alt="logo" width={30} height={30} />
                <h2 className="text-lg font-semibold text-white title font-poppins">
                  Soundtrack
                </h2>
              </div>
            </Link>
            <div className="flex flex-col items-center justify-center h-full gap-11">
              <div className="relative flex items-start justify-center w-full gap-10 side-left__body">
                <img
                  src={donutInform}
                  width={176}
                  height={156}
                  alt="donut"
                  className="object-contain lg:w-[180px] lg:h-[170px] absolute left-0"
                />
                <div className="relative left-body__image">
                  <img
                    src={astronaut}
                    width={179}
                    height={209}
                    alt="donut"
                    className="m-auto lg:w-[150px] lg:h-[160px]"
                  />
                </div>
              </div>
              <div className="w-full text-center text-white side-left__title font-open-sans">
                <h4 className="pb-4 text-xl font-semibold">{t("user.wellcome")}</h4>
                <h2 className="pb-3 text-3xl font-semibold">{t("user.slogan_side_login")}</h2>
                <p className="text-sm font-light">
                  {t("user.slogan_side_login_small")}
                </p>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center w-full p-5 text-center lg:p-10 login-side__right md:w-5/12 font-open-sans">
            <div className="w-full h-full side-right__form">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
  );
};

export default AuthLayout;
