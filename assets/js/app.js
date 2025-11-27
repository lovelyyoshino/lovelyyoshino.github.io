// ================================
// lovelyyoshino - Main JavaScript
// Things.inc Style Implementation
// ================================

(function() {
  'use strict';

  // ================================
  // BIOS Loader
  // ================================
  class BIOSLoader {
    constructor() {
      this.loader = document.getElementById('biosLoader');
      this.biosText = document.getElementById('biosText');
      
      this.bootSequence = `LOVELYYOSHINO BIOS (C) 2025
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BIOS Date: ${new Date().toLocaleString('zh-CN')}
Version: 1.0.0 - Things Style

Processor: Embodied AI Architect @ MAX MHz
System Speed: Unlimited
Memory: 6W+ Followers Loaded

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Initializing Components...
[✓] Loading Profile Data
[✓] Mounting GitHub Repository  
[✓] Starting Achievement System
[✓] Initializing Interactive Elements
[✓] Preparing Projects Showcase
[✓] Loading Book Information
[✓] Establishing Connections

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

All systems operational.

Welcome to lovelyyoshino.dev!

Press ANY KEY to continue...`;
      
      this.currentChar = 0;
      this.init();
    }
    
    init() {
      this.typeText();
      
      // 点击任意键或等待3秒后自动关闭
      document.addEventListener('keydown', () => this.complete(), { once: true });
      setTimeout(() => this.complete(), 3000);
    }
    
    typeText() {
      if (this.currentChar < this.bootSequence.length) {
        this.biosText.textContent += this.bootSequence[this.currentChar];
        this.currentChar++;
        
        const delay = this.bootSequence[this.currentChar - 1] === '\n' ? 50 : Math.random() * 20 + 5;
        setTimeout(() => this.typeText(), delay);
      }
    }
    
    complete() {
      this.loader.classList.add('hide');
      setTimeout(() => {
        this.loader.remove();
        document.body.style.overflow = '';
      }, 500);
    }
  }

  // ================================
  // Drawer Menu
  // ================================
  class DrawerMenu {
    constructor() {
      this.drawer = document.getElementById('drawerMenu');
      this.toggleBtn = document.getElementById('menuToggle');
      this.closeBtn = document.getElementById('drawerClose');
      this.links = document.querySelectorAll('.drawer-link');
      
      this.init();
    }
    
    init() {
      this.toggleBtn?.addEventListener('click', () => this.toggle());
      this.closeBtn?.addEventListener('click', () => this.close());
      
      // 点击链接后关闭菜单并滚动
      this.links.forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          if (href.startsWith('#')) {
            e.preventDefault();
            this.close();
            setTimeout(() => {
              const target = document.querySelector(href);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 300);
          }
        });
      });
      
      // 点击外部关闭
      document.addEventListener('click', (e) => {
        if (this.drawer.classList.contains('open') &&
            !this.drawer.contains(e.target) &&
            !this.toggleBtn.contains(e.target)) {
          this.close();
        }
      });
    }
    
    toggle() {
      this.drawer.classList.toggle('open');
    }
    
    close() {
      this.drawer.classList.remove('open');
    }
  }

  // ================================
  // Theme Toggle
  // ================================
  class ThemeToggle {
    constructor() {
      this.btn = document.getElementById('themeToggle');
      this.theme = localStorage.getItem('theme') || 'dark';
      
      this.init();
    }
    
    init() {
      document.documentElement.setAttribute('data-theme', this.theme);
      
      this.btn?.addEventListener('click', () => this.toggle());
      
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            this.setTheme(e.matches ? 'dark' : 'light');
          }
        });
    }
    
    toggle() {
      this.setTheme(this.theme === 'light' ? 'dark' : 'light');
    }
    
    setTheme(theme) {
      this.theme = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }

  // ================================
  // Typewriter Effect
  // ================================
  class Typewriter {
    constructor() {
      this.element = document.getElementById('typewriter');
      this.texts = [
        '具身智能架构师',
        'ROS开源贡献者',
        '6W+粉丝技术博主',
        '《从ROS1到ROS2》作者',
        'SLAM专家',
        '全栈工程师'
      ];
      this.currentIndex = 0;
      this.currentChar = 0;
      this.isDeleting = false;
      this.isPaused = false;
      
      this.start();
    }
    
    start() {
      this.type();
    }
    
    type() {
      const currentText = this.texts[this.currentIndex];
      
      if (this.isPaused) {
        setTimeout(() => {
          this.isPaused = false;
          this.isDeleting = true;
          this.type();
        }, 2000);
        return;
      }
      
      if (!this.isDeleting) {
        this.element.textContent = currentText.substring(0, this.currentChar + 1);
        this.currentChar++;
        
        if (this.currentChar === currentText.length) {
          this.isPaused = true;
        }
        
        setTimeout(() => this.type(), this.isPaused ? 0 : 100);
      } else {
        this.element.textContent = currentText.substring(0, this.currentChar - 1);
        this.currentChar--;
        
        if (this.currentChar === 0) {
          this.isDeleting = false;
          this.currentIndex = (this.currentIndex + 1) % this.texts.length;
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
      this.statElements = document.querySelectorAll('.stat-value');
      this.hasAnimated = new Set();
      
      this.init();
    }
    
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated.has(entry.target)) {
            this.hasAnimated.add(entry.target);
            const target = parseInt(entry.target.dataset.target);
            this.animate(entry.target, 0, target, 2000);
          }
        });
      }, { threshold: 0.5 });
      
      this.statElements.forEach(el => observer.observe(el));
    }
    
    animate(element, start, end, duration) {
      const startTime = Date.now();
      
      const update = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(start + (end - start) * easeOut);
        element.textContent = this.format(current);
        
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          element.textContent = this.format(end);
        }
      };
      
      update();
    }
    
    format(num) {
      if (num >= 10000) {
        return (num / 1000).toFixed(1) + 'K';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
    }
  }

  // ================================
  // Scroll Animations
  // ================================
  class ScrollAnimations {
    constructor() {
      this.elements = document.querySelectorAll('.scroll-reveal');
      
      this.init();
    }
    
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      this.elements.forEach(el => observer.observe(el));
    }
  }

  // ================================
  // Back to Top Button
  // ================================
  class BackToTop {
    constructor() {
      this.btn = document.getElementById('backToTop');
      
      this.init();
    }
    
    init() {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
          this.btn.classList.add('show');
        } else {
          this.btn.classList.remove('show');
        }
      });
      
      this.btn?.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }


  // ================================
  // Smooth Scroll for Anchor Links
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // ================================
  // Particles.js Configuration
  // ================================
  function initParticles() {
    if (typeof particlesJS === 'undefined') return;
    
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 50,
          density: {
            enable: true,
            value_area: 1000
          }
        },
        color: {
          value: '#FFB6C1'
        },
        shape: {
          type: 'circle'
        },
        opacity: {
          value: 0.4,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.5
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#FFB6C1',
          opacity: 0.15,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
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
              opacity: 0.4
            }
          },
          push: {
            particles_nb: 3
          }
        }
      },
      retina_detect: true
    });
  }

  // ================================
  // Stars Background (Night Mode)
  // ================================
  class StarsBackground {
    constructor() {
      this.container = document.getElementById('starsContainer');
      this.starCount = 100;
      
      this.init();
    }
    
    init() {
      if (!this.container) return;
      this.createStars();
    }
    
    createStars() {
      for (let i = 0; i < this.starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const opacity = Math.random() * 0.5 + 0.3;
        const delay = Math.random() * 3;
        
        star.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}%;
          top: ${y}%;
          --duration: ${duration}s;
          --opacity: ${opacity};
          animation-delay: ${delay}s;
        `;
        
        this.container.appendChild(star);
      }
    }
  }

  // ================================
  // Mouse Follower Effect
  // ================================
  class MouseFollower {
    constructor() {
      this.follower = document.getElementById('mouseFollower');
      this.mouseX = 0;
      this.mouseY = 0;
      this.followerX = 0;
      this.followerY = 0;
      
      this.init();
    }
    
    init() {
      if (!this.follower) return;
      
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.follower.classList.add('active');
      });
      
      document.addEventListener('mouseleave', () => {
        this.follower.classList.remove('active');
      });
      
      this.animate();
    }
    
    animate() {
      this.followerX += (this.mouseX - this.followerX) * 0.1;
      this.followerY += (this.mouseY - this.followerY) * 0.1;
      
      this.follower.style.left = this.followerX + 'px';
      this.follower.style.top = this.followerY + 'px';
      
      requestAnimationFrame(() => this.animate());
    }
  }

  // ================================
  // 3D Tilt Card Effect
  // ================================
  class TiltCards {
    constructor() {
      this.cards = document.querySelectorAll('.tilt-card');
      this.init();
    }
    
    init() {
      this.cards.forEach(card => {
        card.addEventListener('mousemove', (e) => this.handleMove(e, card));
        card.addEventListener('mouseleave', (e) => this.handleLeave(e, card));
      });
    }
    
    handleMove(e, card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.setProperty('--rotateX', `${-rotateX}deg`);
      card.style.setProperty('--rotateY', `${rotateY}deg`);
    }
    
    handleLeave(e, card) {
      card.style.setProperty('--rotateX', '0deg');
      card.style.setProperty('--rotateY', '0deg');
    }
  }

  // ================================
  // Skill Bars Animation
  // ================================
  class SkillBars {
    constructor() {
      this.skillBars = document.querySelectorAll('.skill-progress');
      this.hasAnimated = new Set();
      
      this.init();
    }
    
    init() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.hasAnimated.has(entry.target)) {
            this.hasAnimated.add(entry.target);
            const progress = entry.target.dataset.progress;
            entry.target.style.setProperty('--progress', `${progress}%`);
            entry.target.classList.add('animate');
          }
        });
      }, { threshold: 0.5 });
      
      this.skillBars.forEach(bar => observer.observe(bar));
    }
  }

  // ================================
  // Project Card Click Handler
  // ================================
  class ProjectCardLinks {
    constructor() {
      this.cards = document.querySelectorAll('.project-card[data-github]');
      this.init();
    }
    
    init() {
      this.cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
          const url = card.dataset.github;
          if (url) {
            window.open(url, '_blank');
          }
        });
      });
    }
  }

  // ================================
  // GitHub Stars API (Real-time)
  // ================================
  class GitHubStars {
    constructor() {
      this.repos = [
        { selector: '.github-card[href*="ROS-ROS2-BOOKS"]', repo: 'lovelyyoshino/ROS-ROS2-BOOKS' },
        { selector: '.github-card[href*="RHACrackNet"]', repo: 'lovelyyoshino/RHACrackNet' },
        { selector: '.github-card[href*="CSR_GLM"]', repo: 'lovelyyoshino/CSR_GLM' },
        { selector: '.github-card[href*="FAST_LIO2_Noted"]', repo: 'lovelyyoshino/FAST_LIO2_Noted' },
        { selector: '.github-card[href*="direct_lidar_inertial_odometry"]', repo: 'lovelyyoshino/direct_lidar_inertial_odometry-noted' },
        { selector: '.github-card[href*="SmartCar"]', repo: 'lovelyyoshino/SmartCar' },
        { selector: '.github-card[href*="Bilibili-Live-API"]', repo: 'lovelyyoshino/Bilibili-Live-API' },
        { selector: '.github-card[href*="Halcon_Project"]', repo: 'lovelyyoshino/Halcon_Project' }
      ];
      
      this.init();
    }
    
    async init() {
      for (const { selector, repo } of this.repos) {
        try {
          const response = await fetch(`https://api.github.com/repos/${repo}`);
          if (response.ok) {
            const data = await response.json();
            const card = document.querySelector(selector);
            if (card) {
              const footer = card.querySelector('.github-footer span');
              if (footer) {
                footer.innerHTML = `<i class="fas fa-star"></i> ${data.stargazers_count}`;
              }
            }
          }
        } catch (e) {
          // 静默失败，保留默认值
        }
      }
    }
  }

  // ================================
  // Initialize All
  // ================================
  document.addEventListener('DOMContentLoaded', () => {
    // 防止滚动直到BIOS加载完成
    document.body.style.overflow = 'hidden';
    
    // 初始化所有组件
    new BIOSLoader();
    new DrawerMenu();
    new ThemeToggle();
    new Typewriter();
    new StatsCounter();
    new ScrollAnimations();
    new BackToTop();
    new StarsBackground();
    new MouseFollower();
    new TiltCards();
    new SkillBars();
    new ProjectCardLinks();
    
    // 延迟加载 GitHub Stars (避免 API 限制)
    setTimeout(() => {
      new GitHubStars();
    }, 2000);
    
    // 初始化粒子效果
    setTimeout(() => {
      initParticles();
    }, 500);
  });

  // ================================
  // Console Info
  // ================================
  console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #FFB6C1;');
  console.log('%c欢迎来到 lovelyyoshino.github.io', 'font-size: 16px; color: #00d9ff;');
  console.log('%chttps://github.com/lovelyyoshino', 'font-size: 12px; color: #b8c6db;');

})();

