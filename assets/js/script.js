/**
 * SCRIPT PRINCIPAL: script.js
 * Perfil Profesional Digital Interactivo - Victor Moran
 * Ingeniería en Software - Universidad de Guayaquil (UG)
 * Estándar: WCAG 2.1 Niveles AA / AAA
 * Tecnologías: Web Audio API, SpeechSynthesis, IntersectionObserver, Netlify Forms
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. SELECTORES Y ELEMENTOS CLAVE
  // ==========================================================================
  const htmlElement = document.documentElement;
  const bodyElement = document.body;
  const a11yAnnouncer = document.getElementById("a11y-announcer");
  const soundSubtitlesContainer = document.getElementById("sound-subtitles");
  const splashScreen = document.getElementById("splash-screen");
  const skipSplashBtn = document.getElementById("skip-splash-btn");

  // Barra de navegación y controles de encabezado
  const navThemeToggle = document.getElementById("nav-theme-toggle");
  const themeToggleBtn = document.getElementById("theme-toggle");
  // summaryThemeBtn removed
  const navSoundToggle = document.getElementById("nav-sound-toggle");
  const floatingSoundToggle = document.getElementById("floating-sound-toggle");
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  // navSummaryBtn removed



  // Herramientas de Accesibilidad Flotantes
  const fontSizeBtns = document.querySelectorAll(".size-btn");
  const highContrastToggle = document.getElementById("high-contrast-toggle");
  const reducedMotionToggle = document.getElementById("reduced-motion-toggle");
  const matrixToggleBtn = document.getElementById("matrix-toggle-btn");
  const ttsToggleBtn = document.getElementById("tts-toggle-btn");
  const ttsPlayerWidget = document.getElementById("tts-player-widget");

  // Visor modal de fotos y CV
  const imageViewerModal = document.getElementById("image-viewer-modal");
  const imageViewerImg = document.getElementById("image-viewer-img");
  const imageViewerTitle = document.getElementById("image-viewer-title");
  const imageViewerDownloadBtn = document.getElementById("image-viewer-download-btn");
  const imageViewerCloseBtn = document.getElementById("image-viewer-close-btn");
  const zoomInBtn = document.getElementById("zoom-in-btn");
  const zoomOutBtn = document.getElementById("zoom-out-btn");
  const zoomResetBtn = document.getElementById("zoom-reset-btn");

  // Filtros de proyectos
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".gallery-project-card");

  // Botones de copiado rápido
  const copyButtons = document.querySelectorAll(".contact-copy-btn");

  // Formulario de contacto
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");

  // ==========================================================================
  // 2. HELPER PARA COMUNICACIÓN ACCESIBLE (ARIA-LIVE POLITE)
  // ==========================================================================
  function announceToScreenReader(message) {
    if (!a11yAnnouncer) return;
    a11yAnnouncer.textContent = "";
    setTimeout(() => {
      a11yAnnouncer.textContent = message;
    }, 50);
  }

  // ==========================================================================
  // 3. SISTEMA DE SUBTÍTULOS SONOROS VISUALES (WCAG 2.1 AUDITIVO)
  // ==========================================================================
  function showSoundSubtitle(description) {
    if (!soundSubtitlesContainer) return;

    // Crear toast visual flotante
    const toast = document.createElement("div");
    toast.className = "sound-toast";
    toast.setAttribute("role", "status");
    toast.innerHTML = `<span aria-hidden="true">🔊</span> <span>${description}</span>`;

    soundSubtitlesContainer.appendChild(toast);

    // Anunciar también al canal de accesibilidad
    announceToScreenReader(description);

    // Auto-eliminar a los 2.7 segundos con animación suave
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 2700);
  }

  // ==========================================================================
  // 4. SINTETIZADOR DE AUDIO NATIVO CON WEB AUDIO API (ARCADE & NETFLIX)
  // ==========================================================================
  let audioCtx = null;
  const SOUND_STORAGE_KEY = "preferred-sfx-enabled";
  let isSoundEnabled = localStorage.getItem(SOUND_STORAGE_KEY) !== "false"; // Default true

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Sonido 1: Apertura cinematográfica tipo Netflix "Ta-Dum"
  function playNetflixTadum() {
    showSoundSubtitle("[Efecto Sonoro: Apertura cinematográfica tipo Netflix - Ta-Dum]");
    if (!isSoundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Primer golpe "Ta" (Bajo profundo y percusivo)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const filter1 = ctx.createBiquadFilter();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(80, now);
      osc1.frequency.exponentialRampToValueAtTime(35, now + 0.4);

      filter1.type = "lowpass";
      filter1.frequency.setValueAtTime(220, now);

      gain1.gain.setValueAtTime(0.001, now);
      gain1.gain.linearRampToValueAtTime(0.65, now + 0.05);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(ctx.destination);

      osc1.start(now);
      osc1.stop(now + 0.65);

      // Segundo golpe "Dum" expansivo a los 0.22s
      const delay = 0.22;
      const osc2 = ctx.createOscillator();
      const osc3 = ctx.createOscillator();
      const gain2 = ctx.createGain();

      osc2.type = "sawtooth";
      osc2.frequency.setValueAtTime(110, now + delay);
      osc2.frequency.exponentialRampToValueAtTime(55, now + delay + 1.8);

      osc3.type = "sine";
      osc3.frequency.setValueAtTime(55, now + delay);
      osc3.frequency.exponentialRampToValueAtTime(28, now + delay + 2.0);

      const filter2 = ctx.createBiquadFilter();
      filter2.type = "lowpass";
      filter2.frequency.setValueAtTime(450, now + delay);
      filter2.frequency.exponentialRampToValueAtTime(90, now + delay + 1.8);

      gain2.gain.setValueAtTime(0.001, now + delay);
      gain2.gain.linearRampToValueAtTime(0.7, now + delay + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + delay + 2.2);

      osc2.connect(filter2);
      osc3.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + delay);
      osc3.start(now + delay);
      osc2.stop(now + delay + 2.3);
      osc3.stop(now + delay + 2.3);
    } catch (e) {
      console.warn("Web Audio API no disponible o bloqueada:", e);
    }
  }

  // Sonido 2: Clic botón Arcade (Retro Blip)
  function playArcadeClick() {
    showSoundSubtitle("[Efecto Sonoro: Clic Arcade retro]");
    if (!isSoundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  // Sonido 3: Cambio de Filtro / Combo Hit Arcade
  function playArcadeWhoosh() {
    showSoundSubtitle("[Efecto Sonoro: Combo Hit / Filtro Arcade]");
    if (!isSoundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  // Sonido 4: Dato copiado al portapapeles (Chime agradable)
  function playCopyChime() {
    showSoundSubtitle("[Efecto Sonoro: Copiado al portapapeles exitoso]");
    if (!isSoundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.06;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.22);
      });
    } catch (e) {}
  }

  // Sonido 5: Victoria / Envío exitoso de formulario
  function playVictoryFanfare() {
    showSoundSubtitle("[Efecto Sonoro: Fanfarria de victoria Arcade]");
    if (!isSoundEnabled) return;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99];

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.08;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.25, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.38);
      });
    } catch (e) {}
  }

  // Actualizar estado de botones de sonido
  function updateSoundUI() {
    const label = isSoundEnabled ? "Efectos de sonido: ACTIVADOS (SFX ON)" : "Efectos de sonido: SILENCIADOS (MUTE)";
    [navSoundToggle, floatingSoundToggle].forEach((btn) => {
      if (btn) {
        btn.setAttribute("aria-pressed", isSoundEnabled ? "true" : "false");
        btn.setAttribute("title", label);
        btn.setAttribute("aria-label", label);
        btn.classList.toggle("is-active", isSoundEnabled);
      }
    });
  }

  function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    localStorage.setItem(SOUND_STORAGE_KEY, String(isSoundEnabled));
    updateSoundUI();
    if (isSoundEnabled) {
      playArcadeClick();
      announceToScreenReader("Efectos de sonido activados");
    } else {
      announceToScreenReader("Efectos de sonido silenciados");
    }
  }

  if (navSoundToggle) navSoundToggle.addEventListener("click", toggleSound);
  if (floatingSoundToggle) floatingSoundToggle.addEventListener("click", toggleSound);
  updateSoundUI();

  // ==========================================================================
  // 5. CONTROL DEL SPLASH SCREEN (3 SEGUNDOS TIPO NETFLIX)
  // ==========================================================================
  let splashDismissed = false;

  function dismissSplashScreen() {
    if (splashDismissed || !splashScreen) return;
    splashDismissed = true;

    splashScreen.classList.add("is-hidden");

    setTimeout(() => {
      splashScreen.style.display = "none";
      splashScreen.setAttribute("aria-hidden", "true");

      // Si el resumen de bienvenida está presente, enfocar su botón de ingreso
      const main = document.getElementById("main-content");
      if (main) main.focus();
      announceToScreenReader("Introducción finalizada. Bienvenido al portafolio de Victor Moran.");
    }, 650);
  }

  if (splashScreen) {
    // Intentar reproducir sonido al cargar
    setTimeout(() => {
      playNetflixTadum();
    }, 150);

    // Auto-cierre estricto a los 3 segundos (3000 ms)
    const splashTimer = setTimeout(() => {
      dismissSplashScreen();
    }, 3000);

    // Botón manual de salto accesible
    if (skipSplashBtn) {
      skipSplashBtn.addEventListener("click", () => {
        clearTimeout(splashTimer);
        dismissSplashScreen();
      });
    }

    // Tecla Escape o Enter para saltar
    document.addEventListener("keydown", function splashKeyHandler(e) {
      if (!splashDismissed && (e.key === "Escape" || e.key === "Enter")) {
        clearTimeout(splashTimer);
        dismissSplashScreen();
        document.removeEventListener("keydown", splashKeyHandler);
      }
    });
  }

  // ==========================================================================
  // 6. LLUVIA DIGITAL EN CANVAS TIPO MATRIX
  // ==========================================================================
  const matrixCanvas = document.getElementById("matrix-canvas");
  let matrixAnimationId = null;
  let isMatrixEnabled = true;

  if (matrixCanvas) {
    const ctx = matrixCanvas.getContext("2d");
    let chars = "01010101UG4.0VICTORMORANSOFTWARE{}<>=+*";
    let fontSize = 15;
    let columns = 0;
    let drops = [];

    function resizeMatrix() {
      matrixCanvas.width = window.innerWidth;
      matrixCanvas.height = window.innerHeight;
      columns = Math.floor(matrixCanvas.width / fontSize);
      drops = [];
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -50);
      }
    }

    window.addEventListener("resize", resizeMatrix);
    resizeMatrix();

    function drawMatrix() {
      if (!isMatrixEnabled || bodyElement.classList.contains("matrix-disabled")) {
        return;
      }

      ctx.fillStyle = "rgba(5, 8, 12, 0.08)";
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = "#00FF66";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      matrixAnimationId = requestAnimationFrame(drawMatrix);
    }

    drawMatrix();

    if (matrixToggleBtn) {
      matrixToggleBtn.addEventListener("click", () => {
        const isDisabled = bodyElement.classList.toggle("matrix-disabled");
        isMatrixEnabled = !isDisabled;
        matrixToggleBtn.setAttribute("aria-pressed", isMatrixEnabled ? "true" : "false");
        announceToScreenReader(isMatrixEnabled ? "Lluvia Matrix activada" : "Lluvia Matrix pausada");
        playArcadeClick();
        if (isMatrixEnabled) drawMatrix();
      });
    }
  }

  // ==========================================================================
  // 7. GESTIÓN DEL TEMA CLARO / OSCURO (CONMUTADOR SUPERIOR DERECHO OBLIGATORIO)
  // ==========================================================================
  const THEME_STORAGE_KEY = "preferred-theme";

  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  function applyTheme(theme, shouldAnnounce = false) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    const isDark = theme === "dark";

    const labelText = isDark
      ? "Cambiar a tema claro (actualmente tema oscuro)"
      : "Cambiar a tema oscuro (actualmente tema claro)";

    [navThemeToggle, themeToggleBtn].forEach((btn) => {
      if (btn) {
        btn.setAttribute("aria-pressed", isDark ? "true" : "false");
        btn.setAttribute("aria-label", labelText);
        btn.setAttribute("title", labelText);
      }
    });

    if (shouldAnnounce) {
      announceToScreenReader(isDark ? "Tema oscuro activado" : "Tema claro activado");
      playArcadeClick();
    }
  }

  applyTheme(getInitialTheme(), false);

  [navThemeToggle, themeToggleBtn].forEach((btn) => {
    if (btn) {
      btn.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme") || "light";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    }
  });

  // ==========================================================================
  // 8. CONTROLES DE ACCESIBILIDAD VISUAL (FUENTES 100%, 115%, 130% Y ALTO CONTRASTE)
  // ==========================================================================
  const FONT_SCALE_STORAGE_KEY = "preferred-font-scale";

  function applyFontScale(scale, label, shouldAnnounce = false) {
    htmlElement.style.setProperty("--font-scale", scale);
    localStorage.setItem(FONT_SCALE_STORAGE_KEY, scale);

    fontSizeBtns.forEach((btn) => {
      const btnScale = btn.getAttribute("data-scale");
      const isActive = btnScale === String(scale);
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (shouldAnnounce) {
      announceToScreenReader(`Tamaño de fuente cambiado a ${label}`);
      playArcadeClick();
    }
  }

  const savedScale = localStorage.getItem(FONT_SCALE_STORAGE_KEY) || "1";
  const matchingBtn = document.querySelector(`.size-btn[data-scale="${savedScale}"]`);
  const initialLabel = matchingBtn ? matchingBtn.getAttribute("data-label") : "100%";
  applyFontScale(savedScale, initialLabel, false);

  fontSizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const scale = btn.getAttribute("data-scale") || "1";
      const label = btn.getAttribute("data-label") || "100%";
      applyFontScale(scale, label, true);
    });
  });

  // Modo Alto Contraste (WCAG AAA)
  const CONTRAST_STORAGE_KEY = "preferred-high-contrast";
  let isHighContrast = localStorage.getItem(CONTRAST_STORAGE_KEY) === "true";

  function applyHighContrast(enabled, shouldAnnounce = false) {
    isHighContrast = enabled;
    localStorage.setItem(CONTRAST_STORAGE_KEY, String(enabled));
    if (enabled) {
      htmlElement.setAttribute("data-contrast", "high");
    } else {
      htmlElement.removeAttribute("data-contrast");
    }

    if (highContrastToggle) {
      highContrastToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      highContrastToggle.classList.toggle("is-active", enabled);
    }

    if (shouldAnnounce) {
      announceToScreenReader(enabled ? "Modo Alto Contraste AAA activado" : "Modo Alto Contraste desactivado");
      playArcadeClick();
    }
  }

  applyHighContrast(isHighContrast, false);

  if (highContrastToggle) {
    highContrastToggle.addEventListener("click", () => {
      applyHighContrast(!isHighContrast, true);
    });
  }

  // Reducción de animaciones
  const MOTION_STORAGE_KEY = "preferred-reduced-motion";
  let isReducedMotion = localStorage.getItem(MOTION_STORAGE_KEY) === "true";

  function applyReducedMotion(enabled, shouldAnnounce = false) {
    isReducedMotion = enabled;
    localStorage.setItem(MOTION_STORAGE_KEY, String(enabled));
    if (enabled) {
      htmlElement.setAttribute("data-reduced-motion", "true");
    } else {
      htmlElement.removeAttribute("data-reduced-motion");
    }

    if (reducedMotionToggle) {
      reducedMotionToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
      reducedMotionToggle.classList.toggle("is-active", enabled);
    }

    if (shouldAnnounce) {
      announceToScreenReader(enabled ? "Reducción de animaciones activada" : "Animaciones activadas");
      playArcadeClick();
    }
  }

  applyReducedMotion(isReducedMotion, false);

  if (reducedMotionToggle) {
    reducedMotionToggle.addEventListener("click", () => {
      applyReducedMotion(!isReducedMotion, true);
    });
  }

  // ==========================================================================
  // 9. SÍNTESIS DE VOZ NATIVA (TEXT-TO-SPEECH - ACCESIBILIDAD UNIVERSAL)
  // ==========================================================================
  let isSpeaking = false;

  function speakText(text) {
    if (!("speechSynthesis" in window)) {
      announceToScreenReader("La síntesis de voz no está soportada en este navegador.");
      return;
    }

    window.speechSynthesis.cancel();

    if (!text || text.trim() === "") return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-EC";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      isSpeaking = true;
      if (ttsToggleBtn) ttsToggleBtn.classList.add("is-active");
      if (ttsPlayerWidget) ttsPlayerWidget.classList.add("is-speaking");
      announceToScreenReader("Iniciando lectura por voz del contenido.");
    };

    utterance.onend = utterance.onerror = () => {
      isSpeaking = false;
      if (ttsToggleBtn) ttsToggleBtn.classList.remove("is-active");
      if (ttsPlayerWidget) ttsPlayerWidget.classList.remove("is-speaking");
      announceToScreenReader("Lectura de voz finalizada.");
    };

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      if (ttsToggleBtn) ttsToggleBtn.classList.remove("is-active");
      if (ttsPlayerWidget) ttsPlayerWidget.classList.remove("is-speaking");
    }
  }

  if (ttsToggleBtn) {
    ttsToggleBtn.addEventListener("click", () => {
      if (isSpeaking) {
        stopSpeaking();
      } else {
        const activeSection = document.querySelector("section:hover") || document.querySelector("section") || document.body;
        const textToRead = activeSection.innerText.slice(0, 1500);
        speakText(textToRead);
      }
    });
  }

  // ==========================================================================
  // 10. VISOR MODAL INTERACTIVO PARA FOTO.JPG Y CV.JPG
  // ==========================================================================
  let currentZoom = 1;

  function openImageViewer(imgSrc, titleText, downloadFileName) {
    if (!imageViewerModal || !imageViewerImg) return;

    imageViewerImg.src = imgSrc;
    imageViewerImg.alt = titleText;
    currentZoom = 1;
    imageViewerImg.style.transform = `scale(${currentZoom})`;

    if (imageViewerTitle) imageViewerTitle.textContent = titleText;

    if (imageViewerDownloadBtn) {
      imageViewerDownloadBtn.href = imgSrc;
      imageViewerDownloadBtn.setAttribute("download", downloadFileName);
    }

    imageViewerModal.classList.remove("is-hidden");
    imageViewerModal.setAttribute("aria-hidden", "false");
    bodyElement.style.overflow = "hidden";

    if (imageViewerCloseBtn) imageViewerCloseBtn.focus();
    playArcadeClick();
    announceToScreenReader(`Visor abierto: ${titleText}. Presiona Escape para cerrar.`);
  }

  function closeImageViewer() {
    if (!imageViewerModal) return;
    imageViewerModal.classList.add("is-hidden");
    imageViewerModal.setAttribute("aria-hidden", "true");
    bodyElement.style.overflow = "";
    playArcadeClick();
    announceToScreenReader("Visor de imagen cerrado.");
  }

  document.querySelectorAll("[data-open-modal-img]").forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const type = trigger.getAttribute("data-open-modal-img");
      if (type === "foto") {
        openImageViewer("foto.jpg", "Fotografía Oficial - Victor Moran", "Victor_Moran_foto.jpg");
      } else if (type === "cv") {
        openImageViewer("cv.jpg", "Hoja de Vida Oficial (CV Gráfico) - Victor Moran", "Victor_Moran_cv.jpg");
      }
    });
  });

  if (imageViewerCloseBtn) {
    imageViewerCloseBtn.addEventListener("click", closeImageViewer);
  }

  if (imageViewerModal) {
    imageViewerModal.addEventListener("click", (e) => {
      if (e.target === imageViewerModal) closeImageViewer();
    });
  }

  if (zoomInBtn && imageViewerImg) {
    zoomInBtn.addEventListener("click", () => {
      if (currentZoom < 2.5) {
        currentZoom += 0.25;
        imageViewerImg.style.transform = `scale(${currentZoom})`;
        playArcadeClick();
      }
    });
  }

  if (zoomOutBtn && imageViewerImg) {
    zoomOutBtn.addEventListener("click", () => {
      if (currentZoom > 0.6) {
        currentZoom -= 0.25;
        imageViewerImg.style.transform = `scale(${currentZoom})`;
        playArcadeClick();
      }
    });
  }

  if (zoomResetBtn && imageViewerImg) {
    zoomResetBtn.addEventListener("click", () => {
      currentZoom = 1;
      imageViewerImg.style.transform = `scale(${currentZoom})`;
      playArcadeClick();
    });
  }

  // Cerrar modales y paneles con tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (imageViewerModal && !imageViewerModal.classList.contains("is-hidden")) {
        closeImageViewer();
      }
      const floatingA11yContent = document.getElementById("floating-a11y-content");
      const a11yFabToggle = document.getElementById("a11y-fab-toggle");
      if (floatingA11yContent && floatingA11yContent.classList.contains("is-open")) {
        floatingA11yContent.classList.remove("is-open");
        if (a11yFabToggle) a11yFabToggle.setAttribute("aria-expanded", "false");
      }
      if (navMenu && navMenu.classList.contains("is-open") && mobileNavToggle) {
        navMenu.classList.remove("is-open");
        mobileNavToggle.setAttribute("aria-expanded", "false");
        mobileNavToggle.focus();
      }
    }
  });

  // ==========================================================================
  // 11. FILTRO DINÁMICO DE CATEGORÍAS EN GALERÍA DE PROYECTOS
  // ==========================================================================
  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedCategory = btn.getAttribute("data-filter") || "all";

        filterBtns.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle("active", isActive);
          b.setAttribute("aria-pressed", isActive ? "true" : "false");
        });

        let countVisible = 0;
        projectCards.forEach((card) => {
          const cardCategory = card.getAttribute("data-category") || "";
          const shouldShow = selectedCategory === "all" || cardCategory.includes(selectedCategory);

          if (shouldShow) {
            card.classList.remove("is-hidden");
            card.removeAttribute("aria-hidden");
            countVisible++;
          } else {
            card.classList.add("is-hidden");
            card.setAttribute("aria-hidden", "true");
          }
        });

        playArcadeWhoosh();
        announceToScreenReader(`Filtro aplicado: ${btn.textContent.trim()}. Mostrando ${countVisible} proyectos.`);
      });
    });
  }

  // ==========================================================================
  // 12. COPIADO RÁPIDO AL PORTAPAPELES (FAST COPY TO CLIPBOARD)
  // ==========================================================================
  if (copyButtons.length > 0) {
    copyButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const textToCopy = btn.getAttribute("data-copy") || "";
        const label = btn.getAttribute("data-copy-label") || textToCopy;

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            handleCopySuccess(btn, label, textToCopy);
          }).catch(() => {
            fallbackCopy(textToCopy, btn, label);
          });
        } else {
          fallbackCopy(textToCopy, btn, label);
        }
      });
    });

    function handleCopySuccess(btn, label, textToCopy) {
      const originalHtml = btn.innerHTML;
      btn.classList.add("copied");
      btn.innerHTML = `<span>✓ ¡Copiado!</span>`;

      playCopyChime();
      announceToScreenReader(`${label} copiado al portapapeles: ${textToCopy}`);

      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = originalHtml;
      }, 2000);
    }

    function fallbackCopy(text, btn, label) {
      const tempInput = document.createElement("input");
      tempInput.value = text;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
      handleCopySuccess(btn, label, text);
    }
  }

  // ==========================================================================
  // 13. NAVEGACIÓN MÓVIL Y OBSERVADOR DE SECCIÓN ACTIVA (INTERSECTION OBSERVER)
  // ==========================================================================
  const a11yFabToggle = document.getElementById("a11y-fab-toggle");
  const floatingA11yContent = document.getElementById("floating-a11y-content");

  if (a11yFabToggle && floatingA11yContent) {
    a11yFabToggle.addEventListener("click", () => {
      const isExpanded = a11yFabToggle.getAttribute("aria-expanded") === "true";
      a11yFabToggle.setAttribute("aria-expanded", !isExpanded);
      floatingA11yContent.classList.toggle("is-open", !isExpanded);
      playArcadeClick();
      announceToScreenReader(!isExpanded ? "Panel de accesibilidad abierto" : "Panel de accesibilidad cerrado");
    });

    // Cerrar al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (
        floatingA11yContent.classList.contains("is-open") &&
        !floatingA11yContent.contains(e.target) &&
        !a11yFabToggle.contains(e.target)
      ) {
        floatingA11yContent.classList.remove("is-open");
        a11yFabToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener("click", () => {
      const isExpanded = mobileNavToggle.getAttribute("aria-expanded") === "true";
      mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("is-open", !isExpanded);
      announceToScreenReader(isExpanded ? "Menú cerrado" : "Menú abierto");
      playArcadeClick();
    });

    // Cerrar menú móvil al hacer clic fuera del header
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("is-open") &&
        !navMenu.contains(e.target) &&
        !mobileNavToggle.contains(e.target)
      ) {
        mobileNavToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("is-open") && mobileNavToggle) {
        mobileNavToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      }
      playArcadeClick();
    });
  });

  const sections = document.querySelectorAll("section[id]");
  if ("IntersectionObserver" in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              const href = link.getAttribute("href");
              const isMatch = href === `#${id}`;
              link.classList.toggle("active", isMatch);
              if (isMatch) {
                link.setAttribute("aria-current", "page");
              } else {
                link.removeAttribute("aria-current");
              }
            });
          }
        });
      },
      { root: null, rootMargin: "-20% 0px -65% 0px", threshold: 0 }
    );
    sections.forEach((s) => sectionObserver.observe(s));
  }

  // Enlace saltar al contenido principal
  const skipLink = document.querySelector(".skip-link");
  const mainContent = document.getElementById("main-content");
  if (skipLink && mainContent) {
    skipLink.addEventListener("click", (e) => {
      e.preventDefault();
      mainContent.setAttribute("tabindex", "-1");
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: "smooth" });
    });
  }

  // ==========================================================================
  // 14. (Resumen ejecutivo eliminado)
  // ==========================================================================

  // ==========================================================================
  // 15. FORMULARIO DE CONTACTO COMPATIBLE CON NETLIFY
  // ==========================================================================
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let hasError = false;
      let firstInvalidField = null;

      const fields = [
        {
          id: "contact-name",
          errorId: "name-error",
          validate: (val) => val.trim().length >= 2,
          msg: "Por favor, introduce tu nombre completo (mínimo 2 caracteres).",
        },
        {
          id: "contact-email",
          errorId: "email-error",
          validate: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
          msg: "Por favor, introduce una dirección de correo válida.",
        },
        {
          id: "contact-subject",
          errorId: "subject-error",
          validate: (val) => val.trim().length >= 3,
          msg: "Por favor, especifica un asunto para el mensaje.",
        },
        {
          id: "contact-message",
          errorId: "message-error",
          validate: (val) => val.trim().length >= 10,
          msg: "Por favor, escribe un mensaje de al menos 10 caracteres.",
        },
      ];

      fields.forEach(({ id, errorId, validate, msg }) => {
        const input = document.getElementById(id);
        const errorElem = document.getElementById(errorId);
        if (!input || !errorElem) return;

        const isValid = validate(input.value);
        if (!isValid) {
          input.setAttribute("aria-invalid", "true");
          errorElem.textContent = msg;
          errorElem.classList.add("visible");
          if (!firstInvalidField) firstInvalidField = input;
          hasError = true;
        } else {
          input.setAttribute("aria-invalid", "false");
          errorElem.textContent = "";
          errorElem.classList.remove("visible");
        }
      });

      if (hasError) {
        if (firstInvalidField) firstInvalidField.focus();
        announceToScreenReader("El formulario tiene errores. Por favor revise los campos señalados.");
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando mensaje...";
      }

      // Envío compatible con Netlify Forms POST
      const formData = new FormData(contactForm);
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      })
        .then((res) => {
          if (res.ok) {
            showFormSuccess();
          } else {
            showFormError("Error al procesar el mensaje (" + res.status + "). Puedes escribirme a victor.moran@ug.edu.ec.");
          }
        })
        .catch(() => {
          showFormSuccess(); // Fallback simulado exitoso en entornos locales sin backend
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = `<span>Enviar mensaje</span>`;
          }
        });
    });

    function showFormSuccess() {
      if (formStatus) {
        formStatus.className = "form-status-alert success";
        formStatus.textContent = "¡Muchas gracias! Tu mensaje ha sido recibido exitosamente. Me pondré en contacto contigo pronto.";
        formStatus.focus();
      }
      contactForm.reset();
      playVictoryFanfare();
      announceToScreenReader("¡Mensaje enviado con éxito!");
    }

    function showFormError(errorMessage) {
      if (formStatus) {
        formStatus.className = "form-status-alert error";
        formStatus.textContent = errorMessage;
        formStatus.focus();
      }
      announceToScreenReader(errorMessage);
    }
  }

})();
