import "./Gallery.css";

function Gallery({ books }) {
  return (
    <div id="grid">
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
