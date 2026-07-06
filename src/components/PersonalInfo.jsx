import { useState } from "react";
import "./PersonalInfo.css";

function PersonalInfo({ personalInfo, setPersonalInfo, onNext }) {
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Remove error as the user fixes it
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!personalInfo.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!personalInfo.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(personalInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
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
    <div className="container my-5" style={{ maxWidth: "700px" }}>
      <h2 className="mb-4">Personal Information</h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>

            <input
              type="text"
              name="firstName"
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
              value={personalInfo.firstName}
              onChange={handleChange}
            />

            <div className="invalid-feedback">{errors.firstName}</div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>

            <input
              type="text"
              name="lastName"
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
              value={personalInfo.lastName}
              onChange={handleChange}
            />

            <div className="invalid-feedback">{errors.lastName}</div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>

          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={personalInfo.email}
            onChange={handleChange}
          />

          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="mb-4">
          <label className="form-label">Phone Number</label>

          <input
            type="tel"
            name="phone"
            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder="123-456-7890"
          />

          <div className="invalid-feedback">{errors.phone}</div>
        </div>

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary px-4">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalInfo;
