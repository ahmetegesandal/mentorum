export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <nav className="d-flex align-items-center justify-content-center">
      <ul className="pagination mb-0 pagination-rounded">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            <i className="ti ti-chevron-left ti-md"></i>
          </button>
        </li>

        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
        >
          <button
            className="page-link"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          >
            <i className="ti ti-chevron-right ti-md"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
}
