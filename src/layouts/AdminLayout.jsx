import {  Outlet } from "react-router-dom";
import { HiOutlineCog6Tooth } from "react-icons/hi2";
import { IconButton } from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenConfigurator } from "src/components/context";
import routes from "src/pages/admin/routes";
import Sidenav from "src/components/widgets/layout/sidenav";
import DashboardNavbar from "src/components/widgets/layout/dashboard-navbar";
import Configurator from "src/components/widgets/layout/configurator";
import Footer from "src/components/widgets/layout/footer";

export function AdminLayout() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  
  return (
    
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <HiOutlineCog6Tooth className="h-5 w-5" />
        </IconButton>
        <Outlet/>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;