import { t } from "i18next";
import { Link } from "react-router-dom";
import { useSetBreadcrumb } from "src/hooks/useSetBreadcrumb";

const UpdatePage = () => {
    useSetBreadcrumb([
        {
          title: t("home.home_page"),
          url:'/'
        },
        {
          title:t("home.updatePage"),
          url:"/*"
        }
      ])
  return (
     <div className="flex flex-col-reverse items-center justify-center gap-16 px-4 py-24 lg:px-24 lg:py-24 md:py-20 md:px-44 lg:flex-row md:gap-28 mobile-md:gap-5 ">
            <div className="relative w-full pb-12 xl:pt-24 xl:w-1/2 lg:pb-0">
                <div className="relative">
                    <div className="absolute">
                        <div className="">
                            <h1 className="my-2 text-5xl font-bold text-gray-800">
                                {t("home.update")}
                            </h1>
                            <p className="my-2 text-gray-800">{t("home.update_Page")}</p>
                            <Link to='/'><button className="px-8 py-4 my-2 text-center text-white bg-orange-600 border rounded sm:w-full lg:w-auto md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-700 focus:ring-opacity-50">{t("home.back_Home")}</button> </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <img src="https://png.pngtree.com/png-vector/20220718/ourmid/pngtree-data-leakage-abstract-concept-vector-illustration-png-image_5914663.png"/>
            </div>
        </div>
  );
};

export default UpdatePage;
