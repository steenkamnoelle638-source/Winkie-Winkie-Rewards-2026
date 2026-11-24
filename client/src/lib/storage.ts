import type { VoteMap } from "@/data/awards";

const CURRENT_USER_KEY = "vriendoscar-current-user";
const RULES_KEY = "vriendoscar-rules-read";
const VOTES_KEY = "vriendoscar-votes";
const ADMIN_KEY = "vriendoscar-admin";

function readJson<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getCurrentUser() {
  try {
    return localStorage.getItem(CURRENT_USER_KEY);
  } catch {
    return null;
  }
}

export function setCurrentUser(userId: string) {
  localStorage.setItem(CURRENT_USER_KEY, userId);
}

export function getReadRules() {
  try {
    return localStorage.getItem(RULES_KEY) === "true";
  } catch {
    return false;
  }
}

export function setReadRules(value: boolean) {
  localStorage.setItem(RULES_KEY, String(value));
}

export function getVotes(userId: string | null) {
  if (!userId) return {};
  const allVotes = readJson<Record<string, VoteMap>>(VOTES_KEY, {});
  return allVotes[userId] ?? {};
}

export function setVote(userId: string, questionId: string, candidateId: string) {
  const allVotes = readJson<Record<string, VoteMap>>(VOTES_KEY, {});
  allVotes[userId] = { ...(allVotes[userId] ?? {}), [questionId]: candidateId };
  localStorage.setItem(VOTES_KEY, JSON.stringify(allVotes));
}

export function isAdminSession() {
  try {
    return sessionStorage.getItem(ADMIN_KEY) === "true";
  } catch {
    return false;
  }
}

export function setAdminSession(value: boolean) {
  try {
    if (value) sessionStorage.setItem(ADMIN_KEY, "true");
    else sessionStorage.removeItem(ADMIN_KEY);
  } catch {
    // A private browser may not expose sessionStorage; the page still works for this session.
  }
}
