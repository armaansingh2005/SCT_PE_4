/* ==========================================
   InterviewMate AI
   script.js - Part 1
   Core Setup + Theme + State Management
========================================== */

/* ==========================================
   DOM References
========================================== */

const themeToggle =
    document.getElementById(
        "themeToggle"
    );

const candidateName =
    document.getElementById(
        "candidateName"
    );

const candidateRole =
    document.getElementById(
        "candidateRole"
    );

const candidateSkills =
    document.getElementById(
        "candidateSkills"
    );

const startInterviewBtn =
    document.getElementById(
        "startInterviewBtn"
    );

const resetInterviewBtn =
    document.getElementById(
        "resetInterviewBtn"
    );

const sendMessageBtn =
    document.getElementById(
        "sendMessageBtn"
    );

const userMessage =
    document.getElementById(
        "userMessage"
    );

const chatContainer =
    document.getElementById(
        "chatContainer"
    );

const historyContainer =
    document.getElementById(
        "historyContainer"
    );

const generateReportBtn =
    document.getElementById(
        "generateReportBtn"
    );

/* ==========================================
   Dashboard Elements
========================================== */

const communicationScoreEl =
    document.getElementById(
        "communicationScore"
    );

const technicalScoreEl =
    document.getElementById(
        "technicalScore"
    );

const confidenceScoreEl =
    document.getElementById(
        "confidenceScore"
    );

const communicationValue =
    document.getElementById(
        "communicationValue"
    );

const technicalValue =
    document.getElementById(
        "technicalValue"
    );

const confidenceValue =
    document.getElementById(
        "confidenceValue"
    );

const communicationBar =
    document.getElementById(
        "communicationBar"
    );

const technicalBar =
    document.getElementById(
        "technicalBar"
    );

const confidenceBar =
    document.getElementById(
        "confidenceBar"
    );

const currentStage =
    document.getElementById(
        "currentStage"
    );

const promptStageCard =
    document.getElementById(
        "promptStageCard"
    );

const interviewProgress =
    document.getElementById(
        "interviewProgress"
    );

const progressText =
    document.getElementById(
        "progressText"
    );

/* ==========================================
   Progress Steps
========================================== */

const step1 =
    document.getElementById(
        "step1"
    );

const step2 =
    document.getElementById(
        "step2"
    );

const step3 =
    document.getElementById(
        "step3"
    );

const step4 =
    document.getElementById(
        "step4"
    );

const step5 =
    document.getElementById(
        "step5"
    );

/* ==========================================
   Interview State
========================================== */

const interviewState = {

    started: false,

    currentQuestionIndex: 0,

    questionCount: 0,

    candidate: {

        name: "",

        role: "",

        skills: ""
    },

    scores: {

        communication: 0,

        technical: 0,

        confidence: 0
    },

    conversation: []
};

/* ==========================================
   Question Database
========================================== */

const questionBank = {

    frontend: [

        "How would you optimize website performance for mobile users?",

        "Explain the difference between localStorage and sessionStorage.",

        "What is the Virtual DOM and why is it useful?",

        "How does CSS Flexbox differ from CSS Grid?"
    ],

    backend: [

        "Explain REST API architecture.",

        "How would you secure an API?",

        "What is database indexing?",

        "Explain authentication versus authorization."
    ],

    java: [

        "Explain inheritance in Java.",

        "What is polymorphism?",

        "Difference between abstract class and interface?",

        "Explain JVM, JRE and JDK."
    ],

    general: [

        "Tell me about a challenging project you worked on.",

        "How do you handle tight deadlines?",

        "What are your greatest strengths?",

        "Why should we hire you?"
    ]
};

/* ==========================================
   Theme Handling
========================================== */

function initializeTheme() {

    const savedTheme =
        localStorage.getItem(
            "interview_theme"
        );

    if (savedTheme === "light") {

        document.body.classList.add(
            "light"
        );

        themeToggle.textContent =
            "☀️";

    } else {

        themeToggle.textContent =
            "🌙";
    }
}

