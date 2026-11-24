import { ArrowUpRight, BarChart3, ChevronRight, Crown, Filter, Medal, TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";
import { getPercent, getOverallResults, getQuestionCounts, participants, questions, rankQuestion } from "@/data/awards";
import { getVotes } from "@/lib/storage";

export default function Ranking() {
  const [, navigate] = useLocation();
  const [categoryFilter, setCategoryFilter] = useState("all");
  const votes = getVotes(null);
  const categories = ["all", ...new Set(questions.map((question) => question.mainCategory))];
  const filteredQuestions = questions.filter((question) => categoryFilter === "all" || question.mainCategory === categoryFilter);
  const overall = useMemo(() => getOverallResults(votes), []);

  return <div className="page-wrap ranking-page">
    <section className="results-header ranking-header"><div><div className="eyebrow"><span className="eyebrow-line" /> The receipts</div><h1>Wie staan <em>waar?</em></h1><p>Die volle stembeeld — per vraag, per naam, geen geheime wiskunde nie.</p></div><button className="button button-primary" onClick={() => navigate("/results")}><Crown size={16} /> Gaan na resultate <ChevronRight size={16} /></button></section>
    <section className="ranking-topline"><div className="ranking-stat"><span className="stat-icon"><BarChart3 size={18} /></span><div><strong>{questions.length}</strong><span>vrae</span></div></div><div className="ranking-stat"><span className="stat-icon"><Medal size={18} /></span><div><strong>{participants.length}</strong><span>kandidate</span></div></div><div className="ranking-stat"><span className="stat-icon"><TrendingUp size={18} /></span><div><strong>100%</strong><span>deursigtig</span></div></div><div className="filter-box"><Filter size={15} /><select aria-label="Filter volgens hoofkategorie" value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>{categories.map((category) => <option key={category} value={category}>{category === "all" ? "Alle kategorieë" : category}</option>)}</select></div></section>
    <section className="ranking-list">{filteredQuestions.map((question, questionIndex) => { const ranking = rankQuestion(question, votes); const total = ranking.reduce((sum, item) => sum + item.votes, 0); return <article className="ranking-card" key={question.id}><div className="ranking-card-head"><div className="ranking-card-title"><span className="question-nav-number">{String(questionIndex + 1).padStart(2, "0")}</span><div><span>{question.mainCategory} · {question.kicker}</span><h2>{question.subcategory}</h2><p>{question.prompt}</p></div></div><span className="total-votes">{total} stemme</span></div><div className="ranking-rows">{ranking.map((item, index) => { const percentage = getPercent(item.votes, total); return <div className={`ranking-row ${index === 0 ? "leader" : ""}`} key={item.participant.id}><span className="rank-number">{String(index + 1).padStart(2, "0")}</span><img src={item.participant.photo} alt="" /><strong>{item.participant.name}</strong><div className="rank-bar"><i style={{ width: `${percentage}%` }} /></div><span className="rank-percent">{percentage}%</span><span className="rank-votes">{item.votes}</span>{index === 0 && <ArrowUpRight size={16} className="leader-arrow" />}</div>;})}</div></article>;})}</section>
    <section className="total-ranking section-block"><div className="section-intro compact"><div><div className="eyebrow"><span className="eyebrow-line" /> Scoreboard</div><h2>Totale <em>ranglys</em></h2></div><p>Gewig volgens die hele ballot.</p></div><div className="total-table">{overall.map((item, index) => <div className={`total-row ${index === 0 ? "total-leader" : ""}`} key={item.participant.id}><span className="total-place">{index + 1}</span><img src={item.participant.photo} alt="" /><div><strong>{item.participant.name}</strong><span>{index === 0 ? "Voorlopige overall winner" : "In die wedloop"}</span></div><b>{item.score}</b><small>punte</small></div>)}</div></section>
  </div>;
}
