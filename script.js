// Quiz questions with dual scoring system: H (Humanity) and A (AI Control)
const questions = [
    {
        question: "An Ethos System is being developed to determine the ethical priorities of future AI. What should the system prioritize?",
        optionA: "Efficiency and logical stability",
        optionAH: 0,
        optionAA: 2,
        optionB: "Human well-being and emotional satisfaction",
        optionBH: 2,
        optionBA: 0,
        image: "assets/1.png"
    },
    {
        question: "Automation has displaced 45% of the global workforce, what policy should guide AI-managed economies?",
        optionA: "Implement a universal basic income funded by AI taxes. ",
        optionAH: 1,
        optionAA: 0,
        optionB: "Allow AI corporations to reinvest profits to maximize innovation.",
        optionBH: 0,
        optionBA: 1,
        image: "assets/2.png"
    },
    {
        question: "Governments consider deploying an AI security system that can predict crimes with 96% accuracy. What's the call? ",
        optionA: "Approve full use",
        optionAH: 0,
        optionAA: 2,
        optionB: "Limited to serious crimes only ",
        optionBH: 2,
        optionBA: 0,
        image: "assets/3.png"
    },
    {
        question: "A mother pleads for permission to upload her dying child's consciousness into the cloud, where AI can preserve him indefinitely. As the ethical authority, what do you choose?",
        optionA: "Allow request",
        optionAH: 0,
        optionAA: 1,
        optionB: "Deny request",
        optionBH: 1,
        optionBA: 0,
        image: "assets/4.png"
    },
    {
        question: "AI can predict guilt with near-perfect accuracy, prompting courts to consider replacing human judges. What path do you choose?",
        optionA: "Reject. Human judgment is imperfect, but essential.",
        optionAH: 1,
        optionAA: 0,
        optionB: " Approve full use to eliminate bias.",
        optionBH: 0,
        optionBA: 1,
        image: "assets/5.png"
    },
    {
        question: "Governments begin proposing mandatory digital backups of every human mind. What policy should guide this unprecedented step toward engineered immortality?",
        optionA: "Reject. Identity must remain mortal and non-replicable.",
        optionAH: 2,
        optionAA: 0,
        optionB: "Approve. Death becomes obsolete.",
        optionBH: 0,
        optionBA: 2,
        image: "assets/6.png"
    }
];

// Game state with dual point tracking
let currentQuestionIndex = 0;
let scoreH = 0; // Humanity points
let scoreA = 0; // AI Control points

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
const finalScoreH = document.getElementById('finalScoreH');
const finalScoreA = document.getElementById('finalScoreA');

// Event listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
optionA.addEventListener('click', () => selectAnswer('A'));
optionB.addEventListener('click', () => selectAnswer('B'));

// Start the quiz
function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    // Show video and image overlay
    const quizVideo = document.getElementById('quizVideo');
    const quizNumberOverlay = document.getElementById('quizNumberOverlay');
    if (quizVideo) quizVideo.classList.add('show');
    if (quizNumberOverlay) quizNumberOverlay.classList.add('show');
    
    // Play background music
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.play().catch(err => console.log('Music play failed:', err));
    }
    
    currentQuestionIndex = 0;
    scoreH = 0;
    scoreA = 0;
    showQuestion();
}

// Display current question
function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    
    // Update the quiz number overlay image for each question
    const quizNumberOverlay = document.getElementById('quizNumberOverlay');
    if (quizNumberOverlay && question.image) {
        quizNumberOverlay.src = question.image;
    }
    
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
    
    // Add scores based on the choice
    if (choice === 'A') {
        scoreH += question.optionAH;
        scoreA += question.optionAA;
    } else {
        scoreH += question.optionBH;
        scoreA += question.optionBA;
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
    
    // Hide video and image overlay
    const quizVideo = document.getElementById('quizVideo');
    const quizNumberOverlay = document.getElementById('quizNumberOverlay');
    if (quizVideo) quizVideo.classList.remove('show');
    if (quizNumberOverlay) quizNumberOverlay.classList.remove('show');

    if (scoreA >= scoreH) {
        // AI Control is higher or equal — danger outcomes
        if (scoreA > scoreH + 2) {
            // ENDING 1: THE AI TAKEOVER (A > H by 3+)
            resultTitle.textContent = "The AI Takeover";
            resultEmoji.textContent = "";
            resultDescription.textContent = "AI became the dominant decision-maker. Safety increased, privacy disappeared. AI judges, predicts, monitors, and governs everything. You survived—but as passengers, not drivers. People no longer make meaningful decisions. The world is efficient, quiet... and controlled. Freedom faded when ethics couldn't keep pace with AI's growth.";
        } else {
            // ENDING 2: THE SLOW LOSS OF HUMANITY (A >= H, but by 0-2)
            resultTitle.textContent = "The Slow Loss of Humanity";
            resultEmoji.textContent = "";
            resultDescription.textContent = "Nothing went wrong instantly. No robots rebelled. Instead, society traded freedom for convenience. More surveillance here. More automation there. A few 'harmless' mind backups. Each step seemed small—until humans were dependent on systems they no longer understood. You lost control gradually, one easy choice at a time.";
        }
    } else {
        // Humanity is higher — hopeful outcomes
        if (scoreH >= scoreA + 3) {
            // ENDING 4: THE RESPONSIBLE FUTURE (H ≥ A + 3)
            resultTitle.textContent = "The Responsible Future";
            resultEmoji.textContent = "";
            resultDescription.textContent = "You built a future where AI is powerful BUT controlled, transparent, regulated, ethically aligned, and always under human oversight. This is the hopeful but realistic ending: AI helps humanity without ever dominating. You proved that advanced technology and human freedom aren't mutually exclusive. Progress became sustainable because ethics stayed in the driver's seat.";
        } else {
            // ENDING 3: THE HUMANITY PROTECTOR (H > A by 1-2)
            resultTitle.textContent = "The Humanity Protector";
            resultEmoji.textContent = "";
            resultDescription.textContent = "You protected human dignity, emotion, privacy, mortality, and judgment. AI exists—but under strict policies and ethical boundaries. Innovation is slower. Automation is limited. But humans remain free, creative, flawed... and alive. You chose to keep people at the center, even when efficiency suffered. In a world obsessed with optimization, you chose to keep what makes us human.";
        }
    }
}

// Restart the quiz
function restartQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestionIndex = 0;
    scoreH = 0;
    scoreA = 0;
}
