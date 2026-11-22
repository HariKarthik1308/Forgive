import { useState, useRef, useCallback, useEffect } from "react";
import "../styles/HeartSection.css";

const BURST_EMOJIS = ["❤️","💕","🌸","💖","✨","🩷","💗","🫂","💝","🌷"];

function BurstParticle({emoji,x,y}) {
  const angle = Math.random()*360;
  const dist = 80+Math.random()*160;
  const tx = Math.cos(angle*Math.PI/180)*dist;
  const ty = Math.sin(angle*Math.PI/180)*dist;
  return (
    <span className="burst-particle" style={{left:x,top:y,"--tx":`${tx}px`,"--ty":`${ty}px`,fontSize:`${1.2+Math.random()*0.8}rem`,animationDuration:`${1+Math.random()*0.6}s`,animationDelay:`${Math.random()*0.2}s`}} aria-hidden="true">{emoji}</span>
  );
}

function HugMessage({status}) {
  const cfg = {
    sending: { emoji:"💌", text:"Sending your hug to Akka..." },
    sent:    { emoji:"🫂", text:"Hug sent! Akka will feel your love 💕" },
    error:   { emoji:"💔", text:"Could not send right now.\nBut the love is always there 💕" },
    idle:    { emoji:"🫂", text:"Sending you all my love, Akka!\nThis hug is just for you 💕" },
  };
  const m = cfg[status] || cfg.idle;
  return (
    <div className="hug-message-overlay" role="status" aria-live="polite">
      <div className="hug-message-box">
        <span className="hug-message-emoji" aria-hidden="true">{m.emoji}</span>
        <p className="hug-message-text">{m.text}</p>
      </div>
    </div>
  );
}

export default function HeartSection() {
  const [particles,setParticles]     = useState([]);
  const [showMessage,setShowMessage] = useState(false);
  const [sendStatus,setSendStatus]   = useState("idle");
  const timerRef   = useRef(null);
  const pidRef     = useRef(0);
  const sectionRef = useRef(null);
  const buttonRef  = useRef(null);

  useEffect(()=>()=>{if(timerRef.current)clearTimeout(timerRef.current);},[]);

  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:0.15});
    sectionRef.current?.querySelectorAll(".fade-in")?.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);

  const sendHugEmail = async () => {
    try {
      const formData = new FormData();
      formData.append("name", "Apology Website");
      formData.append("email", "noreply@apologywebsite.com");
      formData.append("message",
        "💌 Someone clicked the Send a Little Hug button on your apology website!\n\n" +
        "🫂 A virtual hug has been sent to you with lots of love!\n\n" +
        "Sent at: " + new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
      );
      formData.append("_subject", "💌 Your Akka sent you a hug! 🫂");
      formData.append("_captcha", "false");
      formData.append("_template", "box");

      const res = await fetch("https://formsubmit.co/harikarthik437@gmail.com", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setSendStatus("sent");
      } else {
        setSendStatus("error");
      }
    } catch (err) {
      console.error("Send error:", err);
      setSendStatus("error");
    }
  };

  const handleHugClick = useCallback(()=>{
    const btn = buttonRef.current;
    let ox="50%", oy="50%";
    if(btn){const r=btn.getBoundingClientRect();ox=`${r.left+r.width/2}px`;oy=`${r.top+r.height/2}px`;}
    const np=Array.from({length:28},(_,i)=>({id:++pidRef.current,emoji:BURST_EMOJIS[i%BURST_EMOJIS.length],x:ox,y:oy}));
    setParticles(np);
    setShowMessage(true);
    setSendStatus("sending");
    sendHugEmail();
    if(timerRef.current)clearTimeout(timerRef.current);
    timerRef.current=setTimeout(()=>{setParticles([]);setShowMessage(false);setSendStatus("idle");},3500);
  },[]);

  return (
    <section className="heart-section" id="heart" ref={sectionRef} aria-label="Interactive heart section">
      {particles.length>0&&<div className="burst-container" aria-hidden="true">{particles.map(p=><BurstParticle key={p.id} emoji={p.emoji} x={p.x} y={p.y}/>)}</div>}
      {showMessage&&<HugMessage status={sendStatus}/>}
      <div className="heart-section-inner fade-in">
        <div className="glow-heart-wrapper">
          <div className="glow-ring" aria-hidden="true"/>
          <div className="glow-ring" aria-hidden="true"/>
          <div className="glow-ring" aria-hidden="true"/>
          <span className="glow-heart" role="img" aria-label="Glowing heart" onClick={handleHugClick}>❤️</span>
        </div>
        <p className="heart-quote">Some bonds are too special to take for granted.</p>
        <button ref={buttonRef} className="hug-button" onClick={handleHugClick} aria-label="Send a little hug"><span>Send a Little Hug 🫂</span></button>
      </div>
    </section>
  );
}