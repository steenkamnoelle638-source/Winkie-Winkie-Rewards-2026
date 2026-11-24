import { Check, ChevronRight, CircleHelp, Crown, Eye, LockKeyhole, Play, Sparkles, UsersRound } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { hosts, participants } from "@/data/awards";
import { getCurrentUser, getReadRules, setCurrentUser, setReadRules } from "@/lib/storage";

const rules = [
  ["01", "Stem met jou hart", "Kies die persoon wat die titel die meeste verdien — nie noodwendig jou beste vriend nie."],
  ["02", "Geen selfstem", "Jou eie naam word outomaties uit elke vraag se opsies gehaal."],
  ["03", "Een kies per vraag", "Jou keuse word dadelik bewaar. Jy kan die aand rustig deurwerk."],
];

export default function Home() {
  const [, navigate] = useLocation();
  const [selectedUser, setSelectedUser] = useState(getCurrentUser() ?? "");
  const [rulesRead, setRulesRead] = useState(getReadRules());

  const canStart = Boolean(selectedUser && rulesRead);
  const handleRules = (value: boolean) => {
    setRulesRead(value);
    setReadRules(value);
  };
  const handleStart = () => {
    if (!canStart) return;
    setCurrentUser(selectedUser);
    navigate("/vote");
  };

  return <div className="page-wrap home-page">
    <section className="hero-grid">
      <div className="hero-copy">
        <div className="eyebrow"><span className="eyebrow-line" /> A private awards night <span className="eyebrow-year">2026</span></div>
        <h1>Die aand van<br /><span>groot menings.</span></h1>
        <p className="hero-lede">Welkom by die Vriende Oscars — waar die trofeë blink, die stemme geheim is, en niemand ooit heeltemal neutraal is nie.</p>
        <div className="hero-actions"><button className="button button-primary" onClick={() => document.getElementById("choose")?.scrollIntoView({ behavior: "smooth" })}>Kies jou naam <ChevronRight size={17} /></button><button className="text-action" onClick={() => navigate("/results")}><Eye size={16} /> Wys resultate</button></div>
        <div className="hero-meta"><span><UsersRound size={15} /> {participants.length} kiesers</span><span className="meta-separator" /><span><CircleHelp size={15} /> 6 vrae</span><span className="meta-separator" /><span><LockKeyhole size={15} /> Geheime stem</span></div>
      </div>
      <div className="host-stage">
        <div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" />
        <div className="stage-label">Tonight’s hosts</div>
        <div className="host-portrait host-main"><img src={hosts[0].photo} alt={`${hosts[0].name}, host`} /><span className="portrait-tag">HOST</span></div>
        <div className="host-portrait host-side"><img src={hosts[1].photo} alt={`${hosts[1].name}, co-host`} /><span className="portrait-tag">CO-HOST</span></div>
        <div className="host-caption"><strong>Lian <i>&</i> Mieke</strong><span>Bring jou beste judgement.</span></div>
        <div className="sparkle sparkle-a">✦</div><div className="sparkle sparkle-b">✦</div>
      </div>
    </section>

    <section className="rules-board section-block">
      <div className="section-intro"><div><div className="eyebrow"><span className="eyebrow-line" /> Cue sheet</div><h2>Voor die <em>rooi tapyt</em></h2></div><p>Drie eenvoudige reëls. Geen speeches langer as 45 sekondes nie.</p></div>
      <div className="rule-grid">{rules.map(([number, title, body]) => <article className="rule-card" key={number}><span className="rule-number">{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
    </section>

    <section className="start-panel section-block" id="choose">
      <div className="start-panel-copy"><div className="eyebrow"><span className="eyebrow-line" /> Your seat is saved</div><h2>Kies jou naam.<br /><em>Hou jou stem geheim.</em></h2><p>Jou naam bepaal watter kandidaat jy nie kan kies nie. Die res bly tussen jou en die goue koevert.</p><div className="progress-rail"><span className="progress-step active"><b>01</b> Reëls</span><span className="progress-line" /><span className={`progress-step ${rulesRead ? "active" : ""}`}><b>02</b> Naam</span><span className="progress-line" /><span className="progress-step"><b>03</b> Stem</span></div></div>
      <div className="start-form">
        <label className="field-label" htmlFor="name-select">Wie is jy vanaand?</label>
        <div className="select-wrap"><select id="name-select" value={selectedUser} onChange={(event) => setSelectedUser(event.target.value)}><option value="">Kies jou naam…</option>{participants.map((person) => <option key={person.id} value={person.id}>{person.name} — {person.role}</option>)}</select><ChevronRight size={18} /></div>
        <label className={`check-row ${rulesRead ? "checked" : ""}`}><input type="checkbox" checked={rulesRead} onChange={(event) => handleRules(event.target.checked)} /><span className="custom-check"><Check size={13} /></span><span>Ek het die reëls gelees en verstaan.</span></label>
        <button className="button button-primary wide" disabled={!canStart} onClick={handleStart}>Gaan voort na vrae <ChevronRight size={17} /></button>
        <button className="button button-ghost wide" onClick={() => navigate("/ranking")}><BarChartMini /> Kyk na voorbeeld ranking</button>
        {!canStart && <p className="form-hint">Kies eers jou naam en merk die reëls as gelees.</p>}
      </div>
    </section>

    <section className="closing-note"><Crown size={17} /><span>Die uitslae word eers na admin-verifikasie oopgemaak.</span><button onClick={() => navigate("/results")}>Admin toegang <ChevronRight size={15} /></button></section>
  </div>;
}

function BarChartMini() {
  return <span className="mini-bars" aria-hidden="true"><i /><i /><i /></span>;
}
