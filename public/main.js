document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Menu Data with Detailed AI Prompts ---
    // Using detailed English prompts for better AI generation
    const menus = [
        { name: '삼겹살', category: '한식', keyword: 'korean grilled pork belly samgyeopsal bbq with lettuce and garlic photorealistic delicious food' },
        { name: '치킨', category: '한식/양식', keyword: 'korean crispy fried chicken glazed with spicy sauce delicious food photography' },
        { name: '피자', category: '양식', keyword: 'delicious pepperoni pizza with melted cheese high quality food photography' },
        { name: '김치찌개', category: '한식', keyword: 'korean kimchi stew jjigae in a black pot spicy red soup boiling delicious' },
        { name: '초밥', category: '일식', keyword: 'assorted sushi platter on wooden board fresh salmon tuna delicious food' },
        { name: '떡볶이', category: '분식', keyword: 'korean spicy rice cake tteokbokki red sauce delicious street food' },
        { name: '짜장면', category: '중식', keyword: 'korean black bean noodles jajangmyeon with cucumber garnish delicious' },
        { name: '햄버거', category: '양식', keyword: 'juicy cheeseburger with lettuce tomato and fries high quality food photography' },
        { name: '파스타', category: '양식', keyword: 'creamy carbonara pasta with bacon and parmesan cheese delicious food' },
        { name: '된장찌개', category: '한식', keyword: 'korean soybean paste stew doenjang-jjigae with tofu and zucchini' },
        { name: '족발', category: '한식', keyword: 'korean braised pig trotters jokbal sliced on a plate delicious' },
        { name: '쌀국수', category: '아시안', keyword: 'vietnamese pho noodle soup with beef and herbs delicious' },
        { name: '마라탕', category: '중식', keyword: 'spicy malatang soup with vegetables and noodles chinese food' },
        { name: '칼국수', category: '한식', keyword: 'korean handmade noodle soup kalguksu with clams delicious' },
        { name: '비빔밥', category: '한식', keyword: 'korean bibimbap mixed rice with vegetables and egg in stone bowl' },
        { name: '스테이크', category: '양식', keyword: 'grilled ribeye steak medium rare with rosemary and roasted garlic' },
        { name: '돈가스', category: '일식/양식', keyword: 'golden crispy pork cutlet tonkatsu with shredded cabbage delicious' },
        { name: '라면', category: '분식', keyword: 'korean spicy ramen noodles with egg and green onion delicious' },
        { name: '샌드위치', category: '양식', keyword: 'fresh blt sandwich with toasted bread lettuce tomato bacon' },
        { name: '불고기', category: '한식', keyword: 'korean marinated beef bulgogi bbq with onions and carrots delicious' }
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

        // Image (AI Generated via Pollinations with Flux model)
        // Using 'flux' model for high realism
        const imgUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(menu.keyword)}?width=600&height=400&model=flux&nologo=true&seed=${Math.random()}`;

        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = menu.name;
        img.className = 'menu-image';
        
        // Add loading state
        img.style.opacity = '0';
        img.onload = () => { img.style.opacity = '1'; img.style.transition = 'opacity 0.3s'; };
        img.onerror = () => { 
            img.src = 'https://via.placeholder.com/300x200?text=Image+Generation+Failed'; 
        };

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