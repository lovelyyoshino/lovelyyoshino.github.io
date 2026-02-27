// ================================
// Main JavaScript
// ================================

(function() {
  'use strict';

  // ================================
  // Page Loader
  // ================================
  class PageLoader {
    constructor() {
      this.loader = document.getElementById('loader');
      this.progress = document.getElementById('loaderProgress');
      this.status = document.getElementById('loaderStatus');
      this.percentage = document.getElementById('loaderPercentage');
      this.currentProgress = 0;
      
      this.statusMessages = [
        'Initializing system...',
        'Loading components...',
        'Compiling shaders...',
        'Loading assets...',
        'Preparing experience...',
        'Almost ready...'
      ];
      
      this.init();
    }
    
    init() {
      this.simulate();
      
      // Ensure loader hides when page fully loads
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.currentProgress = 100;
          this.update();
          setTimeout(() => this.hide(), 500);
        }, 500);
      });
    }
    
    simulate() {
      const interval = setInterval(() => {
        this.currentProgress += Math.random() * 15;
        
        if (this.currentProgress >= 90) {
          this.currentProgress = 90;
          clearInterval(interval);
        }
        
        this.update();
      }, 200);
    }
    
    update() {
      const progress = Math.min(this.currentProgress, 100);
      this.progress.style.width = progress + '%';
      this.percentage.textContent = Math.floor(progress) + '%';
      
      // Update status message
      const statusIndex = Math.min(
        Math.floor(progress / 20),
        this.statusMessages.length - 1
      );
      this.status.textContent = this.statusMessages[statusIndex];
    }
    
    hide() {
      this.loader.classList.add('hide');
      setTimeout(() => {
        this.loader.remove();
        // Start terminal boot animation
        terminalBoot.start();
      }, 500);
    }
  }

  // ================================
  // Terminal Boot Animation
  // ================================
  class TerminalBoot {
    constructor() {
      this.terminal = document.getElementById('terminalBoot');
      this.bootText = document.getElementById('bootText');
      this.cursor = document.getElementById('bootCursor');
      this.heroContent = document.getElementById('heroContent');
      
      this.bootSequence = `SYSTEM BIOS - lovelyyoshino.dev
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BIOS Date: ${new Date().toLocaleString('zh-CN')}
Version: 1.0.0

Processor: Embodied Intelligence Architect @ MAX MHz
System Speed: Unlimited

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Memory Test: OK
Loading Profile Data... OK
Initializing Skills Matrix... OK
Mounting Project Repository... OK
Starting Achievement System... OK
Establishing Connection... OK

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

All systems operational.

Welcome, visitor!

Press ENTER to continue...`;
    }
    
    start() {
      this.type(this.bootSequence, 0);
    }
    
    type(text, index) {
      if (index < text.length) {
        this.bootText.textContent += text[index];
        
        // Scroll to bottom
        this.terminal.scrollTop = this.terminal.scrollHeight;
        
        // Variable speed for more realistic effect
        const delay = text[index] === '\n' ? 50 : Math.random() * 30 + 10;
        
        setTimeout(() => this.type(text, index + 1), delay);
      } else {
        // Boot complete, show hero content
        setTimeout(() => this.complete(), 1000);
      }
    }
    
    complete() {
      this.terminal.style.display = 'none';
      this.heroContent.style.display = 'block';
      this.heroContent.style.animation = 'fadeInUp 1s';
      
      // Initialize hero animations
      typewriterEffect.start();
      statsCounter.start();
    }
  }

  // ================================
  // Typewriter Effect
  // ================================
  class TypewriterEffect {
    constructor() {
      this.element = document.getElementById('typewriter');
      this.texts = [
        '具身智能架构师',
        'ROS开源贡献者',
        '7W+粉丝技术博主',
        'SLAM专家',
        '全栈工程师'
      ];
      this.currentTextIndex = 0;
      this.currentCharIndex = 0;
      this.isDeleting = false;
      this.isPaused = false;
    }
    
    start() {
      this.type();
    }
    
    type() {
      const currentText = this.texts[this.currentTextIndex];
      
      if (this.isPaused) {
        setTimeout(() => {
          this.isPaused = false;
          this.isDeleting = true;
          this.type();
        }, 2000);
        return;
      }
      
      if (!this.isDeleting) {
        // Typing
        this.element.textContent = currentText.substring(0, this.currentCharIndex + 1);
        this.currentCharIndex++;
        
        if (this.currentCharIndex === currentText.length) {
          this.isPaused = true;
        }
        
        setTimeout(() => this.type(), this.isPaused ? 0 : 100);
      } else {
        // Deleting
        this.element.textContent = currentText.substring(0, this.currentCharIndex - 1);
        this.currentCharIndex--;
        
        if (this.currentCharIndex === 0) {
          this.isDeleting = false;
          this.currentTextIndex = (this.currentTextIndex + 1) % this.texts.length;
        }
        
        setTimeout(() => this.type(), 50);
      }
    }
  }

  // ================================
  // Stats Counter
  // ================================
  class StatsCounter {
    constructor() {
      this.stats = document.querySelectorAll('.stat-value');
      this.hasAnimated = false;
    }
    
    start() {
      if (this.hasAnimated) return;
      this.hasAnimated = true;
      
      this.stats.forEach(stat => {
        const target = parseInt(stat.dataset.target);
        this.animateCount(stat, 0, target, 2000);
      });
    }
    
    animateCount(element, start, end, duration) {
      const startTime = Date.now();
      
      const updateCount = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        const current = Math.floor(start + (end - start) * easeOutQuart);
        element.textContent = this.formatNumber(current);
        
        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          element.textContent = this.formatNumber(end);
        }
      };
      
      updateCount();
    }
    
    formatNumber(num) {
      if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    }
  }

  // ================================
  // Theme Manager
  // ================================
  class ThemeManager {
    constructor() {
      this.theme = localStorage.getItem('theme') || 'dark';
      this.toggle = document.getElementById('themeToggle');
      this.init();
    }
    
    init() {
      document.documentElement.setAttribute('data-theme', this.theme);
      
      this.toggle?.addEventListener('click', () => this.switch());
      
      // Listen for system theme changes
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
          }
        });
    }
    
    switch() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    }
    
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      
      // Trigger custom event
      window.dispatchEvent(new CustomEvent('themechange', { 
        detail: { theme } 
      }));
    }
  }

  // ================================
  // Navigation
  // ================================
  class Navigation {
    constructor() {
      this.navbar = document.getElementById('navbar');
      this.toggle = document.getElementById('navToggle');
      this.menu = document.getElementById('navMenu');
      this.links = document.querySelectorAll('.nav-link');
      
      this.init();
    }
    
    init() {
      // Scroll effect
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          this.navbar.classList.add('scrolled');
        } else {
          this.navbar.classList.remove('scrolled');
        }
      });
      
      // Mobile menu toggle
      this.toggle?.addEventListener('click', () => {
        this.menu.classList.toggle('active');
        this.toggle.classList.toggle('active');
      });
      
      // Smooth scroll and close menu
      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          
          if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
              target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }
            
            // Close mobile menu
            this.menu.classList.remove('active');
            this.toggle.classList.remove('active');
          }
	});
});
    }
  }

  // ================================
  // Scroll Animations
  // ================================
  class ScrollAnimator {
    constructor() {
      this.observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries),
        {
          threshold: 0.1,
          rootMargin: '0px 0px -100px 0px'
        }
      );
      
      this.init();
    }
    
    init() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach(el => this.observer.observe(el));
    }
    
    handleIntersection(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          
          // Trigger skill progress bars
          if (entry.target.classList.contains('skill-category')) {
            this.animateSkillBars(entry.target);
          }
          
          // Trigger stat counters in achievements
          if (entry.target.classList.contains('achievement-card')) {
            this.animateAchievementStats(entry.target);
          }
        }
      });
    }
    
    animateSkillBars(container) {
      const bars = container.querySelectorAll('.skill-progress');
      bars.forEach((bar, index) => {
        setTimeout(() => {
          const progress = bar.dataset.progress;
          bar.style.width = progress + '%';
        }, index * 100);
      });
    }
    
    animateAchievementStats(card) {
      const statNumber = card.querySelector('.stat-number');
      if (statNumber && !statNumber.dataset.animated) {
        statNumber.dataset.animated = 'true';
        const target = parseInt(statNumber.dataset.target);
        this.animateNumber(statNumber, 0, target, 2000);
      }
    }
    
    animateNumber(element, start, end, duration) {
      const startTime = Date.now();
      
      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(start + (end - start) * easeOut);
        element.textContent = this.formatNumber(current);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = this.formatNumber(end);
        }
      };
      
      update();
    }
    
    formatNumber(num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }

  // ================================
  // Particles Background
  // ================================
  function initParticles() {
    const particles = document.getElementById('particles');
    if (!particles || typeof particlesJS === 'undefined') return;
    
    particlesJS('particles', {
      particles: {
        number: {
          value: 80,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: '#00d9ff'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.3,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00d9ff',
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2,
          direction: 'none',
          random: false,
          straight: false,
          out_mode: 'out',
          bounce: false
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          }
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 0.5
            }
          },
          push: {
            particles_nb: 4
          }
        }
      },
      retina_detect: true
    });
  }

  // ================================
  // Back to Top Button
  // ================================
  class BackToTop {
    constructor() {
      this.button = document.getElementById('backToTop');
      this.init();
    }
    
    init() {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          this.button.classList.add('show');
	} else {
          this.button.classList.remove('show');
        }
      });
      
      this.button?.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // ================================
  // Project Cards Interaction
  // ================================
  class ProjectCards {
    constructor() {
      this.cards = document.querySelectorAll('.project-btn');
      this.init();
    }
    
    init() {
      this.cards.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const project = btn.dataset.project;
          this.showProjectDetails(project);
        });
      });
    }
    
    showProjectDetails(projectId) {
      // You can implement a modal or detailed view here
      console.log('Show details for project:', projectId);
      alert('项目详情功能开发中...\n\n项目ID: ' + projectId);
    }
  }

  // ================================
  // Initialize Everything
  // ================================
  const pageLoader = new PageLoader();
  const terminalBoot = new TerminalBoot();
  const typewriterEffect = new TypewriterEffect();
  const statsCounter = new StatsCounter();
  const themeManager = new ThemeManager();
  const navigation = new Navigation();
  const scrollAnimator = new ScrollAnimator();
  const backToTop = new BackToTop();
  const projectCards = new ProjectCards();

  // Initialize particles when particles.js is loaded
  if (typeof particlesJS !== 'undefined') {
    initParticles();
  }

  // Easter egg: Konami Code
  let konamiCode = [];
  const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  
  document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
      console.log('🎉 Konami Code activated!');
      document.body.style.animation = 'rainbow 5s linear infinite';
      setTimeout(() => {
        document.body.style.animation = '';
      }, 7000);
    }
  });

  // Console message
  console.log('%c👋 Hi there!', 'font-size: 20px; font-weight: bold; color: #00d9ff;');
  console.log('%cWelcome to lovelyyoshino.dev', 'font-size: 14px; color: #00ff88;');
  console.log('%cInterested in the code? Check out the GitHub repo!', 'font-size: 12px; color: #a7c0e0;');
  console.log('%chttps://github.com/lovelyyoshino', 'font-size: 12px; color: #00d9ff; text-decoration: underline;');

})();