function toggleTheme() {

    document.body.classList.toggle(
        "light"
    );

    const isLight =
        document.body.classList.contains(
            "light"
        );

    localStorage.setItem(
        "interview_theme",
        isLight
            ? "light"
            : "dark"
    );

    themeToggle.textContent =
        isLight
            ? "☀️"
            : "🌙";
}

themeToggle.addEventListener(
    "click",
    toggleTheme
);

/* ==========================================
   Chat Utilities
========================================== */

function scrollChatToBottom() {

    chatContainer.scrollTop =
        chatContainer.scrollHeight;
}

function addRecruiterMessage(
    message
) {

    const html = `
    <div class="message recruiter">

        <div class="avatar">
            SJ
        </div>

        <div class="message-content">

            <h4>
                Sarah Johnson
            </h4>

            <p>
                ${message}
            </p>

        </div>

    </div>
    `;

    chatContainer.insertAdjacentHTML(
        "beforeend",
        html
    );

    interviewState.conversation.push({

        sender: "Sarah",

        message
    });

    scrollChatToBottom();
}

function addCandidateMessage(
    message
) {

    const html = `
    <div class="message candidate">

        <div class="avatar">
            You
        </div>

        <div class="message-content">

            <h4>
                Candidate
            </h4>

            <p>
                ${message}
            </p>

        </div>

    </div>
    `;

    chatContainer.insertAdjacentHTML(
        "beforeend",
        html
    );

    interviewState.conversation.push({

        sender: "Candidate",

        message
    });

    scrollChatToBottom();
}

/* ==========================================
   Helper Functions
========================================== */

function getSkillCategory() {

    const skills =
        interviewState
            .candidate
            .skills
            .toLowerCase();

    if (
        skills.includes("html") ||
        skills.includes("css") ||
        skills.includes("javascript") ||
        skills.includes("react")
    ) {
        return "frontend";
    }

    if (
        skills.includes("spring") ||
        skills.includes("node") ||
        skills.includes("express") ||
        skills.includes("api")
    ) {
        return "backend";
    }

    if (
        skills.includes("java")
    ) {
        return "java";
    }

    return "general";
}

/* ==========================================
   Interview Engine
   script.js - Part 2
========================================== */

/* ==========================================
   Progress Tracker
========================================== */

function updateProgress(percent) {

    interviewProgress.style.width =
        percent + "%";

    progressText.textContent =
        percent + "%";
}

function markStepCompleted(step) {

    step.classList.add(
        "completed"
    );
}

/* ==========================================
   Score Handling
========================================== */

function updateScores(
    communication,
    technical,
    confidence
) {

    interviewState.scores.communication =
        communication;

    interviewState.scores.technical =
        technical;

    interviewState.scores.confidence =
        confidence;

    communicationScoreEl.textContent =
        communication;

    technicalScoreEl.textContent =
        technical;

    confidenceScoreEl.textContent =
        confidence;

    communicationValue.textContent =
        `${communication}/10`;

    technicalValue.textContent =
        `${technical}/10`;

    confidenceValue.textContent =
        `${confidence}/10`;

    communicationBar.style.width =
        `${communication * 10}%`;

    technicalBar.style.width =
        `${technical * 10}%`;

    confidenceBar.style.width =
        `${confidence * 10}%`;
}

/* ==========================================
   Stage Updates
========================================== */

function updateStage(
    stage,
    description
) {

    currentStage.textContent =
        stage;

    promptStageCard.textContent =
        description;
}

/* ==========================================
   Candidate Validation
========================================== */

function validateCandidate() {

    const name =
        candidateName.value.trim();

    const role =
        candidateRole.value.trim();

    const skills =
        candidateSkills.value.trim();

    if (
        !name ||
        !role ||
        !skills
    ) {

        alert(
            "Please fill all candidate details."
        );

        return false;
    }

    return true;
}

