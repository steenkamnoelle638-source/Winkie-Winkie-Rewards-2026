import { ArrowLeft, ArrowRight, Check, ChevronRight, CircleCheck, LockKeyhole, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { getParticipant, participants, questions } from "@/data/awards";
import { getCurrentUser, getVotes, setVote } from "@/lib/storage";

export default function Vote() {
  const [, navigate] = useLocation();
  const currentUserId = getCurrentUser();
  const currentUser = getParticipant(currentUserId ?? "");
  const [votes, setVotes] = useState(getVotes(currentUserId));
  const [activeIndex, setActiveIndex] = useState(0);

  const activeQuestion = questions[activeIndex];
  const visibleCandidates = useMemo(() => participants.filter((person) => person.id !== currentUserId), [currentUserId]);
  const answered = questions.filter((question) => votes[question.id]).length;
  const selectedCandidate = activeQuestion ? votes[activeQuestion.id] : undefined;
  const allAnswered = answered === questions.length;

  if (!currentUser) {
    return <div className="gate-page"><div className="gate-card"><div className="icon-disc"><LockKeyhole /></div><div className="eyebrow"><span className="eyebrow-line" /> Eerst jou stoel</div><h1>Kies jou naam<br /><em>voor jy begin.</em></h1><p>Ons gebruik jou keuse net om selfstem te blokkeer. Gaan terug na die eerste blad om voort te gaan.</p><button className="button button-primary" onClick={() => navigate("/")}>Gaan na naamkeuse <ChevronRight size={17} /></button></div></div>;
  }

  const selectCandidate = (candidateId: string) => {
    setVote(currentUser.id, activeQuestion.id, candidateId);
    setVotes((previous) => ({ ...previous, [activeQuestion.id]: candidateId }));
  };

  return <div className="page-wrap vote-page">
    <section className="vote-header"><div><div className="eyebrow"><span className="eyebrow-line" /> Ballot room · {currentUser.shortName}</div><h1>Maak jou <em>keuses.</em></h1><p>Een naam per vraag. Jou eie naam is out — die res is fair game.</p></div><div className="vote-progress"><span className="progress-number">{String(answered).padStart(2, "0")}</span><span className="progress-slash">/</span><span>{String(questions.length).padStart(2, "0")} klaar</span><div className="mini-progress"><i style={{ width: `${(answered / questions.length) * 100}%` }} /></div></div></section>
    <div className="ballot-layout">
      <aside className="question-rail"><div className="rail-title">Tonight’s ballot <span>{questions.length} vrae</span></div>{questions.map((question, index) => <button className={`question-nav ${index === activeIndex ? "active" : ""} ${votes[question.id] ? "answered" : ""}`} key={question.id} onClick={() => setActiveIndex(index)}><span className="question-nav-number">{String(index + 1).padStart(2, "0")}</span><span><small>{question.mainCategory}</small><strong>{question.subcategory}</strong></span>{votes[question.id] ? <CircleCheck size={16} /> : <ChevronRight size={16} />}</button>)}<div className="rail-note"><Sparkles size={15} /><span>Jou stem word outomaties gestoor.</span></div></aside>
      <section className="question-card-wrap">
        <div className="question-card"><div className="question-card-top"><span className="question-kicker">{activeQuestion.kicker}</span><span className="question-count">Vraag {activeIndex + 1} van {questions.length}</span></div><h2>{activeQuestion.prompt}</h2><p className="question-helper"><LockKeyhole size={14} /> Jy kan nie vir <strong>{currentUser.shortName}</strong> stem nie — die naam is uitgelaat.</p><div className="candidate-grid">{visibleCandidates.map((candidate) => <button key={candidate.id} className={`candidate-card ${selectedCandidate === candidate.id ? "selected" : ""}`} onClick={() => selectCandidate(candidate.id)}><div className="candidate-photo"><img src={candidate.photo} alt="" />{selectedCandidate === candidate.id && <span className="selected-badge"><Check size={13} /></span>}</div><span className="candidate-name">{candidate.name}</span><span className="candidate-role">{candidate.role}</span></button>)}</div><div className="question-footer"><span>{selectedCandidate ? <><Check size={15} /> Keuse gestoor</> : <><RotateCcw size={15} /> Kies een kandidaat</>}</span><div className="question-actions"><button className="button button-ghost" disabled={activeIndex === 0} onClick={() => setActiveIndex((index) => Math.max(0, index - 1))}><ArrowLeft size={16} /> Vorige</button>{activeIndex < questions.length - 1 ? <button className="button button-primary" onClick={() => setActiveIndex((index) => Math.min(questions.length - 1, index + 1))}>Volgende <ArrowRight size={16} /></button> : <button className="button button-primary" onClick={() => navigate("/results")} disabled={!allAnswered}>Sluit koevert <ChevronRight size={16} /></button>}</div></div></div>
        <div className="ballot-footnote"><span className="footnote-line" /><span>Hierdie is ’n viering, nie ’n hofsaak nie.</span><span className="footnote-line" /></div>
      </section>
    </div>
  </div>;
}
