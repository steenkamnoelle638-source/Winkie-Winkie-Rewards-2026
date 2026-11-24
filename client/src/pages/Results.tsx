import { Award, ChevronRight, Clock3, Crown, LockKeyhole, Play, RotateCcw, ShieldCheck, Sparkles, Star, Trophy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getCategoryResults, getOverallResults, getParticipant } from "@/data/awards";
import { getVotes, isAdminSession, setAdminSession } from "@/lib/storage";
import { useLocation } from "wouter";

export default function Results() {
  const [, navigate] = useLocation();
  const [authenticated, setAuthenticated] = useState(isAdminSession());
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!authenticated) {
    return <div className="gate-page"><div className="gate-card admin-card"><div className="icon-disc gold-disc"><LockKeyhole /></div><div className="eyebrow"><span className="eyebrow-line" /> Restricted screen</div><h1>Resultate is<br /><em>agter die gordyn.</em></h1><p>Net hosts en co-hosts kry die sleutel tot vanaand se uitslae. Tik die admin-wagwoord om voort te gaan.</p><form onSubmit={(event) => { event.preventDefault(); if (password === "oscar2026") { setAdminSession(true); setAuthenticated(true); setError(""); } else setError("Daardie wagwoord pas nie. Probeer weer."); }}><label className="field-label" htmlFor="admin-password">Admin-wagwoord</label><div className="password-wrap"><input id="admin-password" type="password" placeholder="••••••••" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus /><LockKeyhole size={16} /></div>{error && <p className="error-message">{error}</p>}<button className="button button-primary wide" type="submit">Ontsluit resultate <ChevronRight size={17} /></button></form><div className="demo-hint"><span>Demo toegang</span><code>oscar2026</code></div><button className="back-link" onClick={() => navigate("/")}>← Terug na voorportaal</button></div></div>;
  }

  return <ResultsDashboard />;
}

function ResultsDashboard() {
  const [, navigate] = useLocation();
  const [revealRun, setRevealRun] = useState(0);
  const [revealStage, setRevealStage] = useState(0);
  const votes = getVotes(null);
  const categoryResults = useMemo(() => getCategoryResults(votes), []);
  const overall = useMemo(() => getOverallResults(votes), []);
  const topThree = overall.slice(0, 3);

  useEffect(() => {
    setRevealStage(0);
    const timers = [window.setTimeout(() => setRevealStage(1), 2200), window.setTimeout(() => setRevealStage(2), 5200), window.setTimeout(() => setRevealStage(3), 9400)];
    return () => timers.forEach(window.clearTimeout);
  }, [revealRun]);

  return <div className="page-wrap results-page">
    <section className="results-header"><div><div className="eyebrow"><span className="eyebrow-line" /> Confidential · Hosts only</div><h1>Open die <em>koeverte.</em></h1><p>Die stemme is getel. Die groot oomblik begin nou.</p></div><div className="results-actions"><button className="button button-ghost" onClick={() => navigate("/ranking")}><Trophy size={16} /> Volle ranking</button><button className="button button-primary" onClick={() => setRevealRun((run) => run + 1)}><Play size={15} /> Speel onthulling weer</button></div></section>
    <section className={`reveal-stage reveal-${revealStage}`} aria-live="polite"><div className="reveal-scanline" /><div className="reveal-content"><span className="reveal-kicker">Overall results</span>{revealStage === 0 && <><Clock3 size={25} className="reveal-icon" /><h2>Lights out.</h2><p>Die kamer hou asem op…</p></>}{revealStage > 0 && <><span className="reveal-place">{revealStage === 1 ? "THIRD PLACE" : revealStage === 2 ? "SECOND PLACE" : "AND THE WINNER IS"}</span><div className="reveal-person"><div className="reveal-photo"><img src={topThree[revealStage === 1 ? 2 : revealStage === 2 ? 1 : 0].participant.photo} alt="" /></div><div><span className="reveal-number">0{revealStage === 1 ? 3 : revealStage === 2 ? 2 : 1}</span><h2>{topThree[revealStage === 1 ? 2 : revealStage === 2 ? 1 : 0].participant.name}</h2><p>{topThree[revealStage === 1 ? 2 : revealStage === 2 ? 1 : 0].score} punte oor al die vrae</p></div></div></>}</div><div className="reveal-bottom"><span>Vriende Oscars 2026</span><span className="reveal-dots">{[1, 2, 3].map((stage) => <i className={revealStage >= stage ? "on" : ""} key={stage} />)}</span></div></section>

    <section className="overall-strip section-block"><div className="section-intro compact"><div><div className="eyebrow"><span className="eyebrow-line" /> The big picture</div><h2>Algehele <em>podium</em></h2></div><p>Elke hoofkategorie se telling dra by tot hierdie drie.</p></div><div className="overall-podium"><PodiumSpot result={topThree[1]} place={2} tall={false} /><PodiumSpot result={topThree[0]} place={1} tall={true} crown /><PodiumSpot result={topThree[2]} place={3} tall={false} /></div></section>

    <section className="category-section section-block"><div className="section-intro compact"><div><div className="eyebrow"><span className="eyebrow-line" /> Category winners</div><h2>Die <em>hoofkategorieë</em></h2></div><p>Wenner bepaal deur subkategorieë en die vrae daaronder.</p></div><div className="category-grid">{categoryResults.map((category) => <article className="category-card" key={category.id}><div className="category-card-head"><span className="category-index">0{categoryResults.indexOf(category) + 1}</span><div><h3>{category.name}</h3><span>{category.questions.length} subkategorieë</span></div><Sparkles size={17} /></div><div className="small-podium">{category.podium.map((result, index) => <PodiumSpot key={result.participant.id} result={result} place={index + 1} tall={index === 0} compact />)}</div><div className="category-evidence">{category.questions.map((question) => <div key={question.id}><span>{question.subcategory}</span><strong>{getParticipant(category.podium[0].participant.id)?.shortName}</strong></div>)}</div></article>)}</div></section>
    <div className="results-bottom-note"><ShieldCheck size={16} /> Resultate ontsluit vir hierdie hostsessie. <button onClick={() => { setAdminSession(false); window.location.reload(); }}>Sluit hostsessie</button></div>
  </div>;
}

function PodiumSpot({ result, place, tall, crown = false, compact = false }: { result: { participant: { name: string; shortName: string; photo: string }; score: number }; place: number; tall: boolean; crown?: boolean; compact?: boolean }) {
  return <div className={`podium-spot place-${place} ${tall ? "tall" : ""} ${compact ? "compact" : ""}`}><div className="podium-person">{crown && <Crown className="podium-crown" size={18} />}<div className="podium-avatar"><img src={result.participant.photo} alt="" /></div><span className="podium-place">{place}</span><strong>{result.participant.shortName}</strong><small>{result.score} pts</small></div><div className="podium-block"><span>{place === 1 ? "WINNER" : `0${place}DE`}</span></div></div>;
}
