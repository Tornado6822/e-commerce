import { useState } from "react";

function Feedback({ onFinish }) {
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({
    delivery: "",
    website: "",
    comments: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const feedback = {
      rating,
      ...form,
    };

    console.log("User feedback:", feedback);

    onFinish();
  }

  return (
    <div className="container checkout-card" style={{ maxWidth: "700px" }}>
      <h2 className="mb-3">How was your experience?</h2>

      <p className="text-muted mb-4">Help us improve A-To-Z Books</p>

      <form onSubmit={handleSubmit}>
        {/* STAR RATING */}
        <div className="mb-4">
          <label className="form-label">Overall Rating</label>

          <div className="d-flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "28px",
                  cursor: "pointer",
                  color: star <= rating ? "var(--secondary)" : "#ddd",
                }}
                onClick={() => setRating(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* DELIVERY */}
        <div className="mb-3">
          <label className="form-label">Was delivery information clear?</label>

          <select
            className="form-select"
            name="delivery"
            value={form.delivery}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Very clear</option>
            <option>Somewhat clear</option>
            <option>Confusing</option>
          </select>
        </div>

        {/* WEBSITE */}
        <div className="mb-3">
          <label className="form-label">How easy was the website to use?</label>

          <select
            className="form-select"
            name="website"
            value={form.website}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Very easy</option>
            <option>Okay</option>
            <option>Difficult</option>
          </select>
        </div>

        {/* COMMENTS */}
        <div className="mb-4">
          <label className="form-label">Additional comments</label>

          <textarea
            className="form-control"
            rows="4"
            name="comments"
            value={form.comments}
            onChange={handleChange}
            placeholder="Tell us what we can improve..."
          />
        </div>

        <button
          className="btn btn-primary w-100"
          onClick={() => window.location.reload()}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
