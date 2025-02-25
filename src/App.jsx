import React, { useEffect, useState } from "react";

function App() {
    const [reviews, setReviews] = useState([]);
    const [form, setForm] = useState({ name: "", email: "", review: "" });

    useEffect(() => {
        fetch("https://happy-wave-014aa7603.4.azurestaticapps.net/get-reviews")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await fetch("https://happy-wave-014aa7603.4.azurestaticapps.net/add-review", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });
        setForm({ name: "", email: "", review: "" });
        window.location.reload();
    };

    return (
        <div>
            <h1>Donnez votre avis</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nom" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <textarea placeholder="Votre avis" value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} required></textarea>
                <button type="submit">Envoyer</button>
            </form>

            <h2>Avis des utilisateurs</h2>
            {reviews.map((r, i) => (
                <p key={i}><strong>{r.name}</strong>: {r.review}</p>
            ))}
        </div>
    );
}

export default App;