export default function Pagination({ currentPage, totalPages, onPageChange, isDisabled = false }) {
  if (!totalPages || totalPages <= 1) {
    return null
  }

  const pageItems = []
  const firstPage = 1
  const lastPage = totalPages
  const windowSize = 2

  const addPage = (page) => {
    if (!pageItems.includes(page)) {
      pageItems.push(page)
    }
  }

  addPage(firstPage)

  for (
    let page = Math.max(firstPage + 1, currentPage - windowSize);
    page <= Math.min(lastPage - 1, currentPage + windowSize);
    page += 1
  ) {
    addPage(page)
  }

  addPage(lastPage)

  const renderItems = []
  let previousPage = null

  pageItems.forEach((page) => {
    if (previousPage !== null && page - previousPage > 1) {
      renderItems.push(
        <li key={`ellipsis-${previousPage}-${page}`} className="page-item disabled">
          <span className="page-link">...</span>
        </li>
      )
    }

    renderItems.push(
      <li key={page} className={`page-item ${page === currentPage ? 'active' : ''}`}>
        <button
          type="button"
          className="page-link"
          onClick={() => onPageChange(page)}
          disabled={isDisabled || page === currentPage}
        >
          {page}
        </button>
      </li>
    )

    previousPage = page
  })

  return (
    <nav aria-label="Pagination des parties" className="d-flex justify-content-center mt-4">
      <ul className="pagination mb-0">
        <li className={`page-item ${currentPage <= 1 || isDisabled ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={isDisabled || currentPage <= 1}
          >
            Précédent
          </button>
        </li>

        {renderItems}

        <li className={`page-item ${currentPage >= totalPages || isDisabled ? 'disabled' : ''}`}>
          <button
            type="button"
            className="page-link"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={isDisabled || currentPage >= totalPages}
          >
            Suivant
          </button>
        </li>
      </ul>
    </nav>
  )
}
