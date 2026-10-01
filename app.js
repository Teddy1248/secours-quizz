(() => {
  const themes = [{"id":"proteger-alerter","name":"Protéger & alerter","icon":"🛡️","description":"Sécuriser la zone, évaluer la victime et transmettre une alerte efficace."},{"id":"hemorragies","name":"Hémorragies","icon":"🩸","description":"Reconnaître un saignement grave et agir sans perdre de temps."},{"id":"etouffement","name":"Étouffement","icon":"🫁","description":"Distinguer obstruction partielle et totale et appliquer les bons gestes."},{"id":"arret-cardiaque","name":"Arrêt cardiaque & RCP","icon":"❤️","description":"Reconnaître l'arrêt cardiaque et pratiquer une réanimation cardio-pulmonaire."},{"id":"dae","name":"Défibrillateur (DAE)","icon":"⚡","description":"Utiliser un défibrillateur automatisé externe rapidement et en sécurité."},{"id":"inconscience-pls","name":"Inconscience & PLS","icon":"🛌","description":"Vérifier la respiration et protéger les voies aériennes d'une personne inconsciente."},{"id":"malaises-avc","name":"Malaises, AVC & douleur thoracique","icon":"🧠","description":"Identifier les signes d'alerte et demander rapidement un avis médical."},{"id":"plaies","name":"Plaies","icon":"🩹","description":"Évaluer une plaie, reconnaître la gravité et éviter les gestes aggravants."},{"id":"brulures","name":"Brûlures","icon":"🔥","description":"Refroidir rapidement, reconnaître une brûlure grave et éviter les remèdes dangereux."},{"id":"traumatismes","name":"Traumatismes","icon":"🦴","description":"Réagir face aux chocs, fractures, douleurs du dos, de la nuque ou des membres."},{"id":"intoxications-empoisonnements","name":"Intoxications & empoisonnements","icon":"☠️","description":"Réagir face à l’ingestion, l’inhalation ou la projection d’un produit toxique sans aggraver la situation."},{"id":"monoxyde-fumees","name":"Monoxyde de carbone & fumées","icon":"🌫️","description":"Reconnaître une intoxication au CO ou aux fumées et évacuer sans s’exposer."},{"id":"noyade-milieu-aquatique","name":"Noyade & milieu aquatique","icon":"🌊","description":"Prévenir les noyades et réagir face à une victime sortie de l’eau sans se mettre en danger."},{"id":"chaleur-froid-hypothermie","name":"Chaleur, froid & hypothermie","icon":"🌡️","description":"Identifier coup de chaleur, déshydratation, hypothermie et gelures et adopter les bons gestes."},{"id":"accidents-electriques","name":"Accidents électriques","icon":"⚡","description":"Couper le danger électrique, reconnaître les complications et secourir sans devenir une seconde victime."},{"id":"convulsions-epilepsie","name":"Convulsions & épilepsie","icon":"🧠","description":"Protéger une personne pendant une crise convulsive, surveiller son réveil et reconnaître les signes d’urgence."},{"id":"allergies-anaphylaxie","name":"Allergies sévères & anaphylaxie","icon":"🫁","description":"Reconnaître une réaction allergique grave et utiliser rapidement le traitement d’urgence prescrit."},{"id":"enfant-nourrisson","name":"Enfant & nourrisson","icon":"👶","description":"Adapter l’ouverture des voies aériennes, la RCP, la défibrillation et la désobstruction au petit gabarit."},{"id":"accidents-route","name":"Accidents de la route","icon":"🚗","description":"Éviter le suraccident, alerter efficacement et secourir une victime sans aggraver un traumatisme."},{"id":"piqures-morsures-animaux","name":"Piqûres, morsures & animaux","icon":"🐝","description":"Réagir aux piqûres d’insectes, morsures d’animaux et morsures de serpent sans gestes dangereux."}];
  const STORAGE_KEY = 'secoursquiz-progress-v1';
  const letters = ['A', 'B', 'C', 'D'];
  const bank = window.QB = window.QB || {};
  const pendingLoads = new Map();

  const els = {
    themeGrid: document.getElementById('themeGrid'),
    overlay: document.getElementById('quizOverlay'),
    quizShell: document.querySelector('.quiz-shell'),
    closeQuizBtn: document.getElementById('closeQuizBtn'),
    quizIcon: document.getElementById('quizIcon'),
    quizTitle: document.getElementById('quizTitle'),
    quizSubtitle: document.getElementById('quizSubtitle'),
    liveScore: document.getElementById('liveScore'),
    questionCounter: document.getElementById('questionCounter'),
    questionLevel: document.getElementById('questionLevel'),
    quizProgressBar: document.getElementById('quizProgressBar'),
    questionText: document.getElementById('questionText'),
    answers: document.getElementById('answers'),
    feedback: document.getElementById('feedback'),
    nextQuestionBtn: document.getElementById('nextQuestionBtn'),
    quizContent: document.getElementById('quizContent'),
    resultView: document.getElementById('resultView'),
    resultIcon: document.getElementById('resultIcon'),
    resultTitle: document.getElementById('resultTitle'),
    resultMessage: document.getElementById('resultMessage'),
    finalScore: document.getElementById('finalScore'),
    finalPercent: document.getElementById('finalPercent'),
    retryBtn: document.getElementById('retryBtn'),
    backThemesBtn: document.getElementById('backThemesBtn'),
    navQuickBtn: document.getElementById('navQuickBtn'),
    heroQuickBtn: document.getElementById('heroQuickBtn'),
    resetProgressBtn: document.getElementById('resetProgressBtn'),
    completedCount: document.getElementById('completedCount'),
    bestAverage: document.getElementById('bestAverage'),
    globalProgressLabel: document.getElementById('globalProgressLabel'),
    globalProgressBar: document.getElementById('globalProgressBar'),
    toast: document.getElementById('toast')
  };

  let state = { mode: 'theme', themeId: null, title: '', icon: '❤️', questions: [], index: 0, score: 0, locked: false };

  const loadProgress = () => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  };
  const saveProgress = progress => localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  const shuffle = items => {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  const ensureTheme = id => {
    if (bank[id]) return Promise.resolve(bank[id]);
    if (pendingLoads.has(id)) return pendingLoads.get(id);
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `data/${id}.js`;
      script.async = true;
      script.onload = () => bank[id] ? resolve(bank[id]) : reject(new Error(`Données absentes : ${id}`));
      script.onerror = () => reject(new Error(`Chargement impossible : ${id}`));
      document.head.appendChild(script);
    }).finally(() => pendingLoads.delete(id));
    pendingLoads.set(id, promise);
    return promise;
  };

  const setBusy = busy => {
    [els.navQuickBtn, els.heroQuickBtn].forEach(btn => {
      btn.disabled = busy;
      btn.setAttribute('aria-busy', String(busy));
    });
  };

  const renderThemes = () => {
    const progress = loadProgress();
    els.themeGrid.innerHTML = themes.map((theme, index) => {
      const best = progress[theme.id]?.bestPercent;
      return `<article class="theme-card" tabindex="0" role="button" data-theme-id="${theme.id}" aria-label="Lancer le thème ${theme.name}">
        <div class="theme-icon" aria-hidden="true">${theme.icon}</div>
        <div class="theme-copy"><h3>${String(index + 1).padStart(2, '0')}. ${theme.name}</h3><p>${theme.description}</p>
        <div class="theme-meta"><span class="question-pill">20 questions</span><span class="best-pill">${best != null ? `Meilleur score : ${best}%` : 'Pas encore tenté'}</span></div></div>
        <span class="theme-arrow" aria-hidden="true">→</span></article>`;
    }).join('');
    updateDashboard();
  };

  const updateDashboard = () => {
    const progress = loadProgress();
    const completed = themes.filter(t => progress[t.id]?.attempts > 0).length;
    const scores = themes.map(t => progress[t.id]?.bestPercent).filter(Number.isFinite);
    const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;
    const global = Math.round((completed / themes.length) * 100);
    els.completedCount.textContent = completed;
    els.bestAverage.textContent = average == null ? '—' : `${average}%`;
    els.globalProgressLabel.textContent = `${global}%`;
    els.globalProgressBar.style.width = `${global}%`;
  };

  const openOverlay = () => {
    els.overlay.classList.add('open');
    els.overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    setTimeout(() => els.closeQuizBtn.focus(), 80);
  };
  const closeOverlay = () => {
    els.overlay.classList.remove('open');
    els.overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const setupQuizHeader = () => {
    els.quizIcon.textContent = state.icon;
    els.quizTitle.textContent = state.title;
    els.quizSubtitle.textContent = state.mode === 'quick' ? '20 questions aléatoires' : '20 questions · correction immédiate';
    els.liveScore.textContent = '0';
    els.quizContent.hidden = false;
    els.resultView.hidden = true;
  };

  const startTheme = async themeId => {
    const theme = themes.find(item => item.id === themeId);
    if (!theme) return;
    try {
      const questions = await ensureTheme(theme.id);
      state = { mode: 'theme', themeId: theme.id, title: theme.name, icon: theme.icon, questions: shuffle(questions), index: 0, score: 0, locked: false };
      setupQuizHeader(); renderQuestion(); openOverlay();
    } catch { showToast('Impossible de charger ce quiz'); }
  };

  const startQuickQuiz = async () => {
    setBusy(true);
    try {
      await Promise.all(themes.map(t => ensureTheme(t.id)));
      const pool = themes.flatMap(theme => bank[theme.id].map(q => [q, theme.name]));
      state = { mode: 'quick', themeId: null, title: 'Quiz express', icon: '⚡', questions: shuffle(pool).slice(0, 20), index: 0, score: 0, locked: false };
      setupQuizHeader(); renderQuestion(); openOverlay();
    } catch { showToast('Impossible de charger le quiz express'); }
    finally { setBusy(false); }
  };

  const currentQuestion = () => state.mode === 'quick' ? state.questions[state.index][0] : state.questions[state.index];
  const renderQuestion = () => {
    const q = currentQuestion();
    state.locked = false;
    els.questionCounter.textContent = `Question ${state.index + 1}/${state.questions.length}`;
    els.questionLevel.textContent = state.mode === 'quick' ? state.questions[state.index][1] : 'Débutant';
    els.quizProgressBar.style.width = `${((state.index + 1) / state.questions.length) * 100}%`;
    els.questionText.textContent = q[0];
    els.liveScore.textContent = state.score;
    els.feedback.className = 'feedback';
    els.feedback.textContent = '';
    els.nextQuestionBtn.disabled = true;
    els.nextQuestionBtn.innerHTML = state.index === state.questions.length - 1 ? 'Voir mon résultat <span aria-hidden="true">→</span>' : 'Question suivante <span aria-hidden="true">→</span>';
    els.answers.innerHTML = q[1].map((choice, index) => `<button class="answer-btn" type="button" data-choice="${index}"><span class="answer-letter">${letters[index]}</span><span>${choice}</span><span class="answer-marker" aria-hidden="true"></span></button>`).join('');
    els.quizShell.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectAnswer = selectedIndex => {
    if (state.locked) return;
    state.locked = true;
    const q = currentQuestion();
    const isCorrect = selectedIndex === q[2];
    if (isCorrect) state.score++;
    els.liveScore.textContent = state.score;
    els.answers.querySelectorAll('.answer-btn').forEach((button, index) => {
      button.disabled = true;
      const marker = button.querySelector('.answer-marker');
      if (index === q[2]) { button.classList.add('correct'); marker.textContent = '✓'; }
      else if (index === selectedIndex) { button.classList.add('wrong'); marker.textContent = '×'; }
    });
    els.feedback.className = `feedback show ${isCorrect ? 'correct' : 'wrong'}`;
    const strong = document.createElement('strong');
    strong.textContent = isCorrect ? 'Bonne réponse !' : 'Pas tout à fait.';
    const span = document.createElement('span');
    span.textContent = q[3];
    els.feedback.replaceChildren(strong, span);
    els.nextQuestionBtn.disabled = false;
  };

  const nextQuestion = () => {
    if (!state.locked) return;
    if (state.index < state.questions.length - 1) { state.index++; renderQuestion(); }
    else showResults();
  };

  const showResults = () => {
    const total = state.questions.length;
    const percent = Math.round((state.score / total) * 100);
    els.quizContent.hidden = true;
    els.resultView.hidden = false;
    els.finalScore.textContent = `${state.score}/${total}`;
    els.finalPercent.textContent = `${percent}%`;
    let title = 'À retravailler', message = 'Reprenez le thème tranquillement : les explications sont là pour vous aider à transformer les erreurs en bons réflexes.', icon = '📚';
    if (percent >= 90) [title, message, icon] = ['Excellent réflexe !', 'Très bon résultat. Continuez à entretenir vos connaissances et pensez à les compléter par une formation pratique.', '🏆'];
    else if (percent >= 75) [title, message, icon] = ['Très bon score !', 'Vous maîtrisez déjà une grande partie du thème. Une nouvelle tentative vous aidera à consolider les derniers points.', '👏'];
    else if (percent >= 55) [title, message, icon] = ['Bonne base', 'Les fondamentaux sont là. Relisez les corrections des questions manquées puis recommencez pour progresser.', '💪'];
    els.resultTitle.textContent = title; els.resultMessage.textContent = message; els.resultIcon.textContent = icon;
    if (state.mode === 'theme' && state.themeId) {
      const progress = loadProgress();
      const previous = progress[state.themeId] || { attempts: 0, bestPercent: 0 };
      progress[state.themeId] = { attempts: previous.attempts + 1, bestPercent: Math.max(previous.bestPercent || 0, percent), lastPercent: percent, updatedAt: new Date().toISOString() };
      saveProgress(progress); renderThemes();
    }
  };

  const retry = () => {
    state.questions = shuffle(state.questions); state.index = 0; state.score = 0; state.locked = false;
    setupQuizHeader(); renderQuestion();
  };

  const showToast = message => {
    els.toast.textContent = message; els.toast.classList.add('show');
    clearTimeout(showToast.timer); showToast.timer = setTimeout(() => els.toast.classList.remove('show'), 2200);
  };

  els.themeGrid.addEventListener('click', e => {
    const card = e.target.closest('.theme-card'); if (card) startTheme(card.dataset.themeId);
  });
  els.themeGrid.addEventListener('keydown', e => {
    const card = e.target.closest('.theme-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); startTheme(card.dataset.themeId); }
  });
  els.answers.addEventListener('click', e => {
    const button = e.target.closest('.answer-btn'); if (button) selectAnswer(Number(button.dataset.choice));
  });
  els.closeQuizBtn.addEventListener('click', closeOverlay);
  els.overlay.addEventListener('click', e => { if (e.target === els.overlay) closeOverlay(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && els.overlay.classList.contains('open')) closeOverlay(); });
  els.nextQuestionBtn.addEventListener('click', nextQuestion);
  els.retryBtn.addEventListener('click', retry);
  els.backThemesBtn.addEventListener('click', () => { closeOverlay(); document.getElementById('themes').scrollIntoView({ behavior: 'smooth' }); });
  els.navQuickBtn.addEventListener('click', startQuickQuiz);
  els.heroQuickBtn.addEventListener('click', startQuickQuiz);
  els.resetProgressBtn.addEventListener('click', () => {
    if (confirm('Voulez-vous vraiment effacer tous vos meilleurs scores ?')) { localStorage.removeItem(STORAGE_KEY); renderThemes(); showToast('Progression réinitialisée'); }
  });

  renderThemes();
})();
