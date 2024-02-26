import { Typography } from "@material-tailwind/react";
import { ButtonRounded } from "../ButtonRounded";
import { HiBadgeCheck } from "react-icons/hi";
import Proptypes from "prop-types"
import { basePath } from "src/config/constants";
import { t } from "i18next";

const ContentSlide = ({items, setAlbumId}) => {
  return (
    <>
      <div className="relative w-full h-full">
        <img
          src={basePath+items?.album_image}
          alt="image 1"
          className="hidden w-full h-full md:block bg-cover object-cover"
        />
        <img src={basePath+items?.album_image} alt="artrist" className="block w-2/3 h-full m-auto object-cover md:hidden"/>
        <div className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/75">
          <div className="flex flex-col justify-center w-4/6 p-5 md:w-3/6 sm:block">
            <Typography
              variant="h5"
              color="white"
              className="flex justify-center items-center gap-3 mb-3 text-sm md:text-xl md:text-left md:justify-start"
            >
              <HiBadgeCheck className="text-cyan-400"/>
              {items?.artists_name}
            </Typography>
            <p
              className="sm:mb-4 mb-0 text-center sm:text-left text-[2rem] mobile-lg:text-[1.5rem] font-poppins font-semibold text-white w-[90%] line-clamp-2"
            >
              {items?.title?? t("user.undefined")}
            </p>
            <Typography
              color="gray"
              className="my-3 text-sm sm:w-[80%] w-44 truncate"
            >
              {t("home.release_date")}: {items?.release_date ?? t("user.undefined")}
            </Typography>
               <div>
                <ButtonRounded onClick={setAlbumId} size="lg" bgColor="bg-primary border-none w md:px-7 py-3.5 px-3 py-1 text-2">
                  {t("home.play")}
                </ButtonRounded>
               </div>
          </div>
          <div className="hidden h-full p-4 md:w-2/5 md:block">
            <img src={basePath+items?.album_image} alt="artrist" className="object-contain w-full h-full m-auto "/>
          </div>
        </div>
      </div>
      
    </>
  );
}

ContentSlide.propTypes = {
  items: Proptypes.object,
  setAlbumId: Proptypes.func
}

export default ContentSlide;