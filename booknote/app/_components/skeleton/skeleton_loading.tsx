const SkeletonLoading = () => {
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-50 text-gray-900 animate-pulse">
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
        <main className="flex-grow overflow-hidden bg-white relative p-4 md:p-8">
          <div className="h-8 bg-gray-200 rounded mb-4 w-1/2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  export default SkeletonLoading