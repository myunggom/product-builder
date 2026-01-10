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
        resultDetail: document.getElementById('result-detail')
    };

    // --- Data: 24 Questions (4 per dimension) ---
    // H: 정직-겸손성, E: 정서적 불안정성, X: 외향성, A: 원만성, C: 성실성, O: 개방성
    const questions = [
        // H: Honesty-Humility
        { type: 'H', text: "나는 내 이익을 위해 다른 사람에게 아부하지 않는다." },
        { type: 'H', text: "나는 돈이나 지위가 내 인생의 가장 중요한 목표는 아니다." },
        { type: 'H', text: "나는 법이나 규칙을 어기면서까지 이득을 취하고 싶지 않다." },
        { type: 'H', text: "나는 내가 남들보다 특별히 더 뛰어난 사람이라고 생각하지 않는다." },
        
        // E: Emotionality
        { type: 'E', text: "나는 미래에 대해 걱정을 많이 하는 편이다." },
        { type: 'E', text: "나는 슬픈 영화나 이야기를 들으면 쉽게 눈물이 난다." },
        { type: 'E', text: "나는 위급한 상황이 닥치면 쉽게 당황한다." },
        { type: 'E', text: "나는 다른 사람의 감정에 깊이 공감하는 편이다." },

        // X: eXtraversion
        { type: 'X', text: "나는 처음 보는 사람과도 쉽게 대화를 시작한다." },
        { type: 'X', text: "나는 사람들 앞에 나서서 이야기하는 것을 좋아한다." },
        { type: 'X', text: "나는 혼자 있는 것보다 여럿이 함께 있는 것을 선호한다." },
        { type: 'X', text: "나는 항상 활기차고 에너지가 넘친다." },

        // A: Agreeableness
        { type: 'A', text: "나는 화가 나도 금방 잊어버리고 용서하는 편이다." },
        { type: 'A', text: "나는 다른 사람의 실수를 너그럽게 받아들인다." },
        { type: 'A', text: "나는 내 의견과 다르더라도 타인의 의견을 존중한다." },
        { type: 'A', text: "나는 남을 비판하기보다는 장점을 보려고 노력한다." },

        // C: Conscientiousness
        { type: 'C', text: "나는 계획을 세우고 그것을 철저히 지키려고 노력한다." },
        { type: 'C', text: "나는 방이나 책상을 항상 정돈된 상태로 유지한다." },
        { type: 'C', text: "나는 목표를 달성하기 위해 끈기 있게 노력한다." },
        { type: 'C', text: "나는 일을 할 때 실수 없이 꼼꼼하게 처리한다." },

        // O: Openness to Experience
        { type: 'O', text: "나는 예술 작품이나 자연의 아름다움을 감상하는 것을 즐긴다." },
        { type: 'O', text: "나는 새로운 아이디어나 지식에 대해 호기심이 많다." },
        { type: 'O', text: "나는 독창적이고 창의적인 생각을 자주 한다." },
        { type: 'O', text: "나는 낯선 문화나 환경을 경험하는 것을 좋아한다." }
    ];

    // Shuffle questions slightly for better UX (optional, keeping order for now for balance)
    
    // Result Descriptions (Content for AdSense)
    const interpretations = {
        H: {
            title: "정직-겸손성 (Honesty-Humility)",
            high: "당신은 정직하고 진실하며, 물질적인 탐욕이 적은 사람입니다. 타인을 조종하거나 이용하려 하지 않으며, 자신의 분수를 지킬 줄 압니다. 법과 규칙을 준수하는 것을 중요하게 생각합니다.",
            low: "당신은 자신의 이익을 위해 상황을 유리하게 이끌어가는 능력이 있습니다. 물질적인 부와 사회적 지위를 중요하게 생각하며, 때로는 자신을 돋보이게 하는 것을 즐깁니다."
        },
        E: {
            title: "정서적 불안정성 (Emotionality)",
            high: "당신은 감수성이 풍부하고 타인의 감정에 깊이 공감합니다. 하지만 걱정이 많고 스트레스에 민감할 수 있습니다. 위급 상황에서 도움을 필요로 할 때가 있으며, 정서적인 유대감을 중요시합니다.",
            low: "당신은 감정의 기복이 적고 차분한 사람입니다. 스트레스를 잘 받지 않으며, 어려운 상황에서도 냉정함을 잃지 않습니다. 타인에게 의존하기보다는 독립적으로 문제를 해결하려는 경향이 있습니다."
        },
        X: {
            title: "외향성 (Extraversion)",
            high: "당신은 사교적이고 에너지가 넘치는 사람입니다. 사람들과 어울리는 것을 즐기며, 긍정적이고 자신감이 있습니다. 리더십을 발휘하는 상황에서 편안함을 느낍니다.",
            low: "당신은 조용하고 차분한 성격입니다. 많은 사람들과 어울리기보다는 소수의 친한 친구와 깊은 관계를 맺는 것을 선호합니다. 혼자만의 시간을 통해 에너지를 충전하는 편입니다."
        },
        A: {
            title: "원만성 (Agreeableness)",
            high: "당신은 평화주의자이며 타인을 잘 용서합니다. 화를 잘 내지 않으며, 갈등 상황에서도 타협하려고 노력합니다. 사람들에게 협조적이고 따뜻한 태도를 보입니다.",
            low: "당신은 자신의 주장이 뚜렷하고, 불합리한 상황에서는 직설적으로 비판할 수 있습니다. 화가 나면 쉽게 풀리지 않을 수 있으며, 타협보다는 자신의 원칙을 고수하는 편입니다."
        },
        C: {
            title: "성실성 (Conscientiousness)",
            high: "당신은 체계적이고 꼼꼼한 사람입니다. 목표를 세우고 이를 달성하기 위해 끈기 있게 노력합니다. 충동을 잘 억제하며, 신중하게 의사결정을 내립니다.",
            low: "당신은 즉흥적이고 유연한 사고를 가지고 있습니다. 틀에 박힌 계획보다는 상황에 따라 대처하는 것을 선호합니다. 때로는 실수가 있을 수 있지만, 빠른 결단력을 보이기도 합니다."
        },
        O: {
            title: "개방성 (Openness to Experience)",
            high: "당신은 창의적이고 호기심이 많습니다. 예술과 아름다움에 대한 감수성이 뛰어나며, 새로운 지식이나 경험을 받아들이는 데 주저함이 없습니다. 독창적인 아이디어를 내는 것을 즐깁니다.",
            low: "당신은 현실적이고 실용적인 사람입니다. 추상적인 아이디어보다는 구체적인 사실을 중시합니다. 검증된 방식과 전통을 따르는 것을 선호하며, 익숙한 환경에서 편안함을 느낍니다."
        }
    };

    let currentQIndex = 0;
    let scores = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
    let chartInstance = null;

    // --- Check for Shared Result URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const sharedData = urlParams.get('data');

    if (sharedData) {
        try {
            const decodedScores = JSON.parse(atob(sharedData));
            scores = decodedScores;
            showScreen('result');
            renderChart();
            renderResultDetails();
            document.querySelector('#result-screen header h2').innerText = "친구의 성격 유형 결과";
            ui.shareBtn.style.display = 'none'; 
        } catch (e) {
            console.error("Invalid share data");
        }
    }

    // --- Navigation ---
    function showScreen(screenName) {
        Object.values(screens).forEach(s => s.classList.add('hidden'));
        screens[screenName].classList.remove('hidden');
        window.scrollTo(0, 0);
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
        window.history.pushState({}, document.title, window.location.pathname);
        ui.shareBtn.style.display = 'block';
    }

    function renderQuestion() {
        const q = questions[currentQIndex];
        ui.qNumber.innerText = `Q${currentQIndex + 1} / ${questions.length}`;
        ui.qText.innerText = q.text;
        
        const progress = ((currentQIndex) / questions.length) * 100;
        ui.progressFill.style.width = `${progress}%`;
    }

    ui.options.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const score = parseInt(e.target.dataset.score);
            const type = questions[currentQIndex].type;
            
            scores[type] += score;

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
        renderChart();
        renderResultDetails();
    }

    function renderResultDetails() {
        ui.resultDetail.innerHTML = ''; // Clear previous

        const keys = ['H', 'E', 'X', 'A', 'C', 'O'];
        
        keys.forEach(key => {
            // Max score per trait is 4 questions * 5 points = 20.
            // Let's use 12 as a threshold for "High" vs "Low"
            const score = scores[key];
            const isHigh = score >= 12; // Median logic
            const text = isHigh ? interpretations[key].high : interpretations[key].low;
            const level = isHigh ? "높음" : "낮음";
            
            const section = document.createElement('div');
            section.className = 'result-section';
            section.innerHTML = `
                <h3>
                    ${interpretations[key].title}
                    <span class="score-badge">${level} (${score}점)</span>
                </h3>
                <p>${text}</p>
            `;
            ui.resultDetail.appendChild(section);
        });
    }

    // --- Chart.js ---
    function renderChart() {
        const ctx = document.getElementById('resultChart').getContext('2d');
        
        const dataValues = [
            scores.H, scores.E, scores.X, scores.A, scores.C, scores.O
        ];

        if (chartInstance) {
            chartInstance.destroy();
        }

        chartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['정직-겸손(H)', '정서불안(E)', '외향성(X)', '원만성(A)', '성실성(C)', '개방성(O)'],
                datasets: [{
                    label: '성격 점수',
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
                        suggestedMax: 20, // 4 questions * 5 max
                        ticks: { display: false }
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
        const dataString = btoa(JSON.stringify(scores));
        const shareUrl = `${window.location.origin}${window.location.pathname}?data=${dataString}`;

        navigator.clipboard.writeText(shareUrl).then(() => {
            alert('결과 링크가 복사되었습니다! 친구에게 공유해보세요.');
        }).catch(err => {
            prompt("이 링크를 복사하세요:", shareUrl);
        });
    });

    ui.retryBtn.addEventListener('click', () => {
        resetQuiz();
        showScreen('intro');
    });
});