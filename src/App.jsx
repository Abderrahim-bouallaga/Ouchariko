import React, { useEffect, useState } from "react";

function App() {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", review: "" });

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/get-reviews")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          setReviews([]);
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/add-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Failed to submit review");

      setForm({ name: "", email: "", review: "" });
      window.location.reload();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div>
      <h1>Submit Your Review</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Review"
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          required
        ></textarea>
        <button type="submit">Submit</button>
      </form>
      <h2>User Reviews</h2>
      {reviews.length > 0 ? (
        reviews.map((r, i) => (
          <p key={i}>
            <strong>{r.name}</strong>: {r.review}
          </p>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default App;
