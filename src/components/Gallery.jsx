import { Card } from "react-bootstrap";
import "./Gallery.css";
import { useState, useEffect } from "react";

function Gallery() {
  const [books, setBooks] = useState([]);
  //Flag used because of delay fetching books
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //async and await are used to ensure the code waits for the response before the next step.
    async function loadData() {
      try {
        const response = await fetch("./books_with_covers.json");
        const content = await response.json();
        setBooks(content);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    }
    loadData();
  }, []);

  return loading ? (
    <h1>Page is loading.</h1>
  ) : (
    <div id="grid">
      {books.map((book) => (
        <div key={book.Title} className="card">
          <img
            src={book.thumbnail}
            alt="No Thumbnail"
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title">{book.Title}</h5>
            <p className="card-text">{book.Authors}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
