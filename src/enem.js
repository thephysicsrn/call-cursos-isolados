/**
 * CALL - CURSOS ISOLADOS
 * Landing Page: Reta Final ENEM 2026
 * Interactive UI/UX Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }

  // 3. Dynamic ENEM Countdown Timers (Day 1 & Day 2)
  function setupCountdown(targetDate, dayPrefix) {
    const dEl = document.getElementById(`${dayPrefix}-days`);
    const hEl = document.getElementById(`${dayPrefix}-hours`);
    const mEl = document.getElementById(`${dayPrefix}-mins`);
    const sEl = document.getElementById(`${dayPrefix}-secs`);

    if (!dEl || !hEl || !mEl || !sEl) return;

    function updateTimer() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        dEl.textContent = '00';
        hEl.textContent = '00';
        mEl.textContent = '00';
        sEl.textContent = '00';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      dEl.textContent = String(days).padStart(2, '0');
      hEl.textContent = String(hours).padStart(2, '0');
      mEl.textContent = String(minutes).padStart(2, '0');
      sEl.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  // Set ENEM target dates (Upcoming Sunday and next Sunday)
  const now = new Date();
  const day1Target = new Date(now.getFullYear(), 10, 8, 13, 0, 0); // Ex: early November 13:00
  if (day1Target < now) {
    day1Target.setFullYear(now.getFullYear() + 1);
  }
  const day2Target = new Date(day1Target.getTime() + 7 * 24 * 60 * 60 * 1000);

  setupCountdown(day1Target, 'enem-d1');
  setupCountdown(day2Target, 'enem-d2');

  // 4. Video Filter Tabs
  const videoTabs = document.querySelectorAll('.video-tab-btn');
  const videoCards = document.querySelectorAll('.video-card');

  videoTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      videoTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterCategory = tab.getAttribute('data-filter');

      videoCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCategory === filterCategory) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => { card.style.opacity = '1'; }, 30);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Video Player Modal
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-iframe');
  const modalVideoTitle = document.getElementById('modal-video-title');
  const modalVideoSpeaker = document.getElementById('modal-video-speaker');
  const closeVideoModalBtn = document.getElementById('close-video-modal');

  let lastActiveElement = null;

  const watchButtons = document.querySelectorAll('.btn-watch-video, .video-thumbnail-wrap, .bento-card-video');

  watchButtons.forEach(btn => {
    // Keyboard activation (Enter / Space) for accessible div buttons
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.video-card, .bento-card-video');
      if (!card) return;

      lastActiveElement = document.activeElement;

      const videoId = card.getAttribute('data-video-id') || 'L_LUpnjgPso';
      const title = card.querySelector('.video-card-title, .bento-card-headline')?.textContent?.replace(/\s+/g, ' ') || 'História de Aprovação CaLL';
      const speaker = card.querySelector('.video-instructor-line, .bento-card-tag-pill')?.textContent || 'CaLL Cursos Isolados';

      if (modalVideoTitle) modalVideoTitle.textContent = title;
      if (modalVideoSpeaker) modalVideoSpeaker.textContent = speaker;

      // Set embed URL (safe embed with autoplay)
      if (videoIframe) {
        videoIframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      }

      if (videoModal) {
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeVideoModalBtn?.focus();
      }
    });
  });

  function closeVideoModal() {
    if (videoModal) {
      videoModal.classList.remove('active');
      document.body.style.overflow = '';
      if (videoIframe) videoIframe.src = '';
      lastActiveElement?.focus();
    }
  }

  if (closeVideoModalBtn) {
    closeVideoModalBtn.addEventListener('click', closeVideoModal);
  }

  // 6. E-book Download Modal & Form Flow
  const ebookModal = document.getElementById('ebook-modal');
  const closeEbookModalBtn = document.getElementById('close-ebook-modal');
  const ebookForm = document.getElementById('ebook-download-form');
  const downloadBtns = document.querySelectorAll('.btn-download-ebook');
  const modalEbookTitle = document.getElementById('modal-ebook-name');
  const modalEbookDesc = document.getElementById('modal-ebook-sub');
  const formState = document.getElementById('ebook-form-state');
  const successState = document.getElementById('ebook-success-state');
  const successPdfBtn = document.getElementById('success-pdf-btn');
  const successWppBtn = document.getElementById('success-wpp-btn');
  const leadPhoneInput = document.getElementById('lead-phone');

  // Phone auto-formatter (XX) XXXXX-XXXX
  if (leadPhoneInput) {
    leadPhoneInput.addEventListener('input', (e) => {
      let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
      e.target.value = !x[2] ? x[1] : `(${x[1]}) ${x[2]}` + (x[3] ? `-${x[3]}` : '');
    });
  }

  let currentEbookTitle = 'Material de Apoio CaLL';

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.ebook-card');
      const title = card?.querySelector('.ebook-cover-title')?.textContent || 'E-book CaLL ENEM';
      const badge = card?.querySelector('.ebook-type-badge')?.textContent || 'PDF Gratuito';
      currentEbookTitle = title;
      lastActiveElement = document.activeElement;

      if (modalEbookTitle) modalEbookTitle.textContent = title;
      if (modalEbookDesc) modalEbookDesc.textContent = `${badge} • Acesso imediato liberado`;

      // Reset form view state
      if (formState) formState.style.display = 'block';
      if (successState) successState.style.display = 'none';

      if (ebookModal) {
        ebookModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.getElementById('lead-name')?.focus();
      }
    });
  });

  function closeEbookModal() {
    if (ebookModal) {
      ebookModal.classList.remove('active');
      document.body.style.overflow = '';
      lastActiveElement?.focus();
    }
  }

  if (closeEbookModalBtn) {
    closeEbookModalBtn.addEventListener('click', closeEbookModal);
  }

  if (ebookForm) {
    ebookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-name')?.value.trim();
      const phone = document.getElementById('lead-phone')?.value.trim();

      if (!name || !phone || phone.length < 14) {
        const phoneField = document.getElementById('lead-phone');
        phoneField?.focus();
        phoneField?.setAttribute('aria-invalid', 'true');
        return;
      }

      // Open WhatsApp to share with a friend and unlock material
      const shareUrl = window.location.href.split('#')[0];
      const referralMessage = encodeURIComponent(`Olá! Encontrei esta página de Reta Final do CaLL com videoaulas e e-books gratuitos para o ENEM 2026. Acesse aqui para revisarmos juntos: ${shareUrl}`);
      window.open(`https://wa.me/?text=${referralMessage}`, '_blank');

      // Hide form and show success state
      if (formState) formState.style.display = 'none';
      if (successState) successState.style.display = 'block';

      // Setup simulated direct download trigger
      if (successPdfBtn) {
        successPdfBtn.onclick = () => {
          const blob = new Blob([`CaLL Cursos Isolados\n\nMaterial: ${currentEbookTitle}\nAluno: ${name}\n\nBons estudos na sua Reta Final!`], { type: 'text/plain;charset=utf-8' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${currentEbookTitle.replace(/[^a-zA-Z0-9]/g, '_')}_CaLL.txt`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          successPdfBtn.innerHTML = `
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Download Efetuado com Sucesso!</span>
          `;
        };
      }

      // Setup direct WhatsApp dispatch
      if (successWppBtn) {
        const msg = encodeURIComponent(`Olá, CaLL! Baixei o material *${currentEbookTitle}* e gostaria de receber informações sobre as turmas e novidades do ENEM! Meu nome é ${name}.`);
        successWppBtn.href = `https://wa.me/558432060299?text=${msg}`;
      }
    });
  }

  // Close modals on background click or Escape key, and trap focus inside active modal
  function trapModalFocus(modal) {
    if (!modal) return;
    modal.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const visibleFocusable = Array.prototype.filter.call(focusable, el => !el.hasAttribute('disabled') && el.offsetParent !== null);
      if (!visibleFocusable.length) return;
      const first = visibleFocusable[0];
      const last = visibleFocusable[visibleFocusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    });
  }

  [videoModal, ebookModal].forEach(modal => {
    if (!modal) return;
    trapModalFocus(modal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeVideoModal();
        closeEbookModal();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeVideoModal();
      closeEbookModal();
    }
  });

  // 7. Floating WhatsApp Widget for ENEM Landing Page
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
    }, 5000);
  }

  // 8. Interactive 3D Pop Banner & Star Physics
  const popBanner = document.getElementById('pop-hero-banner');
  const popHalftone = document.getElementById('hero-halftone');
  const popTapeBtn = document.getElementById('pop-tape-interactive');
  const tapeText = document.getElementById('tape-text');
  const popStars = document.querySelectorAll('.pop-star');
  const enemLetters = document.querySelectorAll('.enem-letter');

  if (popBanner) {
    // 3D Mouse Parallax & Dynamic Perspective
    popBanner.addEventListener('mousemove', (e) => {
      const rect = popBanner.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const rotateY = (x / (rect.width / 2)) * 14;
      const rotateX = -(y / (rect.height / 2)) * 12;

      popBanner.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      if (popHalftone) {
        popHalftone.style.transform = `translate(${(x * 0.08).toFixed(1)}px, ${(y * 0.08).toFixed(1)}px)`;
      }
    });

    popBanner.addEventListener('mouseleave', () => {
      popBanner.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
      if (popHalftone) {
        popHalftone.style.transform = 'translate(0, 0)';
      }
    });

    // Particle Burst Generator on Click
    function createBurst(x, y) {
      const colors = ['#FFE500', '#FF007F', '#00D2FF', '#FFFFFF', '#6C42FA'];
      const count = 16;

      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'pop-burst-particle';

        const size = Math.random() * 8 + 6;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
        const velocity = Math.random() * 85 + 45;

        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const tr = Math.random() * 360;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.setProperty('--tr', `${tr}deg`);

        popBanner.appendChild(particle);

        setTimeout(() => particle.remove(), 800);
      }
    }

    // Banner click burst
    popBanner.addEventListener('click', (e) => {
      if (e.target.closest('#pop-tape-interactive')) return;
      const rect = popBanner.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createBurst(x, y);
    });

    // Interactive Star Clicks
    popStars.forEach(star => {
      star.addEventListener('click', (e) => {
        e.stopPropagation();
        star.style.transform = 'scale(1.6) rotate(360deg)';
        const rect = popBanner.getBoundingClientRect();
        const starRect = star.getBoundingClientRect();
        const x = starRect.left - rect.left + starRect.width / 2;
        const y = starRect.top - rect.top + starRect.height / 2;
        createBurst(x, y);
        setTimeout(() => { star.style.transform = ''; }, 450);
      });
    });

    // Interactive Letter Clicks (Bouncy Elastic Pop)
    enemLetters.forEach(letter => {
      letter.addEventListener('click', (e) => {
        e.stopPropagation();
        letter.style.transform = 'scale(1.28) translateY(-26px) rotate(-8deg)';
        const rect = popBanner.getBoundingClientRect();
        const lRect = letter.getBoundingClientRect();
        const x = lRect.left - rect.left + lRect.width / 2;
        const y = lRect.top - rect.top + lRect.height / 2;
        createBurst(x, y);
        setTimeout(() => { letter.style.transform = ''; }, 350);
      });
    });

    // Interactive Tape Cycling
    if (popTapeBtn && tapeText) {
      const goals = [
        'Sua Nota 900+ no SiSU 2026',
        'Rumo à Universidade Federal',
        'Redação Nota 1000 na Prática',
        'Vaga Garantida na 1ª Chamada',
        'Dominando Linguagens & TRI',
        'Medicina • Direito • Exatas • Humanas'
      ];
      let goalIndex = 0;

      popTapeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goalIndex = (goalIndex + 1) % goals.length;
        tapeText.style.opacity = '0';
        tapeText.style.transform = 'translateY(-6px)';
        popTapeBtn.style.transform = 'scale(0.94)';

        setTimeout(() => {
          tapeText.textContent = goals[goalIndex];
          tapeText.style.transition = 'all 0.25s ease';
          tapeText.style.opacity = '1';
          tapeText.style.transform = 'translateY(0)';
          popTapeBtn.style.transform = 'rotate(1.2deg) scale(1.04)';
        }, 150);

        const rect = popBanner.getBoundingClientRect();
        const bRect = popTapeBtn.getBoundingClientRect();
        createBurst(bRect.left - rect.left + bRect.width / 2, bRect.top - rect.top + bRect.height / 2);
      });
    }
  }

  // 9. Approved Students Mouse & Touch Interaction
  const aprovadosWrap = document.getElementById('aprovados-carousel-wrap');

  if (aprovadosWrap) {
    let isDown = false;
    let startX = 0;
    let scrollStart = 0;
    let isHovered = false;
    let velocity = 0;
    let lastX = 0;
    let momentumID = null;

    // Prevent default browser dragging on images
    aprovadosWrap.querySelectorAll('img').forEach(img => {
      img.setAttribute('draggable', 'false');
    });

    // Auto-scroll drift (0.8px per frame) with IntersectionObserver & reduced-motion respect
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let isVisible = false;
    let autoScrollId = null;

    function stepAutoScroll() {
      if (isVisible && !isDown && !isHovered) {
        aprovadosWrap.scrollLeft += 0.8;
        const maxScroll = aprovadosWrap.scrollWidth - aprovadosWrap.clientWidth;
        if (aprovadosWrap.scrollLeft >= maxScroll - 2) {
          aprovadosWrap.scrollLeft = 0;
        }
      }
      if (isVisible && !prefersReducedMotion) {
        autoScrollId = requestAnimationFrame(stepAutoScroll);
      } else {
        autoScrollId = null;
      }
    }

    if (!prefersReducedMotion && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible && !autoScrollId) {
            autoScrollId = requestAnimationFrame(stepAutoScroll);
          } else if (!isVisible && autoScrollId) {
            cancelAnimationFrame(autoScrollId);
            autoScrollId = null;
          }
        });
      }, { threshold: 0.05 });
      observer.observe(aprovadosWrap);
    } else if (!prefersReducedMotion) {
      isVisible = true;
      autoScrollId = requestAnimationFrame(stepAutoScroll);
    }

    // Hover pause
    aprovadosWrap.addEventListener('mouseenter', () => {
      isHovered = true;
    });

    aprovadosWrap.addEventListener('mouseleave', () => {
      isHovered = false;
    });

    // Mouse Wheel to horizontal scroll
    aprovadosWrap.addEventListener('wheel', (e) => {
      isHovered = true;
      const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      aprovadosWrap.scrollLeft += delta * 1.2;
      e.preventDefault();
      clearTimeout(aprovadosWrap._wheelTimer);
      aprovadosWrap._wheelTimer = setTimeout(() => {
        isHovered = false;
      }, 1500);
    }, { passive: false });

    // Drag to scroll
    aprovadosWrap.addEventListener('mousedown', (e) => {
      isDown = true;
      isHovered = true;
      cancelAnimationFrame(momentumID);
      startX = e.pageX;
      scrollStart = aprovadosWrap.scrollLeft;
      lastX = e.pageX;
      velocity = 0;
      aprovadosWrap.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const currentX = e.pageX;
      const delta = currentX - lastX;
      velocity = delta;
      lastX = currentX;
      aprovadosWrap.scrollLeft = scrollStart - (currentX - startX);
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      aprovadosWrap.classList.remove('is-dragging');

      // Momentum glide
      function momentumGlide() {
        if (Math.abs(velocity) > 0.5) {
          aprovadosWrap.scrollLeft -= velocity;
          velocity *= 0.94;
          momentumID = requestAnimationFrame(momentumGlide);
        } else {
          isHovered = false;
        }
      }
      momentumID = requestAnimationFrame(momentumGlide);
    });

    // Touch support (mobile)
    aprovadosWrap.addEventListener('touchstart', () => {
      isHovered = true;
    }, { passive: true });

    aprovadosWrap.addEventListener('touchend', () => {
      setTimeout(() => { isHovered = false; }, 2000);
    }, { passive: true });
  }

  // 10. Bento Grid Progressive Disclosure on Mobile
  const bentoExpandBtn = document.getElementById('bento-expand-btn');
  const bentoGrid = document.querySelector('.bento-social-masonry');
  if (bentoExpandBtn && bentoGrid) {
    bentoExpandBtn.addEventListener('click', () => {
      const isExpanded = bentoGrid.classList.toggle('is-expanded');
      bentoExpandBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      bentoExpandBtn.innerHTML = isExpanded
        ? '<span>Mostrar menos histórias</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>'
        : '<span>Ver todas as histórias de aprovação</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>';
    });
  }
});

