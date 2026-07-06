import "./ProgressBar.css";

function ProgressBar({ step }) {
  const steps = ["Information", "Shipping", "Payment", "Confirmation"];
  return (
    <div className="checkout-progress mb-5">
      {steps.map((label, index) => (
        <div
          key={label}
          className={`progress-step ${index + 1 <= step ? "active" : ""}`}
        >
          <div className="step-circle">{index + 1}</div>

          <p>{label}</p>
        </div>
      ))}
    </div>
  );
}

export default ProgressBar;
