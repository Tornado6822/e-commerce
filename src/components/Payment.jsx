import { useState } from "react";

function Payment({ personalInfo, setPersonalInfo, onNext, onBack }) {
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!personalInfo.cardName?.trim()) {
      newErrors.cardName = "Cardholder name is required.";
    }

    if (!personalInfo.cardNumber?.trim()) {
      newErrors.cardNumber = "Card number is required.";
    } else if (
      !/^\d{13,19}$/.test(personalInfo.cardNumber.replace(/\s/g, ""))
    ) {
      newErrors.cardNumber = "Enter a valid card number.";
    }

    if (!personalInfo.expiry?.trim()) {
      newErrors.expiry = "Expiry date is required.";
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(personalInfo.expiry)) {
      newErrors.expiry = "Use format MM/YY.";
    }

    if (!personalInfo.cvv?.trim()) {
      newErrors.cvv = "CVV is required.";
    } else if (!/^\d{3,4}$/.test(personalInfo.cvv)) {
      newErrors.cvv = "CVV must be 3–4 digits.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (validate()) {
      onNext();
    }
  }

  return (
    <div className="container checkout-card" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Payment Details</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Card Name */}
        <div className="mb-3">
          <label className="form-label">Cardholder Name</label>
          <input
            type="text"
            name="cardName"
            className={`form-control ${errors.cardName ? "is-invalid" : ""}`}
            value={personalInfo.cardName || ""}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.cardName}</div>
        </div>

        {/* Card Number */}
        <div className="mb-3">
          <label className="form-label">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            className={`form-control ${errors.cardNumber ? "is-invalid" : ""}`}
            value={personalInfo.cardNumber || ""}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
          />
          <div className="invalid-feedback">{errors.cardNumber}</div>
        </div>

        {/* Expiry + CVV */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Expiry (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
              value={personalInfo.expiry || ""}
              onChange={handleChange}
              placeholder="12/28"
            />
            <div className="invalid-feedback">{errors.expiry}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">CVV</label>
            <input
              type="password"
              name="cvv"
              className={`form-control ${errors.cvv ? "is-invalid" : ""}`}
              value={personalInfo.cvv || ""}
              onChange={handleChange}
              placeholder="123"
            />
            <div className="invalid-feedback">{errors.cvv}</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onBack}
          >
            Back
          </button>

          <button type="submit" className="btn btn-primary">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default Payment;
