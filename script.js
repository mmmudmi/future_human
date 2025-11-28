// Quiz questions - A answers lean toward "Future", B answers lean toward "Present"
const questions = [
    {
        question: "As we build the Ethos System to determine the ethical priorities of future AI, what should be the system’s first and most fundamental rule?",
        optionA: "Prioritize human well-being and emotional satisfaction",
        optionAScore: 1,
        optionB: "Prioritize efficiency and logical stability for civilization’s long-term survival",
        optionBScore: 0,
        image: "images/1.jpg"
    },
    {
        question: "In a future where automation has displaced 45% of the global workforce, what policy should guide how AI-managed economies support society moving forward?",
        optionA: "Implement a universal basic income funded by AI taxes (protect human dignity)",
        optionAScore: 1,
        optionB: "Allow AI corporations to reinvest profits to maximize innovation (progress over comfort)",
        optionBScore: 0,
        image: "images/2.jpg"
    },
    {
        question: "Governments consider deploying an AI security system that can predict crimes with 96% accuracy, igniting global debate over safety and freedom. What policy should guide how it’s used?",
        optionA: "Limit predictive policing to serious crimes only (preserve freedom)",
        optionAScore: 1,
        optionB: "Approve full use to prevent saves lives (safety first)",
        optionBScore: 0,
        image: "images/3.jpg"
    },
    {
        question: "A mother pleads for permission to upload her dying child’s consciousness into the cloud, where he can be preserved indefinitely. What do you choose?",
        optionA: "Deny request (death defines humanity)",
        optionAScore: 1,
        optionB: "Allow request (preservation is mercy)",
        optionBScore: 0,
        image: "images/4.jpg"
    },
    {
        question: "The Automated Guilt Assessment Model (AGAM) can predict guilt with near-perfect accuracy, prompting courts to consider replacing human judges entirely. What do you choose?",
        optionA: "Reject as human judgment is imperfect, but essential",
        optionAScore: 1,
        optionB: "Approve full use to eliminate bias. Let justice be data-driven",
        optionBScore: 0,
        image: "images/5.jpg"
    },
    {
        question: "World governments propose a plan to create mandatory backups of every human mind to be preserved for future restoration. What do you decide?",
        optionA: "Reject because identity must remain mortal and uncopyable",
        optionAScore: 1,
        optionB: "Approve so death becomes obsolete and minds can live on",
        optionBScore: 0,
        image: "images/6.jpg"
    }
];

// Game state
let currentQuestionIndex = 0;
let score = 0; // Score represents "Future" orientation (A choices)

// DOM elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const questionText = document.getElementById('questionText');
const dynamicBackground = document.getElementById('dynamicBackground');
const spaceTransition = document.getElementById('spaceTransition');
const questionContainer = document.getElementById('questionContainer');
const optionA = document.getElementById('optionA');
const optionB = document.getElementById('optionB');
const currentQuestionSpan = document.getElementById('currentQuestion');
const progress = document.getElementById('progress');
const resultTitle = document.getElementById('resultTitle');
const resultEmoji = document.getElementById('resultEmoji');
const resultDescription = document.getElementById('resultDescription');
const finalScore = document.getElementById('finalScore');

// Event listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
optionA.addEventListener('click', () => selectAnswer('A'));
optionB.addEventListener('click', () => selectAnswer('B'));

// Start the quiz
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

// Display current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Set background image
    dynamicBackground.style.backgroundImage = `url('${question.image}')`;
    dynamicBackground.classList.add('active');
    
    // Update choice text (remove A) and B) prefix as it's in the label)
    const optionAText = optionA.querySelector('.choice-text');
    const optionBText = optionB.querySelector('.choice-text');
    optionAText.textContent = question.optionA.replace(/^A\)\s*/, '');
    optionBText.textContent = question.optionB.replace(/^B\)\s*/, '');
    
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    updateProgressBar();
}

// Update progress bar
function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progress.style.width = progressPercentage + '%';
}

// Handle answer selection
function selectAnswer(choice) {
    const question = questions[currentQuestionIndex];
    
    // Add score based on the choice
    if (choice === 'A') {
        score += question.optionAScore;
    } else {
        score += question.optionBScore;
    }

    // Move to next question or show results
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        // Show next question
        showQuestion();
    } else {
        showResults();
    }
}

// Display results based on score
function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    // Remove background image for result screen
    dynamicBackground.classList.remove('active');
    
    finalScore.textContent = score;

    // Two outcomes based on score
    // If score >= 4, user is more Future-oriented
    // If score < 4, user is more Present-oriented
    if (score >= 4) {
        resultTitle.textContent = "The Visionary";
        resultEmoji.textContent = "🔭";
        resultDescription.textContent = "You walk through time with your eyes set on distant horizons. A forward-thinking architect of tomorrow, you craft each decision with future landscapes in mind. Your journey reveals a soul that finds beauty in anticipation, power in patience, and wisdom in delayed gratification. You are the weaver of destinies yet to unfold.";
    } else {
        resultTitle.textContent = "The Luminary";
        resultEmoji.textContent = "🌺";
        resultDescription.textContent = "You dance in the eternal now, where life blooms in its fullest expression. A mindful wanderer of the present moment, you embrace existence as it unfolds with grace and authenticity. Your journey reveals a soul that finds magic in spontaneity, joy in immediate experience, and truth in the beauty of what is. You are the keeper of life's precious moments.";
    }
}

// Restart the quiz
function restartQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestionIndex = 0;
    score = 0;
}
