/**
 * SCRIPT PRINCIPAL: script.js
 * Perfil Profesional Digital Accesible - Victor Moran
 * Estándar: WCAG 2.1 Nivel AA
 */

(function () {
  "use strict";

  // ==========================================================================
  // 1. SELECTORES Y ELEMENTOS CLAVE
  // ==========================================================================
  const htmlElement = document.documentElement;
  const themeToggleBtn = document.getElementById("theme-toggle");
  const a11yAnnouncer = document.getElementById("a11y-announcer");
  const mobileNavToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const fontSizeBtns = document.querySelectorAll(".size-btn");
  const summaryIntroScreen = document.getElementById("summary-intro-screen");
  const btnEnterPortfolio = document.getElementById("btn-enter-portfolio");
  const summaryThemeBtn = document.getElementById("summary-theme-toggle");
  const summaryCloseModalBtn = document.getElementById("summary-close-modal-btn");
  const navSummaryBtn = document.getElementById("nav-summary-btn");

  /**
   * Helper para anunciar mensajes a tecnologías de asistencia (lectores de pantalla)
   * @param {string} message - Mensaje a comunicar en el canal aria-live polite
   */
  function announceToScreenReader(message) {
    if (!a11yAnnouncer) return;
    a11yAnnouncer.textContent = "";
    // Pequeño retardo para forzar que el lector detecte el cambio de texto
    setTimeout(() => {
      a11yAnnouncer.textContent = message;
    }, 50);
  }

  // ==========================================================================
  // 2. GESTIÓN DEL TEMA CLARO / OSCURO (Persistencia y Accesibilidad)
  // ==========================================================================
  const THEME_STORAGE_KEY = "preferred-theme";

  /**
   * Obtiene la preferencia de tema inicial (localStorage > prefers-color-scheme > 'light')
   */
  function getInitialTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    // Si no hay preferencia guardada, verificar el sistema operativo del usuario
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  }

  /**
   * Aplica el tema seleccionado actualizando el atributo HTML y los metadatos ARIA
   * @param {string} theme - 'light' o 'dark'
   * @param {boolean} shouldAnnounce - Indica si debe notificarse al lector de pantalla
   */
  function applyTheme(theme, shouldAnnounce = false) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    const isDark = theme === "dark";

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
      const labelText = isDark
        ? "Cambiar a tema claro (actualmente tema oscuro)"
        : "Cambiar a tema oscuro (actualmente tema claro)";
      themeToggleBtn.setAttribute("aria-label", labelText);
      themeToggleBtn.setAttribute("title", labelText);
    }

    if (summaryThemeBtn) {
      summaryThemeBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
      const labelText = isDark
        ? "Cambiar a tema claro (actualmente tema oscuro)"
        : "Cambiar a tema oscuro (actualmente tema claro)";
      summaryThemeBtn.setAttribute("aria-label", labelText);
      summaryThemeBtn.setAttribute("title", labelText);
    }

    if (shouldAnnounce) {
      announceToScreenReader(isDark ? "Tema oscuro activado" : "Tema claro activado");
    }
  }

  // Inicializar tema al cargar la página
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme, false);

  // Escuchador de clic en el botón de tema
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }

  if (summaryThemeBtn) {
    summaryThemeBtn.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }

  // Escuchar cambios de preferencia del sistema si el usuario no ha establecido una fija
  if (window.matchMedia) {
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? "dark" : "light", true);
      }
    });
  }

  // ==========================================================================
  // 3. CONTROL DE TAMAÑO DE TEXTO ACCESIBLE
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
    }
  }

  // Cargar escala guardada
  const savedScale = localStorage.getItem(FONT_SCALE_STORAGE_KEY) || "1";
  const matchingBtn = document.querySelector(`.size-btn[data-scale="${savedScale}"]`);
  const initialLabel = matchingBtn ? matchingBtn.getAttribute("data-label") : "normal";
  applyFontScale(savedScale, initialLabel, false);

  fontSizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const scale = btn.getAttribute("data-scale") || "1";
      const label = btn.getAttribute("data-label") || "normal";
      applyFontScale(scale, label, true);
    });
  });

  // ==========================================================================
  // 4. NAVEGACIÓN MÓVIL ACCESIBLE
  // ==========================================================================
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener("click", () => {
      const isExpanded = mobileNavToggle.getAttribute("aria-expanded") === "true";
      mobileNavToggle.setAttribute("aria-expanded", !isExpanded);
      navMenu.classList.toggle("is-open", !isExpanded);

      if (!isExpanded) {
        announceToScreenReader("Menú de navegación abierto");
      } else {
        announceToScreenReader("Menú de navegación cerrado");
      }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("is-open")) {
        mobileNavToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
        mobileNavToggle.focus();
        announceToScreenReader("Menú de navegación cerrado");
      }
    });
  }

  // Cerrar menú al hacer clic en un enlace de navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("is-open")) {
        mobileNavToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      }
    });
  });

  // ==========================================================================
  // 5. OBSERVADOR DE SECCIÓN ACTIVA (IntersectionObserver)
  // ==========================================================================
  const sections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
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
    }, observerOptions);

    sections.forEach((section) => sectionObserver.observe(section));
  }

  // ==========================================================================
  // 6. ENLACE 'SALTAR AL CONTENIDO PRINCIPAL' (Gestión de foco)
  // ==========================================================================
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
  // 7. FORMULARIO DE CONTACTO CON VALIDACIÓN ACCESIBLE
  // ==========================================================================
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let hasError = false;
      let firstInvalidField = null;

      // Lista de campos requeridos a validar
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
          msg: "Por favor, introduce una dirección de correo electrónico válida.",
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
          if (!firstInvalidField) {
            firstInvalidField = input;
          }
          hasError = true;
        } else {
          input.setAttribute("aria-invalid", "false");
          errorElem.textContent = "";
          errorElem.classList.remove("visible");
        }
      });

      if (hasError) {
        if (firstInvalidField) {
          firstInvalidField.focus();
        }
        announceToScreenReader("El formulario tiene errores. Por favor revise los campos indicados.");
        return;
      }

      // Si todo es válido: procesar envío
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Enviando mensaje...";
      }

      // Si se ejecuta en Netlify con data-netlify="true", enviamos vía POST
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
            showFormError("Hubo un problema al procesar el mensaje (" + res.status + "). Por favor contáctame directamente por correo a victormoran9@hotmail.com.");
          }
        })
        .catch(() => {
          showFormError("No se pudo conectar con el servidor de envío. Por favor intenta de nuevo o escríbeme directamente a victormoran9@hotmail.com.");
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = "Enviar mensaje";
          }
        });
    });

    function showFormSuccess() {
      if (formStatus) {
        formStatus.className = "form-status-alert success";
        formStatus.textContent = "¡Muchas gracias! Tu mensaje ha sido enviado exitosamente. Responderé a la brevedad posible.";
        formStatus.focus();
      }
      contactForm.reset();
      announceToScreenReader("Mensaje enviado exitosamente. Responderé a la brevedad posible.");
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

  // ==========================================================================
  // 8. CONTROL DE PANTALLA DE RESUMEN EJECUTIVO (GATEWAY Y MODO MODAL)
  // ==========================================================================
  const bodyElement = document.body;
  const siteHeader = document.querySelector(".site-header");

  /**
   * Cierra el modo modal del resumen y devuelve el foco al botón disparador
   */
  function closeSummaryModal() {
    if (!summaryIntroScreen) return;
    summaryIntroScreen.classList.add("fade-out");
    setTimeout(() => {
      summaryIntroScreen.classList.remove("is-modal", "fade-out");
      summaryIntroScreen.style.display = "none";
      summaryIntroScreen.setAttribute("aria-hidden", "true");
      bodyElement.classList.remove("summary-modal-active");
      if (summaryCloseModalBtn) {
        summaryCloseModalBtn.style.display = "none";
      }
      if (navSummaryBtn) {
        navSummaryBtn.focus();
      }
      announceToScreenReader("Resumen cerrado. Has vuelto al contenido principal.");
    }, 280);
  }

  /**
   * Abre la pantalla de resumen en modo modal desde la navegación
   */
  function openSummaryModal() {
    if (!summaryIntroScreen) return;
    summaryIntroScreen.style.display = "flex";
    summaryIntroScreen.setAttribute("aria-hidden", "false");
    summaryIntroScreen.classList.remove("fade-out");
    summaryIntroScreen.classList.add("is-modal");
    bodyElement.classList.add("summary-modal-active");

    if (summaryCloseModalBtn) {
      summaryCloseModalBtn.style.display = "inline-flex";
    }

    if (btnEnterPortfolio) {
      btnEnterPortfolio.focus();
    }
    announceToScreenReader("Resumen ejecutivo abierto. Pulsa Escape o Cerrar para regresar.");
  }

  /**
   * Transición de ingreso a la página completa
   */
  function enterFullPortfolio() {
    if (!summaryIntroScreen) return;

    // Si está en modo modal, simplemente cerrar modal
    if (summaryIntroScreen.classList.contains("is-modal")) {
      closeSummaryModal();
      return;
    }

    // Modo Gateway inicial: animar salida de la entrada y desdifuminar el fondo
    summaryIntroScreen.classList.add("fade-out");
    bodyElement.classList.remove("intro-active");

    if (mainContent) {
      mainContent.classList.add("page-reveal-anim");
    }
    if (siteHeader) {
      siteHeader.classList.add("page-reveal-anim");
    }

    setTimeout(() => {
      summaryIntroScreen.style.display = "none";
      summaryIntroScreen.setAttribute("aria-hidden", "true");

      // Enfocar accesiblemente el contenido principal
      if (mainContent) {
        mainContent.setAttribute("tabindex", "-1");
        mainContent.focus();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      announceToScreenReader("Has ingresado al perfil completo de Victor Moran. Mostrando las 7 secciones disponibles.");
    }, 420);
  }

  // Escuchador del botón principal "Ingresar para ver la página completa"
  if (btnEnterPortfolio) {
    btnEnterPortfolio.addEventListener("click", enterFullPortfolio);
    // Si la entrada inicial está activa, enfocar el botón para accesibilidad por teclado
    if (bodyElement.classList.contains("intro-active")) {
      setTimeout(() => btnEnterPortfolio.focus(), 150);
    }
  }

  // Escuchador del botón de cerrar resumen en modal
  if (summaryCloseModalBtn) {
    summaryCloseModalBtn.addEventListener("click", closeSummaryModal);
  }

  // Escuchador del botón "Resumen" en la barra de navegación
  if (navSummaryBtn) {
    navSummaryBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Si el menú móvil estaba abierto, cerrarlo
      if (navMenu && navMenu.classList.contains("is-open") && mobileNavToggle) {
        mobileNavToggle.setAttribute("aria-expanded", "false");
        navMenu.classList.remove("is-open");
      }
      openSummaryModal();
    });
  }

  // Cerrar modal al hacer clic en el backdrop oscuro exterior
  if (summaryIntroScreen) {
    summaryIntroScreen.addEventListener("click", (e) => {
      if (summaryIntroScreen.classList.contains("is-modal") && e.target === summaryIntroScreen) {
        closeSummaryModal();
      }
    });
  }

  // Tecla Escape para cerrar el modal de resumen si está abierto
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && summaryIntroScreen && summaryIntroScreen.classList.contains("is-modal")) {
      closeSummaryModal();
    }
  });

})();