/* ==========================================
   Question Selection
========================================== */

function getNextQuestion() {

    const category =
        getSkillCategory();

    const questions =
        questionBank[category];

    const index =
        interviewState.currentQuestionIndex;

    if (
        index >= questions.length
    ) {

        return null;
    }

    return questions[index];
}

/* ==========================================
   Start Interview
========================================== */

function startInterview() {

    if (
        !validateCandidate()
    ) {
        return;
    }

    interviewState.started =
        true;

    interviewState.currentQuestionIndex = 0;

    interviewState.questionCount = 0;

    interviewState.conversation = [];

    interviewState.candidate.name =
        candidateName.value.trim();

    interviewState.candidate.role =
        candidateRole.value.trim();

    interviewState.candidate.skills =
        candidateSkills.value.trim();

    chatContainer.innerHTML = "";

    updateStage(
        "Question Generation",
        "Generating role-specific interview question."
    );

    updateProgress(20);

    markStepCompleted(step1);

    addRecruiterMessage(
        `Hello ${interviewState.candidate.name}! I can see you're applying for the role of ${interviewState.candidate.role}. Based on your skills in ${interviewState.candidate.skills}, let's begin the interview.`
    );

    setTimeout(() => {

        const question =
            getNextQuestion();

        addRecruiterMessage(
            question
        );

    }, 700);
}

/* ==========================================
   Evaluation Engine
========================================== */

function evaluateAnswer(
    answer
) {

    let communication = 5;
    let technical = 5;
    let confidence = 5;

    const words =
        answer
        .trim()
        .split(/\s+/)
        .length;

    if (words > 10)
        communication += 2;

    if (words > 20)
        communication += 1;

    const lower =
        answer.toLowerCase();

    const technicalKeywords = [

        "optimization",
        "performance",
        "api",
        "react",
        "component",
        "inheritance",
        "interface",
        "database",
        "storage",
        "javascript",
        "css",
        "html",
        "java",
        "security",
        "authentication"
    ];

    let matches = 0;

    technicalKeywords.forEach(
        keyword => {

            if (
                lower.includes(
                    keyword
                )
            ) {

                matches++;
            }
        }
    );

    technical += Math.min(
        4,
        matches
    );

    if (
        words > 15
    ) {
        confidence += 2;
    }

    if (
        answer.includes(".")
    ) {
        confidence += 1;
    }

    communication =
        Math.min(
            10,
            communication
        );

    technical =
        Math.min(
            10,
            technical
        );

    confidence =
        Math.min(
            10,
            confidence
        );

    updateScores(
        communication,
        technical,
        confidence
    );

    return {

        communication,
        technical,
        confidence
    };
}

/* ==========================================
   Follow-Up Generator
========================================== */

function generateFollowUp(
    scores
) {

    if (
        scores.technical < 7
    ) {

        return "Could you explain that concept in more technical detail?";
    }

    if (
        scores.communication < 7
    ) {

        return "Can you elaborate further and provide a practical example?";
    }

    if (
        scores.confidence < 7
    ) {

        return "How would you confidently explain this to a team member?";
    }

    return "Good answer. Let's move to the next question.";
}

/* ==========================================
   Handle Candidate Response
========================================== */

function processCandidateAnswer() {

    const answer =
        userMessage.value.trim();

    if (!answer)
        return;

    if (
        !interviewState.started
    ) {

        alert(
            "Start the interview first."
        );

        return;
    }

    addCandidateMessage(
        answer
    );

    userMessage.value = "";

    updateStage(
        "Answer Evaluation",
        "Evaluating candidate response."
    );

    markStepCompleted(step3);

    const scores =
        evaluateAnswer(
            answer
        );

    setTimeout(() => {

        addRecruiterMessage(
            `Evaluation:\n\nCommunication: ${scores.communication}/10\nTechnical Accuracy: ${scores.technical}/10\nConfidence: ${scores.confidence}/10`
        );

        const followUp =
            generateFollowUp(
                scores
            );

        addRecruiterMessage(
            followUp
        );

        interviewState.currentQuestionIndex++;

        interviewState.questionCount++;

        askNextQuestion();

        updateProgress(
            Math.min(
                80,
                20 +
                (
                    interviewState.questionCount *
                    20
                )
            )
        );

        markStepCompleted(step4);

    }, 700);
}

