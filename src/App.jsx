import { useState } from "react";
import "./App.css";

const facts = [
  {
    id: 1,
    category: "Space",
    emoji: "🪐",
    text: "A day on Venus is longer than a year on Venus — it takes 243 Earth days to rotate once, but only 225 Earth days to orbit the Sun.",
    source: "NASA",
  },
  {
    id: 2,
    category: "History",
    emoji: "🏛️",
    text: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza.",
    source: "Smithsonian",
  },
  {
    id: 3,
    category: "Science",
    emoji: "🔬",
    text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible.",
    source: "National Geographic",
  },
  {
    id: 4,
    category: "Animals",
    emoji: "🐙",
    text: "Octopuses have three hearts, blue blood, and nine brains — one central brain and one in each of their eight arms.",
    source: "Marine Biology Journal",
  },
  {
    id: 5,
    category: "Space",
    emoji: "🪐",
    text: "If you removed all the empty space from atoms in every human on Earth, all of humanity would fit inside a sugar cube.",
    source: "Physics Today",
  },
  {
    id: 6,
    category: "History",
    emoji: "🏛️",
    text: "The Viking Leif Eriksson reached North America about 500 years before Columbus, establishing a settlement in Newfoundland.",
    source: "Smithsonian",
  },
  {
    id: 7,
    category: "Science",
    emoji: "🔬",
    text: "Water can boil and freeze at the same time. This is called the triple point and occurs at a very specific temperature and pressure.",
    source: "MIT",
  },
  {
    id: 8,
    category: "Animals",
    emoji: "🦩",
    text: "A group of flamingos is called a flamboyance. They are pink because of carotenoid pigments in the algae and crustaceans they eat.",
    source: "WWF",
  },
  {
    id: 9,
    category: "Tech",
    emoji: "💻",
    text: "The first computer bug was an actual bug — a moth found trapped inside a relay of the Harvard Mark II computer in 1947.",
    source: "Computer History Museum",
  },
  {
    id: 10,
    category: "Tech",
    emoji: "💻",
    text: "There are more possible iterations of a game of chess than there are atoms in the observable universe.",
    source: "Shannon Number",
  },
  {
    id: 11,
    category: "Science",
    emoji: "🔬",
    text: "Bananas are naturally radioactive. They contain potassium-40, a radioactive isotope — but the dose is so tiny it is completely harmless.",
    source: "Health Physics Society",
  },
  {
    id: 12,
    category: "Space",
    emoji: "🪐",
    text: "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 10 million tons on Earth.",
    source: "NASA",
  },
];

const categoryColors = {
  Space: { bg: "#eeedfe", text: "#3c3489" },
  History: { bg: "#faeeda", text: "#633806" },
  Science: { bg: "#eaf3de", text: "#27500a" },
  Animals: { bg: "#fbeaf0", text: "#72243e" },
  Tech: { bg: "#e6f1fb", text: "#0c447c" },
};

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [deck] = useState(() => shuffle(facts));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [liked, setLiked] = useState(new Set());

  const fact = deck[index];
  const color = categoryColors[fact.category];
  const isLiked = liked.has(fact.id);

  function next() {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i + 1) % deck.length), 150);
  }

  function prev() {
    setFlipped(false);
    setTimeout(() => setIndex((i) => (i - 1 + deck.length) % deck.length), 150);
  }

  function toggleLike() {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(fact.id) ? next.delete(fact.id) : next.add(fact.id);
      return next;
    });
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">💡 Did You Know?</div>
        <div className="liked-count">{liked.size} saved</div>
      </header>

      <main className="main">
        <div
          className={`card ${flipped ? "card--flip" : ""}`}
          onClick={() => setFlipped((f) => !f)}
        >
          <div className="card__inner">
            <div className="card__front">
              <span
                className="badge"
                style={{ background: color.bg, color: color.text }}
              >
                {fact.emoji} {fact.category}
              </span>
              <p className="fact-text">{fact.text}</p>
              <p className="source">— {fact.source}</p>
              <p className="flip-hint">Tap card to flip ✨</p>
            </div>
            <div className="card__back">
              <p className="back-label">Fun context</p>
              <p className="back-text">
                This fact is from the <strong>{fact.category}</strong> category
                and sourced from <strong>{fact.source}</strong>. Share it and
                impress someone today!
              </p>
              <span
                className="badge"
                style={{ background: color.bg, color: color.text }}
              >
                {fact.emoji} {fact.category}
              </span>
            </div>
          </div>
        </div>

        <div className="controls">
          <button className="btn btn--ghost" onClick={prev}>
            ← Prev
          </button>
          <div className="counter">
            {index + 1} / {deck.length}
          </div>
          <button className="btn btn--ghost" onClick={next}>
            Next →
          </button>
        </div>

        <div className="actions">
          <button
            className={`btn btn--like ${isLiked ? "btn--liked" : ""}`}
            onClick={toggleLike}
          >
            {isLiked ? "❤️ Saved" : "🤍 Save"}
          </button>
          <button className="btn btn--primary" onClick={next}>
            🎲 Random Fact
          </button>
        </div>
      </main>

      <footer className="footer">
        Built with React · Deployed on Kubernetes
      </footer>
    </div>
  );
}
