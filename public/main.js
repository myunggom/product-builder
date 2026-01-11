document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const screens = {
        intro: document.getElementById('intro-screen'),
        quiz: document.getElementById('quiz-screen'),
        result: document.getElementById('result-screen')
    };
    
    const ui = {
        startBtn: document.getElementById('start-btn'),
        enterLinkBtn: document.getElementById('enter-link-btn'), // New button
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
        H: {
            title: "정직-겸손성",
            low: "자신의 이익을 위해 규범을 어기거나 남을 이용하는 것을 주저하지 않을 수 있습니다. 성공과 지위를 중요하게 생각합니다.",
            mid: "상황에 따라 융통성을 발휘합니다. 기본적으로 정직하려 하지만, 큰 손해를 보면서까지 원칙을 고수하지는 않습니다.",
            high: "정직과 진실성을 인생의 최우선 가치로 둡니다. 당장의 이익보다는 도덕적 원칙을 지키는 것을 중요하게 생각합니다."
        },
        E: {
            title: "정서적 불안정성",
            low: "스트레스 상황에서도 침착함을 유지합니다. 감정 기복이 적고 담대한 편이지만, 타인의 감정에 둔감할 수 있습니다.",
            mid: "일반적인 상황에서는 침착하지만, 큰 스트레스 상황에서는 불안감을 느낄 수 있습니다. 적당한 감수성을 지녔습니다.",
            high: "감수성이 풍부하고 타인의 감정에 깊이 공감합니다. 걱정이 많거나 쉽게 불안해질 수 있어 정서적 지지가 필요합니다."
        },
        X: {
            title: "외향성",
            low: "혼자만의 시간에서 에너지를 얻습니다. 조용하고 차분하며, 깊이 있는 관계를 선호합니다.",
            mid: "사람들과 어울리는 것도 좋지만, 가끔은 혼자만의 시간도 필요합니다. 상황에 따라 리더와 팔로워 역할을 오갑니다.",
            high: "사람들 속에 있을 때 에너지가 넘칩니다. 활발하고 사교적이며, 모임의 분위기를 주도하는 것을 좋아합니다."
        },
        A: {
            title: "원만성",
            low: "자신의 주장이 뚜렷하고 비판적입니다. 갈등 상황에서 물러서지 않으며, 때로는 다소 공격적으로 보일 수 있습니다.",
            mid: "대체로 원만하지만, 불합리한 상황에서는 화를 내거나 단호하게 대처합니다. 균형 잡힌 대인관계를 유지합니다.",
            high: "타인을 잘 용서하고 이해심이 넓습니다. 다툼을 싫어하며, 손해를 보더라도 양보하여 평화를 지키려 노력합니다."
        },
        C: {
            title: "성실성",
            low: "즉흥적이고 자유로운 영혼입니다. 계획보다는 기분과 상황에 따라 움직이며, 정리정돈보다는 창의적 혼돈을 즐깁니다.",
            mid: "기본적인 책임감은 있지만, 너무 빡빡한 계획보다는 어느 정도의 여유를 선호합니다. 일과 휴식의 균형을 찾습니다.",
            high: "매우 꼼꼼하고 계획적입니다. 목표를 세우면 끝까지 완수하며, 체계적이고 질서 정연한 환경을 선호합니다."
        },
        O: {
            title: "개방성",
            low: "익숙하고 편안한 것을 선호합니다. 현실적이고 실용적인 사고를 하며, 급격한 변화보다는 안정을 추구합니다.",
            mid: "새로운 것에 호기심은 있지만, 너무 파격적인 것은 경계합니다. 전통과 혁신 사이에서 균형을 유지합니다.",
            high: "새로운 경험과 지식을 끊임없이 탐구합니다. 독창적이고 예술적인 감각이 뛰어나며, 남들과 다른 생각을 즐깁니다."
        }
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

    // --- Manual Link Entry Logic ---
    if (ui.enterLinkBtn) {
        ui.enterLinkBtn.addEventListener('click', () => {
            const input = prompt("친구가 공유한 결과 링크(초대장)를 붙여넣으세요:");
            if (!input) return;

            try {
                const url = new URL(input);
                const hostParam = url.searchParams.get('host');
                const dataParam = url.searchParams.get('data');
                
                // If it's an invite link (?host=...) or just a result link (?data=...)
                // We treat both as "Friend's data" to compare against.
                const targetData = hostParam || dataParam;

                if (targetData) {
                    friendScores = JSON.parse(atob(targetData));
                    alert("친구의 데이터를 불러왔습니다! \n이제 '진단 시작하기'를 눌러 나의 성격을 테스트하고 비교해보세요.");
                    
                    // Update UI to show we are in comparison mode
                    ui.introHeader.innerHTML = `
                        <h1>⚔️ 성격 비교 챌린지</h1>
                        <p>친구(입력됨)와 비교 모드입니다.<br>진단을 시작하여 궁합을 확인하세요!</p>
                    `;
                    ui.startBtn.innerText = "대결 시작하기";
                    ui.enterLinkBtn.style.display = 'none'; // Hide after success
                } else {
                    alert("유효하지 않은 링크입니다. 링크를 다시 확인해주세요.");
                }
            } catch (e) {
                alert("링크 형식이 올바르지 않습니다.");
            }
        });
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
            let level = "";
            let text = "";

            if (score <= 9) {
                level = "낮음";
                text = interpretations[key].low;
            } else if (score <= 14) {
                level = "보통";
                text = interpretations[key].mid;
            } else {
                level = "높음";
                text = interpretations[key].high;
            }
            
            // Badge style adjustment for levels
            let badgeColor = "#636e72"; // Default gray
            if (level === "높음") badgeColor = "#6c5ce7";
            else if (level === "보통") badgeColor = "#0984e3";
            else badgeColor = "#d63031";

            const div = document.createElement('div');
            div.className = 'result-section';
            div.innerHTML = `<h3>${interpretations[key].title} <span class="score-badge" style="background:${badgeColor}; color:white; border:none;">${score}점 (${level})</span></h3><p>${text}</p>`;
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
        
        // Check Theme for Colors
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark' || 
                       (!document.documentElement.getAttribute('data-theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        const textColor = isDark ? '#f5f6fa' : '#2d3436';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';

        const datasets = [{
            label: '나',
            data: Object.values(myScores),
            fill: true,
            backgroundColor: 'rgba(108, 92, 231, 0.4)',
            borderColor: 'rgb(108, 92, 231)',
            pointBackgroundColor: 'rgb(108, 92, 231)',
            pointBorderColor: isDark ? '#fff' : '#fff', // White border for contrast
        }];

        // Add Friend's Dataset if exists
        if (friendScores) {
            datasets.push({
                label: '친구',
                data: Object.values(friendScores),
                fill: true,
                backgroundColor: 'rgba(253, 121, 168, 0.4)',
                borderColor: 'rgb(253, 121, 168)',
                pointBackgroundColor: 'rgb(253, 121, 168)',
                pointBorderColor: isDark ? '#fff' : '#fff',
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
                        angleLines: { display: true, color: gridColor },
                        grid: { color: gridColor },
                        pointLabels: {
                            color: textColor,
                            font: { size: 13, family: "'Pretendard', sans-serif", weight: 'bold' }
                        },
                        suggestedMin: 0, suggestedMax: 20,
                        ticks: { display: false, backdropColor: 'transparent' }
                    }
                },
                plugins: {
                    legend: {
                        labels: { color: textColor, font: { family: "'Pretendard', sans-serif" } }
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

    // --- Save Image Logic ---
    const showSaveOptionsBtn = document.getElementById('show-save-options-btn');
    const saveOptionsDiv = document.getElementById('save-options');
    const saveFileBtn = document.getElementById('save-file-btn');
    const copyImgBtn = document.getElementById('copy-img-btn');

    // Load html2canvas immediately to be ready
    const script = document.createElement('script');
    script.src = "https://html2canvas.hertzen.com/dist/html2canvas.min.js";
    document.head.appendChild(script);

    showSaveOptionsBtn.addEventListener('click', () => {
        saveOptionsDiv.classList.toggle('visible');
    });

    function captureResult(callback) {
        const target = document.querySelector('.container');
        // Temporarily hide buttons for clean capture
        const buttons = document.querySelector('.action-buttons');
        const themeBtn = document.getElementById('theme-toggle');
        buttons.style.display = 'none';
        themeBtn.style.display = 'none';

        html2canvas(target, { 
            backgroundColor: getComputedStyle(document.body).getPropertyValue('--bg-color') 
        }).then(canvas => {
            // Restore buttons
            buttons.style.display = 'flex';
            themeBtn.style.display = 'block';
            callback(canvas);
        }).catch(err => {
            buttons.style.display = 'flex';
            themeBtn.style.display = 'block';
            alert("이미지 생성 중 오류가 발생했습니다.");
        });
    }

    saveFileBtn.addEventListener('click', () => {
        captureResult((canvas) => {
            const link = document.createElement('a');
            link.download = 'hexaco_result.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    copyImgBtn.addEventListener('click', () => {
        captureResult((canvas) => {
            canvas.toBlob(blob => {
                try {
                    const item = new ClipboardItem({ 'image/png': blob });
                    navigator.clipboard.write([item]).then(() => {
                        alert("이미지가 클립보드에 복사되었습니다! \n메신저나 문서에 붙여넣기(Ctrl+V) 하세요.");
                    }).catch(err => {
                        console.error(err);
                        alert("이 브라우저는 이미지 복사를 지원하지 않거나 권한이 없습니다. '파일로 저장'을 이용해주세요.");
                    });
                } catch (err) {
                    alert("이 브라우저에서는 클립보드 복사를 지원하지 않습니다.");
                }
            });
        });
    });

    // --- Dark Mode ---
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        body.classList.add('dark-mode'); // Note: style.css uses media query, but class override is better for manual toggle
        // We need to add a manual class support in CSS or just rely on system?
        // Let's force a class 'dark-theme' and update CSS to respect it.
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.innerText = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        if (current === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeBtn.innerText = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerText = '☀️';
            localStorage.setItem('theme', 'dark');
        }
        
        // Re-render chart to update colors
        if (!screens.result.classList.contains('hidden')) {
            renderChart();
        }
    });
});
