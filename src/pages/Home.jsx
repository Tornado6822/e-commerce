import Gallery from "../components/Gallery";
import Header from "../components/Header";
import { useState, useEffect, useMemo } from "react";
import booksData from "../assets/books_with_covers.json";

function Home() {
  const [books, setBooks] = useState(booksData);

  /*
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
  */

  const CATEGORIES = [...new Set(books.map((b) => b.Category))];
  const GENRES = [...new Set(books.map((b) => b.Genre))];
  const FORMATS = [...new Set(books.map((b) => b.Format))];
  const MAX_PRICE = Math.max(...books.map((b) => b.Price));
  const MAX_PAGE_COUNT = Math.max(...books.map((b) => b.Pages));

  function emptyFilter() {
    return {
      Categories: ["fiction"],
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

  //App logic from example
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [filters, setFilters] = useState(emptyFilter());
  const [sort, setSort] = useState("titleAToZ");

  const galleryItems = useMemo(() => {
    let list = books.filter(
      (b) =>
        (filters["Categories"].length === 0 ||
          filters["Categories"].includes(b.Category)) &&
        (filters["Genres"].length === 0 ||
          filters["Genres"].includes(b.Genre)) &&
        (filters["Formats"].length === 0 ||
          filters["Formats"].includes(b.Format)) &&
        b.Price <= filters.maxPrice &&
        b.Pages <= filters.maxPageCount,
    );
    //sorting
    return list;
  }, [filters, sort]);

  console.log(galleryItems);
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
