import { useState, useEffect, useRef } from "react";
import "../styles/ApologySection.css";

function Envelope({onOpen,isOpen}) {
  return (
    <div className="envelope-container" onClick={onOpen} role="button" tabIndex={0} aria-label={isOpen?"Envelope opened":"Click to open the envelope"} onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onOpen();}}}>
      <div className="envelope-body">
        <div className="envelope-bottom"/>
        <div className="envelope-left"/>
        <div className="envelope-right"/>
      </div>
      <div className={`envelope-flap${isOpen?" open":""}`}><div className="flap-inner"><div className="flap-triangle"/></div></div>
      <div className="envelope-seal" aria-hidden="true">{isOpen?"💌":"🔒"}</div>
      {!isOpen&&<div className="envelope-hint" aria-hidden="true">Click to open ✨</div>}
    </div>
  );
}

function Letter() {
  return (
    <div className="letter-card" role="article" aria-label="Heartfelt apology letter">
      <p className="letter-greeting">My dearest Sweety ka,</p>
      <div className="letter-body">
        <p>My Dear Sweety Ka ❤️🥺

I know I made a mistake, and I genuinely feel sorry for it.

You took the effort to ask someone about a job opportunity for me because you wanted to help me. But I didn't give it the importance it deserved. I should have understood your effort and valued what you were doing for me.

You trusted me and tried to do something good for my future, but I didn't respond in the way I should have. I realize that now, and I'm really sorry, Sweety ka.

I never wanted to disappoint you. Your care, support, and the effort you took for me mean a lot. I should have respected that from the beginning.

I'm not expecting you to forget everything immediately or start talking to me just because I said sorry. I just want you to know that I understand my mistake, and I'll try to become more responsible through my actions.

I miss our conversations, Sweety ka. ❤️

Please take your time. Whenever you feel comfortable, I'll be happy to talk to you again.

**With lots of love,  
Your little brother ❤️🫂**</p>
      </div>
      <p className="letter-closing">Forever yours 💕</p>
    </div>
  );
}

export default function ApologySection() {
  const [envelopeOpen,setEnvelopeOpen] = useState(false);
  const [showLetter,setShowLetter] = useState(false);
  const sectionRef = useRef(null);
  const handleOpenEnvelope = () => { if(envelopeOpen)return; setEnvelopeOpen(true); setTimeout(()=>setShowLetter(true),700); };
  useEffect(()=>{
    const obs=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible");}),{threshold:0.15});
    sectionRef.current?.querySelectorAll(".fade-in")?.forEach(el=>obs.observe(el));
    return()=>obs.disconnect();
  },[]);
  return (
    <section className="apology-section" id="apology" ref={sectionRef} aria-label="Sincere apology section">
      <div className="section-container">
        <div className="apology-header fade-in">
          <span className="section-label">✨ From the bottom of my heart</span>
          <h2 className="section-title">I&apos;m Really Sorry, <span>Sweety Ka</span> 🥺</h2>
        </div>
        <div className="envelope-wrapper">
          {!showLetter&&<Envelope onOpen={handleOpenEnvelope} isOpen={envelopeOpen}/>}
          {showLetter&&<Letter/>}
        </div>
      </div>
    </section>
  );
}