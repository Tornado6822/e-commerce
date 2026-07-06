import "./Home.css";

import Gallery from "../components/Gallery";
import Header from "../components/Header";
import Checkout from "../components/Checkout";
import { useState, useEffect, useMemo } from "react";
import booksData from "../assets/books_with_covers.json";
import PersonalInfo from "../components/PersonalInfo";
import ProgressBar from "../components/ProgressBar";
import Shipping from "../components/Shipping";
import Payment from "../components/Payment";
import Review from "../components/Review";
import Confirmation from "../components/Confirmation";

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
      <div className="container filter-panel">
        <div className="d-flex align-items-center justify-content-between mt-3">
          <h2 className="fw-semibold">Filter</h2>
          <button
            className="btn btn-link clear-btn"
            onClick={() => setFilters(emptyFilter())}
          >
            Clear All
          </button>
        </div>
        <div className="">
          <h6>Category</h6>
          {CATEGORIES.map((c) => (
            <div className="form-check" key={c}>
              <input
                className="form-check-input"
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
                className="form-check-input"
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
                className="form-check-input"
                type="checkbox"
                id={"for-" + f}
                checked={filters.formats.includes(f)}
                onChange={() => toggle("formats", f)}
              />
              <label className="form-check-label" htmlFor={"for-" + f}>
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
          <label htmlFor="price" className="form-label">
            Price (up to {money(filters.maxPrice)})
          </label>
          <input
            id="price"
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

  const [step, setStep] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    address: "",
    city: "",
    province: "",
    postalCode: "",

    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function addToCart(id) {
    setCart((c) => {
      const inCart = c.find((b) => b.id === id);
      if (inCart)
        return c.map((b) => (b === inCart ? { ...b, qty: b.qty + 1 } : b));
      return [...c, { id, qty: 1 }];
    });
  }

  function removeCart(id) {
    setCart((c) => {
      return c.filter((b) => b.id !== id);
    });
  }

  const cartSize = useMemo(() => {
    return cart.reduce((total, b) => total + b.qty, 0);
  }, [cart]);

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

  const checkoutItems = useMemo(() => {
    return cart.map((c) => ({
      book: books.find((b) => b["ISBN/UID"] === c.id),
      qty: c.qty,
    }));
  }, [cart]);

  return (
    <div className="main-container">
      <Header
        cartSize={cartSize}
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
      />
      {cartOpen ? (
        (() => {
          switch (step) {
            case 0:
              return (
                <Checkout
                  checkoutItems={checkoutItems}
                  removeCart={removeCart}
                  onNext={() => setStep(1)}
                />
              );
            case 1:
              return (
                <div>
                  <ProgressBar step={step} />
                  <PersonalInfo
                    personalInfo={personalInfo}
                    setPersonalInfo={setPersonalInfo}
                    onNext={() => setStep(2)}
                  />
                </div>
              );
            case 2:
              return (
                <div>
                  <ProgressBar step={step} />
                  <Shipping
                    personalInfo={personalInfo}
                    setPersonalInfo={setPersonalInfo}
                    onNext={() => setStep(3)}
                    onBack={() => setStep(1)}
                  />
                </div>
              );
            case 3:
              return (
                <div>
                  <ProgressBar step={step} />
                  <Payment
                    personalInfo={personalInfo}
                    setPersonalInfo={setPersonalInfo}
                    onNext={() => setStep(4)}
                    onBack={() => setStep(2)}
                  />
                </div>
              );
            case 4:
              return (
                <div>
                  <ProgressBar step={step} />
                  <Review
                    checkoutItems={checkoutItems}
                    personalInfo={personalInfo}
                    onBack={() => setStep(3)}
                    onPlaceOrder={() => {
                      setCart([]); // clear cart
                      setStep(5); // go to confirmation
                    }}
                  />
                </div>
              );
            case 5:
              return <Confirmation />;
            default:
              return null;
          }
        })()
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 sidebar">
              <Facets filters={filters} setFilters={setFilters} />
            </div>
            <div className="col-12 col-md-9 ">
              <div className="mt-4 d-flex justify-content-between">
                <h5 className="fw-semibold">
                  {galleryItems.length + " Results"}
                </h5>
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
          <footer className=" text-center py-4 mt-5">
            <small> © 2026 Patrick Morel. All rights reserved.</small>
          </footer>
        </div>
      )}
    </div>
  );
}

export default Home;
