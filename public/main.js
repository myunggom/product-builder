document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const screens = {
        intro: document.getElementById('intro-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen')
    };
    
    const ui = {
        startBtn: document.getElementById('start-btn'),
        progressFill: document.getElementById('progress-fill'),
        qNumber: document.getElementById('question-number'),
        qText: document.getElementById('question-text'),
        options: document.querySelectorAll('.option-btn'),
        retryBtn: document.getElementById('retry-btn'),
        shareBtn: document.getElementById('share-btn'),
        resultDesc: document.getElementById('result-description')
    };

    // --- Data: Simplified HEXACO Questions (2 questions per dimension for demo) ---
    // H: Honesty-Humility, E: Emotionality, X: eXtraversion, A: Agreeableness, C: Conscientiousness, O: Openness
    const questions = [
        { id: 1, type: 'H', text: "나는 내 이익을 위해 남을 이용하지 않는다." },
        { id: 2, type: 'H', text: "나는 사치스러운 물건을 갖고 싶지 않다." },
        { id: 3, type: 'E', text: "나는 미래에 대해 걱정을 많이 하는 편이다." },
        { id: 4, type: 'E', text: "나는 감정의 기복이 심한 편이다." },
        { id: 5, type: 'X', text: "나는 사람들과 어울리는 것을 좋아한다." },
        { id: 6, type: 'X', text: "나는 활기차고 에너지가 넘친다." },
        { id: 7, type: 'A', text: "나는 화가 나도 금방 용서하는 편이다." },
        { id: 8, type: 'A', text: "나는 다른 사람의 의견을 잘 받아들인다." },
        { id: 9, type: 'C', text: "나는 계획을 세우고 실천하는 것을 좋아한다." },
        { id: 10, type: 'C', text: "나는 목표를 달성하기 위해 열심히 노력한다." },
        { id: 11, type: 'O', text: "나는 예술과 자연의 아름다움을 즐긴다." },
        { id: 12, type: 'O', text: "나는 새로운 아이디어나 지식에 호기심이 많다." }
    ];

    let currentQIndex = 0;
    let scores = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
    let chartInstance = null;

    // --- Check for Shared Result URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('data');

    if (sharedData) {
        // If URL has data, show result directly
        try {
            const decodedScores = JSON.parse(atob(sharedData));
            scores = decodedScores;
            showScreen('result');
            renderChart();
            ui.resultDesc.innerText = "공유받은 친구의 성격 유형 결과입니다.";
            ui.shareBtn.style.display = 'none'; // Hide share button when viewing shared result
        } catch (e) {
            console.error("Invalid share data");
        }
    }

    // --- Navigation ---
    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
    }

    // --- Quiz Logic ---
    ui.startBtn.addEventListener('click', () => {
        resetQuiz();
        showScreen('quiz');
        renderQuestion();
    });

    function resetQuiz() {
        currentQIndex = 0;
        scores = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
        // Reset URL
        window.history.pushState({}, document.title, window.location.pathname);
        ui.shareBtn.style.display = 'block';
    }

    function renderQuestion() {
        const q = questions[currentQIndex];
        ui.qNumber.innerText = `Q${currentQIndex + 1}.`;
        ui.qText.innerText = q.text;
        
        // Update Progress Bar
        const progress = ((currentQIndex) / questions.length) * 100;
        ui.progressFill.style.width = `${progress}%`;
    }

    ui.options.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const score = parseInt(e.target.dataset.score);
            const type = questions[currentQIndex].type;
            
            // Add score
            scores[type] += score;

            // Next Question
            currentQIndex++;
            if (currentQIndex < questions.length) {
                renderQuestion();
            } else {
                finishQuiz();
            }
        });
    });

    function finishQuiz() {
        showScreen('result');
        // Normalize scores (Max score per type is 10 (2 questions * 5 points))
        // Let's scale it to 0-100 for chart
        // Current max is 10. So multiply by 10.
        // Actually, let's keep it raw or average.
        
        renderChart();
        ui.resultDesc.innerText = "당신의 HEXACO 성격 유형 분석 결과입니다. 
각 항목이 균형 잡혀 있는지 확인해보세요!";
    }

    // --- Chart.js ---
    function renderChart() {
        const ctx = document.getElementById('resultChart').getContext('2d');
        
        // Data preparation
        // Each type max score = 10.
        const dataValues = [
            scores.H, scores.E, scores.X, scores.A, scores.C, scores.O
        ];

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['정직-겸손성(H)', '정서적불안정(E)', '외향성(X)', '원만성(A)', '성실성(C)', '개방성(O)'],
                datasets: [{
                    label: '내 성격 점수',
                    data: dataValues,
                    fill: true,
                    backgroundColor: 'rgba(108, 92, 231, 0.2)',
                    borderColor: 'rgb(108, 92, 231)',
                    pointBackgroundColor: 'rgb(108, 92, 231)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(108, 92, 231)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0,
                        suggestedMax: 10, // Max possible score
                        ticks: { stepSize: 2, display: false } // Hide numbers
                    }
                },
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }

    // --- Share Logic ---
    ui.shareBtn.addEventListener('click', () => {
        // Encode scores to base64 string
        const dataString = btoa(JSON.stringify(scores));
        const shareUrl = `${window.location.origin}${window.location.pathname}?data=${dataString}`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('결과 링크가 복사되었습니다! 친구에게 공유해보세요.');
        }).catch(err => {
            console.error('Copy failed', err);
            prompt("이 링크를 복사하세요:", shareUrl);
        });
    });

    ui.retryBtn.addEventListener('click', () => {
        resetQuiz();
        showScreen('intro');
    });
});
