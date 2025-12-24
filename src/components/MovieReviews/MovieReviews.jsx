import { useParams } from "react-router-dom";

export default function MovieReviews() {
  const { movieId } = useParams();

  return <>I am reviews</>;
}
