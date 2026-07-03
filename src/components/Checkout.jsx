import "./Checkout.css";

function Checkout({ checkoutItems }) {
  return (
    <div className="container">
      <h1>Cart</h1>
      <div>
        {console.log(checkoutItems)}
        {checkoutItems.map(({ book, qty }) => (
          <div key={book.Title} className="cart-item">
            <img src={book.thumbnail} alt="Cover" />
            <h1>{qty}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Checkout;
