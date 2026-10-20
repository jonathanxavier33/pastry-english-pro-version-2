/* Pastry English Pro - noyau : stockage, répétition espacée, XP, voix, utilitaires */
(function () {
  "use strict";

  const STORE_KEY = "pastryEnglishPro.v2";
  const OLD_KEY_API = "gemini_api_key"; // ancienne clé d'origine, migrée automatiquement
  const DEFAULT_MODEL = "gemini-2.5-flash";

  // ---------- utilitaires ----------
  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const stripAccents = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");

  // Normalisation pour comparer des réponses tapées
  const norm = (s) =>
    stripAccents(String(s).toLowerCase())
      .replace(/[’‘`]/g, "'")
      .replace(/\([^)]*\)/g, " ")
      .replace(/[^a-z0-9' -]/g, " ")
      .replace(/-/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  const stripTo = (s) => s.replace(/^to /, "");

  function levenshtein(a, b) {
    if (a === b) return 0;
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, j) => j);
    for (let i = 1; i <= m; i++) {
      const cur = [i];
      for (let j = 1; j <= n; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      }
      prev = cur;
    }
    return prev[n];
  }

  // Compare une saisie à toutes les réponses acceptées : "exact" | "close" | "wrong"
  function checkTyped(input, item) {
    const typed = norm(input);
    if (!typed) return "wrong";
    const accepted = [item.en, ...(item.alt || [])].map(norm);
    const variants = new Set();
    accepted.forEach((a) => { variants.add(a); variants.add(stripTo(a)); });
    const typedVariants = [typed, stripTo(typed)];
    if (typedVariants.some((t) => variants.has(t))) return "exact";
    // tolérance d'une faute d'orthographe pour les mots assez longs
    for (const v of variants) {
      for (const t of typedVariants) {
        if (v.length >= 6 && levenshtein(t, v) <= 1) return "close";
      }
    }
    return "wrong";
  }

  // ---------- stockage ----------
  const defaults = () => ({
    xp: 0,
    words: {}, // clé -> { box:0-4, seen, ok, last }
    streak: { last: "", count: 0 },
    settings: { accent: "en-GB", apiKey: "", model: DEFAULT_MODEL },
    exam: { best: 0, history: [], draft: "" },
  });

  // l'objet d'état garde la même identité : on le modifie en place
  const state = defaults();
  function replaceState(next) {
    Object.keys(state).forEach((k) => delete state[k]);
    Object.assign(state, next);
  }

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const d = defaults();
        replaceState({
          ...d, ...parsed,
          streak: { ...d.streak, ...(parsed.streak || {}) },
          settings: { ...d.settings, ...(parsed.settings || {}) },
          exam: { ...d.exam, ...(parsed.exam || {}) },
          words: parsed.words || {},
        });
      }
      const legacy = localStorage.getItem(OLD_KEY_API);
      if (legacy && !state.settings.apiKey) {
        state.settings.apiKey = legacy;
        localStorage.removeItem(OLD_KEY_API);
        save();
      }
    } catch (e) { replaceState(defaults()); }
  }

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      // L'application reste utilisable en session si le stockage est bloqué ou saturé.
      return false;
    }
  }

  function resetAll() {
    const keepSettings = state.settings;
    replaceState(defaults());
    state.settings = keepSettings;
    save();
  }

  // ---------- série quotidienne ----------
  const dayStr = (d = new Date()) =>
    d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");

  function touchStreak() {
    const today = dayStr();
    if (state.streak.last === today) return;
    const y = new Date(); y.setDate(y.getDate() - 1);
    state.streak.count = state.streak.last === dayStr(y) ? state.streak.count + 1 : 1;
    state.streak.last = today;
    save();
  }

  function currentStreak() {
    const today = dayStr();
    const y = new Date(); y.setDate(y.getDate() - 1);
    return state.streak.last === today || state.streak.last === dayStr(y) ? state.streak.count : 0;
  }

  // ---------- niveaux & XP ----------
  function levelInfo(xp = state.xp) {
    let idx = 0;
    LEVELS.forEach((l, i) => { if (xp >= l.xp) idx = i; });
    const cur = LEVELS[idx], next = LEVELS[idx + 1];
    const pct = next ? Math.round(((xp - cur.xp) / (next.xp - cur.xp)) * 100) : 100;
    return { index: idx, name: cur.name, pct, next };
  }

  // renvoie true si un nouveau niveau est atteint
  function addXP(amount) {
    const before = levelInfo().index;
    state.xp += amount;
    touchStreak();
    save();
    return levelInfo().index > before;
  }

  // ---------- répétition espacée (boîtes de Leitner simplifiées) ----------
  const keyOf = (cat, item) => cat + "|" + item.fr;
  const WEIGHTS = [8, 4, 2, 1, 0.4]; // plus la boîte est haute, moins le mot revient
  const UNSEEN_WEIGHT = 6;

  function record(cat, item, ok) {
    const k = keyOf(cat, item);
    const w = state.words[k] || { box: 0, seen: 0, ok: 0, last: 0 };
    w.seen += 1;
    if (ok) { w.ok += 1; w.box = Math.min(4, w.box + 1); } else { w.box = 0; }
    w.last = Date.now();
    state.words[k] = w;
    save();
  }

  const recent = []; // derniers mots vus pour éviter les répétitions immédiates

  function pickNext(cat) {
    const items = DATABASE[cat].items;
    const avoid = new Set(recent.slice(-Math.min(3, items.length - 1)));
    const pool = items.map((it, i) => {
      const w = state.words[keyOf(cat, it)];
      const weight = avoid.has(cat + i) ? 0 : w ? WEIGHTS[w.box] : UNSEEN_WEIGHT;
      return { i, weight };
    });
    const total = pool.reduce((s, p) => s + p.weight, 0);
    if (!total) return pool[Math.floor(Math.random() * pool.length)].i;
    let r = Math.random() * total;
    let chosen = pool.find((p) => p.weight > 0) || pool[0];
    for (const p of pool) { r -= p.weight; if (r <= 0 && p.weight > 0) { chosen = p; break; } }
    recent.push(cat + chosen.i);
    if (recent.length > 6) recent.shift();
    return chosen.i;
  }

  const masteredCount = (cat) =>
    DATABASE[cat].items.filter((it) => (state.words[keyOf(cat, it)] || {}).box >= 3).length;

  const totalMastered = () => Object.keys(DATABASE).reduce((s, c) => s + masteredCount(c), 0);
  const totalWords = () => Object.keys(DATABASE).reduce((s, c) => s + DATABASE[c].items.length, 0);

  // ---------- distracteurs de QCM ----------
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // retourne 4 propositions distinctes, dont la bonne, à partir de la même catégorie
  function buildOptions(cat, item, field) {
    const others = shuffle(DATABASE[cat].items.filter((i) => i[field] !== item[field]));
    const seen = new Set([item[field]]);
    const wrong = [];
    for (const o of others) {
      if (!seen.has(o[field])) { seen.add(o[field]); wrong.push(o[field]); }
      if (wrong.length === 3) break;
    }
    return shuffle([item[field], ...wrong]);
  }

  // ---------- synthèse vocale ----------
  let voices = [];
  function refreshVoices() { if ("speechSynthesis" in window) voices = window.speechSynthesis.getVoices(); }
  if ("speechSynthesis" in window) {
    refreshVoices();
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) { toast("La synthèse vocale n'est pas disponible sur ce navigateur."); return; }
    refreshVoices();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const lang = state.settings.accent || "en-GB";
    u.lang = lang;
    const v = voices.find((x) => x.lang === lang) || voices.find((x) => x.lang && x.lang.startsWith("en"));
    if (v) u.voice = v;
    u.rate = 0.9;
    window.speechSynthesis.speak(u);
  }

  // ---------- notification ----------
  let toastTimer;
  function toast(msg) {
    const el = document.getElementById("toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  window.PEP = {
    DEFAULT_MODEL,
    esc, norm, checkTyped,
    get state() { return state; },
    load, save, resetAll,
    currentStreak, levelInfo, addXP,
    record, pickNext, masteredCount, totalMastered, totalWords,
    shuffle, buildOptions, speak, toast,
  };
})();
