import { Button } from "@material-tailwind/react";
import { t } from "i18next";
import SectionFavotire from "src/components/SectionFavotire";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogEditProfile from "src/components/dialog/DialogEditProfile";
import ProfileAvatar from "src/components/profile/ProfileAvatar";
import { basePath } from "src/config/constants";
import { useSetBreadcrumb } from "src/hooks/useSetBreadcrumb";
import useTitle from "src/hooks/useTitle";
import RencentPlay from "src/components/sidebar/RencentPlay";
import defaultBanner from "src/assets/images/bannerImage.png"

const ProfileUser = () => {
  const { userInfo, accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo?.name && !accessToken) {
      navigate("/");
    }
  }, [userInfo?.name, navigate, accessToken]);
  const [openDialog, setOpenDialog] = useState(false);
  useSetBreadcrumb([
    {
      title: t("home.home_page"),
      url: "/",
    },
    {
      title: t("admin.profile"),
      url: "/profile-user",
    },
  ]);
  useTitle(t("home.profile"));
  return (
    <div className="pl-[30px] pr-[71px] laptop:pr-[20px] h-[78vh] overflow-y-scroll none-display-scrollbar">
      <RencentPlay />
      <DialogEditProfile isOpen={openDialog} setOpen={setOpenDialog} data={userInfo}/>
      <div className="relative laptop:h-[120vh] h-full">
        <div className="w-full h-[246px] pt-1">
          <img
            src={basePath + userInfo?.cover_image || defaultBanner}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = defaultBanner;
            }}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute top-44 right-14 mobile-lg:top-10 mobile-lg:right-10">
          <Button
            className="bg-[#FFFFFF80] text-black font-semibold hover:bg-primary hover:text-white rounded-[22px]"
            onClick={() => setOpenDialog(true)}
          >
            {t("profile.edit_profile")}
          </Button>
        </div>
        <div className="flex justify-between tablet:justify-center">
          <div className="w-[257px] relative -top-20">
            <ProfileAvatar data={userInfo}></ProfileAvatar>
          </div>
          <div className="w-full px-10 tablet:hidden">
            <SectionFavotire/>
          </div>
        </div>
        <div className="justify-center hidden w-full tablet:flex">
            <SectionFavotire/>
          </div>
      </div>
    </div>
  );
};

export default ProfileUser;
