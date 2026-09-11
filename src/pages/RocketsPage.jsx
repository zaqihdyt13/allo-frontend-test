import { useEffect, useState } from "react";
import { useRocketStore } from "../store/useRocketStore";
import RocketsSkeleton from "../components/RocketsSkeleton";
import Filters from "../components/Filters";
import RocketList from "../components/RocketList";
import Header from "../components/Header";
import Error from "../components/Error";

const RocketsPage = () => {
  const {
    getRockets,
    isFetchingRockets,
    getLocalRockets,
    isLoadingLocalRockets,
    selectedVariant,
    setSelectedVariant,
    selectedStatus,
    setSelectedStatus,
    resetFilters,
    getVariantOptions,
    getStatusOptions,
    getFilteredRockets,
    isError,
    errorMessage,
  } = useRocketStore();
  const [, setRefresh] = useState(0);

  useEffect(() => {
    getRockets();
    getLocalRockets();
  }, [getRockets, getLocalRockets]);

  const filteredRockets = getFilteredRockets();
  const variantOptions = getVariantOptions();
  const statusOptions = getStatusOptions();

  const isFilterActive = selectedVariant || selectedStatus;

  const handleRocketAdded = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="p-4">
      <Header title={"Rocket List"} onRocketAdded={handleRocketAdded} />

      <Filters
        variantOptions={variantOptions}
        statusOptions={statusOptions}
        isFilterActive={isFilterActive}
        selectedVariant={selectedVariant}
        setSelectedVariant={setSelectedVariant}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        resetFilters={resetFilters}
      />

      <div>
        {isFetchingRockets || isLoadingLocalRockets ? (
          <RocketsSkeleton />
        ) : isError ? (
          <Error message={errorMessage} onRetry={getRockets} />
        ) : filteredRockets.length === 0 ? (
          <p className="text-center py-10 text-gray-500">
            No rockets match the selected filters.
          </p>
        ) : (
          <RocketList filteredRockets={filteredRockets} />
        )}
      </div>
    </div>
  );
};

export default RocketsPage;
