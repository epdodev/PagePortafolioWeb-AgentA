# Portafolio Profesional Digital Interactivo 4.0 &bull; Victor Moran
## Universidad de Guayaquil (UG) &bull; Facultad de Ciencias Matemáticas y Físicas &bull; Ingeniería en Software

Portafolio profesional interactivo de **Victor Moran**, estudiante de **Ingeniería en Software** de la Universidad de Guayaquil (UG), desarrollado bajo el paradigma de la **Industria 4.0**, con dirección de arte **"Street Fighter II Arcade Edition" + Ecosistema Digital**, sonorización nativa mediante **Web Audio API** y cumplimiento riguroso de las pautas de accesibilidad **WCAG 2.1 Niveles AA y AAA**.

Desplegado en producción para **Netlify** con formulario dinámico compatible (`data-netlify="true"`).

---

## 🎮 Especificaciones Técnicas y Funcionales Implementadas

### A. Identidad Visual, Estética y Multimedia
1. **Dirección de Arte ("Street Fighter II Arcade Edition" + Ecosistema Digital):**
   * **Street Fighter II:** Paleta cromática de alto impacto con gradientes fuego/oro, barras de progreso tipo **HUD de combate (Health Bars)** con marcos metálicos biselados, estética de gabinete arcade y efectos sonoros retro sintetizados.
   * **Netflix:** **Splash Screen explosivo de 3 segundos** al cargar la página con el nombre `VICTOR MORAN`, animación cinemática de zoom con rayos luminosos, sonido sónico *"Ta-Dum"* generado por Web Audio API, desvanecimiento automático a los 3000 ms y botón accesible de salto manual con teclado (`Esc` / `Enter`).
   * **Matrix:** Lluvia digital en canvas (`<canvas id="matrix-canvas">`) de caracteres binarios y símbolos cibernéticos en tiempo real, con interruptor de encendido/pausado en la barra de accesibilidad.
   * **Universidad de Guayaquil (UG):** Insignia institucional oficial, colores heráldicos azul y oro, y mención destacada de la Facultad de Ciencias Matemáticas y Físicas.
   * **LinkedIn:** Tarjetas con diseño profesional y copiado rápido de enlaces.
   * **Pinterest / Instagram:** Galería de proyectos en grid interactivo con badges de estado, vista rápida modal y etiquetas visuales.

2. **Gestión de Recursos Locales en Carpeta Raíz:**
   * `foto.jpg`: Fotografía oficial del profesional vinculada en la raíz.
   * `cv.jpg`: Documento gráfico de alta resolución (1200 &times; 1700 px) de la hoja de vida curricular oficial.
   * **Visor Modal Interactivo:** Permite inspeccionar tanto `foto.jpg` como `cv.jpg` a pantalla completa con controles interactivos de Zoom (+, -, 100%), trampa de foco accesible y cierre mediante botón o tecla `Escape`.
   * **Descarga Directa:** Botones de descarga directa con atributo `download` para `foto.jpg`, `cv.jpg` y `CV.pdf`.

---

### B. Normativa de Accesibilidad UI/UX (Capacidades Visuales y Auditivas Reducidas)
1. **Conmutador de Tema Claro / Oscuro Obligatorio:**
   * Ubicado en la **parte superior derecha de la barra de navegación fija** (`#nav-theme-toggle`), sincronizado con el control flotante y el resumen ejecutivo, con persistencia en `localStorage`.

2. **Accesibilidad Visual (WCAG 2.1 Niveles AA / AAA):**
   * Enlace de salto al contenido principal (`.skip-link`) accesible como primer elemento enfocable.
   * Navegación completa por teclado con indicadores visibles de foco `:focus-visible` de alto contraste (3px de contorno con offset).
   * **Escalado de tamaño de fuente:** Botones con indicadores explícitos al **100%**, **115%** y **130%** que ajustan las unidades relativas (`rem`) en tiempo real.
   * **Modo de Alto Contraste (WCAG AAA):** Conmutador que activa una paleta de negro puro `#000000`, amarillo neón `#FFFF00` y blanco puro `#FFFFFF`, garantizando un ratio de contraste superior a 7:1 en todos los componentes.
   * **Reducción de animaciones:** Interruptor para desactivar transiciones y animaciones (`[data-reduced-motion="true"]`), respetando además la directiva `@media (prefers-reduced-motion)`.
   * **Síntesis de voz (Text-to-Speech):** Lector de voz accesible nativo (`window.speechSynthesis`) que lee el contenido textual de las secciones en español con controles de reproducción y detención.

