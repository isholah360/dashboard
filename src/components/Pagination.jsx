import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-12 text-gray-600">
      <div className="hidden justify-between text-sm md:flex">
        <div>Showing data {((currentPage - 1) * 10) + 1} to {Math.min(currentPage * 10, totalPages * 10)} of {totalPages * 10} entries</div>
        <div className="flex items-center gap-8" aria-label="Pagination">
          <button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className="hover:text-indigo-600 bg-[#eeeeee] p-2.5 rounded-lg"
            disabled={currentPage === 1}
          >
            <MdOutlineKeyboardArrowLeft />
          </button>
          <ul className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index + 1}>
                <button
                  onClick={() => onPageChange(index + 1)}
                  aria-current={currentPage === index + 1 ? "page" : false}
                  className={`px-3 py-2 rounded-lg duration-150 hover:text-white hover:bg-indigo-600 ${
                    currentPage === index + 1 ? "bg-indigo-600 text-white font-medium" : "bg-[#eeeeee]"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className="hover:text-indigo-600 bg-[#eeeeee] p-2.5 rounded-lg"
            disabled={currentPage === totalPages}
          >
            <MdOutlineKeyboardArrowRight />
          </button>
        </div>
      </div>
      {/* Mobile Version */}
      <div className="flex items-center justify-between text-sm text-gray-600 font-medium md:hidden">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <div className="font-medium">SHOWING {((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalPages * 10)} OF {totalPages * 10}</div>
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          className="px-4 py-2 border rounded-lg duration-150 hover:bg-gray-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
