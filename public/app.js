// DOM Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const startBtn = document.getElementById('startBtn');
const retryBtn = document.getElementById('retryBtn');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const questionLabel = document.getElementById('questionLabel');
const questionWord = document.getElementById('questionWord');
const answersContainer = document.getElementById('answers');
const modeBtns = document.querySelectorAll('.mode-btn');

// State
let currentMode = 'meaning'; // 'meaning' | 'reading'
let quizWords = [];
let currentIndex = 0;
let score = 0;

// Initialize
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
  });
});

startBtn.addEventListener('click', startQuiz);
retryBtn.addEventListener('click', () => {
  resultScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
});

function startQuiz() {
  quizWords = shuffle([...VOCABULARY]).slice(0, 10);
  currentIndex = 0;
  score = 0;
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  if (currentIndex >= quizWords.length) {
    showResult();
    return;
  }

  const current = quizWords[currentIndex];
  const options = getOptions(current);

  questionLabel.textContent = currentMode === 'meaning'
    ? '이 단어의 의미는?'
    : '이 단어의 읽기는?';

  questionWord.textContent = currentMode === 'meaning'
    ? current.word
    : current.meaning;

  progressFill.style.width = `${((currentIndex) / quizWords.length) * 100}%`;
  progressText.textContent = `${currentIndex} / ${quizWords.length}`;

  answersContainer.innerHTML = '';
  shuffle(options).forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'answer-btn';
    btn.textContent = opt.text;
    btn.dataset.correct = opt.correct;
    btn.addEventListener('click', () => handleAnswer(btn));
    answersContainer.appendChild(btn);
  });
}

function getOptions(current) {
  const correctAnswer = currentMode === 'meaning' ? current.meaning : current.reading;
  const wrongPool = VOCABULARY
    .filter(v => v !== current)
    .map(v => currentMode === 'meaning' ? v.meaning : v.reading);
  const wrong = shuffle(wrongPool).slice(0, 3);
  const options = [
    { text: correctAnswer, correct: true },
    ...wrong.map(t => ({ text: t, correct: false }))
  ];
  return options;
}

function handleAnswer(btn) {
  const correct = btn.dataset.correct === 'true';
  if (correct) score++;

  document.querySelectorAll('.answer-btn').forEach(b => {
    b.disabled = true;
    if (b.dataset.correct === 'true') b.classList.add('correct');
    if (b === btn && !correct) b.classList.add('wrong');
  });

  setTimeout(() => {
    currentIndex++;
    showQuestion();
  }, 800);
}

function showResult() {
  quizScreen.classList.add('hidden');
  resultScreen.classList.remove('hidden');

  const percent = Math.round((score / quizWords.length) * 100);
  document.getElementById('resultScore').textContent = `${score} / ${quizWords.length}`;
  document.getElementById('resultPercent').textContent = `${percent}%`;

  const icon = percent >= 80 ? '🎉' : percent >= 60 ? '👍' : '💪';
  const title = percent >= 80 ? '훌륭해요!' : percent >= 60 ? '잘했어요!' : '다시 도전해봐요!';
  document.getElementById('resultIcon').textContent = icon;
  document.getElementById('resultTitle').textContent = title;

  progressFill.style.width = '100%';
  progressText.textContent = `${quizWords.length} / ${quizWords.length}`;
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Contact Form
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const API_URL = 'http://localhost:3001';

contactBtn.addEventListener('click', () => {
  contactModal.classList.remove('hidden');
  formMessage.classList.add('hidden');
  contactForm.reset();
});

modalClose.addEventListener('click', () => {
  contactModal.classList.add('hidden');
});

contactModal.addEventListener('click', (e) => {
  if (e.target === contactModal) contactModal.classList.add('hidden');
});

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;

  const data = {
    name: document.getElementById('contactName').value.trim(),
    phone: document.getElementById('contactPhone').value.trim(),
    email: document.getElementById('contactEmail').value.trim(),
  };

  try {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();

    formMessage.textContent = json.message;
    formMessage.classList.remove('hidden');
    formMessage.classList.toggle('success', json.success);
    formMessage.classList.toggle('error', !json.success);

    if (json.success) contactForm.reset();
  } catch (err) {
    formMessage.textContent = '연결에 실패했습니다. 서버가 실행 중인지 확인해주세요.';
    formMessage.classList.remove('hidden');
    formMessage.classList.add('error');
  }

  submitBtn.disabled = false;
});
