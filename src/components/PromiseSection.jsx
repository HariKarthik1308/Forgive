import { useEffect, useRef } from "react";
import "../styles/PromiseSection.css";

const PROMISES = [
  {id:1,text:"I will understand your feelings."},
  {id:2,text:"I will learn from my mistakes."},
  {id:3,text:"I will respect your space and never take your bond for granted."},
];

function PromiseItem({number,text,delay}) {
  return (
    <li className="promise-item fade-in" style={{animationDelay:delay}}>
      <div className="promise-number" aria-hidden="true">{number}</div>
      <p className="promise-text">{text}</p>
    </li>
  );
}

export default function PromiseSection() {
  const sectionRef = useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:0.15});
    sectionRef.current?.querySelectorAll(".fade-in")?.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
  return (
    <section className="promise-section" id="promise" ref={sectionRef} aria-label="Promises from the heart">
      <div className="promise-card fade-in" role="article">
        <div className="promise-header">
          <span className="promise-icon" aria-hidden="true">🤞</span>
          <h2 className="promise-title">A Promise From My Heart</h2>
          <p className="promise-subtitle">These are not just words — they are my commitment to you.</p>
        </div>
        <ul className="promise-list" aria-label="My promises">
          {PROMISES.map((p,i)=><PromiseItem key={p.id} number={p.id} text={p.text} delay={`${0.15+i*0.15}s`}/>)}
        </ul>
      </div>
    </section>
  );
}