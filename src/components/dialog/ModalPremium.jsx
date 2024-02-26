import { Button, Dialog } from "@material-tailwind/react";
import { t } from "i18next";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import banner from "src/assets/images/imgmodal.png";
import PropTypes from 'prop-types'
import { useSelector } from "react-redux";

const ModalPremium = ({isOpen, onClose}) => {
  const {userInfo} = useSelector((state) => state.auth);
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div>
        <div className="relative w-full h-[350px]">
          <img src={banner} alt="" className="w-full h-full object-cover" />
          <div className="absolute top-2 right-2">
            <IoIosCloseCircleOutline
              size={25}
              color="white"
              className="cursor-pointer"
              onClick={()=>onClose(pre=>!pre)}
            />
          </div>
          <div className="absolute top-28 flex flex-col gap-y-3 px-8">
            <h1 className="text-[#FFFFFF] text-lg font-semibold">
              {t("premium.title_modal_premium")}
            </h1>
            <span className="text-[#E9E5E5] text-base font-normal">
              {t("premium.content_modal_premium")}
            </span>
            <div className="flex gap-3">
              <Link to={userInfo?.name ? "/premium" : "/login"}>
                <Button className="bg-primary rounded-3xl" size="md" onClick={()=> onClose(pre=>!pre)}>
                  {t("premium.start")}
                </Button>
              </Link>
              <Link to={userInfo?.name ? "/premium" : "/login"}>
                <Button
                  className="bg-[#ffffff0e] rounded-3xl border border-primary"
                  size="md"
                  onClick={()=> onClose(pre=>!pre)}
                >
                  {t("premium.view_packages")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

ModalPremium.propTypes = {
 onClose: PropTypes.func,
 isOpen: PropTypes.bool
}
export default ModalPremium;
