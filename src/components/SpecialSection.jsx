import { useEffect, useRef } from "react";
import "../styles/SpecialSection.css";

const CARDS = [
  {id:1,icon:"❤️",title:"Your Care ❤️",text:"Your kindness and care mean more than words can explain. The way you look out for people, quietly and sincerely, is something truly rare."},
  {id:2,icon:"🌸",title:"Your Importance 🌸",text:"You are someone I genuinely value in my life. Not just as a figure but as a person whose presence makes everything feel a little more complete."},
  {id:3,icon:"🫂",title:"Our Bond 🫂",text:"I hope one mistake will not erase all the beautiful memories we share. Every moment with you has meant the world to me, and always will."},
];

function SpecialCard({icon,title,text,delay}) {
  return (
    <article className="special-card fade-in" style={{animationDelay:delay}} aria-label={title}>
      <div className="card-icon-wrapper" aria-hidden="true"><span role="img" aria-label={title}>{icon}</span></div>
      <h3 className="card-title">{title}</h3>
      <p className="card-text">{text}</p>
      <div className="card-accent" aria-hidden="true"/>
    </article>
  );
}

export default function SpecialSection() {
  const sectionRef = useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:0.12});
    sectionRef.current?.querySelectorAll(".fade-in")?.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
  return (
    <section className="special-section" id="special" ref={sectionRef} aria-label="Why you are special">
      <div className="section-container">
        <div className="special-header fade-in">
          <span className="section-label">💖 This is for you</span>
          <h2 className="section-title">Why You Are <span>So Special</span> to Me 🌸</h2>
        </div>
        <div className="cards-grid" role="list">
          {CARDS.map((c,i)=><SpecialCard key={c.id} icon={c.icon} title={c.title} text={c.text} delay={`${0.1+i*0.15}s`}/>)}
        </div>
      </div>
    </section>
  );
}