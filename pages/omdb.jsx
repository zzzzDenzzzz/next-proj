import { useState } from "react";
import SearchForm from "../components/SearchForm";
import MovieList from "../components/MovieList";

const OmDB = () => {
  const [movies, setMovies] = useState([]);

  const handleSearch = (movies) => {
    setMovies(movies);
  };

  return (
    <div>
      <h3>Search Movie</h3>
      <SearchForm onSearch={handleSearch} />
      <MovieList movies={movies} />
    </div>
  );
};

export default OmDB;
