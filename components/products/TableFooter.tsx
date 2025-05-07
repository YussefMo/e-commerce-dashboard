function TableFooter() {
  const currentPage: number = 4;
  const totalPages: number = 50;

  return (
    <div className="border-border mt-6 flex items-center justify-center gap-5 border-t pt-4">
      <button
        className="bg-icon hover:bg-icon/80 cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <div className="flex items-center space-x-2 text-sm">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`cursor-pointer rounded-md px-3 py-1 ${currentPage === page ? 'bg-icon cursor-not-allowed text-white' : 'hover:bg-muted'}`}
          >
            {String(page).padStart(2, '0')}
          </button>
        ))}
        {totalPages > 5 && <span className="text-muted-foreground">...</span>}
        {totalPages > 4 && (
          <button
            className={`cursor-pointer rounded-md px-3 py-1 ${currentPage === totalPages - 1 ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`}
          >
            {totalPages - 1}
          </button>
        )}
        <button
          className={`cursor-pointer rounded-md px-3 py-1 ${currentPage === totalPages ? 'bg-Icon text-white disabled:cursor-not-allowed' : 'text-muted-foreground hover:bg-muted'}`}
        >
          {totalPages}
        </button>
      </div>
      <button
        className="bg-icon hover:bg-icon/80 cursor-pointer rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default TableFooter;
