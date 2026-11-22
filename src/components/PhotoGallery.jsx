import { useState, useEffect, useRef } from "react";
import "../styles/PhotoGallery.css";

import photo1 from "../assets/photo1.jpg";
import photo2 from "../assets/photo2.jpg";
import photo3 from "../assets/photo3.jpg";
import photo4 from "../assets/photo4.jpg";
import photo5 from "../assets/photo5.jpg";

const PHOTOS = [
  { src: photo1, caption: "Every moment with you is a treasure 🌙" },
  { src: photo2, caption: "My favourite person, always 🌸" },
  { src: photo3, caption: "You make everything brighter 💕" },
  { src: photo4, caption: "Blessed to have you as my Akka 🙏" },
  { src: photo5, caption: "Capturing memories, capturing love 🤍" },
];

export default function PhotoGallery() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const sectionRef = useRef(null);
  const intervalRef = useRef(null);

  const startAuto = () => {
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % PHOTOS.length);
    }, 3500);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    clearInterval(intervalRef.current);
    setActive(i);
    startAuto();
  };

  const prev = () => goTo((active - 1 + PHOTOS.length) % PHOTOS.length);
  const next = () => goTo((active + 1) % PHOTOS.length);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll(".fade-in")?.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // keyboard support for lightbox
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((l) => (l + 1) % PHOTOS.length);
      if (e.key === "ArrowLeft") setLightbox((l) => (l - 1 + PHOTOS.length) % PHOTOS.length);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox]);

  return (
    <section className="photo-gallery-section" id="gallery" ref={sectionRef} aria-label="Our memories">
      <div className="gallery-bg-glow" aria-hidden="true" />
      <div className="gallery-container">
        <div className="gallery-header fade-in">
          <span className="section-label">📸 Our Memories</span>
          <h2 className="section-title">Every Picture Tells <span>Our Story</span> 💕</h2>
          <p className="gallery-subtitle">These moments mean the world to me, Akka</p>
        </div>

        {/* Main Slideshow */}
        <div className="slideshow-wrapper fade-in">
          <button className="slide-arrow left" onClick={prev} aria-label="Previous photo">‹</button>

          <div className="slideshow-frame">
            {PHOTOS.map((ph, i) => (
              <div
                key={i}
                className={`slide ${i === active ? "slide-active" : i === (active - 1 + PHOTOS.length) % PHOTOS.length ? "slide-prev" : "slide-next"}`}
                onClick={() => setLightbox(i)}
                role="button"
                tabIndex={i === active ? 0 : -1}
                aria-label={`View photo ${i + 1} larger`}
              >
                <img src={ph.src} alt={`Memory ${i + 1}`} className="slide-img" loading="lazy" />
                <div className="slide-overlay">
                  <span className="slide-caption">{ph.caption}</span>
                  <span className="slide-zoom" aria-hidden="true">🔍</span>
                </div>
              </div>
            ))}
          </div>

          <button className="slide-arrow right" onClick={next} aria-label="Next photo">›</button>
        </div>

        {/* Dots */}
        <div className="slide-dots" role="tablist" aria-label="Photo navigation">
          {PHOTOS.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === active ? "dot-active" : ""}`}
              onClick={() => goTo(i)}
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to photo ${i + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail strip */}
        <div className="thumb-strip fade-in">
          {PHOTOS.map((ph, i) => (
            <button
              key={i}
              className={`thumb ${i === active ? "thumb-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Photo ${i + 1}`}
            >
              <img src={ph.src} alt={`Thumbnail ${i + 1}`} loading="lazy" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)} role="dialog" aria-modal="true" aria-label="Photo lightbox">
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close">✕</button>
            <button className="lightbox-arrow left" onClick={() => setLightbox((l) => (l - 1 + PHOTOS.length) % PHOTOS.length)} aria-label="Previous">‹</button>
            <img src={PHOTOS[lightbox].src} alt={`Memory ${lightbox + 1}`} className="lightbox-img" />
            <p className="lightbox-caption">{PHOTOS[lightbox].caption}</p>
            <button className="lightbox-arrow right" onClick={() => setLightbox((l) => (l + 1) % PHOTOS.length)} aria-label="Next">›</button>
          </div>
        </div>
      )}
    </section>
  );
}
