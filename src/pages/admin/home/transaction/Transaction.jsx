import { t } from "i18next";
import { AiOutlineDown, AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { ButtonRounded } from "src/components/ButtonRounded";
import ListTHTable from "src/components/listItem/ListTHTable";
import ListTransaction from "src/components/listItem/ListTransaction";
import Pagination from "src/components/pagination/Pagination";
import useTitle from "src/hooks/useTitle";

const Transaction = () => {
    useTitle(t("admin.transaction"));
    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
          <div className="p-4">
                <span className="flex gap-1 pr-10 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">
                      1 - 1
                    </span>
                  </span>
                </div>
            <div className="flex flex-col items-stretch justify-between py-4 mx-4 space-y-3 border-t md:flex-row md:items-center md:space-x-3 md:space-y-0 dark:border-gray-700">
              <div className="w-full md:w-1/2">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <AiOutlineSearch size={20} />
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    placeholder="Search Transaction ..."
                    value=""
                    className="outline-none block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                  <ButtonRounded size="sm" bgColor="bg-blue-400"
                  >
                    <AiOutlinePlus size={20} className="font-semibold" />
                    Add Transaction
                  </ButtonRounded>
                  <ButtonRounded size="sm" bgColor="bg-gray-600"
                  >
                      Filter options
                    <AiOutlineDown/>
                  </ButtonRounded>
                </div>
            </div>
            <div className="overflow-x-auto min-h-[580px]">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <ListTHTable  items={["Transaction Type", "Payments","Status", "Date", "Total Amount"]}/>
                </thead>
                <tbody>
                    <ListTransaction/>
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col items-start justify-center p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <Pagination />
            </nav>
          </div>
        </div>
        </section>
    );
};

export default Transaction;