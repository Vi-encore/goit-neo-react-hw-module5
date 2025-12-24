import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/fetchMovies";

export default function MovieCast() {
  const { movieId } = useParams();

  const [movieCast, setMovieCast] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function getCast() {
      try {
        setIsLoading(true)
        setError(null)

        const data = await fetchMovieCast(movieId)
        console.log(data);
        
      } catch (error) {
        setError(error.message || 'Something gone wrong!')
      }
      finally {
        setIsLoading(false)
      }
    }

    getCast()
  }, [])

  return <>I am cast</>;
}
