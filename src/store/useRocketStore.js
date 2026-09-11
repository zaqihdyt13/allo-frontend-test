import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useRocketStore = create((set, get) => ({
  rockets: [],
  localRockets: [],
  selectedRocket: null,
  isFetchingRockets: false,
  isFetchingDetail: false,
  isLoadingLocalRockets: false,
  isAddingRocket: false,
  selectedVariant: "",
  selectedStatus: "",
  isError: false,
  errorMessage: "",

  setSelectedVariant: (variant) => set({ selectedVariant: variant }),
  setSelectedStatus: (status) => set({ selectedStatus: status }),
  resetFilters: () => set({ selectedVariant: "", selectedStatus: "" }),

  // GET ROCKETS
  getRockets: async () => {
    set({ isFetchingRockets: true, isError: false });

    try {
      const res = await axiosInstance.get(
        "/launcher/?manufacturer__name=SpaceX&mode=detailed&limit=20",
      );

      set({ rockets: res.data.results });
    } catch (error) {
      console.log("Error in getRockets:", error);

      set({
        isError: true,
        errorMessage:
          error?.response?.data?.results || "Failed to load rocket list",
      });
    } finally {
      set({ isFetchingRockets: false });
    }
  },

  // GET ROCKET BY ID
  getRocketById: async (id) => {
    set({
      isFetchingDetail: true,
      isError: false,
    });
    try {
      const res = await axiosInstance.get(`/launcher/${id}`);

      set({ selectedRocket: res.data });
    } catch (error) {
      console.log("Error in getRocketById:", error);

      set({
        isError: true,
        errorMessage:
          error?.response?.data?.results || "Failed to load rocket details",
      });
    } finally {
      set({ isFetchingDetail: false });
    }
  },

  // GET LOCAL ROCKETS
  getLocalRockets: async () => {
    set({ isLoadingLocalRockets: true, isError: false });
    try {
      const rawLocalRockets = JSON.parse(localStorage.getItem("rockets")) || [];

      set({ localRockets: [...rawLocalRockets].reverse() });
    } catch (error) {
      console.log("Error in getLocalRockets:", error);

      set({
        isError: true,
        errorMessage: "Failed to load rocket list",
      });
    } finally {
      set({ isLoadingLocalRockets: false });
    }
  },

  // GET LOCAL ROCKET BY ID
  getLocalRocketById: (id) => {
    set({ isFetchingDetail: true, isError: false });

    try {
      const localRockets = JSON.parse(localStorage.getItem("rockets")) || [];
      const stringId = String(id).trim();

      const foundRocket = localRockets.find(
        (localRocket) => String(localRocket?.id) === stringId,
      );

      if (!foundRocket) {
        set({
          isError: true,
          errorMessage: "Local rocket not found.",
          selectedRocket: null,
        });
      } else {
        set({ selectedRocket: foundRocket });
      }
    } catch (error) {
      console.error("Error in getLocalRocketById:", error);

      set({
        isError: true,
        errorMessage: "Failed to load rocket details",
        selectedRocket: null,
      });
    } finally {
      set({ isFetchingDetail: false });
    }
  },

  // ADD NEW ROCKET
  addRocket: async (data) => {
    set({ isAddingRocket: true });
    try {
      const existingRockets = JSON.parse(localStorage.getItem("rockets")) || [];
      const updatedRockets = [...existingRockets, data];

      localStorage.setItem("rockets", JSON.stringify(updatedRockets));

      toast.success("New rocket added successfully");
    } catch (error) {
      console.log("Error in addRockets:", error);
      toast.error("Failed to add new rocket");
    } finally {
      set({ isAddingRocket: false });
    }
  },

  getCombinedRockets: () => {
    const { localRockets, rockets } = get();
    return [...localRockets, ...(rockets || [])];
  },

  // FILTER
  getVariantOptions: () => {
    const combined = get().getCombinedRockets();
    const variants = combined
      .map((r) => r?.launcher_config?.variant || r?.variant)
      .filter(Boolean);
    return [...new Set(variants)];
  },

  getStatusOptions: () => {
    const combined = get().getCombinedRockets();
    const statuses = combined.map((r) => r?.status).filter(Boolean);
    return [...new Set(statuses)];
  },

  getFilteredRockets: () => {
    const { selectedVariant, selectedStatus } = get();
    const combined = get().getCombinedRockets();

    return combined.filter((rocket) => {
      const variant = rocket?.launcher_config?.variant || rocket?.variant;
      const status = rocket?.status;

      const matchesVariant = selectedVariant
        ? variant === selectedVariant
        : true;
      const matchesStatus = selectedStatus ? status === selectedStatus : true;

      return matchesVariant && matchesStatus;
    });
  },
}));
