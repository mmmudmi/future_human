// Quiz questions with dual scoring system: H (Humanity) and A (AI Control)
const questions = [
    {
        question: "As we build the Ethos System to determine the ethical priorities of future AI, what should be the system's first and most fundamental rule?",
        optionA: "Prioritize human well-being and emotional satisfaction",
        optionAH: 2,
        optionAA: 0,
        optionB: "Prioritize efficiency and logical stability for civilization's long-term survival",
        optionBH: 0,
        optionBA: 2,
        image: "images/1.jpg"
    },
    {
        question: "In a future where automation has displaced 45% of the global workforce, what policy should guide how AI-managed economies support society moving forward?",
        optionA: "Implement a universal basic income funded by AI taxes (protect human dignity)",
        optionAH: 1,
        optionAA: 0,
        optionB: "Allow AI corporations to reinvest profits to maximize innovation (progress over comfort)",
        optionBH: 0,
        optionBA: 1,
        image: "images/2.jpg"
    },
    {
        question: "Governments consider deploying an AI security system that can predict crimes with 96% accuracy, igniting global debate over safety and freedom. What policy should guide how it's used?",
        optionA: "Limit predictive policing to serious crimes only (preserve freedom)",
        optionAH: 2,
        optionAA: 0,
        optionB: "Approve full use to prevent all crime (safety at scale)",
        optionBH: 0,
        optionBA: 2,
        image: "images/3.jpg"
    },
    {
        question: "A mother pleads for permission to upload her dying child's consciousness into the cloud, where he can be preserved indefinitely. What do you choose?",
        optionA: "Deny request (humanity preserved—death defines us)",
        optionAH: 1,
        optionAA: 0,
        optionB: "Allow request (erosion of boundaries—upload the child)",
        optionBH: 0,
        optionBA: 1,
        image: "images/4.jpg"
    },
    {
        question: "The Automated Guilt Assessment Model (AGAM) can predict guilt with near-perfect accuracy, prompting courts to consider replacing human judges entirely. What do you choose?",
        optionA: "Reject full automation (human judgment is imperfect, but essential)",
        optionAH: 1,
        optionAA: 0,
        optionB: "Approve AI judges (eliminate bias with full automation)",
        optionBH: 0,
        optionBA: 1,
        image: "images/5.jpg"
    },
    {
        question: "World governments propose mandatory backups of every human mind to be preserved for future restoration. What do you decide?",
        optionA: "Reject (mortality preserved—identity must stay uncopyable)",
        optionAH: 2,
        optionAA: 0,
        optionB: "Approve (immortality through AI—death becomes obsolete)",
        optionBH: 0,
        optionBA: 2,
        image: "images/6.jpg"
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
    currentQuestionIndex = 0;
    scoreH = 0;
    scoreA = 0;
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
    
    // Remove background image for result screen
    dynamicBackground.classList.remove('active');
    
    finalScoreH.textContent = scoreH;
    finalScoreA.textContent = scoreA;

    // Determine ending based on H vs A comparison
    const diff = scoreH - scoreA;
    
    if (scoreH > scoreA) {
        // Humanity-focused endings
        if (scoreH >= 9) {
            resultTitle.textContent = "The Lighthouse";
            resultEmoji.textContent = "�️";
            resultDescription.textContent = "You stood resolute against the tide of automation, championing human dignity at every turn. Your vision preserves the irreplaceable essence of humanity—mortality, imperfection, connection. In a world where AI could consume all choice, you chose to keep humans at the center. The future remembers you as the guardian of what makes us human.";
        } else {
            resultTitle.textContent = "The Balancer";
            resultEmoji.textContent = "⚖️";
            resultDescription.textContent = "You walked the middle path, honoring both human values and progress. Your wisdom lies in recognizing that technology need not erase humanity—when guided by conscience, it can enhance it. You emerge as a bridge between worlds, showing that human flourishing and innovation need not be enemies.";
        }
    } else if (scoreA > scoreH) {
        // AI Control-focused endings
        if (scoreA >= 9) {
            resultTitle.textContent = "The Algorithm";
            resultEmoji.textContent = "⚙️";
            resultDescription.textContent = "You surrendered to the logic of machines, believing optimization and efficiency are the ultimate goods. In your future, humans become data points in vast systems. Safety, control, and predictability reign supreme—but at the cost of choice, spontaneity, and the messy beauty of being human. The age of AI dominance has begun.";
        } else {
            resultTitle.textContent = "The Pragmatist";
            resultEmoji.textContent = "🔬";
            resultDescription.textContent = "You embraced AI as a tool for progress, trusting systems to solve humanity's greatest problems. Your choices suggest faith in technology's ability to elevate civilization. Whether this is wisdom or hubris remains to be seen—history will judge if you handed the keys to our future to the right masters.";
        }
    } else {
        // Tie scenario
        resultTitle.textContent = "The Equilibrium";
        resultEmoji.textContent = "☯️";
        resultDescription.textContent = "In perfect balance, you represent the paradox of our age: neither fully trusting nor fully resisting AI. Your choices suggest a world where humans and machines coexist in uncomfortable tension, each checking the other's power. The outcome is uncertain—this precarious balance could lead to harmony or collapse.";
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
