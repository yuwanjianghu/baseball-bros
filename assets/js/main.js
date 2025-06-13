// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 初始化导航栏
    initNavigation();
    // 初始化滚动效果
    initScrollEffects();
    // 初始化按钮事件
    initButtonEvents();
    // 初始化全屏功能
    initFullscreen();
});

// 导航栏功能
function initNavigation() {
    const header = document.querySelector('.header');
    let lastScroll = 0;

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // 根据滚动方向显示/隐藏导航栏
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // 向下滚动
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // 向上滚动
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
}

// 滚动效果
function initScrollEffects() {
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 添加滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
}

// 按钮事件处理
function initButtonEvents() {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // 这里可以添加开始游戏的逻辑
            console.log('开始游戏按钮被点击');
            // TODO: 实现游戏开始逻辑
        });
    }
}

// 全屏功能
function initFullscreen() {
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const gameContainer = document.querySelector('.game-container');

    if (fullscreenBtn && gameContainer) {
        fullscreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                gameContainer.requestFullscreen().catch(err => {
                    console.log(`全屏错误: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });

        // 监听全屏变化
        document.addEventListener('fullscreenchange', () => {
            if (document.fullscreenElement) {
                fullscreenBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                    </svg>
                `;
            } else {
                fullscreenBtn.innerHTML = `
                    <svg viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    </svg>
                `;
            }
        });
    }
}

// 工具函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 添加CSS类
document.documentElement.classList.add('js-enabled'); 