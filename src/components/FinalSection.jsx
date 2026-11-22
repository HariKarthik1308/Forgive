import { useEffect, useRef } from "react";
import "../styles/FinalSection.css";

const PETALS = [
  {emoji:"🌸",top:"8%",left:"5%",delay:"0s",duration:"4s"},
  {emoji:"🌷",top:"15%",left:"90%",delay:"0.5s",duration:"5s"},
  {emoji:"✨",top:"70%",left:"8%",delay:"1s",duration:"3.5s"},
  {emoji:"🌸",top:"80%",left:"88%",delay:"0.3s",duration:"4.5s"},
  {emoji:"💮",top:"45%",left:"3%",delay:"1.5s",duration:"6s"},
  {emoji:"🌸",top:"55%",left:"92%",delay:"0.8s",duration:"5.5s"},
];

export default function FinalSection() {
  const sectionRef = useRef(null);
  const handleBackToTop = ()=>window.scrollTo({top:0,behavior:"smooth"});
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:0.12});
    sectionRef.current?.querySelectorAll(".fade-in")?.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
  return (
    <section className="final-section" id="final" ref={sectionRef} aria-label="Final apology">
      {PETALS.map((p,i)=><span key={i} className="petal" style={{top:p.top,left:p.left,animationDelay:p.delay,animationDuration:p.duration}} aria-hidden="true">{p.emoji}</span>)}
      <div className="final-card fade-in" role="article">
        <div className="final-top-glow"><span className="final-top-emoji" aria-hidden="true">❤️</span></div>
        <h2 className="final-heading">One Last Thing, <span>Akka</span> ❤️</h2>
        <div className="final-message">
          <p>I don&apos;t expect you to forgive me immediately. Take your time. I just wanted to tell you that I am truly sorry, and I hope someday we can smile and talk like before. You will always be someone special to me.</p>
        </div>
        <div className="floating-petals-row" aria-hidden="true"><span>🌸</span><span>💕</span><span>❤️</span><span>💕</span><span>🌸</span></div>
        <span className="final-signature">With lots of love, Your little brother ❤️</span>
        <div className="final-footer">
          <p className="final-footer-text">Made with 💖 and lots of love, just for you, Akka</p>
          <button className="back-to-top" onClick={handleBackToTop} aria-label="Back to top"><span>↑</span><span>Read Again</span></button>
        </div>
      </div>
    </section>
  );
}