import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import Navigation from "../Navigation/Navigation";
import "./App.css";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);

const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));

// before keys names prefix VITE or will be undefined
// console.log(import.meta.env.VITE_API_READ_ACCESS);

function App() {
  return (
    <>
      <Navigation />
      <Suspense
        fallback={
          <MoonLoader
            color="#d15065"
            cssOverride={{ margin: "20px 0" }}
            size="80px"
          />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
