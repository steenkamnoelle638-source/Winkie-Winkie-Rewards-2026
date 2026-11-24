export type Participant = {
  id: string;
  name: string;
  shortName: string;
  role: string;
  photo: string;
  accent: string;
};

export type AwardQuestion = {
  id: string;
  mainCategoryId: string;
  mainCategory: string;
  subcategory: string;
  prompt: string;
  kicker: string;
  weight: number;
};

export type QuestionCounts = Record<string, number>;
export type VoteMap = Record<string, string>;

export const participants: Participant[] = [
  {
    id: "lian",
    name: "Lian Jacobs",
    shortName: "Lian",
    role: "Host",
    photo: "/manus-storage/async-images/fHeXMoknvP5m6EhQBVKY2T/image-1.webp",
    accent: "gold",
  },
  {
    id: "mieke",
    name: "Mieke Smit",
    shortName: "Mieke",
    role: "Co-host",
    photo: "/manus-storage/async-images/fHeXMoknvP5m6EhQBVKY2T/image-2.webp",
    accent: "coral",
  },
  {
    id: "jaco",
    name: "Jaco Nel",
    shortName: "Jaco",
    role: "Nominee",
    photo: "/manus-storage/async-images/fHeXMoknvP5m6EhQBVKY2T/image-3.webp",
    accent: "sage",
  },
  {
    id: "mia",
    name: "Mia Botha",
    shortName: "Mia",
    role: "Nominee",
    photo: "/manus-storage/async-images/fHeXMoknvP5m6EhQBVKY2T/image-4.webp",
    accent: "cream",
  },
  {
    id: "talia",
    name: "Talia Roos",
    shortName: "Talia",
    role: "Nominee",
    photo: "/manus-storage/async-images/fHeXMoknvP5m6EhQBVKY2T/image-5.webp",
    accent: "blue",
  },
];

export const hosts = participants.slice(0, 2);

export const questions: AwardQuestion[] = [
  {
    id: "q1",
    mainCategoryId: "energy",
    mainCategory: "Die Vibes",
    subcategory: "Beste entrance",
    prompt: "Wie bring die meeste main-character energy wanneer hulle instap?",
    kicker: "Opening scene",
    weight: 1,
  },
  {
    id: "q2",
    mainCategoryId: "energy",
    mainCategory: "Die Vibes",
    subcategory: "Beste dansvloer",
    prompt: "Wie sal eerste op die dansvloer wees — en laaste daar weggaan?",
    kicker: "Dance floor cut",
    weight: 1,
  },
  {
    id: "q3",
    mainCategoryId: "heart",
    mainCategory: "Die Vriendskap",
    subcategory: "Beste hype-person",
    prompt: "Wie is almal se persoonlike hype squad wanneer dinge rof raak?",
    kicker: "Warm & fuzzy",
    weight: 1.15,
  },
  {
    id: "q4",
    mainCategoryId: "heart",
    mainCategory: "Die Vriendskap",
    subcategory: "Most likely to host",
    prompt: "Wie sal ’n gewone kuier in ’n volle produksie verander?",
    kicker: "Production notes",
    weight: 1,
  },
  {
    id: "q5",
    mainCategoryId: "chaos",
    mainCategory: "Die Chaos",
    subcategory: "Beste one-liner",
    prompt: "Wie lewer altyd die quote wat die groep vir maande herhaal?",
    kicker: "Comic relief",
    weight: 1.1,
  },
  {
    id: "q6",
    mainCategoryId: "chaos",
    mainCategory: "Die Chaos",
    subcategory: "Mees onverwags",
    prompt: "Wie verras jou elke keer met ’n nuwe plot twist?",
    kicker: "Plot twist",
    weight: 1,
  },
];

const all = Object.fromEntries(participants.map((person) => [person.id, 0]));

export const demoCounts: Record<string, QuestionCounts> = {
  q1: { ...all, lian: 8, mieke: 5, jaco: 11, mia: 7, talia: 9 },
  q2: { ...all, lian: 7, mieke: 10, jaco: 6, mia: 9, talia: 8 },
  q3: { ...all, lian: 12, mieke: 8, jaco: 7, mia: 11, talia: 6 },
  q4: { ...all, lian: 9, mieke: 11, jaco: 5, mia: 8, talia: 7 },
  q5: { ...all, lian: 6, mieke: 13, jaco: 10, mia: 7, talia: 9 },
  q6: { ...all, lian: 8, mieke: 7, jaco: 9, mia: 6, talia: 12 },
};

export function getParticipant(id: string) {
  return participants.find((participant) => participant.id === id);
}

export function getQuestionCounts(questionId: string, votes: VoteMap = {}) {
  const base = { ...(demoCounts[questionId] ?? {}) };
  const questionVote = votes[questionId];
  if (questionVote && base[questionVote] !== undefined) {
    base[questionVote] += 1;
  }
  return base;
}

export function rankQuestion(question: AwardQuestion, votes: VoteMap = {}) {
  const counts = getQuestionCounts(question.id, votes);
  return participants
    .map((participant) => ({ participant, votes: counts[participant.id] ?? 0 }))
    .sort((a, b) => b.votes - a.votes || a.participant.name.localeCompare(b.participant.name));
}

export function getCategoryResults(votes: VoteMap = {}) {
  const categoryIds = [...new Set(questions.map((question) => question.mainCategoryId))];
  return categoryIds.map((categoryId) => {
    const categoryQuestions = questions.filter((question) => question.mainCategoryId === categoryId);
    const totals = participants.map((participant) => {
      const rawScore = categoryQuestions.reduce((sum, question) => {
        const count = getQuestionCounts(question.id, votes)[participant.id] ?? 0;
        return sum + count * question.weight;
      }, 0);
      const score = Math.round(rawScore * 10) / 10;
      return { participant, score };
    }).sort((a, b) => b.score - a.score || a.participant.name.localeCompare(b.participant.name));
    return {
      id: categoryId,
      name: categoryQuestions[0].mainCategory,
      questions: categoryQuestions,
      podium: totals.slice(0, 3),
      totalVotes: totals.reduce((sum, item) => sum + item.score, 0),
    };
  });
}

export function getOverallResults(votes: VoteMap = {}) {
  const totals = participants.map((participant) => {
    const rawScore = questions.reduce((sum, question) => {
      const count = getQuestionCounts(question.id, votes)[participant.id] ?? 0;
      return sum + count * question.weight;
    }, 0);
    const score = Math.round(rawScore * 10) / 10;
    return { participant, score };
  }).sort((a, b) => b.score - a.score || a.participant.name.localeCompare(b.participant.name));
  return totals;
}

export function getPercent(value: number, total: number) {
  return total ? Math.round((value / total) * 100) : 0;
}
