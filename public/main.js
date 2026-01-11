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
            veryLow: "자신의 이익을 위해서라면 규칙을 어기거나 타인을 이용하는 것도 마다하지 않습니다. 부와 명예, 지위가 인생의 가장 중요한 목표일 수 있습니다.",
            low: "사회적 성공과 이익을 중요하게 생각합니다. 필요하다면 약간의 편법을 사용할 수도 있으며, 자신을 드러내고 과시하는 것을 즐깁니다.",
            mid: "일반적인 수준의 정직함을 가지고 있습니다. 법과 도덕을 지키려 노력하지만, 큰 손해를 보면서까지 고지식하게 원칙을 고수하지는 않는 융통성이 있습니다.",
            high: "정직하고 진실한 태도를 중요시합니다. 사치나 허영심이 적고, 공정한 규칙 내에서 경쟁하는 것을 선호합니다.",
            veryHigh: "청렴결백 그 자체입니다. 부정직한 방법으로 얻는 이익에는 전혀 관심이 없으며, 도덕적 원칙을 목숨처럼 소중히 여깁니다."
        },
        E: {
            title: "정서적 불안정성",
            veryLow: "강철 멘탈의 소유자입니다. 어떤 위기 상황에서도 눈 하나 깜짝하지 않는 침착함을 유지하며, 감정 기복이 거의 없습니다.",
            low: "걱정이 적고 대범한 편입니다. 스트레스를 잘 받지 않으며, 힘든 일도 훌훌 털어버리는 긍정적인 태도를 가졌습니다.",
            mid: "적당한 감수성을 지녔습니다. 일상생활에서는 침착하지만, 큰 스트레스나 감동적인 상황에서는 감정이 흔들릴 수 있습니다.",
            high: "감수성이 풍부하고 타인의 감정에 깊이 공감합니다. 때로는 걱정이 앞서거나 마음이 여려 상처를 받을 수 있습니다.",
            veryHigh: "매우 섬세하고 예민한 감성을 가졌습니다. 타인의 아픔을 자신의 것처럼 느끼며, 불안이나 걱정이 많아 정서적 지지가 필요합니다."
        },
        X: {
            title: "외향성",
            veryLow: "완벽한 집순이/집돌이입니다. 사람들과 만나는 것보다는 혼자만의 공간에서 사색하고 취미를 즐길 때 가장 큰 행복을 느낍니다.",
            low: "조용하고 차분한 성격입니다. 낯선 사람보다는 깊은 관계의 소수와 어울리는 것을 선호하며, 나서기보다는 듣는 편입니다.",
            mid: "상황에 따라 외향적이기도, 내향적이기도 합니다. 사람들과 어울리는 것도 좋지만, 반드시 혼자만의 충전 시간이 필요합니다.",
            high: "활발하고 사교적입니다. 모임이나 파티를 즐기며, 처음 보는 사람과도 쉽게 친해지는 친화력을 가졌습니다.",
            veryHigh: "에너지가 넘치는 인싸 중의 인싸! 사람들과 함께 있을 때 에너지가 샘솟으며, 분위기를 주도하고 리더 역할을 즐깁니다."
        },
        A: {
            title: "원만성",
            veryLow: "자신의 주관이 매우 뚜렷하고 직설적입니다. 불합리한 일에는 참지 않으며, 갈등 상황에서도 절대 물러서지 않는 파이터 기질이 있습니다.",
            low: "비판적인 시각을 가지고 있습니다. 타인의 의견을 무조건 수용하기보다는 논리적으로 따지는 편이며, 화가 나면 감추지 않습니다.",
            mid: "대체로 원만하지만, 선을 넘는 행동에는 단호하게 대처합니다. 적절한 균형 감각으로 대인관계를 유지합니다.",
            high: "이해심이 넓고 따뜻한 사람입니다. 타인의 실수를 잘 용서해주며, 웬만해서는 화를 내지 않고 평화롭게 해결하려 합니다.",
            veryHigh: "살아있는 천사입니다. 갈등을 극도로 싫어하여 자신이 손해를 보더라도 양보하며, 모든 사람과 잘 지내려는 성인군자 같은 마음씨를 가졌습니다."
        },
        C: {
            title: "성실성",
            veryLow: "즉흥적이고 자유분방합니다. 계획에 얽매이는 것을 싫어하며, 그때그때의 기분과 영감에 따라 행동하는 보헤미안 스타일입니다.",
            low: "여유를 중요하게 생각합니다. 너무 빡빡한 일정보다는 융통성 있는 진행을 선호하며, 완벽함보다는 효율이나 즐거움을 추구합니다.",
            mid: "책임감이 있고 맡은 일은 처리합니다. 다만, 쉴 때는 확실히 쉬어야 하며 일과 삶의 균형(워라밸)을 중요시합니다.",
            high: "꼼꼼하고 계획적입니다. 목표를 세우면 체계적으로 실천하며, 정리정돈이 잘 된 환경에서 능률이 오릅니다.",
            veryHigh: "완벽주의자입니다. 작은 실수 하나도 용납하지 않으며, 철저한 계획과 끈기로 목표한 바를 반드시 성취해냅니다."
        },
        O: {
            title: "개방성",
            veryLow: "현실적이고 보수적입니다. 익숙한 방식과 전통을 선호하며, 불확실한 모험보다는 확실한 안정을 추구합니다.",
            low: "실용주의자입니다. 뜬구름 잡는 이야기보다는 눈에 보이는 성과와 사실을 중요하게 생각합니다.",
            mid: "새로운 것에 대한 호기심은 있지만, 너무 파격적인 변화는 경계합니다. 현실과 이상 사이에서 균형을 잡습니다.",
            high: "호기심이 많고 탐구적입니다. 새로운 지식, 문화, 예술을 접하는 것을 즐기며 창의적인 아이디어가 많습니다.",
            veryHigh: "시대를 앞서가는 혁신가입니다. 남들이 생각하지 못하는 독창적인 발상을 하며, 끊임없이 새로운 경험과 미지의 세계를 갈망합니다."
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
            let badgeColor = "#636e72"; 

            if (score <= 7) {
                level = "매우 낮음";
                text = interpretations[key].veryLow;
                badgeColor = "#2d3436";
            } else if (score <= 10) {
                level = "낮음";
                text = interpretations[key].low;
                badgeColor = "#636e72";
            } else if (score <= 13) {
                level = "보통";
                text = interpretations[key].mid;
                badgeColor = "#0984e3";
            } else if (score <= 16) {
                level = "높음";
                text = interpretations[key].high;
                badgeColor = "#6c5ce7";
            } else {
                level = "매우 높음";
                text = interpretations[key].veryHigh;
                badgeColor = "#d63031"; // Highlight color for extreme high
            }
            
            const div = document.createElement('div');
            div.className = 'result-section';
            div.innerHTML = `<h3>${interpretations[key].title} <span class="score-badge" style="background:${badgeColor}; color:white; border:none;">${score}점 (${level})</span></h3><p>${text}</p>`;
            ui.resultDetail.appendChild(div);
        });
    }

    function renderComparisonDetails() {
        ui.resultDetail.innerHTML = '';
        const keys = ['H', 'E', 'X', 'A', 'C', 'O'];
        
        // --- 1. Calculate Compatibility & Stats ---
        let totalDiff = 0;
        let minDiff = Infinity;
        let maxDiff = -1;
        let bestMatchTrait = '';
        let biggestGapTrait = '';

        keys.forEach(k => {
            const diff = Math.abs(myScores[k] - friendScores[k]);
            totalDiff += diff;
            
            if (diff < minDiff) {
                minDiff = diff;
                bestMatchTrait = interpretations[k].title;
            }
            if (diff > maxDiff) {
                maxDiff = diff;
                biggestGapTrait = interpretations[k].title;
            }
        });
        
        const matchRate = Math.max(0, 100 - (totalDiff * 2)); 

        // --- 2. Determine Archetype ---
        let archetypeTitle = "";
        let archetypeDesc = "";
        
        if (matchRate >= 90) {
            archetypeTitle = "💖 영혼의 단짝 (Soulmates)";
            archetypeDesc = "두 분은 마치 거울을 보는 것처럼 닮아있네요! 서로의 생각과 가치관이 거의 일치하여 눈빛만 봐도 통하는 사이입니다.";
        } else if (matchRate >= 70) {
            archetypeTitle = "✨ 환상의 파트너 (Fantastic Partners)";
            archetypeDesc = "아주 높은 싱크로율을 자랑합니다. 비슷한 가치관을 공유하면서도 약간의 다른 매력이 있어 서로에게 좋은 자극이 됩니다.";
        } else if (matchRate >= 50) {
            archetypeTitle = "⚖️ 상호 보완적인 관계 (Complementary)";
            archetypeDesc = "비슷한 점과 다른 점이 조화롭게 섞여 있습니다. 서로의 부족한 점을 채워주며 함께 성장할 수 있는 건강한 관계입니다.";
        } else if (matchRate >= 30) {
            archetypeTitle = "🧩 서로 다른 매력 (Different Charms)";
            archetypeDesc = "서로 세상을 바라보는 관점이 꽤 다르군요! 나의 생각과는 다른 친구의 시각이 신선한 충격과 재미를 줄 수 있습니다.";
        } else {
            archetypeTitle = "⚡ 정반대의 끌림 (Opposites Attract)";
            archetypeDesc = "자석의 N극과 S극처럼 정반대의 성향을 가졌습니다. 서로 이해하기 힘들 수도 있지만, 내가 가지지 못한 모습에 강렬하게 끌릴 수도 있습니다.";
        }

        // --- 3. Render Summary Section ---
        const summary = document.createElement('div');
        summary.className = 'result-section';
        summary.style.background = 'linear-gradient(135deg, #fd79a8, #e84393)';
        summary.style.color = 'white';
        summary.innerHTML = `
            <h3 style="color:white; margin-bottom:10px; font-size:1.3rem;">${archetypeTitle}</h3>
            <p style="margin-bottom:15px; font-weight:bold;">궁합 점수: ${Math.round(matchRate)}점</p>
            <p style="margin-bottom:15px; line-height:1.6;">${archetypeDesc}</p>
            <div style="background:rgba(255,255,255,0.2); padding:10px; border-radius:10px; margin-top:10px;">
                <p><strong>🤝 찰떡 포인트:</strong> ${bestMatchTrait} (차이 ${minDiff}점)</p>
                <p><strong>⚡ 반전 포인트:</strong> ${biggestGapTrait} (차이 ${maxDiff}점)</p>
            </div>
        `;
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
