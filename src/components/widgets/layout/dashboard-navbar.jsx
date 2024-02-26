import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {AiOutlineBell,AiOutlineClockCircle,AiFillCreditCard, AiFillSetting} from "react-icons/ai";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "src/components/context";
import { BiSolidHelpCircle, BiUserCircle } from "react-icons/bi";
import { HiOutlineCog6Tooth, HiBars3 } from "react-icons/hi2";
import { FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { ImageExeption } from "src/components/avatar/ImageExeption";
import { useDispatch, useSelector } from "react-redux";
import { ButtonRounded } from "src/components/ButtonRounded";
import { APP_API } from "src/config/constants";
import { logoutAdmin } from "src/redux/slices/auth";
import { toast } from "react-toastify";
import { t } from "i18next";
import { IoMdArrowBack } from "react-icons/io";
export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");
  const adminInfo = useSelector((state) => state.auth.adminInfo);
  const file = import.meta.env.VITE_BASE_API + APP_API.API_FILE;
  const dispatchAdmin = useDispatch();
  const handleLogout = () => {
    dispatchAdmin(logoutAdmin());
    toast.success(t("home.logout_message"), {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Type here" />
          </div>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <HiBars3 strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
          {adminInfo?.name ? (
            <Menu>
              <MenuHandler>
                <div className="flex gap-3 items-center hover:cursor-pointer">
                  <ImageExeption src={file + adminInfo?.avatar} />
                  <div className="">
                    <p className="text-lg font-semibold text-black">
                      {adminInfo?.name}
                    </p>
                  </div>
                </div>
              </MenuHandler>
              <MenuList>
                <MenuItem >
                  <Link to="/" className="flex items-center gap-2">
                  <IoMdArrowBack />
                    <Typography variant="small" className="font-normal">
                      Home page
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <CgProfile />
                  <Typography variant="small" className="font-normal">
                    My Profile
                  </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <AiFillSetting />
                  <Typography variant="small" className="font-normal">
                    Edit Profile
                  </Typography>
                </MenuItem>
                <MenuItem className="flex items-center gap-2">
                  <BiSolidHelpCircle />
                  <Typography variant="small" className="font-normal">
                    Help
                  </Typography>
                </MenuItem>
                <hr className="my-2 border-blue-gray-50" />
                <MenuItem
                  className="flex items-center gap-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt />
                  <Typography variant="small" className="font-normal">
                    Sign Out
                  </Typography>
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="login">
              <ButtonRounded size="lg" bgColor="bg-primary">
                Đăng Nhập
              </ButtonRounded>
            </Link>
          )}
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
          >
            <BiUserCircle className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => setOpenConfigurator(dispatch, true)}
          >
            <HiOutlineCog6Tooth className="h-5 w-5 text-blue-gray-500" />
          </IconButton>
          <Menu>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <AiOutlineBell className="h-5 w-5 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <AiOutlineClockCircle className="h-3.5 w-3.5" /> 13 minutes
                    ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <AiOutlineClockCircle className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <AiFillCreditCard className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <AiOutlineClockCircle className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
