import { useParams } from "react-router-dom";
import { useRocketStore } from "../store/useRocketStore";
import { useEffect } from "react";
import Header from "../components/Header";
import RocketsSkeleton from "../components/RocketsSkeleton";
import Error from "../components/Error";

const RocketDetailPage = () => {
  const { id } = useParams();
  const {
    getRocketById,
    getLocalRocketById,
    selectedRocket,
    isFetchingDetail,
    isError,
    errorMessage,
  } = useRocketStore();

  useEffect(() => {
    if (String(id).startsWith("local-")) {
      getLocalRocketById(id);
    } else {
      getRocketById(id);
    }
  }, [id, getRocketById, getLocalRocketById]);

  const handleRetry = () => {
    if (String(id).startsWith("local-")) {
      getLocalRocketById(id);
    } else {
      getRocketById(id);
    }
  };

  const name =
    selectedRocket?.launcher_config?.full_name || selectedRocket?.full_name;
  const description =
    selectedRocket?.launcher_config?.description || selectedRocket?.description;
  const launchCost =
    selectedRocket?.launcher_config?.launch_cost || selectedRocket?.launch_cost;
  const maidenFlight =
    selectedRocket?.launcher_config?.maiden_flight ||
    selectedRocket?.maiden_flight;
  const countryCode =
    selectedRocket?.launcher_config?.manufacturer?.country_code ||
    selectedRocket?.["manufacturer.country_code"];

  return (
    <div className="p-4">
      <Header title={"Rocket Detail"} id={id} />

      {isFetchingDetail === true ? (
        <RocketsSkeleton />
      ) : isError ? (
        <Error
          message={errorMessage || "Roket tidak ditemukan."}
          onRetry={handleRetry}
        />
      ) : (
        <>
          <div className="mt-6 bg-base-100 rounded-2xl border border-base-200 shadow-sm p-6">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="w-full lg:w-80 flex-shrink-0">
                <img
                  src={
                    selectedRocket?.image_url ||
                    "https://placehold.co/400x400?text=No+Image"
                  }
                  alt={name || "Rocket"}
                  className="w-full h-80 object-cover rounded-xl shadow-md border border-base-200"
                />
              </div>

              <div className="flex-1 w-full">
                <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">
                  {name || "Unknown Rocket"}
                </h1>

                <p className="text-base-content/80 text-base md:text-lg leading-relaxed mb-6">
                  {description || "No description available for this rocket."}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-base-200">
                  <div className="bg-base-200/50 p-4 rounded-lg">
                    <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider block">
                      Launch Cost
                    </span>
                    <span className="text-lg font-medium text-base-content">
                      {launchCost
                        ? `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(launchCost)}`
                        : "N/A"}
                    </span>
                  </div>

                  <div className="bg-base-200/50 p-4 rounded-lg">
                    <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider block">
                      Maiden Flight
                    </span>
                    <span className="text-lg font-medium text-base-content">
                      {maidenFlight || "N/A"}
                    </span>
                  </div>

                  <div className="bg-base-200/50 p-4 rounded-lg">
                    <span className="text-xs font-semibold text-base-content/60 uppercase tracking-wider block">
                      Country
                    </span>
                    <span className="text-lg font-medium text-base-content">
                      {countryCode || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RocketDetailPage;
