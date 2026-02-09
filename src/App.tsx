function App() {
  return (
    <div className="background">
  <div className="page">
    {/* HERO SECTION */}
    <section className="hero">
      <h1>Ivy Standards</h1>
      <p>India's First Pokémon Card Grading Service</p>
      <button>Count Me In</button>
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
