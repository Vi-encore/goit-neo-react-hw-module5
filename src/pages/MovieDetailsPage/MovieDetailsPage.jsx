import { Link, useLocation } from "react-router-dom";

export default function MovieDetailsPage() {
  const location = useLocation();
  
  return (
    <>
      Movie Details page
      <Link to={location.state}>Go Back</Link>
    </>
  );
}
