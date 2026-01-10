document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Dark Mode Logic ---
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggleBtn.innerText = '☀️'; // Switch to sun icon for dark mode
    } else {
        themeToggleBtn.innerText = '🌙'; // Moon icon for light mode
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        // Update icon
        themeToggleBtn.innerText = isDark ? '☀️' : '🌙';
        
        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });


    // --- Lotto Logic ---

    // 1. 공 색상 대역 결정 함수
    function getBallClass(num) {
        if (num <= 10) return 'range-1';
        if (num <= 20) return 'range-11';
        if (num <= 30) return 'range-21';
        if (num <= 40) return 'range-31';
        return 'range-41';
    }

    // 2. 로또 번호 생성 로직 (1~45 중 6개 중복없이)
    function generateSingleGame() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return [...numbers].sort((a, b) => a - b);
    }

    // 3. 화면 출력 함수
    function displayLotto() {
        // 기존 내용 삭제
        resultContainer.innerHTML = '';

        // 5게임 반복 생성
        for (let i = 0; i < 5; i++) {
            const numbers = generateSingleGame();
            const row = document.createElement('div');
            row.className = 'lotto-row';

            numbers.forEach(num => {
                const ball = document.createElement('div');
                ball.className = `ball ${getBallClass(num)}`;
                ball.innerText = num;
                row.appendChild(ball);
            });

            resultContainer.appendChild(row);
        }
    }

    // 4. 버튼 이벤트 바인딩
    generateBtn.addEventListener('click', displayLotto);

    // 5. 시계 기능
    function updateClock() {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            weekday: 'short', 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: false
        };
        const timeString = now.toLocaleString('ko-KR', options);
        document.getElementById('clock').innerText = timeString;
    }
    
    // 초기 실행 및 1초마다 갱신
    updateClock();
    setInterval(updateClock, 1000);
});