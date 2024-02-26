import { Menu, MenuHandler, MenuItem, MenuList, Tooltip, Typography} from "@material-tailwind/react"
import { AiOutlineCrown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { FaSignOutAlt, FaUserAlt } from "react-icons/fa"
import { BiSolidHelpCircle } from "react-icons/bi"
import { t } from "i18next"
import Search from "../search/Search"
import { useDispatch, useSelector } from "react-redux"
import { ButtonRounded } from "../ButtonRounded"
import { ImageExeption } from "../avatar/ImageExeption"
import { logoutUser } from "src/redux/slices/auth"
import { Link } from "react-router-dom"
import { IS_VIP, basePath } from "src/config/constants"
import { toast } from "react-toastify"
import { setOpenModalVip, setSideBar } from "src/redux/slices/settings"
import { useTranslation } from "react-i18next"
import { locales } from "src/i18n"
import { MdLanguage } from "react-icons/md"
import ModalPremium from "../dialog/ModalPremium"
import { useEffect, useState } from "react"
import logo from "src/assets/images/logo.png";
import { empty } from "src/utils/Helper"
import { queryClient } from "src/main"
import Breadcrumb from "./Breadcrumb"

const Header = () => {
  const dispatch = useDispatch();
  const {userInfo, accessToken} = useSelector((state) => state.auth)
  const {sideBar} = useSelector((state) => state.settings)
  const [openModal, setOpenModal] = useState(false);
  const {i18n} = useTranslation();
  const currentLanguage = locales[i18n.language]
  const changeLanguage = (lng) =>{
    i18n.changeLanguage(lng).then(() => {
      window.location.reload();
    })
  }
  const toggleLanguage = () => {
    const newLanguage = i18n.language === "vi" ? "en" : "vi"
    changeLanguage(newLanguage)
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setOpenModalVip());
    queryClient.invalidateQueries('querySong');
    toast.success(t("home.logout_message"),{
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000
    })
  };
  const handleSideBar = ()=>{
    dispatch(setSideBar());
  }
  
  const check = accessToken ? Object.values(accessToken).length > 0 : false
  useEffect(() => {
    if(check){
      if(userInfo?.is_vip === IS_VIP.VIP){
        setOpenModal(false)
      }else if(!empty(userInfo)){
        return setOpenModal(true)
      } 
    }else{
      setOpenModal(true)
    }  
  },[check, userInfo, setOpenModal]) 
  return (
    <div>
      <div className={`flex flex-row justify-between gap-6 px-8 border py-2 lg:py-5 border-b-gray-200 ${empty(userInfo)?'mobile-md:py-4':''}`}>
        <div className="flex justify-between tablet:justify-normal tablet:gap-14  basis-10/12 items-center">
          <div className="flex gap-6">
            <button className={`p-[15px] bg-orange-600 rounded-lg laptop-sm:hidden block`} onClick={handleSideBar}>
            {sideBar  ? (
              <AiOutlineLeft size={20} color="white" />
            ) : (
              <AiOutlineRight size={20} color="white" />
            )}
            </button>
            <Breadcrumb/>
          </div>
          <div className="flex gap-6">
            <div className="relative mobile-md:hidden">
              <Search />
            </div>
            <div className="tablet:hidden">
              <button onClick={toggleLanguage} className="bg-primary rounded-lg text-white flex items-center justify-center gap-1 py-3 w-[80px]"><MdLanguage size={20}/> {currentLanguage}</button>
            </div>
          </div>
          <Link to="/" className={`mobile-md:flex hidden text-center gap-2 items-center ${userInfo?'-ml-10':'-ml-4'}`}>
            <img src={logo} alt="" className={`w-[30px] h-[30px] object-cover ${sideBar ? '' : ' block m-auto'}`} />
            <h1 className="text-2xl font-semibold text-text_color font-poppins">
              Soundtrack
            </h1>
          </Link>
        </div>
        <div className="basis-2/12 flex items-center">
          {userInfo?.name ? (
            <Menu>
              <MenuHandler>
                <div className="flex gap-3 hover:cursor-pointer items-center">
                  <ImageExeption src={basePath+userInfo?.avatar}/>
                  <div className="tablet-sm:hidden laptop:w-[130px]">
                    <p className="font-semibold">{userInfo?.name}</p>
                    <div className="flex items-center justify-between">
                      {userInfo?.is_vip === IS_VIP.VIP ? (
                      <>
                      <span className="text-xs font-normal">{t("premium.premium")}</span>
                      <AiOutlineCrown color="via-yellow" />
                      </>
                      ): (<span className="text-sm laptop:text-xs font-medium">{t("home.upgrade_account")}</span>)}
                    </div>
                  </div>
                </div>
              </MenuHandler>
              <MenuList>
                <div className="pb-2 border-b border-b-gray-600 tablet-sm:block hidden">
                  <div className="flex gap-3 hover:cursor-pointer ">
                    <ImageExeption src={basePath+userInfo?.avatar}/>
                    <div>
                      <p className="text-base text-gray-900 font-semibold">{userInfo?.name}</p>
                      <div className="flex items-center justify-between">
                        {userInfo?.is_vip === IS_VIP.VIP ? (
                        <>
                        <span className="text-xs font-normal">{t("premium.premium")}</span>
                        <AiOutlineCrown color="via-yellow" />
                        </>
                        ): (<span className="text-xs font-medium">{t("home.upgrade_account")}</span>)}
                      </div>
                    </div>
                  </div>
                </div>
                <MenuItem className="flex items-center gap-2">
                  <CgProfile />
                  <Link to="/profile-user">
                  <Typography variant="small" className="font-normal">
                    {t('user.profile')}
                  </Typography>
                  </Link>  
                </MenuItem>
                {userInfo?.is_vip !== IS_VIP.VIP && (
                  <Link to="/premium">
                  <MenuItem className="flex items-center gap-2">
                  <AiOutlineCrown color="via-yellow" />
                  <Typography variant="small" className="font-normal">
                    {t("premium.premium")}
                  </Typography>
                </MenuItem>
                </Link>
                )}
                 <MenuItem className="tablet:flex items-center gap-2 hidden  justify-between w-full" onClick={toggleLanguage}>
                 <span className="flex gap-2"><MdLanguage size={15}/> {t('user.language')}</span> <span className="text-primary">{currentLanguage}</span>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <BiSolidHelpCircle />
                  <Typography variant="small" className="font-normal">
                    {t("home.help")}
                  </Typography>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem
                  className="flex items-center gap-2 "
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <Typography variant="small" className="font-normal">
                    {t("user.sign_out")}
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
           <>
            <Link to="login" className="tablet-sm:hidden">
              <ButtonRounded size="md" bgColor="bg-primary">
                {t('auth.login')}
              </ButtonRounded>
              </Link>

              <Link to="login" className="tablet-sm:block hidden">
              <Tooltip
                content={t("auth.login")}
                className="bg-white text-black shadow-lg"
                placement="bottom"
                >
                  <span><FaUserAlt className="text-3xl text-primary"/></span>
              </Tooltip>
              </Link>
           </>
          )}
        </div>
      </div>
      <ModalPremium isOpen={openModal} onClose={setOpenModal} />
    </div>
  );
}

export default Header