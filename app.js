/* Pastry English Pro - écrans et entraînement */
(function () {
  "use strict";

  const esc = PEP.esc;
  const state = PEP.state; // même objet avant et après PEP.load()
  const $ = (id) => document.getElementById(id);

  const MODES = [
    { id: "flash", label: "🃏 Flashcards" },
    { id: "fr-en", label: "🎯 FR → EN" },
    { id: "en-fr", label: "🔁 EN → FR" },
    { id: "listen", label: "👂 Écoute" },
    { id: "type", label: "⌨️ Écriture" },
  ];

  const ui = {
    screen: "home", // home | train | exam
    category: Object.keys(DATABASE)[0],
    mode: "flash",
    index: 0,
    flipped: false,
    quiz: null,
    timer: null,
  };

  const isSentence = (item) => item.en.split(/\s+/).length >= 4;
  const currentItem = () => DATABASE[ui.category].items[ui.index];

  function clearTimer() { clearTimeout(ui.timer); ui.timer = null; }

  // ---------- accueil ----------
  function renderHome() {
    const streak = PEP.currentStreak();
    $("home-stats").innerHTML =
      `<span class="stat-pill">🔥 Série : <strong>${streak}</strong> jour${streak > 1 ? "s" : ""}</span>` +
      `<span class="stat-pill">⭐ <strong>${state.xp}</strong> XP</span>` +
      `<span class="stat-pill">✅ <strong>${PEP.totalMastered()}</strong>/${PEP.totalWords()} mots maîtrisés</span>`;
  }

  function show(screen) {
    ui.screen = screen;
    $("home-screen").style.display = screen === "home" ? "flex" : "none";
    $("game-screen").style.display = screen === "home" ? "none" : "flex";
    window.scrollTo(0, 0);
  }

  function goHome() {
    clearTimer();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    if (window.Exam) Exam.close();
    show("home");
    renderHome();
  }

  // ---------- en-tête ----------
  function updateHeader() {
    const lv = PEP.levelInfo();
    $("lvl-badge").textContent = "Niveau " + (lv.index + 1);
    $("lvl-name").textContent = lv.name;
    $("xp-counter").textContent = state.xp + " XP";
    $("progress-bar").style.width = lv.pct + "%";
    $("progress-track").setAttribute("aria-valuenow", String(lv.pct));

    const line = $("mastery-line");
    if (ui.screen === "train") {
      const n = DATABASE[ui.category].items.length;
      line.innerHTML = `<span>Maîtrisés ici : ${PEP.masteredCount(ui.category)}/${n}</span><span>🔥 ${PEP.currentStreak()} j</span>`;
    } else {
      line.innerHTML = lv.next ? `<span>Prochain niveau : ${lv.next.name} (${lv.next.xp} XP)</span>` : "<span>Niveau maximum atteint 🎉</span>";
    }
  }

  function gain(amount) {
    const levelUp = PEP.addXP(amount);
    updateHeader();
    if (levelUp) PEP.toast("🎉 Niveau " + (PEP.levelInfo().index + 1) + " : " + PEP.levelInfo().name + " !");
  }

  // ---------- menus ----------
  function renderMenus() {
    $("category-menu").innerHTML = Object.keys(DATABASE)
      .map((c) => `<button class="chip ${c === ui.category ? "active" : ""}" data-action="category" data-value="${esc(c)}" aria-pressed="${c === ui.category}">${DATABASE[c].icon} ${esc(c)}</button>`)
      .join("");
    $("mode-menu").innerHTML = MODES
      .map((m) => `<button class="chip ${m.id === ui.mode ? "active" : ""}" data-action="mode" data-value="${m.id}" aria-pressed="${m.id === ui.mode}">${m.label}</button>`)
      .join("");
  }

  function startTrain() {
    clearTimer();
    if (window.Exam) Exam.close();
    show("train");
    $("header-title").textContent = "Entraînement";
    renderMenus();
    nextItem(true);
  }

  function startExam() {
    clearTimer();
    show("exam");
    $("category-menu").innerHTML = "";
    $("mode-menu").innerHTML = "";
    $("header-title").textContent = "Examen & correction IA";
    updateHeader();
    Exam.open();
  }

  // ---------- sélection du prochain mot ----------
  function nextItem() {
    clearTimer();
    ui.index = PEP.pickNext(ui.category);
    ui.flipped = false;
    ui.quiz = null;
    updateHeader();
    renderActivity();
  }

  // ---------- rendu des activités ----------
  function stageBase(extraClass) {
    const stage = $("card-stage");
    stage.className = "card-stage " + (extraClass || "");
    stage.removeAttribute("data-action");
    stage.removeAttribute("tabindex");
    stage.removeAttribute("role");
    stage.removeAttribute("aria-label");
    return stage;
  }

  function tag() { return `<div class="card-category-tag">${esc(ui.category)}</div>`; }
  function audioBtn(extra) { return `<button class="audio-btn ${extra || ""}" data-action="speak" aria-label="Écouter la prononciation" title="Écouter">🔊</button>`; }
  function wordClass(item) { return "card-main-word" + (isSentence(item) ? " is-sentence" : ""); }
  function nextBtn(label) { return `<button class="btn-action" data-action="next">${label} ➔</button>`; }

  function renderActivity() {
    const item = currentItem();
    const controls = $("controls-stage");
    switch (ui.mode) {
      case "flash": return renderFlash(item, controls);
      case "type": return renderType(item, controls);
      default: return renderChoice(item, controls);
    }
  }

  function renderFlash(item, controls) {
    const stage = stageBase("is-flashcard");
    if (!ui.flipped) {
      stage.setAttribute("data-action", "flip");
      stage.setAttribute("tabindex", "0");
      stage.setAttribute("role", "button");
      stage.setAttribute("aria-label", "Retourner la carte pour voir la traduction anglaise");
      stage.innerHTML = `${tag()}
        <div class="${wordClass(item)}">${esc(item.fr)}</div>
        <div class="tap-hint">👆 Touche la carte pour voir la traduction en anglais</div>`;
      controls.innerHTML = `<button class="btn-action" data-action="flip">Retourner la carte</button>`;
    } else {
      stage.innerHTML = `${tag()}${audioBtn()}
        <div class="${wordClass(item)}" lang="en">${esc(item.en)}</div>
        <div class="card-sub-info" lang="en">“${esc(item.ex)}”</div>
        <div class="card-sub-info">💡 <strong>Indice :</strong> <span lang="en">${esc(item.hint)}</span></div>`;
      controls.innerHTML = `<div class="btn-row">
        <button class="btn-secondary" data-action="grade" data-ok="0">🔁 À revoir</button>
        <button class="btn-action" data-action="grade" data-ok="1">✅ Je savais</button></div>`;
    }
  }

  function renderChoice(item, controls) {
    const stage = stageBase();
    const mode = ui.mode;
    const answerField = mode === "fr-en" ? "en" : "fr"; // ce que l'on doit retrouver
    if (!ui.quiz) {
      ui.quiz = { item, field: answerField, options: PEP.buildOptions(ui.category, item, answerField), answered: false };
    }
    const q = ui.quiz;
    const long = q.options.some((o) => o.length > 26);

    let top;
    if (mode === "fr-en") {
      top = `<div class="quiz-prompt">Traduisez en anglais :</div><div class="${wordClass(item)}">${esc(item.fr)}</div>`;
    } else if (mode === "en-fr") {
      top = `${audioBtn()}<div class="quiz-prompt">Traduisez en français :</div><div class="${wordClass(item)}" lang="en">${esc(item.en)}</div>`;
    } else {
      top = `${audioBtn("big")}<div class="quiz-prompt">Écoutez, puis choisissez la traduction française :</div>`;
    }

    stage.innerHTML = `${tag()}${top}
      <div class="quiz-container">
        <div class="quiz-options-grid ${long ? "long" : ""}" id="quiz-grid" role="group" aria-label="Réponses possibles">
          ${q.options.map((o, i) => `<button class="quiz-option-btn" data-action="answer" data-i="${i}" ${answerField === "en" ? 'lang="en"' : ""}>${esc(o)}</button>`).join("")}
        </div>
        <div id="feedback" aria-live="polite"></div>
      </div>`;
    // pas de bouton audio en FR → EN avant la réponse (il donnerait la solution)
    controls.innerHTML = `<button class="btn-action" data-action="next" id="choice-next" disabled>Répondez pour continuer</button>`;
    if (mode === "listen") setTimeout(() => PEP.speak(item.en), 250);
  }

  function renderType(item, controls) {
    const stage = stageBase();
    stage.innerHTML = `${tag()}
      <div class="quiz-prompt">Écrivez en anglais :</div>
      <div class="${wordClass(item)}">${esc(item.fr)}</div>
      <div class="quiz-container">
        <input class="type-input" id="type-input" type="text" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="Votre réponse en anglais" placeholder="Votre réponse…">
        <div id="feedback" aria-live="polite"></div>
      </div>`;
    controls.innerHTML = `<button class="btn-action" id="type-submit" data-action="submit-type">Valider</button>`;
    ui.quiz = { item, answered: false };
    const input = $("type-input");
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); handle("submit-type"); } });
    setTimeout(() => input.focus({ preventScroll: true }), 50);
  }

  // ---------- réponses ----------
  function remediation(item, ok, headline) {
    return `<div class="remediation-box ${ok ? "ok" : ""}">
      <div class="remediation-title">${headline}</div>
      <div><strong>${esc(item.fr)}</strong> = <strong lang="en">${esc(item.en)}</strong><br>
      <em>Exemple pro :</em> <span lang="en">${esc(item.ex)}</span></div></div>`;
  }

  function answerChoice(i) {
    const q = ui.quiz;
    if (!q || q.answered) return;
    q.answered = true;
    const grid = $("quiz-grid");
    const buttons = Array.from(grid.querySelectorAll(".quiz-option-btn"));
    buttons.forEach((b) => (b.disabled = true));
    const correctIdx = q.options.indexOf(q.item[q.field]);
    const ok = i === correctIdx;
    buttons[correctIdx].classList.add("correct");
    if (!ok) buttons[i].classList.add("wrong");
    PEP.record(ui.category, q.item, ok);
    const next = $("choice-next");
    if (next) { next.disabled = false; next.textContent = "Question suivante ➔"; }
    if (ok) {
      gain(10);
      $("feedback").innerHTML = remediation(q.item, true, "✅ Bonne réponse ! À retenir");
    } else {
      $("feedback").innerHTML = remediation(q.item, false, "🧠 On apprend de ses erreurs");
      updateHeader();
    }
  }

  function submitType() {
    const q = ui.quiz;
    if (!q || q.answered) return;
    const input = $("type-input");
    if (!input.value.trim()) { input.focus(); return; }
    const verdict = PEP.checkTyped(input.value, q.item);
    q.answered = true;
    input.disabled = true;
    const btn = $("type-submit");
    btn.textContent = "Mot suivant ➔";
    btn.setAttribute("data-action", "next");

    if (verdict === "exact") {
      input.classList.add("correct");
      PEP.record(ui.category, q.item, true);
      gain(15);
      $("feedback").innerHTML = remediation(q.item, true, "✅ Parfait !");
    } else if (verdict === "close") {
      input.classList.add("wrong");
      PEP.record(ui.category, q.item, false);
      gain(3);
      $("feedback").innerHTML = remediation(q.item, false, "🤏 Presque ! Vérifiez l'orthographe");
    } else {
      input.classList.add("wrong");
      PEP.record(ui.category, q.item, false);
      updateHeader();
      $("feedback").innerHTML = remediation(q.item, false, "🧠 Point pédagogique");
    }
    btn.focus({ preventScroll: true });
  }

  function gradeFlash(ok) {
    PEP.record(ui.category, currentItem(), ok);
    if (ok) gain(5);
    nextItem();
  }

  // ---------- réglages ----------
  function openSettings() {
    const d = $("settings-dialog");
    $("set-accent").value = state.settings.accent;
    $("set-key").value = state.settings.apiKey || "";
    $("set-model").value = state.settings.model || PEP.DEFAULT_MODEL;
    if (typeof d.showModal === "function") d.showModal();
    else PEP.toast("Les réglages ne sont pas pris en charge par ce navigateur.");
  }

  function saveSettings() {
    state.settings.accent = $("set-accent").value;
    state.settings.apiKey = $("set-key").value.trim();
    state.settings.model = $("set-model").value.trim() || PEP.DEFAULT_MODEL;
    PEP.save();
    $("settings-dialog").close();
    PEP.toast("Réglages enregistrés ✅");
    if (ui.screen === "exam") Exam.open();
  }

  function resetProgress() {
    if (!confirm("Remettre à zéro votre XP, votre série et vos mots appris ? Cette action est définitive.")) return;
    PEP.resetAll();
    $("settings-dialog").close();
    if (ui.screen === "home") renderHome();
    else if (ui.screen === "train") nextItem(true);
    else { updateHeader(); Exam.open(); }
    PEP.toast("Progression remise à zéro");
  }

  // ---------- événements ----------
  function handle(action, el) {
    switch (action) {
      case "start-train": return startTrain();
      case "start-exam": return startExam();
      case "home": return goHome();
      case "open-settings": return openSettings();
      case "close-settings": return $("settings-dialog").close();
      case "save-settings": return saveSettings();
      case "reset-progress": return resetProgress();
      case "test-voice": return PEP.speak("Welcome to the pastry kitchen!");
      case "category":
        ui.category = el.dataset.value; renderMenus(); return nextItem(true);
      case "mode":
        ui.mode = el.dataset.value; renderMenus(); return nextItem(true);
      case "speak":
        return PEP.speak(currentItem().en);
      case "flip": ui.flipped = true; return renderFlash(currentItem(), $("controls-stage"));
      case "grade": return gradeFlash(el.dataset.ok === "1");
      case "next":
        if (ui.quiz && ui.quiz.options && !ui.quiz.answered) { PEP.toast("Choisissez une réponse avant de continuer."); return; }
        return nextItem();
      case "answer": return answerChoice(Number(el.dataset.i));
      case "submit-type": return submitType();
      default:
        if (window.Exam) return Exam.handle(action, el);
    }
  }

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-action]");
    if (el && !el.disabled) handle(el.dataset.action, el);
  });

  document.addEventListener("keydown", (e) => {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
    if ((e.key === "Enter" || e.key === " ") && t && t.getAttribute && t.getAttribute("data-action") === "flip" && t === $("card-stage")) {
      e.preventDefault(); handle("flip"); return;
    }
    if (ui.screen !== "train" || $("settings-dialog").open) return;
    if (/^[1-4]$/.test(e.key) && ui.quiz && ui.quiz.options && Number(e.key) <= ui.quiz.options.length) { answerChoice(Number(e.key) - 1); return; }
    if (e.key === "ArrowRight") nextItem();
  });

  $("settings-form").addEventListener("submit", (e) => { e.preventDefault(); saveSettings(); });

  window.App = { openSettings, gain };

  // ---------- démarrage & PWA ----------
  PEP.load();
  renderHome();
  show("home");

  const params = new URLSearchParams(location.search);
  if (params.get("mode") === "train") startTrain();
  else if (params.get("mode") === "exam") startExam();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        reg.addEventListener("updatefound", () => {
          const w = reg.installing;
          if (!w) return;
          w.addEventListener("statechange", () => {
            if (w.state === "installed" && navigator.serviceWorker.controller) {
              PEP.toast("Mise à jour installée : elle sera active au prochain lancement.");
            }
          });
        });
      }).catch(() => { /* hors HTTPS ou bloqué : l'app fonctionne quand même */ });
    });
  }
})();
