const Filters = ({
  variantOptions,
  statusOptions,
  isFilterActive,
  selectedVariant,
  setSelectedVariant,
  selectedStatus,
  setSelectedStatus,
  resetFilters,
}) => {
  return (
    <>
      <div className="flex flex-wrap gap-4 mb-8 ms-4 px-2 items-center">
        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
        >
          <option value="">All Variants</option>
          {variantOptions.map((variant) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {isFilterActive && (
          <button className="btn btn-ghost text-error" onClick={resetFilters}>
            Reset Filters
          </button>
        )}
      </div>
    </>
  );
};

export default Filters;
