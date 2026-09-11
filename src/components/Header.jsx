import { Link, useLocation } from "react-router-dom";
import AddRocket from "./AddRocket";

const Header = ({ title, onRocketAdded, id }) => {
  const location = useLocation();
  return (
    <div className="flex justify-between items-center mb-8 ms-4 me-6 px-2">
      <h1 className="text-4xl font-bold text-primary">{title}</h1>
      {location.pathname === "/" && <AddRocket onRocketAdded={onRocketAdded} />}
      {location.pathname === `/${id}` && (
        <Link to="/" className="btn btn-outline btn-primary w-40">
          Back
        </Link>
      )}
    </div>
  );
};

export default Header;
