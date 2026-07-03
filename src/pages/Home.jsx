import "./Home.css";

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
      categories: [],
      genres: [],
      formats: [],
      maxPrice: MAX_PRICE,
      maxPageCount: MAX_PAGE_COUNT,
    };
  }

  const money = (n) => "$" + n.toFixed(2);

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
      <div className="container">
        <div className="d-flex align-items-center justify-content-between mt-3">
          <h1 className="fw-semibold">Filter</h1>
          <button className="btn" onClick={() => setFilters(emptyFilter())}>
            Clear All
          </button>
        </div>
        <div className="">
          <h6>Category</h6>
          {CATEGORIES.map((c) => (
            <div className="form-check" key={c}>
              <input
                type="form-check-input"
                type="checkbox"
                id={"cat-" + c}
                checked={filters.categories.includes(c)}
                onChange={() => toggle("categories", c)}
              />
              <label className="form-check-label" htmlFor={"cat-" + c}>
                {c}
              </label>
            </div>
          ))}
        </div>
        <div className="">
          <h6>Genre</h6>
          {GENRES.map((g) => (
            <div className="form-check" key={g}>
              <input
                type="form-check-input"
                type="checkbox"
                id={"gen-" + g}
                checked={filters.genres.includes(g)}
                onChange={() => toggle("genres", g)}
              />
              <label className="form-check-label" htmlFor={"gen-" + g}>
                {g}
              </label>
            </div>
          ))}
        </div>

        <div className="">
          <h6>Format</h6>
          {FORMATS.map((f) => (
            <div className="form-check" key={f}>
              <input
                type="form-check-input"
                type="checkbox"
                id={"for-" + f}
                checked={filters.formats.includes(f)}
                onChange={() => toggle("formats", f)}
              />
              <label className="form-check-label" htmlFor={"gen-" + f}>
                {f}
              </label>
            </div>
          ))}
        </div>

        <div className="my-4">
          <label htmlFor="pageCount" className="form-label">
            Maximum Pages: {filters.maxPageCount}
          </label>

          <input
            id="pageCount"
            type="range"
            className="form-range"
            min="50"
            max={MAX_PAGE_COUNT}
            step="25"
            value={filters.maxPageCount}
            onChange={(e) =>
              setFilters((f) => ({
                ...f,
                maxPageCount: Number(e.target.value),
              }))
            }
          />
        </div>

        <div className="my-4">
          <h6
            className="text-uppercase fw-semibold text-secondary mb-2"
            style={{ fontSize: ".72rem", letterSpacing: ".08em" }}
          >
            Price (up to {money(filters.maxPrice)})
          </h6>
          <input
            type="range"
            className="form-range"
            min="10"
            max={MAX_PRICE}
            step="1"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))
            }
          />
        </div>
      </div>
    );
  }

  //App logic from example
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const [filters, setFilters] = useState(emptyFilter());
  const [sort, setSort] = useState("titleAToZ");

  const [currentPage, setCurrentPage] = useState(1);
  const BOOKS_PER_PAGE = 21;

  function addToCart(id) {
    setCart((c) => {
      const inCart = c.find((b) => b.id === id);
      if (inCart)
        return c.map((b) => (b === inCart ? { ...b, qty: b.qty + 1 } : b));
      return [...c, { id, qty: 1 }];
    });
  }

  const galleryItems = useMemo(() => {
    let list = books.filter(
      (b) =>
        (filters["categories"].length === 0 ||
          filters["categories"].includes(b.Category)) &&
        (filters["genres"].length === 0 ||
          filters["genres"].includes(b.Genre)) &&
        (filters["formats"].length === 0 ||
          filters["formats"].includes(b.Format)) &&
        b.Price <= filters.maxPrice &&
        b.Pages <= filters.maxPageCount,
    );
    //sorting
    if (sort === "priceLowHigh")
      list = [...list].sort((a, b) => a.Price - b.Price);
    if (sort === "priceHighLow")
      list = [...list].sort((a, b) => b.Price - a.Price);
    if (sort === "titleAToZ")
      list = [...list.sort((a, b) => a.Title.localeCompare(b.Title))];
    if (sort === "titleZToA")
      list = [...list.sort((a, b) => b.Title.localeCompare(a.Title))];
    return list;
  }, [filters, sort]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [currentPage]);

  const numOfPages = useMemo(() => {
    return Math.ceil(galleryItems.length / BOOKS_PER_PAGE);
  }, [galleryItems]);

  const displayedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const endIndex = startIndex + BOOKS_PER_PAGE;

    return galleryItems.slice(startIndex, endIndex);
  }, [galleryItems, currentPage]);

  return (
    <div className="main-container">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3 sidebar">
            <Facets filters={filters} setFilters={setFilters} />
          </div>
          <div className="col-12 col-md-9 ">
            <div className="mt-4 d-flex justify-content-between">
              <h5>{galleryItems.length + " Results"}</h5>
              <select
                className="form-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="titleAToZ">Title A → Z</option>
                <option value="titleZToA">Title Z → A</option>
                <option value="priceLowHigh">Price: Low → High</option>
                <option value="priceHighLow">Price: High → Low</option>
              </select>
            </div>
            <hr />

            {displayedItems.length === 0 ? (
              <h1>No Results</h1>
            ) : (
              <>
                <Gallery books={displayedItems} addToCart={addToCart} />
                {/*}Bottom page buttons{*/}
                <div className="d-flex justify-content-center gap-2 mt-4">
                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    Previous
                  </button>

                  <span className="align-self-center">
                    Page {currentPage} of {numOfPages}
                  </span>

                  <button
                    className="btn btn-secondary"
                    disabled={currentPage === numOfPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
