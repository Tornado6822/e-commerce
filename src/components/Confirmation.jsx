function Confirmation({ onNext }) {
  return (
    <div className="container checkout-card text-center">
      <h2 className="text-success">✓ Order Confirmed!</h2>
      <p>Thank you for your purchase at A-To-Z Books.</p>
      <p>Your order is being processed.</p>

      <div>
        <button className="btn btn-secondary mt-3" onClick={() => onNext()}>
          Survey
        </button>
      </div>

      <button
        className="btn btn-primary mt-3"
        onClick={() => window.location.reload()}
      >
        Continue Shopping
      </button>
    </div>
  );
}

export default Confirmation;
