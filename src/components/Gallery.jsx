import "./Gallery.css";

function Gallery({ books }) {
  return (
    <div id="grid" className="mt-2">
      {books.map((book) => (
        <div key={book.Title} className="card book-card ">
          <div className="img-wrapper">
            <img
              src={book.thumbnail}
              alt="No Thumbnail"
              className="card-img-top"
            />
          </div>

          <div className="card-body">
            <h5 className="card-title">{book.Title}</h5>
            <p className="card-text">{book.Authors}</p>
            <p className="card-title">
              {book.Format.charAt(0).toUpperCase() + book.Format.slice(1)}
            </p>
            <h5 className="card-text fw-semibold">
              {"$" + book.Price.toFixed(2)}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