3. **Accesibilidad Auditiva:**
   * **Botón de control SFX (Sonido ON / MUTE):** Botón accesible en el menú superior y en la barra flotante para silenciar o activar los efectos de sonido arcade.
   * **Sistema de Subtítulos Sonoros Visuales (`aria-live="polite"`):** Cada vez que se sintetiza un sonido en la aplicación, se despliega una notificación flotante visual (toast) y un anuncio en el lector de pantalla describiendo el efecto sonoro emitido (ej. `[Efecto Sonoro: Apertura cinematográfica tipo Netflix - Ta-Dum]`, `[Efecto Sonoro: Clic Arcade retro]`, `[Efecto Sonoro: Combo Hit / Filtro Arcade]`).
   * **Sonorización nativa con Web Audio API:** Sin dependencias externas de archivos MP3 propensos a fallos de red. Sintetizadores de osciladores para clicks retro, fanfarria de victoria y sonido Ta-dum cinemático.

---

### C. Estructura de Contenidos: Las 9 Secciones Obligatorias

1. **Acerca de mí (`#acerca-de-mi`):**
   * Perfil del postulante como estudiante de Ingeniería en Software de la Universidad de Guayaquil (UG).
   * Enfoque del **Profesional 4.0** (pensamiento analítico, metodologías ágiles, adaptabilidad y accesibilidad universal).
   * **Estadísticas clave en HUD Arcade:** +500 horas de código Full Stack, 100% de cumplimiento WCAG, 4+ años de experiencia operativa y 99.8% de precisión en caja e inventarios.
   * Acceso al visor modal y descarga directa de `foto.jpg`.

2. **Estudios (`#estudios`):**
   * Carrera universitaria en la **Universidad de Guayaquil (UG)** (Facultad de Ciencias Matemáticas y Físicas).
   * Certificaciones académicas y formativas (Pensamiento Crítico y Reflexivo - UNEMI, Reanimación Cardio-Pulmonar y Soporte Vital - Cruz Roja).
   * **Bilingüismo:** Español nativo e Inglés Nivel B2 (intermedio-avanzado) para lectura de documentación técnica y colaboración global.

3. **Conocimientos (`#conocimientos`):**
   * Dominio competitivo clasificado en cuatro áreas estratégicas con barras tipo **HUD de Street Fighter II**:
     * *Lenguajes de Programación:* C#, Python, Java, JavaScript (ES6+), HTML5 y CSS3.
     * *Frameworks & Real-Time:* Spring Boot, WebSockets en tiempo real, .NET Core y Node.js.
     * *Bases de Datos:* SQL relacional, PostgreSQL, MySQL y modelado E-R.
     * *Cloud & DevOps:* Render Cloud, Netlify, Git, GitHub y RESTful APIs.

4. **Habilidades (`#habilidades`):**
   * **Habilidades blandas del Profesional 4.0:** Trabajo en equipo bajo presión, liderazgo técnico ágil, pensamiento crítico y reflexivo, comunicación asertiva y empatía, resiliencia y compromiso ético con la accesibilidad universal.
   * **Competencias operativas y comerciales:** Manejo de sistemas POS (Datafast, Medianet, DeUna), apertura, cuadre y cierre diario de caja, y control de inventarios.

5. **Experiencia (`#experiencia`):**
   * Desarrollo Full Stack y arquitectura web de la aplicación en producción **Luuv** (Spring Boot, Java, WebSockets, Render).
   * Experiencia laboral en comercio y retail:
     * **Pical S.A. Manufacturas Americanas Cia. Ltda.:** Cajero no Financiero y gestión de ventas/POS.
     * **Tiendas Industriales TÍA S.A.:** Trabajador Operativo, cuadres de caja y bodega.
     * **Carl's Jr.:** Polifuncional, servicio en ventanilla Drive-Thru y cocina bajo estándares de higiene.