/* ==========================================
   Event Binding
========================================== */

startInterviewBtn.addEventListener(
    "click",
    startInterview
);

sendMessageBtn.addEventListener(
    "click",
    processCandidateAnswer
);

/* ==========================================
   Interview Completion
   script.js - Part 3
========================================== */

/* ==========================================
   History Storage
========================================== */

let interviewHistory =
    JSON.parse(
        localStorage.getItem(
            "interview_history"
        )
    ) || [];

function saveInterviewHistory() {

    localStorage.setItem(
        "interview_history",
        JSON.stringify(
            interviewHistory
        )
    );
}

function renderHistory() {

    if (
        interviewHistory.length === 0
    ) {

        historyContainer.innerHTML = `
            <div class="empty-history">
                No interview history available.
            </div>
        `;

        return;
    }

    historyContainer.innerHTML =
        interviewHistory
            .map(item => {

                return `
                <div class="history-item">

                    <h4>
                        ${item.name}
                    </h4>

                    <p>
                        Role: ${item.role}
                    </p>

                    <p>
                        Recommendation:
                        ${item.recommendation}
                    </p>

                    <p>
                        ${item.date}
                    </p>

                </div>
                `;
            })
            .join("");
}

/* ==========================================
   Recommendation Generator
========================================== */

function generateRecommendation() {

    const {

        communication,
        technical,
        confidence

    } = interviewState.scores;

    const average =
        (
            communication +
            technical +
            confidence
        ) / 3;

    let recommendation =
        "";

    let strengths = [];

    let weaknesses = [];

    if (
        communication >= 8
    ) {

        strengths.push(
            "Strong Communication"
        );

    } else {

        weaknesses.push(
            "Communication"
        );
    }

    if (
        technical >= 8
    ) {

        strengths.push(
            "Technical Knowledge"
        );

    } else {

        weaknesses.push(
            "Technical Depth"
        );
    }

    if (
        confidence >= 8
    ) {

        strengths.push(
            "Confidence"
        );

    } else {

        weaknesses.push(
            "Confidence"
        );
    }

    if (
        average >= 8
    ) {

        recommendation =
            "Proceed to Technical Round";

    } else if (
        average >= 6
    ) {

        recommendation =
            "Consider for Further Evaluation";

    } else {

        recommendation =
            "Needs Improvement";
    }

    return {

        recommendation,

        strengths,

        weaknesses,

        average:
            average.toFixed(1)
    };
}

/* ==========================================
   Finish Interview
========================================== */

function finishInterview() {

    const report =
        generateRecommendation();

    updateProgress(100);

    markStepCompleted(step5);

    updateStage(
        "Final Assessment",
        "Interview completed."
    );

    addRecruiterMessage(
        `
Final Assessment

Average Score:
${report.average}/10

Strengths:
${report.strengths.join(", ") || "N/A"}

Areas for Improvement:
${report.weaknesses.join(", ") || "None"}

Recommendation:
${report.recommendation}
        `
    );

    interviewHistory.unshift({

        name:
            interviewState.candidate.name,

        role:
            interviewState.candidate.role,

        recommendation:
            report.recommendation,

        average:
            report.average,

        date:
            new Date()
                .toLocaleString()
    });

    if (
        interviewHistory.length > 20
    ) {

        interviewHistory =
            interviewHistory.slice(
                0,
                20
            );
    }

    saveInterviewHistory();

    renderHistory();

    interviewState.started =
        false;
}

