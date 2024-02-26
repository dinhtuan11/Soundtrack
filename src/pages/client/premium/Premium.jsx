import { Button, Spinner } from "@material-tailwind/react";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { MdOutlineDone } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RecentComponent from "src/components/sidebar/RecentComponent";
import RencentPlay from "src/components/sidebar/RencentPlay";
import { API_URL, IS_VIP, TYPE_PAYMENT } from "src/config/constants";
import { useSetBreadcrumb } from "src/hooks/useSetBreadcrumb";
import useTitle from "src/hooks/useTitle";
import { postRequest } from "src/utils/CommonRequest";
import { empty } from "src/utils/Helper";

const PREMIUM = [
  {
    title: t("premium.premium"),
    price: `30.000đ / ${t("premium.month")}`,
    payment_month: t("premium.payment_month"),
    feature: t("premium.feature"),
    download: t("premium.download_song"),
    ads: t("premium.no_ads"),
    playlist: t("premium.create_playlist"),
    sound: t("premium.sound_quality"),
    unlimited: t("premium.unlimited"),
    icon: <MdOutlineDone />,
    typePayment: TYPE_PAYMENT.ONE_MONTH,
  },
  {
    title: t("premium.premium"),
    price: `150.000đ /6 ${t("premium.month")}`,
    payment_month: t("premium.payment_month"),
    feature: t("premium.feature"),
    download: t("premium.download_song"),
    ads: t("premium.no_ads"),
    playlist: t("premium.create_playlist"),
    sound: t("premium.sound_quality"),
    unlimited: t("premium.unlimited"),
    cheaper: t("premium.cheaper"),
    icon: <MdOutlineDone />,
    typePayment: TYPE_PAYMENT.SIX_MONTH,
  },
  {
    title: t("premium.premium"),
    price: `240.000đ /12 ${t("premium.month")}`,
    payment_month: t("premium.payment_month"),
    feature: t("premium.feature"),
    download: t("premium.download_song"),
    ads: t("premium.no_ads"),
    playlist: t("premium.create_playlist"),
    sound: t("premium.sound_quality"),
    unlimited: t("premium.unlimited"),
    cheaper: t("premium.cheaper"),
    icon: <MdOutlineDone />,
    typePayment: TYPE_PAYMENT.ONE_YEAR,
  },
];

const Premium = () => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [isLoading, setIsLoading] = useState(null);
  const [clickedLoading, setClickedLoading] = useState(null);
  const navigate = useNavigate();
  useSetBreadcrumb([
    {
      title: t("home.home_page"),
      url: "/",
    },
    {
      title: "Premium",
      url: "/premium",
    },
  ]);
  useEffect(() => {
    if (empty(userInfo) || userInfo?.is_vip === IS_VIP.VIP) {
      navigate("/");
    }
  }, [userInfo?.is_vip, navigate]);
  const handlePayment = async (selected) => {
    try {
      setClickedLoading(selected);
      setIsLoading(true);
      const req = await postRequest(API_URL.API_PAYMENT, {
        type_payment: selected,
      });
      toast.success(req.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      if (req && req.data && req.data.payUrl) {
        window.location.href = req.data.payUrl;
      }
    } catch (error) {
      toast.error(error.response.data.msg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } finally {
      setIsLoading(null);
      setClickedLoading(null);
    }
  };
  useTitle(t("home.premium"));
  return (
    <div className="flex justify-between">
        <div className="w-full h-[90vh] bg-[#D9D9D95C] m-auto rounded-xl py-4 px-16 tablet-sm:px-0 mobile-md:px-0 overflow-y-scroll none-display-scrollbar mobile-md:max-h-[80vh] tablet-sm:h-[90vh] tablet-sm:pb-28">
          <div>
            <h1 className="text-[#000] text-3xl font-semibold text-center mobile-md:text-xl">
              {t("premium.title")}
            </h1>
            <div className="text-center">
              {t("premium.try_for_free")}
              <button
                className="text-[#0679FF] pl-1"
                type="submit"
                onClick={() => handlePayment(TYPE_PAYMENT.THREE_DAY)}
              >
                {t("premium.here")}
              </button>
            </div>
          </div>
          <div className="mt-11 flex gap-5 flex-wrap justify-center mobile-md:flex-col tablet-sm:items-center mobile-md:items-center mobile-md:justify-center mobile-md:pb-24 mobile-md:mt-3">
            {PREMIUM.map((item, index) => (
              <div
                key={index}
                className="border border-[#000] w-[300px] rounded-[20px] px-4 py-5"
              >
                <div className="border-b border-[#000]">
                  <h2 className="text-[#000] text-2xl font-semibold text-center">
                    {item.title}
                  </h2>
                  <h3 className="text-[#000] text-[22px] font-normal text-center">
                    {item.price}
                  </h3>
                  <p className="text-[#000] text-sm font-normal text-center">
                    {item.payment_month}
                  </p>
                  <h2 className="text-[#000] text-[20px] font-semibold text-center pt-4 mobile-md:pt-1">
                    {item.feature}
                  </h2>
                </div>
                <div className="px-2 pt-2 py-2 flex flex-col gap-y-3 h-[200px]">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[#000] text-[13px] font-normal">
                      {item.download}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[#000] text-[13px] font-normal">
                      {item.ads}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[#000] text-[13px] font-normal">
                      {item.playlist}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[#000] text-[13px] font-normal">
                      {item.sound}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-[#000] text-[13px] font-normal">
                      {item.unlimited}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.cheaper && item.icon}
                    <span className="text-[#000] text-[13px] font-normal">
                      {item.cheaper}
                    </span>
                  </div>
                </div>
                <Button
                  className="w-full rounded-[30px]"
                  type="submit"
                  onClick={() => handlePayment(item.typePayment)}
                >
                  {isLoading && clickedLoading === item.typePayment ? (
                    <Spinner className="m-auto w-4 h-4" />
                  ) : (
                    t("premium.start")
                  )}
                </Button>
              </div>
            ))}
          </div>
        </div>
      <div className="w-[317px] mobile-md:w-0 tablet-sm:w-0">
        <RecentComponent/>
        <RencentPlay/>
      </div>
    </div>
  );
};

export default Premium;