6. **Galería de proyectos (`#proyectos`):**
   * Tarjetas interactivas con estética Pinterest/Instagram y marcos Arcade.
   * **Filtro dinámico de categorías:** Botones de filtro en vivo (*Todos*, *Full Stack & Cloud*, *Frontend & Accesibilidad*, *Software & Algoritmos*).
   * Proyectos destacados:
     * **Luuv &bull; Aplicación Web de Citas:** En producción con Java, Spring Boot, WebSockets y Render Cloud.
     * **Sistema POS & Control de Inventarios 4.0:** Desarrollado en C#, .NET y SQL.
     * **Algoritmo de Matching por Afinidades & Grafos:** Implementado en Python.
     * **Portafolio Web Accesible 4.0:** Cumplimiento WCAG 2.1 AAA con Web Audio API.

7. **Logros y reconocimientos (`#logros`):**
   * Distinción académica en la Universidad de Guayaquil.
   * Puesta en producción y despliegue cloud de Luuv Web App.
   * Récord de 100% de efectividad en cuadres de caja y cero mermas en retail.
   * Certificaciones oficiales de Cruz Roja Ecuatoriana y UNEMI.

8. **Referencias (`#referencias`):**
   * Referencias verificables académicas (Coordinación Académica de Ingeniería en Software UG) y laborales (Pical S.A. y TÍA S.A.).
   * **Tarjeta de Acceso Directo a `cv.jpg`:** Botón para abrir el visor interactivo de la hoja de vida gráfica `cv.jpg`, botón de descarga directa de `cv.jpg` y botón de descarga de `CV.pdf`.

9. **Contactos (`#contactos`):**
   * **Tarjetas interactivas con copiado rápido (One-click Copy):**
     * **WhatsApp:** `+593 986388715` (enlace directo + botón Copiar con feedback visual y sonoro).
     * **LinkedIn:** `linkedin.com/in/epdodev` (enlace + botón Copiar).
     * **Correo Institucional UG:** `victor.moran@ug.edu.ec` (enlace + botón Copiar).
     * **Correo Personal:** `victormoran9@hotmail.com` (enlace + botón Copiar).
     * **Dirección:** `Babahoyo y Portete, Guayaquil, Ecuador` (botón Copiar).
   * **Formulario de Contacto Compatible con Netlify Forms:**
     * Con atributos `data-netlify="true"`, `name="contact"`, `netlify`.
     * Validación accesible en tiempo real y sonido de victoria al enviar.

---

## 🛠️ Tecnologías y Arquitectura

* **HTML5:** Marcado semántico riguroso (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), roles ARIA explícitos y atributos de accesibilidad (`aria-live`, `aria-atomic`, `aria-describedby`, `aria-modal`).
* **CSS3:** Custom Properties (variables), CSS Grid, Flexbox, Glassmorphism, paleta Street Fighter II, animación cinematográfica tipo Netflix y soporte estricto para `@media (prefers-reduced-motion)`.
* **JavaScript (Vanilla ES6+):** Lógica modular sin librerías externas, Web Audio API para síntesis sonora, SpeechSynthesis para lectura por voz, IntersectionObserver para seguimiento de secciones activas y Clipboard API para copiado ágil.

---

## 🚀 Despliegue en Netlify

El proyecto está preparado para su publicación inmediata en Netlify:
1. Conecta este repositorio en Netlify.
2. Configuración de Build:
   * **Build command:** *(vacío, sitio estático)*
   * **Publish directory:** `.` *(raíz del proyecto)*
3. Netlify procesará automáticamente los formularios gracias a `data-netlify="true"`.

---

## 👤 Autor

* **Victor Moran**
* **Estudiante de Ingeniería en Software &bull; Universidad de Guayaquil (UG)**
* **GitHub:** [@epdodev](https://github.com/epdodev)
* **LinkedIn:** [epdodev](https://www.linkedin.com/in/epdodev)
* **Correo Institucional:** `victor.moran@ug.edu.ec`
* **Correo Personal:** `victormoran9@hotmail.com`
* **Ubicación:** Guayaquil, Ecuador
