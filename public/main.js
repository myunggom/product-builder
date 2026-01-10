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
        compareBtn: document.getElementById('compare-btn'), // New comparison button
        resultDetail: document.getElementById('result-detail'),
        introHeader: document.querySelector('#intro-screen header')
    };

    // --- Data: 24 Questions ---
    const questions = [
        { type: 'H', text: "나는 내 이익을 위해 다른 사람에게 아부하지 않는다." },
        { type: 'H', text: "나는 돈이나 지위가 내 인생의 가장 중요한 목표는 아니다." },
        { type: 'H', text: "나는 법이나 규칙을 어기면서까지 이득을 취하고 싶지 않다." },
        { type: 'H', text: "나는 내가 남들보다 특별히 더 뛰어난 사람이라고 생각하지 않는다." },
        { type: 'E', text: "나는 미래에 대해 걱정을 많이 하는 편이다." },
        { type: 'E', text: "나는 슬픈 영화나 이야기를 들으면 쉽게 눈물이 난다." },
        { type: 'E', text: "나는 위급한 상황이 닥치면 쉽게 당황한다." },
        { type: 'E', text: "나는 다른 사람의 감정에 깊이 공감하는 편이다." },
        { type: 'X', text: "나는 처음 보는 사람과도 쉽게 대화를 시작한다." },
        { type: 'X', text: "나는 사람들 앞에 나서서 이야기하는 것을 좋아한다." },
        { type: 'X', text: "나는 혼자 있는 것보다 여럿이 함께 있는 것을 선호한다." },
        { type: 'X', text: "나는 항상 활기차고 에너지가 넘친다." },
        { type: 'A', text: "나는 화가 나도 금방 잊어버리고 용서하는 편이다." },
        { type: 'A', text: "나는 다른 사람의 실수를 너그럽게 받아들인다." },
        { type: 'A', text: "나는 내 의견과 다르더라도 타인의 의견을 존중한다." },
        { type: 'A', text: "나는 남을 비판하기보다는 장점을 보려고 노력한다." },
        { type: 'C', text: "나는 계획을 세우고 그것을 철저히 지키려고 노력한다." },
        { type: 'C', text: "나는 방이나 책상을 항상 정돈된 상태로 유지한다." },
        { type: 'C', text: "나는 목표를 달성하기 위해 끈기 있게 노력한다." },
        { type: 'C', text: "나는 일을 할 때 실수 없이 꼼꼼하게 처리한다." },
        { type: 'O', text: "나는 예술 작품이나 자연의 아름다움을 감상하는 것을 즐긴다." },
        { type: 'O', text: "나는 새로운 아이디어나 지식에 대해 호기심이 많다." },
        { type: 'O', text: "나는 독창적이고 창의적인 생각을 자주 한다." },
        { type: 'O', text: "나는 낯선 문화나 환경을 경험하는 것을 좋아한다." }
    ];

    const interpretations = {
        H: { title: "정직-겸손성", high: "솔직하고 겸손한 성격입니다.", low: "자신의 이익을 우선시할 수 있습니다." },
        E: { title: "정서적 불안정성", high: "감수성이 풍부하고 공감 능력이 뛰어납니다.", low: "침착하고 스트레스에 강합니다." },
        X: { title: "외향성", high: "사교적이고 에너지가 넘칩니다.", low: "차분하고 독립적인 성격입니다." },
        A: { title: "원만성", high: "타인에게 관대하고 협조적입니다.", low: "주장이 강하고 비판적일 수 있습니다." },
        C: { title: "성실성", high: "체계적이고 목표 지향적입니다.", low: "즉흥적이고 유연한 사고를 가졌습니다." },
        O: { title: "개방성", high: "창의적이고 호기심이 많습니다.", low: "현실적이고 전통을 중시합니다." }
    };

    let currentQIndex = 0;
    let myScores = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
    let friendScores = null; // Store friend's data if comparison mode
    let chartInstance = null;

    // --- Logic: Comparison Mode ---
    const urlParams = new URLSearchParams(window.location.search);
    const hostData = urlParams.get('host'); // Data of the person who invited

    if (hostData) {
        // Mode: Invited by friend
        try {
            friendScores = JSON.parse(atob(hostData));
            ui.introHeader.innerHTML = `
                <h1>⚔️ 성격 비교 챌린지</h1>
                <p>친구가 비교 요청을 보냈습니다!<br>테스트를 완료하고 친구와 나의 궁합을 확인해보세요.</p>
            `;
            ui.startBtn.innerText = "대결 수락하고 시작하기";
        } catch (e) { console.error("Invalid host data"); }
    } else {
        // Normal Mode: Check if viewing result directly (legacy share)
        const simpleShareData = urlParams.get('data');
        if (simpleShareData) {
            try {
                myScores = JSON.parse(atob(simpleShareData));
                finishQuiz(true); // Skip straight to result
            } catch(e) {}
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
        myScores = { H: 0, E: 0, X: 0, A: 0, C: 0, O: 0 };
        // Don't clear URL param here so we know if we are in comparison mode
    }

    function renderQuestion() {
        const q = questions[currentQIndex];
        ui.qNumber.innerText = `Q${currentQIndex + 1} / ${questions.length}`;
        ui.qText.innerText = q.text;
        ui.progressFill.style.width = `${((currentQIndex) / questions.length) * 100}%`;
    }

    ui.options.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const score = parseInt(e.target.dataset.score);
            const type = questions[currentQIndex].type;
            myScores[type] += score;
            
            currentQIndex++;
            if (currentQIndex < questions.length) renderQuestion();
            else finishQuiz();
        });
    });

    function finishQuiz(isDirectView = false) {
        showScreen('result');
        
        // If comparison mode, update UI text
        const titleEl = document.querySelector('#result-screen header h2');
        const descEl = document.querySelector('#result-screen header p');
        
        if (friendScores) {
            titleEl.innerText = "나 vs 친구 비교 결과";
            descEl.innerText = "두 사람의 성격 차이를 확인해보세요!";
            ui.shareBtn.style.display = 'none'; // Comparison result is personal usually
            ui.compareBtn.style.display = 'block';
            ui.compareBtn.innerText = "🔗 이 비교 결과 공유하기";
        } else {
            titleEl.innerText = "나의 HEXACO 프로필";
            ui.compareBtn.style.display = 'block'; // Show "Invite Friend" button
        }

        renderChart();
        if(!friendScores) renderResultDetails();
        else renderComparisonDetails(); // New function for comparison text
    }

    function renderResultDetails() {
        ui.resultDetail.innerHTML = '';
        const keys = ['H', 'E', 'X', 'A', 'C', 'O'];
        keys.forEach(key => {
            const score = myScores[key];
            const isHigh = score >= 12;
            const text = isHigh ? interpretations[key].high : interpretations[key].low;
            
            const div = document.createElement('div');
            div.className = 'result-section';
            div.innerHTML = `<h3>${interpretations[key].title} <span class="score-badge">${score}점</span></h3><p>${text}</p>`;
            ui.resultDetail.appendChild(div);
        });
    }

    function renderComparisonDetails() {
        ui.resultDetail.innerHTML = '';
        const keys = ['H', 'E', 'X', 'A', 'C', 'O'];
        
        // Calculate Compatibility (Simple Logic: Difference)
        let totalDiff = 0;
        keys.forEach(k => totalDiff += Math.abs(myScores[k] - friendScores[k]));
        const matchRate = Math.max(0, 100 - (totalDiff * 2)); // Rough calculation
        
        const summary = document.createElement('div');
        summary.className = 'result-section';
        summary.style.background = '#e84393';
        summary.style.color = 'white';
        summary.innerHTML = `<h3 style="color:white">💖 우리 궁합 점수: ${Math.round(matchRate)}점</h3><p>점수가 높을수록 성격이 비슷해요!</p>`;
        ui.resultDetail.appendChild(summary);

        // Details
        keys.forEach(key => {
            const myS = myScores[key];
            const friendS = friendScores[key];
            const diff = myS - friendS;
            let comment = "";
            
            if (Math.abs(diff) < 4) comment = "두 분은 이 점이 아주 비슷해요! 통하는 게 많겠네요.";
            else if (diff > 0) comment = "당신이 더 높은 편이에요.";
            else comment = "친구가 더 높은 편이에요.";

            const div = document.createElement('div');
            div.className = 'result-section';
            div.innerHTML = `
                <h3>${interpretations[key].title}</h3>
                <p>나: ${myS}점 vs 친구: ${friendS}점<br>👉 ${comment}</p>
            `;
            ui.resultDetail.appendChild(div);
        });
    }

    // --- Chart.js ---
    function renderChart() {
        const ctx = document.getElementById('resultChart').getContext('2d');
        const labels = ['정직(H)', '정서(E)', '외향(X)', '원만(A)', '성실(C)', '개방(O)'];
        
        const datasets = [{
            label: '나',
            data: Object.values(myScores),
            fill: true,
            backgroundColor: 'rgba(108, 92, 231, 0.4)',
            borderColor: 'rgb(108, 92, 231)',
            pointBackgroundColor: 'rgb(108, 92, 231)'
        }];

        // Add Friend's Dataset if exists
        if (friendScores) {
            datasets.push({
                label: '친구',
                data: Object.values(friendScores),
                fill: true,
                backgroundColor: 'rgba(253, 121, 168, 0.4)',
                borderColor: 'rgb(253, 121, 168)',
                pointBackgroundColor: 'rgb(253, 121, 168)'
            });
        }

        if (chartInstance) chartInstance.destroy();

        chartInstance = new Chart(ctx, {
            type: 'radar',
            data: { labels: labels, datasets: datasets },
            options: {
                responsive: true,
                scales: {
                    r: {
                        angleLines: { display: true },
                        suggestedMin: 0, suggestedMax: 20,
                        ticks: { display: false }
                    }
                }
            }
        });
    }

    // --- Share Logic ---
    // 1. Simple Result Share
    ui.shareBtn.addEventListener('click', () => {
        const dataString = btoa(JSON.stringify(myScores));
        const url = `${window.location.origin}${window.location.pathname}?data=${dataString}`;
        copyToClipboard(url, '결과 링크가 복사되었습니다!');
    });

    // 2. Invite Friend for Comparison
    ui.compareBtn.addEventListener('click', () => {
        // Create an invitation link containing MY scores as 'host'
        // If already comparing, share the comparison result (both data? or just snapshot)
        // For simplicity, let's just share the invitation link.
        
        const dataString = btoa(JSON.stringify(myScores));
        const inviteUrl = `${window.location.origin}${window.location.pathname}?host=${dataString}`;
        
        copyToClipboard(inviteUrl, '🆚 친구 초대 링크가 복사되었습니다!\n친구에게 보내서 궁합을 확인해보세요.');
    });

    function copyToClipboard(text, msg) {
        navigator.clipboard.writeText(text).then(() => alert(msg))
        .catch(() => prompt("이 링크를 복사하세요:", text));
    }

    ui.retryBtn.addEventListener('click', () => {
        window.location.href = window.location.pathname; // Hard reset
    });
});
