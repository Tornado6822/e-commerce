import "./Review.css";

function ReviewOrder({ checkoutItems, personalInfo, onBack, onPlaceOrder }) {
  const subtotal = checkoutItems.reduce((sum, item) => {
    return sum + item.book.Price * item.qty;
  }, 0);

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  return (
    <div className="container checkout-card" style={{ maxWidth: "1000px" }}>
      <h2 className="review-title">Review Your Order</h2>

      <div className="row">
        {/* LEFT - ITEMS */}
        <div className="col-md-7">
          <div className="review-section">
            <h6>Items</h6>

            {checkoutItems.map(({ book, qty }) => (
              <div key={book["ISBN/UID"]} className="review-item">
                <div className="d-flex align-items-center gap-3">
                  <img src={book.thumbnail} alt={book.Title} />

                  <div>
                    <div className="fw-semibold">{book.Title}</div>
                    <div className="review-muted">Qty: {qty}</div>
                  </div>
                </div>

                <div className="fw-semibold">
                  ${(book.Price * qty).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - SUMMARY */}
        <div className="col-md-5">
          <div className="review-summary">
            <h6 className="mb-3">Order Summary</h6>

            <div className="d-flex justify-content-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div className="d-flex justify-content-between">
              <span>Tax (13%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between review-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            {/* CUSTOMER INFO */}
            <div className="review-section mt-4">
              <h6>Customer</h6>
              <div className="review-muted">
                {personalInfo.firstName} {personalInfo.lastName}
              </div>
              <div className="review-muted">{personalInfo.email}</div>
              <div className="review-muted">{personalInfo.phone}</div>
            </div>

            {/* SHIPPING */}
            <div className="review-section">
              <h6>Shipping</h6>
              <div className="review-muted">{personalInfo.address}</div>
              <div className="review-muted">
                {personalInfo.city}, {personalInfo.province}
              </div>
              <div className="review-muted">{personalInfo.postalCode}</div>
            </div>

            {/* PAYMENT */}
            <div className="review-section">
              <h6>Payment</h6>
              <div className="review-muted">
                Card ending in {personalInfo.cardNumber?.slice(-4)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-secondary" onClick={onBack}>
          Back
        </button>

        <button className="btn btn-primary px-4" onClick={onPlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default ReviewOrder;
