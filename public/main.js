document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const resultContainer = document.getElementById('result-container');
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // --- Menu Data with Static Image URLs ---
    // Manually curated images to ensure accuracy (Replacing AI generation)
    // Sources: Pixabay, Wikimedia Commons, Unsplash (Public Domain / Free to use)
    const menus = [
        { 
            name: '삼겹살', 
            category: '한식', 
            img: 'https://cdn.pixabay.com/photo/2017/08/08/09/44/food-2610863_1280.jpg' 
        },
        { 
            name: '치킨', 
            category: '한식/양식', 
            img: 'https://cdn.pixabay.com/photo/2019/09/26/18/23/republic-of-korea-4506696_1280.jpg' 
        },
        { 
            name: '피자', 
            category: '양식', 
            img: 'https://cdn.pixabay.com/photo/2017/12/09/08/18/pizza-3007395_1280.jpg' 
        },
        { 
            name: '김치찌개', 
            category: '한식', 
            img: 'https://cdn.pixabay.com/photo/2021/08/25/16/04/kimchi-stew-6573887_1280.jpg' 
        },
        { 
            name: '초밥', 
            category: '일식', 
            img: 'https://cdn.pixabay.com/photo/2016/11/25/16/08/sushi-1858696_1280.jpg' 
        },
        { 
            name: '떡볶이', 
            category: '분식', 
            img: 'https://cdn.pixabay.com/photo/2016/04/05/09/16/korean-food-1309138_1280.jpg' 
        },
        { 
            name: '짜장면', 
            category: '중식', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jajangmyeon.jpg/640px-Jajangmyeon.jpg' 
        },
        { 
            name: '햄버거', 
            category: '양식', 
            img: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg' 
        },
        { 
            name: '파스타', 
            category: '양식', 
            img: 'https://cdn.pixabay.com/photo/2016/08/19/09/24/spaghetti-1604836_1280.jpg' 
        },
        { 
            name: '된장찌개', 
            category: '한식', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Doenjang_jjigae.jpg/640px-Doenjang_jjigae.jpg' 
        },
        { 
            name: '족발', 
            category: '한식', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Jokbal.jpg/640px-Jokbal.jpg' 
        },
        { 
            name: '쌀국수', 
            category: '아시안', 
            img: 'https://cdn.pixabay.com/photo/2019/04/02/10/47/pho-4097148_1280.jpg' 
        },
        { 
            name: '마라탕', 
            category: '중식', 
            img: 'https://cdn.pixabay.com/photo/2021/11/01/16/00/malatang-6760867_1280.jpg' 
        },
        { 
            name: '칼국수', 
            category: '한식', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Kalguksu.jpg/640px-Kalguksu.jpg' 
        },
        { 
            name: '비빔밥', 
            category: '한식', 
            img: 'https://cdn.pixabay.com/photo/2017/08/08/09/44/food-2610863_1280.jpg' 
        },
        { 
            name: '스테이크', 
            category: '양식', 
            img: 'https://cdn.pixabay.com/photo/2017/03/23/19/57/steak-2169317_1280.jpg' 
        },
        { 
            name: '돈가스', 
            category: '일식/양식', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Tonkatsu_by_fame0101_in_Tokyo.jpg/640px-Tonkatsu_by_fame0101_in_Tokyo.jpg' 
        },
        { 
            name: '라면', 
            category: '분식', 
            img: 'https://cdn.pixabay.com/photo/2017/02/19/18/39/ramen-2080756_1280.jpg' 
        },
        { 
            name: '샌드위치', 
            category: '양식', 
            img: 'https://cdn.pixabay.com/photo/2016/03/05/19/08/sandwich-1238253_1280.jpg' 
        },
        { 
            name: '불고기', 
            category: '한식', 
            img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Bulgogi.jpg/640px-Bulgogi.jpg' 
        }
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

        // Image (Direct Link)
        const imgUrl = menu.img;

        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = menu.name;
        img.className = 'menu-image';
        
        // Add loading state
        img.style.opacity = '0';
        img.onload = () => { img.style.opacity = '1'; img.style.transition = 'opacity 0.3s'; };
        img.onerror = () => { 
            img.src = 'https://via.placeholder.com/300x200?text=No+Image'; // Fallback
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