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
        
        // Calculate Compatibility
        let totalDiff = 0;
        keys.forEach(k => totalDiff += Math.abs(myScores[k] - friendScores[k]));
        const matchRate = Math.max(0, 100 - (totalDiff * 2)); 
        
        const summary = document.createElement('div');
        summary.className = 'result-section';
        summary.style.background = 'linear-gradient(135deg, #fd79a8, #e84393)';
        summary.style.color = 'white';
        summary.innerHTML = `<h3 style="color:white; margin-bottom:5px;">💖 우리 궁합 점수: ${Math.round(matchRate)}점</h3><p>두 분의 성격 케미를 분석해봤어요!</p>`;
        ui.resultDetail.appendChild(summary);

        // Comparison Insights Logic
        const insights = {
            H: { // Honesty-Humility
                similar: "두 분 다 정직함과 겸손함을 중요하게 생각하네요. 신뢰를 바탕으로 한 깊은 관계가 가능합니다.",
                hostHigh: "친구는 원칙을 중요시하는 반면, 나는 융통성을 발휘하는 편이에요. 서로의 고지식함을 풀어주고 실리를 챙겨주는 좋은 파트너가 될 수 있어요.",
                guestHigh: "나는 원칙주의자이고, 친구는 실리를 추구하는 편이네요. 서로의 부족한 점을 보완해줄 수 있는 관계입니다."
            },
            E: { // Emotionality
                similar: "감정의 온도가 비슷해요. 서로가 언제 힘들어하고 언제 기뻐하는지 누구보다 잘 이해해줄 거예요.",
                hostHigh: "친구는 감수성이 풍부하고, 나는 덤덤한 편이에요. 내가 힘들 때 친구가 따뜻하게 공감해주고, 친구가 흔들릴 때 내가 든든한 버팀목이 되어줄 수 있어요.",
                guestHigh: "나는 감정이 풍부하고, 친구는 침착해요. 나의 고민을 친구가 이성적으로 잘 들어주며 중심을 잡아줄 수 있겠네요."
            },
            X: { // Extraversion
                similar: "에너지 레벨이 딱 맞아요! 함께 놀 때도, 쉴 때도 템포가 잘 맞아서 편안한 관계입니다.",
                hostHigh: "친구는 인싸 재질! 나를 즐거운 모임으로 이끌어줄 수 있어요. 반대로 조용한 휴식이 필요할 땐 내가 친구의 편안한 쉼터가 되어주겠죠.",
                guestHigh: "내가 분위기 메이커군요! 친구를 리드해주고, 친구는 묵묵히 나를 따라주며 균형을 맞추는 환상의 짝꿍입니다."
            },
            A: { // Agreeableness
                similar: "갈등 해결 방식이 비슷해요. 싸울 일이 별로 없거나, 싸워도 금방 화해하는 평화로운 사이입니다.",
                hostHigh: "친구는 다 받아주는 천사표네요. 내가 가끔 고집을 부려도 친구가 너그럽게 넘겨주며 관계를 유지해주는 편입니다.",
                guestHigh: "내가 마음이 넓군요. 친구가 가끔 까칠하게 굴어도 내가 웃으며 이해해주는 훈훈한 관계가 예상됩니다."
            },
            C: { // Conscientiousness
                similar: "일 처리 스타일이 비슷해서 함께 여행을 가거나 프로젝트를 해도 트러블이 적을 거예요.",
                hostHigh: "친구는 계획파, 나는 즉흥파! 친구가 꼼꼼하게 챙겨주면, 나는 의외의 즐거움과 유연함을 더해주는 시너지가 있어요.",
                guestHigh: "내가 계획을 세우면, 친구는 유연하게 따라가는 편이군요. 서로의 답답함과 불안함을 해소해줄 수 있는 조합입니다."
            },
            O: { // Openness
                similar: "관심사가 통하는 영혼의 단짝! 새로운 것을 함께 시도하거나 대화하는 것이 시간 가는 줄 모르게 즐거울 거예요.",
                hostHigh: "친구는 몽상가, 나는 현실가. 친구의 엉뚱하고 창의적인 아이디어를 내가 현실적으로 다듬어 완성할 수 있어요.",
                guestHigh: "나는 호기심 대장! 친구에게 새로운 세상을 보여주고, 친구는 나에게 안정감을 주는 조화로운 관계입니다."
            }
        };

        keys.forEach(key => {
            const myS = myScores[key]; // Guest (Current User)
            const friendS = friendScores[key]; // Host (Inviter)
            const diff = myS - friendS; // Positive: Guest Higher, Negative: Host Higher
            
            let insightText = "";
            let titleText = "";

            if (Math.abs(diff) < 5) {
                titleText = `${interpretations[key].title}: 🤝 찰떡궁합!`;
                insightText = insights[key].similar;
            } else if (diff < 0) { // Friend (Host) is higher
                titleText = `${interpretations[key].title}: 친구가 더 높아요`;
                insightText = insights[key].hostHigh;
            } else { // Me (Guest) is higher
                titleText = `${interpretations[key].title}: 내가 더 높아요`;
                insightText = insights[key].guestHigh;
            }

            const div = document.createElement('div');
            div.className = 'result-section';
            div.innerHTML = `
                <h3 style="font-size:1.1rem">${titleText}</h3>
                <p style="margin-top:5px; color:#555;">${insightText}</p>
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
