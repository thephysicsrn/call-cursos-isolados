/**
 * CALL - CURSOS ISOLADOS
 * Interactive High-Conversion Script
 * Clean typography & SVG icons (no emojis)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking on any nav link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Countdown Timer (Evergreen 2-day countdown)
  const countdownEl = document.getElementById('countdown-timer');
  if (countdownEl) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(targetDate.getHours() + 14);

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownEl.textContent = '00d 00h 00m 00s';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      countdownEl.textContent = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // 4. Interactive Course Tabs
  const tabButtons = document.querySelectorAll('.course-tab-btn');
  const tabPanels = document.querySelectorAll('.course-panel');
  const formCourseSelect = document.getElementById('form-course');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Update panel visibility
      tabPanels.forEach(panel => {
        if (panel.id === targetTabId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // Buttons inside course panels that preselect the course in enrollment form
  const enrollButtons = document.querySelectorAll('.btn-enroll-now');
  enrollButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const courseName = btn.getAttribute('data-course');
      if (courseName && formCourseSelect) {
        for (let i = 0; i < formCourseSelect.options.length; i++) {
          if (formCourseSelect.options[i].text.includes(courseName) || formCourseSelect.options[i].value.includes(courseName)) {
            formCourseSelect.selectedIndex = i;
            break;
          }
        }
      }
    });
  });

  // 5. SISU & ENEM Score Simulator
  const simCourse = document.getElementById('sim-course');
  const simRedacao = document.getElementById('sim-redacao');
  const simRedacaoVal = document.getElementById('sim-redacao-val');
  const simScoreTotal = document.getElementById('sim-score-total');
  const simStatusCard = document.getElementById('sim-status-card');
  const simStatusIcon = document.getElementById('sim-status-icon');
  const simStatusTitle = document.getElementById('sim-status-title');
  const simStatusDesc = document.getElementById('sim-status-desc');

  function calculateSimulation() {
    if (!simCourse || !simRedacao) return;

    const redacaoScore = parseInt(simRedacao.value, 10);
    simRedacaoVal.textContent = `${redacaoScore} pts`;

    const selectedOption = simCourse.options[simCourse.selectedIndex];
    const redacaoWeight = parseFloat(selectedOption.getAttribute('data-weight')) || 2.5;
    const cutoffScore = parseFloat(selectedOption.getAttribute('data-cutoff')) || 780;

    // Estimated baseline for other 4 areas (Linguagens, Humanas, Natureza, Matemática)
    const baseOtherScoresAvg = 745;
    const otherWeightsSum = 7.5;
    const totalWeights = redacaoWeight + otherWeightsSum;

    // Weighted average
    const finalScore = ((redacaoScore * redacaoWeight) + (baseOtherScoresAvg * otherWeightsSum)) / totalWeights;
    const roundedScore = finalScore.toFixed(1);

    simScoreTotal.textContent = roundedScore;

    if (finalScore >= cutoffScore) {
      simStatusCard.style.background = 'rgba(0, 200, 83, 0.12)';
      simStatusCard.style.borderColor = 'rgba(0, 200, 83, 0.35)';
      simStatusIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E676" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`;
      simStatusTitle.textContent = 'DENTRO DAS VAGAS!';
      simStatusTitle.style.color = '#00E676';
      simStatusDesc.textContent = `Com a sua redação CaLL de ${redacaoScore} pontos, sua média estimada (${roundedScore}) supera a nota de corte histórica de ${cutoffScore} pontos para ${selectedOption.text}!`;
    } else {
      const diff = (cutoffScore - finalScore).toFixed(1);
      simStatusCard.style.background = 'rgba(255, 171, 0, 0.12)';
      simStatusCard.style.borderColor = 'rgba(255, 171, 0, 0.35)';
      simStatusIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FFAB00" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
      simStatusTitle.textContent = 'FALTAM POUCOS PONTOS!';
      simStatusTitle.style.color = '#FFAB00';
      simStatusDesc.textContent = `Você está a apenas ${diff} pontos da nota de corte (${cutoffScore} pts). Elevar sua redação para 960+ no CaLL é o caminho mais rápido para garantir a vaga!`;
    }
  }

  if (simCourse && simRedacao) {
    simCourse.addEventListener('change', calculateSimulation);
    simRedacao.addEventListener('input', calculateSimulation);
    calculateSimulation();
  }

  // 6. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      faqItems.forEach(otherItem => otherItem.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 7. Enrollment Form to Direct WhatsApp Dispatch (Clean, no emoticons)
  const enrollForm = document.getElementById('enroll-form');
  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const course = document.getElementById('form-course').value;
      const shift = document.getElementById('form-shift').value;
      const goal = document.getElementById('form-goal').value.trim();

      if (!name || !phone) {
        alert('Por favor, preencha seu nome e WhatsApp.');
        return;
      }

      // Format WhatsApp Message without emoticons
      let message = `Olá, Secretaria do CaLL! Meu nome é *${name}* e tenho interesse em me matricular para 2026.\n\n`;
      message += `*Turma desejada:* ${course}\n`;
      message += `*Turno preferencial:* ${shift}\n`;
      message += `*WhatsApp:* ${phone}\n`;
      if (email) message += `*E-mail:* ${email}\n`;
      if (goal) message += `*Objetivo/Dúvida:* ${goal}\n\n`;
      message += `Gostaria de receber a grade de horários, valores e o IV Caderno de Propostas CaLL 2026. Obrigado!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/558432060299?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank');
    });
  }

  // 8. Floating WhatsApp Widget Interactive Pop-up
  const whatsappWidget = document.getElementById('whatsapp-widget');
  const whatsappPopup = document.getElementById('whatsapp-popup');
  const whatsappTrigger = document.getElementById('whatsapp-trigger');
  const popupClose = document.getElementById('popup-close');

  if (whatsappTrigger && whatsappPopup) {
    whatsappTrigger.addEventListener('click', () => {
      whatsappPopup.classList.toggle('active');
    });

    if (popupClose) {
      popupClose.addEventListener('click', (e) => {
        e.stopPropagation();
        whatsappPopup.classList.remove('active');
      });
    }

    setTimeout(() => {
      if (whatsappPopup && !whatsappPopup.classList.contains('active')) {
        whatsappPopup.classList.add('active');
      }
    }, 4000);
  }

  // 9. Animated Counter for Statistics
  const counters = document.querySelectorAll('.counter');
  let hasAnimated = false;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 2000;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, stepTime);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateCounters();
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-strip');
  if (statsSection) {
    observer.observe(statsSection);
  }
});
