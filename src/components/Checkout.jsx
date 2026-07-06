import "./Checkout.css";
import { HiOutlineTrash } from "react-icons/hi";

function Checkout({ checkoutItems, removeCart, onNext }) {
  return (
    <div className="container d-flex flex-column">
      {checkoutItems.length === 0 ? (
        <h1 className="text-center my-5" style={{ color: "var(--primary)" }}>
          Your cart is empty.
        </h1>
      ) : (
        <div>
          <h1 className="mt-5 mb-4">Your Shopping Cart</h1>
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

              <button
                className="btn remove-btn"
                onClick={() => removeCart(book["ISBN/UID"])}
              >
                <HiOutlineTrash />
              </button>
            </div>
          ))}

          <hr className="mt-5" />
          <h2>
            {"Total: $" +
              checkoutItems
                .reduce((total, { book, qty }) => {
                  return total + book.Price * qty;
                }, 0)
                .toFixed(2)}
          </h2>
          <div className="d-flex justify-content-center">
            <button className="btn checkout-btn mb-5" onClick={() => onNext()}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;
