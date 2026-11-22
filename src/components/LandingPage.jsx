import { useEffect, useRef, useState } from "react";
import "../styles/LandingPage.css";

function FloatingHearts() {
  const hearts = ["❤️","🌸","💕","💗","💖","🌷","✨","💝","🩷","💞"];
  const items = Array.from({length:18},(_,i)=>({id:i,left:`${(i*5.8+2)%98}%`,dur:`${6+(i%7)*1.2}s`,delay:`${(i*0.7)%6}s`,fs:`${1+(i%5)*0.25}rem`,e:hearts[i%hearts.length]}));
  return (<div className="hearts-canvas" aria-hidden="true">{items.map(h=><span key={h.id} className="floating-heart" style={{left:h.left,fontSize:h.fs,animationDuration:h.dur,animationDelay:h.delay}}>{h.e}</span>)}</div>);
}

function TwinklingStars() {
  const items = Array.from({length:24},(_,i)=>({id:i,top:`${(i*4.1+3)%95}%`,left:`${(i*4.3+5)%95}%`,dur:`${1.8+(i%5)*0.6}s`,delay:`${(i*0.3)%3}s`,fs:`${0.5+(i%4)*0.2}rem`,e:i%3===0?"✨":i%3===1?"⭐":"🌟"}));
  return (<div className="stars-canvas" aria-hidden="true">{items.map(s=><span key={s.id} className="star" style={{top:s.top,left:s.left,fontSize:s.fs,animationDuration:s.dur,animationDelay:s.delay}}>{s.e}</span>)}</div>);
}

export default function LandingPage({onReveal}) {
  const [clicked,setClicked] = useState(false);
  const buttonRef = useRef(null);
  const handleClick = () => { if(clicked)return; setClicked(true); setTimeout(()=>onReveal(),400); };
  useEffect(()=>{
    const btn=buttonRef.current; if(!btn)return;
    const h=(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();handleClick();}};
    btn.addEventListener("keydown",h);
    return()=>btn.removeEventListener("keydown",h);
  },[]);
  return (
    <section className="landing-page" id="home" aria-label="Landing page">
      <FloatingHearts/>
      <TwinklingStars/>
      <div className="landing-content">
        <div className="landing-top-icon" aria-hidden="true">💌</div>
        <h1 className="landing-heading">Hey, My Lovable <span>Sweety Ka</span> ❤️</h1>
        <p className="landing-subtitle">I have something important to tell you...</p>
        <button ref={buttonRef} className="cta-button" onClick={handleClick} aria-label="Open my heart message" disabled={clicked}>
          <span>Open My Heart 💌</span>
        </button>
      </div>
      <div className="scroll-indicator" aria-hidden="true"><span>SCROLL</span><div className="scroll-dot"/></div>
    </section>
  );
}