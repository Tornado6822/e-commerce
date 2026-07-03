import "./Checkout.css";

function Checkout({ checkoutItems }) {
  return (
    <div className="container d-flex flex-column">
      {checkoutItems.length === 0 ? (
        <h1 className="text-center my-5" style={{ color: "var(--primary)" }}>
          Your cart is empty.
        </h1>
      ) : (
        <div>
          <h1>Your Shopping Cart</h1>
          <div className="cart-grid cart-header">
            <h5>Items</h5>
            <h5>Price</h5>
            <h5>Qty</h5>
            <h5>Total</h5>
          </div>
          {checkoutItems.map(({ book, qty }) => (
            <div key={book["ISBN/UID"]} className="cart-grid cart-row">
              <div className="book-cell">
                <img src={book.thumbnail} className="book-img" />

                <div className="book-info">
                  <h5>{book.Title}</h5>
                  <p>{book.Author}</p>
                  <p>{book.Format}</p>
                </div>
              </div>

              <h5>${book.Price.toFixed(2)}</h5>

              <h5>{qty}</h5>

              <h5>${(book.Price * qty).toFixed(2)}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Checkout;
