"use client";

import { useState } from "react";
import { Atom, ArrowRight, Beaker, BookOpen, Check, ChevronRight, CircleHelp, Clock3, FlaskConical, Layers3, Leaf, Menu, Play, Sparkles, Target, Timer } from "lucide-react";

type Direction = "field" | "lab" | "night" | "afterhours";

const directions: { id: Direction; name: string; note: string }[] = [
  { id: "field", name: "Field Notes", note: "Warm, tactile, focused" },
  { id: "lab", name: "Modern Lab", note: "Bright, crisp, structured" },
  { id: "night", name: "Molecule Night", note: "Deep, immersive, calm" },
  { id: "afterhours", name: "After Hours", note: "Electric, futuristic, bold" },
];

function DashboardMockup({ direction }: { direction: Direction }) {
  return <div className={`mock-app mock-${direction}`}>
    <aside className="mock-sidebar">
      <div className="mock-brand"><span><Atom size={20}/></span><strong>chem coach</strong></div>
      <div className="mock-side-label">STUDY SPACE</div>
      <button className="selected"><BookOpen size={17}/>Today</button>
      <button><Layers3 size={17}/>Flashcards</button>
      <button><Target size={17}/>My progress</button>
      <div className="mock-sidebar-bottom"><span className="avatar">J</span><div><b>Jessie</b><small>Independent learner</small></div><Menu size={16}/></div>
    </aside>
    <main className="mock-main">
      <div className="mock-topline"><span>WEDNESDAY, OCTOBER 7</span><div><CircleHelp size={16}/> <span>Help</span><span className="mock-ring">J</span></div></div>
      <div className="mock-heading"><div><span className="mock-kicker">YOUR PERSONAL STUDY PLAN</span><h1>Good afternoon, Jessie<span>.</span></h1><p>A little chemistry, at your pace.</p></div><div className="mock-minutes"><Clock3 size={15}/> 15 min today</div></div>
      <section className="mock-feature">
        <div className="mock-feature-copy"><span className="mock-chip"><Sparkles size={13}/> TODAY&apos;S FOCUS</span><h2>Make mole ratios<br/>feel intuitive.</h2><p>Start with one quick recheck, then build into limiting reactants.</p><button className="mock-cta"><Play size={15} fill="currentColor"/> Start today&apos;s plan <ArrowRight size={15}/></button></div>
        <div className="mock-chem-art"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="atom-core">N</div><div className="atom-dot dot-one">H</div><div className="atom-dot dot-two">O</div><div className="atom-dot dot-three">H</div><span className="formula">2H₂ + O₂ → 2H₂O</span></div>
        <div className="mock-feature-footer"><span><Check size={14}/> Built from what you practiced</span><button>Change plan <ChevronRight size={14}/></button></div>
      </section>
      <div className="mock-section-head"><div><span className="mock-kicker">YOUR NEXT STEPS</span><h3>A plan that fits today</h3></div><button>View all <ArrowRight size={14}/></button></div>
      <div className="mock-plan-grid">
        <article className="mock-task task-due"><div className="mock-task-top"><span className="task-icon"><RotateBackIcon/></span><span className="task-time"><Clock3 size={13}/> 4 min</span></div><small>DUE FOR A RECHECK</small><h4>Mole ratios</h4><p>You needed a little help last time.</p><div className="task-bottom"><span className="task-status"><i/>Ready to revisit</span><ChevronRight size={16}/></div></article>
        <article className="mock-task task-now"><div className="mock-task-top"><span className="task-icon"><Beaker size={18}/></span><span className="task-time"><Clock3 size={13}/> 8 min</span></div><small>CLASS PRACTICE</small><h4>Limiting reactants</h4><p>Compare possible product amounts.</p><div className="task-bottom"><span className="task-status"><i/>Continue learning</span><ChevronRight size={16}/></div></article>
        <article className="mock-task task-recall"><div className="mock-task-top"><span className="task-icon"><Leaf size={18}/></span><span className="task-time"><Clock3 size={13}/> 3 min</span></div><small>QUICK RETRIEVAL</small><h4>Particle diagrams</h4><p>Keep an older idea fresh.</p><div className="task-bottom"><span className="task-status"><i/>When you&apos;re ready</span><ChevronRight size={16}/></div></article>
      </div>
      <div className="mock-lower-grid"><section className="mock-progress-card"><div><span className="mock-kicker">YOUR MOMENTUM</span><h3>Steady progress, no streak pressure.</h3><p>3 short sessions this week</p></div><div className="mini-bars"><i/><i/><i/><i/><i/><i/><i/></div><small>MON <span>WED</span> SUN</small></section><section className="mock-unit-card"><div className="unit-art"><FlaskConical size={22}/></div><div><span className="mock-kicker">PICK UP WHERE YOU LEFT OFF</span><h3>Atomic structure</h3><p>2 of 6 lessons explored</p></div><button aria-label="Continue atomic structure"><ArrowRight size={16}/></button></section></div>
      <footer className="mock-footnote"><span>CLASS UNIT 2 ISN&apos;T MAPPED YET</span><button>Choose Unit 2 topics <ArrowRight size={13}/></button></footer>
    </main>
  </div>;
}

function RotateBackIcon(){return <Timer size={18}/>}

export default function MockupsPage() {
  const [direction, setDirection] = useState<Direction>("field");
  const selected = directions.find(d => d.id === direction)!;
  return <div className="mockups-page">
    <header className="mockups-intro"><a href="/" className="mockups-back">← Back to Chem Coach</a><div className="mockups-title-row"><div><span className="mockups-eyebrow">VISUAL CONCEPTS · 01</span><h1>Four ways Chem Coach could feel.</h1><p>Pick a direction to preview the same study dashboard in four different visual styles.</p></div><span className="concept-badge">DESIGN PREVIEW</span></div>
      <div className="direction-switcher" role="tablist">{directions.map(d=><button key={d.id} className={direction===d.id?"active":""} onClick={()=>setDirection(d.id)}><span>{d.name}</span><small>{d.note}</small></button>)}</div>
      <div className="selected-note"><span className={`swatch swatch-${direction}`}/><span><b>{selected.name}</b> — {selected.note}. The dashboard below is a live HTML mockup and adapts to mobile.</span><span className="concept-count">0{directions.findIndex(d => d.id === direction) + 1} / 04</span></div>
    </header>
    <DashboardMockup direction={direction}/>
    <div className="mockups-bottom"><span>Concept only · class curriculum, goals, and activity shown here are demo placeholders.</span><a href="/">Return to your site <ArrowRight size={14}/></a></div>
  </div>;
}
