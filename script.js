const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Logic", "Home Tool Markup Language"],
    answer: 0
  },
  {
    question: "Which CSS property is used to change text color?",
    options: ["font-color", "text-color", "color", "foreground-color"],
    answer: 2
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<href>", "<url>", "<a>"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
    answer: 1
  },
  {
    question: "Which property is used to make a flex container?",
    options: ["display: block", "display: flex", "display: grid", "display: inline"],
    answer: 1
  },
  {
    question: "Which JavaScript method selects an element by ID?",
    options: ["querySelector()", "getElement()", "getElementById()", "selectById()"],
    answer: 2
  },
  {
    question: "What is the correct way to write a comment in CSS?",
    options: ["// comment", "<!-- comment -->", "/* comment */", "** comment **"],
    answer: 2
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h6>", "<heading>", "<head>", "<h1>"],
    answer: 3
  },
  {
    question: "Which value of position makes an element stick to the viewport?",
    options: ["absolute", "relative", "fixed", "static"],
    answer: 2
  },
  {
    question: "Which method adds an element to the end of an array in JavaScript?",
    options: ["push()", "pop()", "shift()", "append()"],
    answer: 0
  }
];

let current = 0;
let score = 0;
let wrong = 0;
let answered = false;

const letters = ['A', 'B', 'C', 'D'];

function loadQuestion() {
  answered = false;
  const q = questions[current];

  document.getElementById('question').textContent = q.question;
  document.getElementById('questionNum').textContent =
    `Question ${current + 1} of ${questions.length}`;
  document.getElementById('progressFill').style.width =
    `${((current + 1) / questions.length) * 100}%`;

  const optionsEl = document.getElementById('options');
  optionsEl.innerHTML = '';

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${letters[i]}</span>${opt}`;
    btn.onclick = () => selectAnswer(i, btn);
    optionsEl.appendChild(btn);
  });

  document.getElementById('nextBtn').style.display = 'none';
}

function selectAnswer(index, btn) {
  if (answered) return;
  answered = true;

  const correct = questions[current].answer;
  const allBtns = document.querySelectorAll('.option-btn');

  allBtns.forEach(b => b.disabled = true);

  if (index === correct) {
    btn.classList.add('correct');
    score++;
  } else {
    btn.classList.add('wrong');
    allBtns[correct].classList.add('correct');
    wrong++;
  }

  document.getElementById('scoreText').textContent = `Score: ${score}`;
  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById('quizCard').style.display = 'none';
  document.getElementById('resultCard').style.display = 'block';

  const percent = Math.round((score / questions.length) * 100);

  document.getElementById('correctCount').textContent = score;
  document.getElementById('wrongCount').textContent = wrong;
  document.getElementById('percentCount').textContent = percent + '%';
  document.getElementById('resultScore').textContent =
    `You scored ${score} out of ${questions.length}`;

  let emoji, title, msg;

  if (percent === 100) {
    emoji = '🏆'; title = 'Perfect Score!';
    msg = 'Outstanding! You got everything right!';
  } else if (percent >= 80) {
    emoji = '🎉'; title = 'Great Job!';
    msg = 'Excellent performance! Keep it up!';
  } else if (percent >= 60) {
    emoji = '👍'; title = 'Good Work!';
    msg = 'Not bad! A little more practice and you\'ll ace it!';
  } else if (percent >= 40) {
    emoji = '📚'; title = 'Keep Studying!';
    msg = 'You\'re getting there! Review the topics and try again.';
  } else {
    emoji = '💪'; title = 'Keep Trying!';
    msg = 'Don\'t give up! Practice makes perfect.';
  }

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultTitle').textContent = title;
  document.getElementById('resultMsg').textContent = msg;
}

function restartQuiz() {
  current = 0;
  score = 0;
  wrong = 0;
  answered = false;
  document.getElementById('scoreText').textContent = 'Score: 0';
  document.getElementById('quizCard').style.display = 'block';
  document.getElementById('resultCard').style.display = 'none';
  loadQuestion();
}

loadQuestion();