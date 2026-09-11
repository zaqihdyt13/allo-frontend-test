import { useState } from "react";
import { useRocketStore } from "../store/useRocketStore";

const AddRocket = ({ onRocketAdded }) => {
  const { addRocket, isAddingRocket } = useRocketStore();
  const [formData, setFormData] = useState({
    image_url: "",
    full_name: "",
    description: "",
    launch_cost: "",
    "manufacturer.country_code": "",
    maiden_flight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRocketData = {
      ...formData,
      id: `local-${Date.now()}`, // Generate Unique ID
    };

    addRocket(newRocketData);

    setFormData({
      image_url: "",
      full_name: "",
      description: "",
      launch_cost: "",
      "manufacturer.country_code": "",
      maiden_flight: "",
    });

    document.getElementById("my_modal_1").close();

    if (onRocketAdded) {
      onRocketAdded();
    }
  };
  return (
    <>
      <button
        className="btn btn-primary text-white"
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        + Add New Rocket
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg text-primary mb-4">
            Add New Rocket
          </h3>

          <form method="dialog" className="space-y-4" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Rocket Image</span>
              </label>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                placeholder="https://example.com/image.jpg"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Rocket Name</span>
              </label>
              <input
                type="text"
                name="full_name"
                required
                value={formData.full_name}
                placeholder="e.g. Falcon 9"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                required
                placeholder="Enter description..."
                className="textarea textarea-bordered w-full h-24"
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">
                  Cost Per Launch
                </span>
              </label>
              <input
                type="number"
                name="launch_cost"
                value={formData.launch_cost}
                required
                placeholder="e.g. 67000000"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Country Code</span>
              </label>
              <input
                type="text"
                name="manufacturer.country_code"
                value={formData["manufacturer.country_code"]}
                required
                placeholder="e.g. USA"
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">First Flight</span>
              </label>
              <input
                type="date"
                name="maiden_flight"
                value={formData.maiden_flight}
                required
                className="input input-bordered w-full"
                onChange={handleChange}
              />
            </div>

            <div className="modal-action flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("my_modal_1").close()}
                disabled={isAddingRocket}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isAddingRocket}
              >
                Add Rocket
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddRocket;
