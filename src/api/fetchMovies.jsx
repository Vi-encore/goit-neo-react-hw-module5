import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const ACCESS_TOKEN = import.meta.env.VITE_API_READ_ACCESS;
const headers = { Authorization: `Bearer ${ACCESS_TOKEN}` };

export async function fetchTrendingMovies(page = 1) {
  const per_page = 20;
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, {
    headers,
    params: {
      page,
      per_page,
    },
  });
  return res.data;
}

export async function fetchMovie(id) {
  const res = await axios.get(`${BASE_URL}/movie/${id}`, {
    headers,
  });

  return res.data;
}

export async function fetchMovieCast(id) {
  const res = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    headers,
  });

  return res.data;
}

export async function fetchMovieReviews(id, page = 1) {
  const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
    headers,
    params: {
      page,
    },
  });

  return res.data;
}

export async function fetchMoviesByQuery(query, page = 1) {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    headers,
    params: {
      page,
      query
    },
  });

  return res.data;
}
