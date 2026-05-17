const questions = [
  { q: "Quand vous ouvrez un frigo, quelle émotion domine ?", a: ["La curiosité", "L’instinct", "Le chaos", "Le lactose"] },
  { q: "Choisissez votre texture émotionnelle dominante.", a: ["Velours humide", "Cristal sec", "Pulpe autoritaire", "Mousse nerveuse"] },
  { q: "Quel animal comprend le mieux les arômes ?", a: ["Le flamant rose", "Le sanglier", "La truite", "Gérard Depardieu"] },
  { q: "Face à une carafe d’eau plate, votre premier réflexe est :", a: ["La contempler", "Ajouter des glaçons", "La juger moralement", "Chercher du sirop"] },
  { q: "Dans un duel médiéval, votre boisson idéale serait :", a: ["Noble", "Fruité", "Dense", "Fiscalement agressive"] },
  { q: "Votre rapport psychologique au glaçon est plutôt :", a: ["Fusionnel", "Méfiant", "Croquant", "Administratif"] },
  { q: "Quel élément perturbe le plus votre équilibre aromatique ?", a: ["Une eau tiède", "Un citron solitaire", "Une paille en carton", "Le regard des autres"] },
  { q: "Si votre âme était un parfum Teisseire, elle serait :", a: ["Grenadine cosmique", "Menthe de combat", "Pêche existentielle", "Fruits rouges du chaos"] }
];

const analysisSubtexts = [
  "Calibration du palais…",
  "Mesure du taux de grenadine intérieure…",
  "Comparaison avec les normes Teisseire européennes…",
  "Détection des faiblesses houblonnées…",
  "Analyse du coefficient menthe-citron…",
  "Consultation du comité des sirops…",
  "Synchronisation avec l’aromathèque nationale…",
  "Stabilisation des molécules fruitées…"
];

const screens = {
  home: document.getElementById("screen-home"),
  quiz: document.getElementById("screen-quiz"),
  analysis: document.getElementById("screen-analysis"),
  result: document.getElementById("screen-result")
};

const questionCount = document.getElementById("question-count");
const questionText = document.getElementById("question-text");
const answersEl = document.getElementById("answers");
const quizProgress = document.getElementById("quiz-progress");
const analysisSubtext = document.getElementById("analysis-subtext");
const analysisProgress = document.getElementById("analysis-progress");
const analysisPercent = document.getElementById("analysis-percent");
const metricAI = document.getElementById("metric-ai");
const metricStability = document.getElementById("metric-stability");
const metricRisk = document.getElementById("metric-risk");

const shareText = "TeissIA m’a diagnostiqué un profil ‘houblon contrarié’. 🍺";
let current = 0;
let answers = [];

function showScreen(key) {
  Object.values(screens).forEach(s => s.classList.remove("active"));
  screens[key].classList.add("active");
}

function renderQuestion() {
  const item = questions[current];
  questionCount.textContent = `Question ${current + 1} / ${questions.length}`;
  questionText.textContent = item.q;
  quizProgress.style.width = `${((current + 1) / questions.length) * 100}%`;
  answersEl.innerHTML = "";
  item.a.forEach(choice => {
    const btn = document.createElement("button");
    btn.className = "btn answer-btn";
    btn.textContent = choice;
    btn.addEventListener("click", () => {
      answers.push({ question: item.q, answer: choice, index: current });
      current += 1;
      if (current < questions.length) renderQuestion();
      else runAnalysis();
    });
    answersEl.appendChild(btn);
  });
}

function runAnalysis() {
  showScreen("analysis");
  const total = 10000;
  const suspenseStart = 9700;
  const start = performance.now();

  const rotateText = setInterval(() => {
    analysisSubtext.textContent = analysisSubtexts[Math.floor(Math.random() * analysisSubtexts.length)];
  }, 1400);

  function tick(now) {
    const elapsed = Math.min(now - start, total);
    let p;
    if (elapsed <= suspenseStart) {
      p = (elapsed / suspenseStart) * 97;
    } else {
      p = 97 + ((elapsed - suspenseStart) / (total - suspenseStart)) * 3;
    }
    p = Math.min(100, p);

    analysisProgress.style.width = `${p}%`;
    analysisPercent.textContent = `${Math.round(p)}%`;
    metricAI.textContent = (Math.sin(elapsed / 510) * 0.9 + 1.7).toFixed(2);
    metricStability.textContent = `${Math.round((Math.cos(elapsed / 800) * 11) + p)}%`;
    metricRisk.textContent = p < 35 ? "faible" : p < 75 ? "modéré" : "imminent";

    if (elapsed < total) {
      requestAnimationFrame(tick);
    } else {
      clearInterval(rotateText);
      analysisPercent.textContent = "100%";
      showResult();
    }
  }

  requestAnimationFrame(tick);
}

function showResult() {
  showScreen("result");
  if (navigator.vibrate) navigator.vibrate([80, 50, 130]);
  runBubbles();
}

function runBubbles() {
  const canvas = document.getElementById("bubbles");
  const ctx = canvas.getContext("2d");
  const bubbles = Array.from({ length: 28 }, () => ({
    x: Math.random() * canvas.width,
    y: canvas.height + Math.random() * 120,
    r: 2 + Math.random() * 6,
    v: 0.4 + Math.random() * 1.4,
    a: 0.15 + Math.random() * 0.45
  }));
  let frame = 0;

  const draw = () => {
    frame += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach(b => {
      b.y -= b.v;
      if (b.y < -10) {
        b.y = canvas.height + 10;
        b.x = Math.random() * canvas.width;
      }
      ctx.beginPath();
      ctx.fillStyle = `rgba(244, 223, 134, ${b.a})`;
      ctx.arc(b.x + Math.sin(frame / 30) * 0.5, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    });
    if (frame < 480) requestAnimationFrame(draw);
  };
  draw();
}

async function shareResult() {
  try {
    if (navigator.share) {
      await navigator.share({ title: "TeissIA", text: shareText });
      return;
    }
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(shareText);
      alert("Résultat copié dans le presse-papiers.");
      return;
    }
  } catch (e) {
    // no-op
  }
  prompt("Copiez ce texte :", shareText);
}

function restart() {
  current = 0;
  answers = [];
  quizProgress.style.width = "12.5%";
  analysisProgress.style.width = "0%";
  analysisPercent.textContent = "0%";
  showScreen("home");
}

document.getElementById("start-btn").addEventListener("click", () => {
  current = 0;
  answers = [];
  showScreen("quiz");
  renderQuestion();
});
document.getElementById("restart-btn").addEventListener("click", restart);
document.getElementById("share-btn").addEventListener("click", shareResult);
