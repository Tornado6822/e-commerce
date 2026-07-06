import { useState } from "react";

function Shipping({ personalInfo, setPersonalInfo, onNext, onBack }) {
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

    if (!personalInfo.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!personalInfo.city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!personalInfo.province.trim()) {
      newErrors.province = "Province is required.";
    }

    if (!personalInfo.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required.";
    } else if (
      !/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(
        personalInfo.postalCode.trim(),
      )
    ) {
      newErrors.postalCode = "Enter a valid postal code.";
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
      <h2 className="mb-4">Shipping Information</h2>

      <form onSubmit={handleSubmit} noValidate>
        {/* Address */}
        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            name="address"
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            value={personalInfo.address}
            onChange={handleChange}
          />
          <div className="invalid-feedback">{errors.address}</div>
        </div>

        {/* City + Province */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className={`form-control ${errors.city ? "is-invalid" : ""}`}
              value={personalInfo.city}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.city}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Province</label>
            <input
              type="text"
              name="province"
              className={`form-control ${errors.province ? "is-invalid" : ""}`}
              value={personalInfo.province}
              onChange={handleChange}
            />
            <div className="invalid-feedback">{errors.province}</div>
          </div>
        </div>

        {/* Postal Code */}
        <div className="mb-4">
          <label className="form-label">Postal Code</label>
          <input
            type="text"
            name="postalCode"
            className={`form-control ${errors.postalCode ? "is-invalid" : ""}`}
            value={personalInfo.postalCode}
            onChange={handleChange}
            placeholder="K1A 0B1"
          />
          <div className="invalid-feedback">{errors.postalCode}</div>
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

export default Shipping;
