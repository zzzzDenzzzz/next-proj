import { useState } from "react";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=9182ad18`
    );
    const data = await response.json();
    onSearch(data.Search);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;
