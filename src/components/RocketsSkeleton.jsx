import { useLocation } from "react-router-dom";

const RocketsSkeleton = () => {
  const location = useLocation();
  const isDetailPage = location.pathname !== "/";

  if (isDetailPage) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        <div className="bg-base-100 rounded-2xl border border-base-200 p-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="skeleton h-80 w-full lg:w-80 rounded-xl flex-shrink-0"></div>

            <div className="flex-1 w-full space-y-4">
              <div className="skeleton h-9 w-3/4"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-5/6"></div>
              <div className="skeleton h-4 w-2/3 mb-6"></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="skeleton h-20 w-full rounded-lg"></div>
                <div className="skeleton h-20 w-full rounded-lg"></div>
                <div className="skeleton h-20 w-full rounded-lg"></div>
                <div className="skeleton h-20 w-full rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-4 ms-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="card flex w-72 flex-col gap-4">
          <div className="skeleton h-60 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default RocketsSkeleton;
