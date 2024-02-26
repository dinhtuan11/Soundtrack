import PropTypes from "prop-types";
import ReactPaginate from "react-paginate";

const Pagination = ({pageCount, setPage}) => {
  const handlePageClick = (pageIndex) => {
    setPage(+pageIndex.selected + 1)
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        previousLabel="< Previous"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageClassName=" flex items-center justify-center h-7 w-7"
        pageLinkClassName="p-2"
        containerClassName="flex items-center"
        activeClassName="relative align-middle select-none font-sans font-base text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        previousClassName="h-7 flex justify-center items-center mr-4"
        nextClassName="h-7 flex justify-center items-center ml-4"
        disabledClassName="text-gray-400"
        disableInitialCallback
      />
    </>
  );
}

export default Pagination ;

Pagination.propTypes = {
  pageCount: PropTypes.number,
  setPage: PropTypes.func
}