import { ButtonRounded } from "../ButtonRounded";
import { FaBirthdayCake, FaFacebookSquare, FaInstagram } from "react-icons/fa";
import { AiOutlineTwitter } from "react-icons/ai";
import Proptypes from "prop-types";
import { basePath } from "src/config/constants";
import { t } from "i18next";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import defaultAvatar from "src/assets/images/defaultImage.png"
import { useState } from "react";
import DialogChangePassword from "../dialog/DialogChangePassword";

const ProfileAvatar = ({data}) => {
  const[open, setOpen] = useState (false)
  return (
    <div>
    <DialogChangePassword open={open} setOpen={setOpen}/>
    <div className="flex flex-col items-center">
      <div className="w-[200px] h-[200px] laptop:w-[150px] laptop:h-[150px]">
        <img
          src={basePath+data?.avatar || defaultAvatar}
          onError={({currentTarget}) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultAvatar
            }}
          alt=""
          className="w-full h-full rounded-full object-cover border"
        />
      </div>
      <div className="flex flex-col gap-2 items-center text-center pt-2">
        <h1>{data?.name}</h1>
        <div className="flex items-center gap-2 justify-center">
          <MdEmail />
          <h2>{data?.email}</h2>
        </div>
        <div className="flex items-center gap-2 justify-center">
         <FaPhoneVolume />
         <span>{data?.phone || t("home.not_yet_Phone")}</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
        <FaBirthdayCake />
         <span>{data?.birthday || t("home.not_yet_Birthday")}</span>
        </div>
        <div>
          <ButtonRounded bgColor="bg-primary" size="md" onClick={() =>setOpen(!open)}>
            {t('profile.change_password')}
          </ButtonRounded>
        </div>
        <div className="flex gap-3">
          <FaFacebookSquare size={25} color="#337fff" />
          <FaInstagram size={25} />
          <AiOutlineTwitter size={25} color="#33ccff" />
        </div>
      </div>
    </div>
    </div>
  );
}
ProfileAvatar.propTypes = {
  data: Proptypes.object
}
export default ProfileAvatar