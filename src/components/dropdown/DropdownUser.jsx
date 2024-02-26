import {
  Avatar,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { AiFillSetting, AiOutlineCrown } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { CiInboxIn } from "react-icons/ci";
import { IoMdHelpBuoy } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";
import {PropTypes} from "prop-types"
import { useSelector } from "react-redux";


const DropdownUser = () => {
  const {avatar, name} = useSelector((state) => state.auth.userInfo);
  return (
    <div>
      <Menu>
        <MenuHandler>
          <div className="flex gap-3">
            <Avatar
              variant="circular"
              alt="tania andrew"
              className="cursor-pointer"
              src={avatar}
            />
            <div>
              <p className="text-base font-semibold">{name}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-normal">Premium</span>
                <AiOutlineCrown color="via-yellow" />
              </div>
            </div>
          </div>
        </MenuHandler>
        <MenuList>
          <MenuItem className="flex items-center gap-2">
            <BiUserCircle />
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
            <CiInboxIn />
            <Typography variant="small" className="font-normal">
              Inbox
            </Typography>
          </MenuItem>
          <MenuItem className="flex items-center gap-2">
            <IoMdHelpBuoy />
            <Typography variant="small" className="font-normal">
              Help
            </Typography>
          </MenuItem>
          <hr className="my-2 border-blue-gray-50" />
          <MenuItem className="flex items-center gap-2 ">
            <FaSignOutAlt />
            <Typography variant="small" className="font-normal">
              Sign Out
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
DropdownUser.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string,
}

export default DropdownUser;
