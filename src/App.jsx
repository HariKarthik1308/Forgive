import { useState, useRef, useCallback } from "react";
import "./index.css";
import "./App.css";
import LandingPage from "./components/LandingPage";
import PhotoGallery from "./components/PhotoGallery";
import ApologySection from "./components/ApologySection";
import SpecialSection from "./components/SpecialSection";
import PromiseSection from "./components/PromiseSection";
import HeartSection from "./components/HeartSection";
import FinalSection from "./components/FinalSection";

export default function App() {
  const [revealed, setRevealed] = useState(false);
  const sectionsRef = useRef(null);
  const handleReveal = useCallback(() => {
    setRevealed(true);
    setTimeout(() => {
      const el = document.getElementById("gallery");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
  }, []);
  return (
    <div className="app">
      <LandingPage onReveal={handleReveal} />
      <div ref={sectionsRef} className={`sections-wrapper${revealed ? " revealed" : ""}`} aria-hidden={!revealed}>
        <PhotoGallery />
        <div className="section-divider" aria-hidden="true" />
        <ApologySection />
        <div className="section-divider" aria-hidden="true" />
        <SpecialSection />
        <div className="section-divider" aria-hidden="true" />
        <PromiseSection />
        <div className="section-divider" aria-hidden="true" />
        <HeartSection />
        <div className="section-divider" aria-hidden="true" />
        <FinalSection />
      </div>
    </div>
  );
}