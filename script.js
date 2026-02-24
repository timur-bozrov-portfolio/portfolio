// Загрузка видео из JSON и создание карточек
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    loadVideos();
    setupNavigation();
    setupScrollObserver();
});

// Загрузка видео из videos.json
function loadVideos() {
    fetch('videos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка загрузки videos.json');
            }
            return response.json();
        })
        .then(videos => {
            renderVideos(videos);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            // Если JSON не загружается, показываем пример
            const grid = document.getElementById('videos-grid');
            grid.innerHTML = '<p style="grid-column: 1/-1; color: #b0b0b0; text-align: center; padding: 2rem;">Видео не загружены. Проверьте файл videos.json</p>';
        });
}

// Рендер видео на странице
function renderVideos(videos) {
    const grid = document.getElementById('videos-grid');
    grid.innerHTML = '';
    
    videos.forEach((video, index) => {
        const card = createVideoCard(video, index);
        grid.appendChild(card);
    });
}

// Создание карточки видео
function createVideoCard(video, index) {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    const vimeoUrl = `https://vimeo.com/${video.vimeoId}`;
    const embedUrl = `https://player.vimeo.com/video/${video.vimeoId}`;
    
    card.innerHTML = `
        <div class="video-container">
            <iframe 
                src="${embedUrl}" 
                title="${video.title}"
                allow="autoplay; fullscreen; picture-in-picture" 
                allowfullscreen>
            </iframe>
        </div>
        <div class="video-info">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
        </div>
    `;
    
    return card;
}

// Навигация по страницам
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс со всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Добавляем активный класс на текущую ссылку
            this.classList.add('active');
            
            // Получаем target секцию
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Обновление активной ссылки при скролле
function setupScrollObserver() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let currentSection = 'home';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

console.log('%cПортфолио Тимура Бозрова загружено!', 'color: #ffffff; font-size: 14px; font-weight: bold;');
