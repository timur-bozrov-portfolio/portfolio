// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен!');
    
    // Получаем элементы
    const userNameInput = document.getElementById('userName');
    const greetBtn = document.getElementById('greetBtn');
    const personalGreeting = document.getElementById('personalGreeting');
    const navLinks = document.querySelectorAll('.nav-link');

    // Приветствие пользователя
    greetBtn.addEventListener('click', function() {
        const name = userNameInput.value.trim();
        
        if (name === '') {
            personalGreeting.textContent = 'Пожалуйста, введите ваше имя!';
            personalGreeting.style.color = '#e74c3c';
            return;
        }

        personalGreeting.textContent = `👋 Рады видеть вас, ${name}!`;
        personalGreeting.style.color = '#27ae60';
        
        // Сохраняем имя в localStorage
        localStorage.setItem('userName', name);
        
        // Очищаем поле ввода
        userNameInput.value = '';
    });

    // Приветствие при Enter
    userNameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            greetBtn.click();
        }
    });

    // Загружаем сохраненное имя при открытии страницы
    const savedName = localStorage.getItem('userName');
    if (savedName) {
        personalGreeting.textContent = `👋 С возвращением, ${savedName}!`;
        personalGreeting.style.color = '#27ae60';
    }

    // Навигация по страницам
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

    // Функция для обновления активной ссылки при скролле
    window.addEventListener('scroll', function() {
        let currentSection = '';
        const sections = document.querySelectorAll('.section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
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

    // Пример функции для работы с данными
    function printMessage(text) {
        console.log(`Сообщение: ${text}`);
    }

    // Экспортируем функции в глобальный scope если нужны
    window.printMessage = printMessage;
});

// Дополнительные полезные функции
function getGreeting(hour) {
    if (hour < 12) {
        return 'Доброе утро';
    } else if (hour < 18) {
        return 'Добрый день';
    } else {
        return 'Добрый вечер';
    }
}

// Вывод приветствия в консоль
const currentHour = new Date().getHours();
console.log(`%c${getGreeting(currentHour)}!`, 'color: #667eea; font-size: 16px; font-weight: bold;');
