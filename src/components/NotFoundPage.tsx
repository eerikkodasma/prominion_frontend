import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "../types/routes";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col justify-center gap-8 text-4xl text-center font-bold h-[200px]">
      404 Page not found
      <Link to={ROUTE_PATHS.BLOGPOSTLIST}>
        <button className="text-xl font-semibold border-black border-2 rounded-md p-4">
          Take me to home page -{">"}
        </button>
      </Link>
    </div>
  );
}
