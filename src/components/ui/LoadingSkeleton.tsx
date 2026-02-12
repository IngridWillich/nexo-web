const LoadingSkeleton = () => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="h-10 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
       <div className="mb-6">
        <div className="h-10 w-full sm:max-w-md bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
       <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-3"></div>
       <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
        {[1, 2, 3, 4].map((row) => (
          <div key={row} className="p-4 border-b border-gray-100">
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((col) => (
                <div key={col} className="h-4 bg-gray-100 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;