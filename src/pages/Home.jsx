import Gallery from "../components/Gallery";
import Header from "../components/Header";
import { useState, useEffect } from "react";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //async and await are used to ensure the code waits for the response before the next step.
    async function loadData() {
      try {
        const response = await fetch("./books_with_covers.json");
        const content = await response.json();
        setBooks(content);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  const CATEGORIES = [...new Set(books.map((p) => p.Category))];
  const GENRES = [...new Set(books.map((p) => p.Genre))];
  const FORMATS = [...new Set(books.map((p) => p.Format))];
  const MAX_PRICE = Math.max(...books.map((p) => p.Price));
  const MAX_PAGE_COUNT = Math.max(...books.map((p) => p.Pages));

  function emptyFilter() {
    return {
      Categories: [],
      Genres: [],
      Formats: [],
      maxPrice: MAX_PRICE,
      maxPageCount: MAX_PAGE_COUNT,
    };
  }

  function Facets({ filters, setFilters }) {
    const toggle = (key, value) =>
      setFilters((f) => {
        const list = f[key];
        return {
          ...f,
          [key]: list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value],
        };
      });

    return (
      <>
        <h1>Test</h1>
      </>
    );
  }

  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 bg-danger">
            <Facets />
          </div>
          <div className="col-12 col-md-9 bg-primary">
            <Gallery books={books} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
