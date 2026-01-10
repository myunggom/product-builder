document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Menu Data with Placeholder Images (Unsplash Source API) ---
    // Using source.unsplash.com with specific keywords to get relevant images
    const menus = [
        { name: '삼겹살', category: '한식', keyword: 'pork belly bbq' },
        { name: '치킨', category: '한식/양식', keyword: 'fried chicken' },
        { name: '피자', category: '양식', keyword: 'pizza' },
        { name: '김치찌개', category: '한식', keyword: 'kimchi stew' },
        { name: '초밥', category: '일식', keyword: 'sushi' },
        { name: '떡볶이', category: '분식', keyword: 'tteokbokki' },
        { name: '짜장면', category: '중식', keyword: 'black bean noodles' },
        { name: '햄버거', category: '양식', keyword: 'hamburger' },
        { name: '파스타', category: '양식', keyword: 'pasta' },
        { name: '된장찌개', category: '한식', keyword: 'soybean paste stew' },
        { name: '족발', category: '한식', keyword: 'pork feet' },
        { name: '쌀국수', category: '아시안', keyword: 'pho' },
        { name: '마라탕', category: '중식', keyword: 'malatang' },
        { name: '칼국수', category: '한식', keyword: 'noodle soup' },
        { name: '비빔밥', category: '한식', keyword: 'bibimbap' },
        { name: '스테이크', category: '양식', keyword: 'steak' },
        { name: '돈가스', category: '일식/양식', keyword: 'pork cutlet' },
        { name: '라면', category: '분식', keyword: 'ramen' },
        { name: '샌드위치', category: '양식', keyword: 'sandwich' },
        { name: '불고기', category: '한식', keyword: 'bulgogi' }
    ];

    // --- Dark Mode Logic ---
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        themeToggleBtn.innerText = '☀️'; 
    } else {
        themeToggleBtn.innerText = '🌙'; 
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        themeToggleBtn.innerText = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // --- Menu Recommendation Logic ---

    function recommendMenu() {
        // Random selection
        const randomIndex = Math.floor(Math.random() * menus.length);
        const menu = menus[randomIndex];

        // Clear previous content
        resultContainer.innerHTML = '';

        // Create Card Elements
        const menuCard = document.createElement('div');
        menuCard.className = 'menu-card';

        // Image
        // Using a reliable placeholder service since Unsplash source is deprecated/unreliable
        // We will use a keyword search URL if possible or a static placeholder style
        // Modern approach: Use a specific image URL or a keyword-based service
        // For this demo, I will use a keyword based URL from 'pollinations.ai' or similar for variety, 
        // OR standard unsplash source if it still works for keywords, but let's use a safer generated URL pattern.
        // Actually, let's use a specialized food placeholder service or construct a query string.
        
        // Let's use `https://image.pollinations.ai/prompt/${keyword}` for AI generated food images 
        // or standard Unsplash source `https://source.unsplash.com/featured/?${keyword}` (Note: Unsplash Source is being deprecated).
        // Let's use `https://loremflickr.com` for reliability.
        
        const imgUrl = `https://loremflickr.com/300/200/${encodeURIComponent(menu.keyword)},food/all?lock=${Math.random()}`; 

        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = menu.name;
        img.className = 'menu-image';
        
        // Add loading state
        img.style.opacity = '0';
        img.onload = () => { img.style.opacity = '1'; img.style.transition = 'opacity 0.3s'; };

        // Text Info
        const nameEl = document.createElement('div');
        nameEl.className = 'menu-name';
        nameEl.textContent = menu.name;

        const categoryEl = document.createElement('div');
        categoryEl.className = 'menu-category';
        categoryEl.textContent = menu.category;

        // Append to card
        menuCard.appendChild(img);
        menuCard.appendChild(nameEl);
        menuCard.appendChild(categoryEl);

        // Append to container
        resultContainer.appendChild(menuCard);
    }

    // --- Button Event Binding ---
    generateBtn.addEventListener('click', recommendMenu);

    // --- Clock Logic ---
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
    
    updateClock();
    setInterval(updateClock, 1000);
});
