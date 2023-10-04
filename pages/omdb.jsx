import { useState } from "react";
import Search from "../components/Search";
import MovieList from "../components/MovieList";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = (movies) => {
    setMovies(movies);
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <Search onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
