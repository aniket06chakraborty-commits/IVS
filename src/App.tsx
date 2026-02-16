import { useState } from "react";
import { supabase } from "./supabase";
import toast, { Toaster } from "react-hot-toast";
import imageLeft from "./assets/charizard_icon.png";
import imageRight from "./assets/pikachu_icon.png";


function App() {
  const [email, setEmail] = useState<string>("");
  const [cardsPerYear, setCardsPerYear] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!email || !cardsPerYear) {
      toast.error("All fields are required");
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
        toast.success("You're already on the IVS early access list");
      } else {
        toast.error("Please enter valid information");

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

        <img src={imageLeft} className="corner-image left" alt="" />
        <img src={imageRight} className="corner-image right" alt="" />


        {/* HERO SECTION */}
        <section className="hero">
          <h1>Ivy Standards (IVS)</h1>
          <p>Setting a New Standard for Pokémon Card Grading in India</p>

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
              Request Early Access
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


        {/* ROI / COMPARISON SECTION */}
        <section className="roi-section">
          <h2 className="roi-title">Why Grade?</h2>
          <div className="roi-grid">

            {/* Tier 1: Raw */}
            <div className="roi-card">
              <div className="roi-header">Raw Card</div>
              <div className="roi-visual">🃏</div>
              <p>Ungraded, subjective condition</p>
              <div className="roi-value">
                <span className="mult">1x</span>
                <span class="sub">Market Value</span>
              </div>
              <div className="roi-footer danger">High Risk / Low Liquidity</div>
            </div>

            {/* Tier 2: Global Standard */}
            <div className="roi-card">
              <div className="roi-header">Leading Global Graders</div>
              <div className="roi-visual">🌎</div>
              <p>Certified, International Market</p>
              <div className="roi-value">
                <span className="mult">2.5x - 3x</span>
                <span class="sub">Average Return</span>
              </div>
              <div className="roi-footer warning">High Fees / Long Wait</div>
            </div>

            {/* Tier 3: IVS */}
            <div className="roi-card highlight">
              <div className="best-value">BEST DOMESTIC ROI</div>
              <div className="roi-header">Ivy Standards</div>
              <div className="roi-visual">🪔</div>
              <p>Trusted, Local, Efficient</p>
              <div className="roi-value">
                <span className="mult">2x - 2.3x</span>
                <span class="sub">Projected Return</span>
              </div>
              <div className="roi-footer success">Lower Cost / Faster Profit</div>
            </div>

          </div>
          <p className="roi-disclaimer">
            *Estimated multipliers based on market trends. Actual returns depend on card rarity and grade.
          </p>
        </section>


        {/* CARDS SECTION */}
        <section className="cards-section">
          <div className="cards">
            <div className="card">
              <h2>India’s Grading Reality</h2>
              <ul>
                <li>Grading abroad is expensive, ₹5,000+ per card</li>
                <li>Turnaround times are too long</li>
                <li>Shipping and customs add risk</li>
                <li>India lacks published grading standards</li>
                <li>Ungraded cards sell cheap</li>
                <li>Grading price surges if card is highly valued</li>
              </ul>
            </div>

            <div className="card">
              <h2>Why Ivy Standards?</h2>
              <ul>
                <li>Professional authentication service within India</li>
                <li>Clear, transparent grading standards</li>
                <li>Tamper-evident slabs with secure serialisation</li>
                <li>Expected pricing of ₹1,400 - ₹1,700 per card</li>
                <li>Faster domestic turnaround — no overseas risk</li>
                <li>Flat grading price irrespective of card value</li>
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
