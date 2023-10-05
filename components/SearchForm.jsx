import { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import DataLoader from "./DataLoader";
import { API_KEY } from "../consts/api-key";

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let currentPage = 1;
      let totalResults = 0;
      let movies = [];

      do {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}&page=${currentPage}`
        );

        if (!response.ok) {
          throw new Error("Ошибка при запросе");
        }
        const data = await response.json();
        if (data.Search) {
          movies = [...movies, ...data.Search];
          totalResults = parseInt(data.totalResults);
        } else {
          throw new Error("Ошибка при запросе");
        }

        currentPage++;
      } while (movies.length < totalResults);

      onSearch(movies);
      setError(null);
    } catch (error) {
      setError("Произошла ошибка при получении данных");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setError(null);
  }, [query]);

  if (isLoading) return <DataLoader />;

  return (
    <Form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <Form.Group>
        <Form.Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Form.Button content="submit">Search</Form.Button>
      </Form.Group>
    </Form>
  );
};

export default SearchForm;
