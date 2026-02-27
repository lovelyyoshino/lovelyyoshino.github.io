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
      
      this.bootSequence = `LOVELYYOSHINO BIOS (C) 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BIOS Date: ${new Date().toLocaleString('zh-CN')}
Version: 1.0.0 - Things Style

Processor: Embodied AI Architect @ MAX MHz
System Speed: Unlimited
Memory: 7W+ Followers Loaded

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
        '7W+粉丝技术博主',
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
      // 跳过带有 data-dynamic 属性的元素（由其他类处理）
      this.statElements = document.querySelectorAll('.stat-value:not([data-dynamic])');
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
  // GitHub Stars API (Real-time with Cache)
  // ================================
  class GitHubStars {
    constructor() {
      this.username = 'lovelyyoshino';
      this.repoCache = new Map();
      this.cacheKey = 'github_stars_cache';
      this.cacheExpiry = 60 * 60 * 1000; // 1小时缓存
      this.init();
    }
    
    async init() {
      console.log('[GitHubStars] 开始获取GitHub数据...');
      
      // 先尝试从缓存加载
      const cached = this.loadFromCache();
      if (cached) {
        console.log('[GitHubStars] 使用缓存数据，共', this.repoCache.size, '个仓库');
        this.updateAllStars();
      }
      
      // 然后尝试从API获取最新数据
      const fetchSuccess = await this.fetchAllRepos();
      
      if (fetchSuccess && this.repoCache.size > 0) {
        console.log('[GitHubStars] API获取成功，共', this.repoCache.size, '个仓库');
        this.saveToCache();
        this.updateAllStars();
      } else if (!cached) {
        // API失败且无缓存，使用硬编码的后备数据
        console.log('[GitHubStars] API失败且无缓存，使用后备数据');
        this.useFallbackData();
        this.updateAllStars();
      }
    }
    
    loadFromCache() {
      try {
        const cached = localStorage.getItem(this.cacheKey);
        if (!cached) return false;
        
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        
        // 缓存过期但仍可用（API失败时继续使用）
        if (data && typeof data === 'object') {
          Object.entries(data).forEach(([name, stars]) => {
            this.repoCache.set(name, stars);
          });
          return true;
        }
      } catch (e) {
        console.log('[GitHubStars] 缓存读取失败:', e);
      }
      return false;
    }
    
    saveToCache() {
      try {
        const data = {};
        this.repoCache.forEach((stars, name) => {
          data[name] = stars;
        });
        localStorage.setItem(this.cacheKey, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.log('[GitHubStars] 缓存保存失败:', e);
      }
    }
    
    useFallbackData() {
      // 后备数据（2024年数据，总计约2932 stars）
      const fallback = {
        'lovelyyoshino/bilibili-live-api': 1255,
        'lovelyyoshino/halcon_licenses': 893,
        'lovelyyoshino/shadowsocks-hosts-or-v2ray': 748,
        'lovelyyoshino/fast_lio2_noted': 288,
        'lovelyyoshino/smartcar': 130,
        'lovelyyoshino/pixiv-host': 130,
        'lovelyyoshino/ros-ros2-books': 60,
        'lovelyyoshino/halcon_project': 53,
        'lovelyyoshino/direct_lidar_inertial_odometry-noted': 38,
        'lovelyyoshino/loon': 28,
        'lovelyyoshino/chinese_notes': 24,
        'lovelyyoshino/livo-gs': 22,
        'lovelyyoshino/pytorch_example': 20,
        'lovelyyoshino/libero2lerobot': 13,
        'lovelyyoshino/rhacracknet': 12,
        'lovelyyoshino/bilibili-strom-catcher': 11,
        'lovelyyoshino/douyin_python': 11,
        'lovelyyoshino/present': 10,
        'lovelyyoshino/ip_pool': 8,
        'lovelyyoshino/bilibili-live-tools': 7,
        'lovelyyoshino/opencv-graphic-color-mixed-recognition': 7,
        'lovelyyoshino/lovelyyoshino': 6,
        'lovelyyoshino/reference': 6,
        'lovelyyoshino/roadlib-noted': 6,
        'lovelyyoshino/jointcalib-noted': 5,
        'lovelyyoshino/njit_net': 5,
        'lovelyyoshino/cpp_new_features': 4,
        'lovelyyoshino/csr_glm': 4,
        'lovelyyoshino/fast-livo2-note': 4,
        'lovelyyoshino/lovelyyoshino.github.io': 4,
        'lovelyyoshino/mvision': 4,
        'lovelyyoshino/point_cloud_floor_ground_filter': 4,
        'lovelyyoshino/rk3588_model': 4,
        'lovelyyoshino/cartographer-noted': 3,
        'lovelyyoshino/gr00t-libero': 3,
        'lovelyyoshino/learnopencv': 3,
        'lovelyyoshino/realsense-multi': 3,
        'lovelyyoshino/cuda-fastbev': 2,
        'lovelyyoshino/e-puck-webots': 2,
        'lovelyyoshino/far_planner_improved': 2,
        'lovelyyoshino/gpt_voice_agv': 2,
        'lovelyyoshino/ieskf-pure': 2,
        'lovelyyoshino/navila-noted': 2,
        'lovelyyoshino/occnet-course': 2,
        'lovelyyoshino/pythonrobotics': 2,
        // 外部仓库
        'shaohonchen/qwen3-smvl': 446
      };
      Object.entries(fallback).forEach(([name, stars]) => {
        this.repoCache.set(name, stars);
      });
    }
    
    async fetchAllRepos() {
      try {
        let page = 1;
        let hasMore = true;
        let fetchedCount = 0;
        
        while (hasMore) {
          const response = await fetch(
            `https://api.github.com/users/${this.username}/repos?per_page=100&page=${page}`
          );
          if (!response.ok) {
            console.log('GitHub API error:', response.status);
            return false;
          }
          
          const repos = await response.json();
          if (repos.length === 0) {
            hasMore = false;
          } else {
            repos.forEach(repo => {
              this.repoCache.set(repo.full_name.toLowerCase(), repo.stargazers_count);
              fetchedCount++;
            });
            page++;
            if (repos.length < 100) hasMore = false;
          }
        }
        
        // 获取非自己的仓库（如 Qwen3-SmVL）
        await this.fetchExternalRepos();
        
        return fetchedCount > 0;
      } catch (e) {
        console.log('Failed to fetch repos:', e);
        return false;
      }
    }
    
    async fetchExternalRepos() {
      // 收集页面上所有非自己的仓库链接
      const cards = document.querySelectorAll('.github-card');
      const externalRepos = [];
      
      cards.forEach(card => {
        const href = card.getAttribute('href');
        if (!href) return;
        const match = href.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (match) {
          const fullName = `${match[1]}/${match[2]}`.toLowerCase();
          if (!this.repoCache.has(fullName)) {
            externalRepos.push(fullName);
          }
        }
      });
      
      // 并行获取外部仓库数据
      await Promise.all(externalRepos.map(async (fullName) => {
        try {
          const response = await fetch(`https://api.github.com/repos/${fullName}`);
          if (response.ok) {
            const data = await response.json();
            this.repoCache.set(fullName, data.stargazers_count);
          }
        } catch (e) {}
      }));
    }
    
    updateAllStars() {
      // 计算总star数
      let totalStars = 0;
      this.repoCache.forEach((stars, name) => {
        if (name.startsWith(this.username.toLowerCase() + '/')) {
          totalStars += stars;
        }
      });
      
      console.log('[GitHubStars] 总star数:', totalStars);
      
      // 更新Hero区域的GitHub Stars统计
      const heroStatEl = document.querySelector('[data-dynamic="github-stars"]');
      console.log('[GitHubStars] Hero元素:', heroStatEl);
      if (heroStatEl) {
        if (totalStars > 0) {
          heroStatEl.dataset.target = totalStars;
          this.animateValue(heroStatEl, 0, totalStars, 2000);
        } else {
          heroStatEl.textContent = '–';
        }
      }
      
      // 更新About区域的JSON显示
      if (totalStars > 0) {
        const aboutStars = document.getElementById('about-github-stars');
        if (aboutStars) {
          aboutStars.textContent = totalStars + '+';
        }
        
        // 更新副标题
        const subtitle = document.querySelector('.opensource-section .section-subtitle');
        if (subtitle) {
          subtitle.innerHTML = `${this.formatNumber(totalStars)}+ GitHub Stars · 开源贡献`;
        }
      }
      
      // 更新CSDN Followers（静态值，CSDN无公开API）
      const csdnStatEl = document.querySelector('[data-dynamic="csdn-followers"]');
      if (csdnStatEl) {
        // CSDN没有公开API，使用配置的静态值
        const csdnFollowers = 70000;
        csdnStatEl.dataset.target = csdnFollowers;
        this.animateValue(csdnStatEl, 0, csdnFollowers, 2000);
      }
      
      // 更新每个项目卡片的star数
      const cards = document.querySelectorAll('.github-card');
      console.log('[GitHubStars] 找到', cards.length, '个项目卡片');
      cards.forEach(card => {
        const href = card.getAttribute('href');
        if (!href) return;
        const match = href.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) return;
        
        const fullName = `${match[1]}/${match[2]}`.toLowerCase();
        const stars = this.repoCache.get(fullName);
        
        if (stars !== undefined) {
          const footer = card.querySelector('.github-footer span');
          if (footer) {
            console.log('[GitHubStars]', fullName, ':', stars);
            footer.innerHTML = `<i class="fas fa-star"></i> ${stars}`;
          }
        }
      });
      console.log('[GitHubStars] 更新完成!');
    }
    
    animateValue(element, start, end, duration) {
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
      if (num >= 10000) {
        return (num / 1000).toFixed(1) + 'K';
      } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
      }
      return num.toString();
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
    
    // 加载 GitHub Stars（页面加载后立即开始）
    new GitHubStars();
    
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

