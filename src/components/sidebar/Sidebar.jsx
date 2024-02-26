import { Button, Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { AiFillFile, AiFillHome, AiOutlineCrown, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiSolidAlbum } from "react-icons/bi";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { GiMusicSpell, GiMusicalNotes } from "react-icons/gi";
import { MdFavorite, MdRecentActors } from "react-icons/md";
import { RiCompassDiscoverFill } from "react-icons/ri";
import { SiApplepodcasts } from "react-icons/si";
import logo from "src/assets/images/logo.png";
import { t } from "i18next";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSideBar } from "src/redux/slices/settings";
import { useState } from "react";
import { ImageExeption } from "../avatar/ImageExeption";
import { IS_VIP, basePath } from "src/config/constants";
import Search from "../search/Search";
import { empty } from "src/utils/Helper";
const NAV_ONE = [
  {
    icon: <AiFillHome />,
    text: t("home.home_page"),
    to: "/",
  },
  {
    icon: <RiCompassDiscoverFill />,
    text: t("home.artist"),
    to: "/artist",
  },
  {
    icon: <BiSolidAlbum />,
    text: t("home.albums"),
    to: "/albums",
  },
  {
    icon: <SiApplepodcasts />,
    text: t("home.podcast"),
    to: "/podcast",
  },
];
const NAV_TWO = [
  {
    icon: <MdRecentActors />,
    text: t("home.recently"),
    to: "/recently",
  },
  {
    icon: <MdFavorite />,
    text: t("home.favorites"),
    to: "/favorites",
  },
  {
    icon: <AiFillFile />,
    text: t("home.local_files"),
    to: "/local-files",
  },
];
const NAV_THREE = [
  {
    icon: <BsFillMusicPlayerFill />,
    text: t("home.lofi_music"),
    to: "/lo-fi",
  },
  {
    icon: <GiMusicalNotes />,
    text: t("home.best_of_jovi"),
    to: "/best-of-jovi",
  },
  {
    icon: <GiMusicSpell />,
    text: t("home.best_of_mayer"),
    to: "/best-of-mayer",
  },
];
const Sidebar = () => {
  const {sideBar} = useSelector((store)=> store.settings)
  const [tabBar, setTabBar] = useState(false)
  const userInfo = useSelector((state) => state.auth.userInfo)
  const dispatch = useDispatch()
  const handleSideBar = ()=>{
    dispatch(setSideBar());
  }
  return (
    <Card className={`${!sideBar ? 'w-[80px]' : 'w-[270px]'} ${tabBar?'bg-white mobile-md:w-[360px]':'mobile-md:bg-transparent mobile-md:w-[60px] mobile-md:shadow-transparent'} shadow-xl shadow-blue-gray-900/5' tablet:fixed z-20 tablet:left-0 tablet:top-0 h-screen transition-all duration-1000 overflow-hidden mobile-side__bar`}>
      <span className={`${tabBar ? 'mobile-md:flex items-center justify-between px-2' : 'mobile-md:flex'} ${empty(userInfo)&&'justify-end pl-10'} ${tabBar&&empty(userInfo)?"mb-14":" mb-4"} mt-3 relative hidden`}>
        <div className={`gap-3 hover:cursor-pointer ${empty(userInfo) ? 'hidden' : 'mobile-md:flex'}`}>
          <div className={`flex gap-3 ml-5 hover:cursor-pointer items-center ${tabBar?'opacity-1':'opacity-0'}`}>
            <ImageExeption src={basePath + userInfo?.avatar} />
            <div>
              <p className="text-base text-gray-900 font-semibold">{userInfo?.name}</p>
              <div className="flex items-center justify-between">
                {userInfo?.is_vip === IS_VIP.VIP ? (
                  <>
                    <span className="text-xs font-normal">{t("premium.premium")}</span>
                    <AiOutlineCrown color="via-yellow" />
                  </>
                ) : (<span className="text-xs font-medium">{t("home.upgrade_account")}</span>)}
              </div>
            </div>
          </div>
        </div>
        <div id="menuToggle" className={`tab-bar text-3xl text-black mobile-md:block hidden mobile-md:pl-3 absolute top-0 right-5`}>
          <input id="checkbox" type="checkbox" onClick={() => setTabBar(pre => !pre)} value={tabBar}/>
          <label className="toggle " htmlFor="checkbox">
            <div className="bar bar--top"></div>
            <div className="bar bar--middle"></div>
            <div className="bar bar--bottom"></div>
          </label>
        </div>
      </span>
      <div className={`${tabBar ? '' : 'mobile-md:hidden'}`}>
        <div className="mobile-md:block hidden">
          <Search />
        </div>
        <Link to="/" className="mobile-md:hidden">
          <div className={`flex gap-[15px] items-center ${sideBar ? 'px-8' : ''}  py-9`}>
            <img src={logo} alt="" className={`w-[30px] h-[30px] object-cover  ${sideBar ? '' : ' block m-auto'}`} />
            {sideBar && (
            <h1 className="text-2xl font-semibold text-text_color font-poppins">
              Soundtrack
            </h1>
            )}
          </div>
        </Link>
        <div className={`${sideBar ? ' overflow-y-scroll none-display-scrollbar' : 'none-display-scrollbar'} mobile-md:none-display-scrollbar mobile-md:h-[63vh] mobile-md:overflow-y-scroll side-bar`}>
          <List className={`min-w-[80px] pl-5 text-text_color ${!tabBar&&'mobile-md:opacity-0'}`}>
            {NAV_ONE.map((item, index) => (
              <NavLink to={item.to} key={index}>
                <ListItem >
                  <ListItemPrefix className="text-lg">{item.icon}</ListItemPrefix>
                  <p className={`whitespace-nowrap mobile-md:hidden block`}>{sideBar&& item.text}</p>
                  <p className={`whitespace-nowrap mobile-md:block hidden`}>
                  {tabBar&& item.text}
                  </p>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <List className={`min-w-[80px] py-8 pl-5 text-text_color ${!tabBar&&'mobile-md:opacity-0'}`}>
            {NAV_TWO.map((item, index) => (
              <NavLink to={item.to} key={index}>
                <ListItem>
                  <ListItemPrefix className="text-lg">{item.icon}</ListItemPrefix>
                  <p className={`whitespace-nowrap mobile-md:hidden block`}>{sideBar&& item.text}</p>
                  <p className={`whitespace-nowrap mobile-md:block hidden`}>
                  {tabBar&& item.text}
                  </p>
                </ListItem>
              </NavLink>
            ))}
          </List>
          <List className={`min-w-[80px] pl-5 text-text_color ${!tabBar&&'mobile-md:opacity-0'}`}>
            {NAV_THREE.map((item, index) => (
              <NavLink to={item.to} key={index}>
                <ListItem>
                  <ListItemPrefix className="text-lg">{item.icon}</ListItemPrefix>
                  <p className={`whitespace-nowrap mobile-md:hidden`}>
                  {sideBar&& item.text}
                  </p>
                  <p className={`whitespace-nowrap mobile-md:block hidden`}>
                  {tabBar&& item.text}
                  </p>
                </ListItem>
              </NavLink>
            ))}
          </List>
        <div className={`w-full ${sideBar?'text-right pr-3':'text-center'} laptop-sm:block hidden hidden-important`}>
          <Button variant="outlined" className="rounded-full border-primary text-primary p-3" onClick={handleSideBar}>
              {sideBar ? (
                <AiOutlineLeft />
              ) : (
                <AiOutlineRight />
              )}
            </Button>
        </div>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
