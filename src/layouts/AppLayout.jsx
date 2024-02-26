import { Outlet } from "react-router-dom";
import Header from "src/components/header/Header";
import ControlMusic from "src/components/musicControl/ControlMusic";
import Sidebar from "src/components/sidebar/Sidebar";
const AppLayout = () => {
  
  return (
    <>
      <div className={`flex dark:bg-blue-gray-400 dark:text-white`}>
        <Sidebar />
        <div className={`flex-1 tablet:pl-20 mobile-important__p0`}>
          <Header />
          <Outlet />
        </div>
      </div>
      <ControlMusic/>
    </>
  );
};

export default AppLayout;
