// Current language
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Update document language
function setDocumentLanguage(lang) {
    document.documentElement.lang = lang;
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
}

// Helper function to get translation
function t(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

// Quiz questions with dual scoring system: H (Humanity) and A (AI Control)
function getQuestions() {
    return [
        {
            question: t('question_1'),
            optionA: t('option_1a'),
            optionAH: 0,
            optionAA: 2,
            optionB: t('option_1b'),
            optionBH: 2,
            optionBA: 0,
            image: "assets/1.png"
        },
        {
            question: t('question_2'),
            optionA: t('option_2a'),
            optionAH: 1,
            optionAA: 0,
            optionB: t('option_2b'),
            optionBH: 0,
            optionBA: 1,
            image: "assets/2.png"
        },
        {
            question: t('question_3'),
            optionA: t('option_3a'),
            optionAH: 0,
            optionAA: 2,
            optionB: t('option_3b'),
            optionBH: 2,
            optionBA: 0,
            image: "assets/3.png"
        },
        {
            question: t('question_4'),
            optionA: t('option_4a'),
            optionAH: 0,
            optionAA: 1,
            optionB: t('option_4b'),
            optionBH: 1,
            optionBA: 0,
            image: "assets/4.png"
        },
        {
            question: t('question_5'),
            optionA: t('option_5a'),
            optionAH: 1,
            optionAA: 0,
            optionB: t('option_5b'),
            optionBH: 0,
            optionBA: 1,
            image: "assets/5.png"
        },
        {
            question: t('question_6'),
            optionA: t('option_6a'),
            optionAH: 2,
            optionAA: 0,
            optionB: t('option_6b'),
            optionBH: 0,
            optionBA: 2,
            image: "assets/6.png"
        }
    ];
}

let questions = getQuestions();

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

// Language event listeners
function initLanguageSwitcher() {
    const langToggle = document.getElementById('langToggle');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Toggle dropdown on button click
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });
    
    // Handle language option selection
    langOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            const lang = option.dataset.lang;
            switchLanguage(lang);
            langDropdown.classList.remove('active');
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) {
            langDropdown.classList.remove('active');
        }
    });
    
    // Set initial state
    updateLanguageButtonState();
}

function switchLanguage(lang) {
    setDocumentLanguage(lang);
    questions = getQuestions(); // Refresh questions with new language
    updateLanguageButtonState();
    updateAllUIText();
    
    // If quiz is active, update current question
    if (quizScreen.classList.contains('active')) {
        showQuestion();
    }
    
    // If result screen is active, update results
    if (resultScreen.classList.contains('active')) {
        updateResultsDisplay();
    }
}

function updateLanguageButtonState() {
    const langToggle = document.getElementById('langToggle');
    const langOptions = document.querySelectorAll('.lang-option');
    
    // Update toggle button with current language code and selected option styling
    const langCodeMap = {
        en: 'EN',
        th: 'TH',
        ru: 'RU'
    };
    
    if (langToggle) {
        langToggle.querySelector('.lang-code').textContent = langCodeMap[currentLanguage] || 'EN';
    }
    
    // Update dropdown options styling
    langOptions.forEach(option => {
        if (option.dataset.lang === currentLanguage) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function updateAllUIText() {
    // Update start screen
    const startChapterLabels = document.querySelectorAll('#startScreen .chapter-label');
    if (startChapterLabels.length > 0) {
        startChapterLabels[0].textContent = t('chapter_2038');
    }
    
    const startTitles = document.querySelectorAll('#startScreen .vr-title');
    if (startTitles.length > 0) {
        startTitles[0].textContent = t('title_main');
    }
    
    const startSubtitles = document.querySelectorAll('#startScreen .vr-subtitle');
    if (startSubtitles.length > 0) {
        startSubtitles[0].textContent = t('subtitle_main');
    }
    
    const startBtnTexts = document.querySelectorAll('#startScreen .btn-text');
    if (startBtnTexts.length > 0) {
        startBtnTexts[0].textContent = t('btn_start');
    }
    
    // Update epilogue label if exists
    const epilogueLabel = document.getElementById('epilogueLabel');
    if (epilogueLabel) epilogueLabel.textContent = t('epilogue');
    
    // Update AI info section
    const aiInfoTitle = document.getElementById('aiInfoTitle');
    if (aiInfoTitle) aiInfoTitle.textContent = t('context');
    
    // Update result screen buttons
    if (restartBtn) {
        const restartBtnText = restartBtn.querySelector('.btn-text');
        if (restartBtnText) restartBtnText.textContent = t('btn_restart');
    }
    
    // Update AI info content
    const aiIntro = document.querySelector('.ai-info-intro');
    if (aiIntro) aiIntro.textContent = t('ai_intro');
    
    const statementLabels = document.querySelectorAll('.statement-label');
    const statementTexts = document.querySelectorAll('.statement-text');
    if (statementLabels.length > 0) {
        statementLabels[0].textContent = t('cais_label');
        statementTexts[0].textContent = t('cais_text');
    }
    if (statementLabels.length > 1) {
        statementLabels[1].textContent = t('fli_label');
        statementTexts[1].textContent = t('fli_text');
    }
    
    const actionHighlight = document.querySelector('.action-highlight');
    if (actionHighlight) actionHighlight.textContent = t('action_highlight');
    
    const actionText = document.querySelector('.action-text');
    if (actionText) actionText.textContent = t('action_text');
    
    const linkTexts = document.querySelectorAll('.link-text');
    if (linkTexts.length > 0) linkTexts[0].textContent = t('link_superintelligence');
    if (linkTexts.length > 1) linkTexts[1].textContent = t('link_ai_statement');
}

// Event listeners
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);
optionA.addEventListener('click', () => selectAnswer('A'));
optionB.addEventListener('click', () => selectAnswer('B'));

// Initialize language switcher when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setDocumentLanguage(currentLanguage);
    initLanguageSwitcher();
    updateAllUIText();
});

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
    
    // Update chapter text
    const chapterText = document.querySelector('.chapter-text');
    if (chapterText) {
        chapterText.textContent = `${t('chapter_of')} ${currentQuestionIndex + 1} ${t('of_text')} ${questions.length}`;
    }
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

    updateResultsDisplay();
}

// Update results display (used when language changes or quiz ends)
function updateResultsDisplay() {
    if (scoreA >= scoreH) {
        // AI Control is higher or equal, danger outcomes
        if (scoreA > scoreH + 2) {
            // ENDING 1: THE AI TAKEOVER (A > H by 3+)
            resultTitle.textContent = t('ending_1_title');
            resultEmoji.textContent = "";
            resultDescription.textContent = t('ending_1_desc');
        } else {
            // ENDING 2: THE SLOW LOSS OF HUMANITY (A >= H, but by 0-2)
            resultTitle.textContent = t('ending_2_title');
            resultEmoji.textContent = "";
            resultDescription.textContent = t('ending_2_desc');
        }
    } else {
        // Humanity is higher, hopeful outcomes
        if (scoreH >= scoreA + 3) {
            // ENDING 4: THE RESPONSIBLE FUTURE (H ≥ A + 3)
            resultTitle.textContent = t('ending_4_title');
            resultEmoji.textContent = "";
            resultDescription.textContent = t('ending_4_desc');
        } else {
            // ENDING 3: THE HUMANITY PROTECTOR (H > A by 1-2)
            resultTitle.textContent = t('ending_3_title');
            resultEmoji.textContent = "";
            resultDescription.textContent = t('ending_3_desc');
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
