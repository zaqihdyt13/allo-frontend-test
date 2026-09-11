import { Link } from "react-router-dom";

const RocketList = ({ filteredRockets }) => {
  return (
    <div className="flex flex-wrap gap-4 ms-4">
      {filteredRockets?.map((rocket) => {
        const name = rocket?.launcher_config?.full_name || rocket.full_name;
        const id = rocket?.id;
        return (
          <div key={id} className="card border-2 w-72 shadow-xl">
            <figure>
              <img
                src={
                  rocket?.image_url ||
                  "https://placehold.co/400x400?text=No+Image"
                }
                alt={name}
                className="w-full h-60 object-cover border-none outline-none bg-top"
              />
            </figure>
            <div className="card-body px-5">
              <div className="flex items-center gap-2">
                <h2 className="card-title text-primary">{name}</h2>
                <div className="badge badge-secondary badge-outline">
                  {rocket?.status || "Expended"}
                </div>
              </div>
              <p className="text-secondary">
                Variant: {rocket?.launcher_config?.variant || "1"}
              </p>
              <p>
                {rocket?.launcher_config?.description || rocket?.description}
              </p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/${id}`} className="btn btn-outline btn-primary">
                  See Detail
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RocketList;
