import { useState } from "react";
import { supabase } from "./supabase";
import toast, { Toaster } from "react-hot-toast";


function App() {
  const [email, setEmail] = useState<string>("");
  const [cardsPerYear, setCardsPerYear] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email || !cardsPerYear) {
      toast.error("All fields are required to be filled in order to join the waitlist");
      return;
    }

    const { error } = await supabase
      .from("grading_interest")
      .insert([
        {
          email: email,
          cards_per_year: parseInt(cardsPerYear)
        }
      ]);

    if (error) {
      if (error.code === "23505") {
        toast.success("You're on the IVS early access list");
      } else {
        toast.error("Please enter a valid email ID and a valid estimated cards per year");

      }
    } else {
      toast.success("Thanks! You're now on the IVS early access list");
      setEmail("");
      setCardsPerYear("");
      setShowForm(false);

      if (window.gtag) {
        window.gtag?.("event", "generate_lead", {
          form_name: "grading_waitlist"
        });

      }
    }

  };

  return (
    <div className="background">
      <Toaster position="top-center" />
      <div className="page">
        {/* HERO SECTION */}
        <section className="hero">
          <h1>Ivy Standards</h1>
          <p>India's First Pokémon Card Grading Service</p>

          {!showForm ? (
            <button
              className="cta-button"
              onClick={() => {
                setShowForm(true);

                window.gtag?.("event", "select_content", {
                  content_type: "button",
                  content_id: "interested_in_grading"
                });
              }}
            >
              I'm Interested in Grading
            </button>
          ) : (
            <div className="form-card">
              <button
                className="close-button"
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>

              <h3>Be among the first collectors to grade with Ivy Standards</h3>

              <div className="input-group">
                Email Address *
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="input-group">
                Estimated Cards Per Year *
                <input
                  type="number"
                  placeholder="e.g. 50"
                  value={cardsPerYear}
                  onChange={(e) => setCardsPerYear(e.target.value)}
                  className="form-input"
                />
              </div>

              <button className="submit-button" onClick={handleSubmit}>
                Join Waitlist
              </button>
            </div>

          )}



        </section>

        <div className="divider" />

        {/* CARDS SECTION */}
        <section className="cards-section">
          <div className="cards">
            <div className="card">
              <h2>The Problem</h2>
              <ul>
                <li>Grading abroad is expensive</li>
                <li>Turnaround times are too long</li>
                <li>Shipping and customs add risk</li>
                <li>India lacks published grading standards</li>
              </ul>
            </div>

            <div className="card">
              <h2>Our Approach</h2>
              <ul>
                <li>Pokémon card authentication</li>
                <li>Transaparent grading criteria</li>
                <li>Tamper sealed slabs</li>
                <li>Superior overall grading experience</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>Email Us:  INFO@IVYSTANDARDS.ORG</p>
        </footer>
      </div>
    </div>

  );
}

export default App;
