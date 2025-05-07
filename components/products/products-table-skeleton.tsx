export function ProductsTableSkeleton() {
  return (
    <div className="w-full space-y-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="h-8 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-8 w-1/6 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
      <div className="rounded-md border">
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="grid animate-pulse grid-cols-4 items-center gap-4 p-4"
            >
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-end">
        <div className="h-8 w-1/4 rounded bg-gray-200 dark:bg-gray-700"></div>
      </div>
    </div>
  );
}

export default ProductsTableSkeleton;