/* ==========================================
   Auto Complete Logic
========================================== */

function checkInterviewCompletion() {

    const category =
        getSkillCategory();

    const totalQuestions =
        questionBank[
            category
        ].length;

    if (
        interviewState.currentQuestionIndex >=
        totalQuestions
    ) {

        setTimeout(
            finishInterview,
            1000
        );

        return true;
    }

    return false;
}

/* ==========================================
   Next Question Handler
========================================== */

/*
IMPORTANT:

Replace the existing section
inside processCandidateAnswer()

AFTER:

interviewState.currentQuestionIndex++;
interviewState.questionCount++;

WITH:
*/

function askNextQuestion() {

    if (
        checkInterviewCompletion()
    ) {
        return;
    }

    const nextQuestion =
        getNextQuestion();

    updateStage(
        "Question Generation",
        "Generating next interview question."
    );

    markStepCompleted(step2);

    setTimeout(() => {

        addRecruiterMessage(
            nextQuestion
        );

    }, 800);
}

/* ==========================================
   Reset Interview
========================================== */

function resetInterview() {

    interviewState.started =
        false;

    interviewState.currentQuestionIndex = 0;

    interviewState.questionCount = 0;

    interviewState.conversation = [];

    interviewState.scores = {

        communication: 0,

        technical: 0,

        confidence: 0
    };

    candidateName.value = "";

    candidateRole.value = "";

    candidateSkills.value = "";

    userMessage.value = "";

    chatContainer.innerHTML = `
    <div class="message recruiter">

        <div class="avatar">
            SJ
        </div>

        <div class="message-content">

            <h4>
                Sarah Johnson
            </h4>

            <p>
                Hello! I'm Sarah Johnson,
                Senior Technical Recruiter.

                Please enter your profile
                details and click
                "Start Interview"
                to begin.
            </p>

        </div>

    </div>
    `;

    updateScores(
        0,
        0,
        0
    );

    updateProgress(0);

    currentStage.textContent =
        "Profile Collection";

    promptStageCard.textContent =
        "Waiting to start interview";

    [
        step1,
        step2,
        step3,
        step4,
        step5
    ].forEach(step => {

        step.classList.remove(
            "completed"
        );
    });
}

/* ==========================================
   Report Generator
========================================== */

generateReportBtn.addEventListener(
    "click",
    () => {

        const report =
`
INTERVIEW REPORT

Candidate:
${interviewState.candidate.name || "N/A"}

Role:
${interviewState.candidate.role || "N/A"}

Communication:
${interviewState.scores.communication}/10

Technical:
${interviewState.scores.technical}/10

Confidence:
${interviewState.scores.confidence}/10

Generated By:
InterviewMate AI
`;

        const blob =
            new Blob(
                [report],
                {
                    type:
                    "text/plain"
                }
            );

        const url =
            URL.createObjectURL(
                blob
            );

        const link =
            document.createElement(
                "a"
            );

        link.href = url;

        link.download =
            "Interview-Report.txt";

        link.click();

        URL.revokeObjectURL(
            url
        );
    }
);

/* ==========================================
   Keyboard Shortcut
========================================== */

userMessage.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            processCandidateAnswer();
        }
    }
);

/* ==========================================
   Reset Button
========================================== */

resetInterviewBtn.addEventListener(
    "click",
    resetInterview
);

/* ==========================================
   IMPORTANT PATCH
========================================== */

/*
Inside processCandidateAnswer()
in Part 2:

AFTER:

interviewState.currentQuestionIndex++;
interviewState.questionCount++;

ADD:

askNextQuestion();

This allows the interview
to continue automatically.
*/

/* ==========================================
   App Initialization
========================================== */

function initializeApp() {

    initializeTheme();

    renderHistory();

    updateScores(
        0,
        0,
        0
    );

    updateProgress(0);
}

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);