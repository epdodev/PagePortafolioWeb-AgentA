# PagePortafolioWeb-AgentA
### Perfil Profesional Digital Accesible — Victor Moran

Sitio web de una sola página (*single-page application* estática) diseñado y construido con los más altos estándares de calidad front-end y accesibilidad web (**WCAG 2.1 Nivel AA / AAA**). Preparado para su publicación inmediata en **Netlify**.

---

## 🚀 Tecnologías y Stack Técnico

- **HTML5 Semántico**: Estructura limpia y accesible con landmarks semánticos (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, `<article>`, `<aside>`) y jerarquía de títulos lógica.
- **CSS3 Puro (Vanilla)**: Diseño moderno, paleta de colores de alto contraste, tipografía escalable con variables CSS (`custom properties`), diseño adaptable *mobile-first* y respeto total a `prefers-reduced-motion`.
- **JavaScript Vanilla**: Sin frameworks ni dependencias. Manejo del alternador de tema claro/oscuro con detección de sistema, persistencia en `localStorage`, control de tamaño de texto, menú móvil accesible y validación de formulario.
- **Sin paso de compilación (*No Build Step*)**: Todo funciona directamente en el navegador sin necesidad de herramientas como Webpack, Vite o Node.js.

---

## 📂 Estructura del Proyecto

```text
PagePortafolioWeb-AgentA/
├── index.html          # Estructura semántica completa (las 7 secciones en orden)
├── styles.css          # Hoja de estilos con variables de color, modo oscuro y reglas a11y
├── script.js           # Lógica interactiva accesible, tema y escalado tipográfico
├── CV.pdf              # Documento curricular original de referencia y descarga
├── .gitignore          # Exclusiones de archivos del sistema y temporales
├── README.md           # Documentación de uso, despliegue y auditoría de accesibilidad
└── assets/
    └── fotocv.png      # Fotografía profesional de perfil
```

---

## 📋 Secciones Implementadas (en orden estricto)

1. **Acerca de mí**: Presentación profesional, fotografía con texto alternativo significativo, síntesis curricular y botones de acción rápida (*Contactar ahora* y *Descargar CV en PDF*).
2. **Estudios**: Formación universitaria en **Ingeniería en Software** (Universidad de Guayaquil, 2025–Actualidad) y programas de capacitación continua (**Pensamiento Crítico y Reflexivo** y **Reanimación Cardio-Pulmonar Básica**).
3. **Experiencia**: Historial cronológico detallado en **Pical S.A.** (Cajero no Financiero), **Tiendas Industriales TIA S.A.** (Trabajador Operativo) y **Carl's Jr.** (Polifuncional).
4. **Habilidades y Lenguajes**: Desglose de competencias técnicas y blandas con barras de progreso accesibles (`role="progressbar"`, valores `aria-valuenow` y niveles porcentuales en texto visible), además de sección de idiomas.
5. **Proyectos**: Tarjetas estructuradas con título, descripción, etiquetas tecnológicas y enlaces, con campos modelo destacados para completar.
6. **Contactos**: Datos reales de contacto (teléfono directo con enlace `tel:`, correo electrónico con `mailto:`, dirección física) y formulario accesible compatible con **Netlify Forms**.
7. **Redes**: Enlaces externos protegidos a **LinkedIn**, **GitHub** y correo, configurados con `target="_blank"`, `rel="noopener noreferrer"` y advertencia para tecnologías de asistencia.

---

## 💻 Cómo ejecutarlo localmente

Al tratarse de un sitio web estático puro, puedes visualizarlo de varias maneras:

### Opción 1: Abrir directamente en el navegador
Haz doble clic sobre el archivo `index.html` o arrástralo a tu navegador web favorito (Chrome, Edge, Firefox, Safari).

### Opción 2: Con la extensión Live Server (VS Code / Antigravity IDE)
1. Instala la extensión **Live Server** (por *Ritwick Dey*).
2. Haz clic derecho sobre `index.html` y selecciona **"Open with Live Server"**.
3. Se abrirá en `http://127.0.0.1:5500/index.html` con recarga automática en vivo al guardar cambios.

### Opción 3: Con la extensión Live Preview (Microsoft)
1. Instala la extensión **Live Preview** de Microsoft.
2. Haz clic derecho en `index.html` y elige **"Live Preview: Show Preview"** para ver la página en tiempo real dentro del editor.

---

## 🌐 Cómo desplegar y actualizar automáticamente en Netlify

El sitio está 100% optimizado para Netlify mediante integración continua con GitHub:

### Paso 1: Conectar el repositorio en Netlify
1. Inicia sesión en [Netlify](https://app.netlify.com/).
2. Haz clic en **"Add new site"** y elige **"Import an existing project"**.
3. Selecciona **GitHub** y autoriza tu repositorio **`epdodev/PagePortafolioWeb-AgentA`**.
4. En la configuración:
   - **Branch to deploy**: `main`
   - **Build command**: *(dejar en blanco)*
   - **Publish directory**: `.` *(o dejar en blanco)*
5. Haz clic en **"Deploy Site"**.

### Paso 2: Actualización automática permanente
A partir de este momento, cada vez que hagas cambios y los subas con Git:
```bash
git add .
git commit -m "Actualización de contenido"
git push
```
**Netlify detectará el cambio y actualizará tu web pública en ~20 segundos automáticamente.**

### ✨ Funcionamiento del Formulario con Netlify Forms
El formulario de contacto en `index.html` incluye los atributos `netlify` y `data-netlify="true"`, junto con el campo oculto `<input type="hidden" name="form-name" value="contact">`.
- Netlify captura los envíos de forma nativa sin backend.
- Los mensajes aparecen en tu panel de Netlify en la pestaña **Forms**.

---

## ✏️ Guía para completar los datos pendientes

Puedes buscar la etiqueta `[Completar:` en el código para personalizar la información que no constaba en el CV:

1. **Idiomas y lenguajes**:
   - `index.html`: Ajustar el nivel de inglés (ej. *Intermedio B1*) y lenguajes de programación en estudio universitario.
2. **Proyectos**:
   - `index.html`: Reemplazar los datos de las 3 tarjetas de proyecto modelo con tus proyectos académicos reales de la Universidad de Guayaquil y sus enlaces de GitHub.
3. **Disponibilidad de contacto**:
   - `index.html`: Especificar horario de atención preferido.
4. **Redes Profesionales**:
   - `index.html`: Actualizar los enlaces de LinkedIn y GitHub con tus URLs de perfil reales.

---

## 🔍 Informe y Matriz de Cumplimiento de Accesibilidad (WCAG 2.1 AA)

| Criterio WCAG 2.1 | Estado | Implementación en este proyecto |
| :--- | :---: | :--- |
| **1.1.1 Contenido no textual** | ✅ Cumple | Imagen de perfil con texto alternativo contextual (`alt="Fotografía formal de Victor Moran, estudiante de Ingeniería en Software"`). Iconos SVG puramente decorativos identificados con `aria-hidden="true"` y `focusable="false"`. |
| **1.3.1 Información y relaciones** | ✅ Cumple | Marcado semántico completo (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`). Jerarquía de encabezados continua y sin saltos (`<h1>` único, `<h2>` para secciones, `<h3>`/`<h4>` para subtítulos). |
| **1.4.1 Uso del color** | ✅ Cumple | No se transmite información únicamente por color. Las barras de habilidades incluyen el porcentaje numérico visible y etiquetas descriptivas. Los enlaces interactivos cuentan con subrayado o contorno evidente. |
| **1.4.3 Contraste mínimo (4.5:1)** | ✅ Cumple | Modo claro: Texto principal (`#0F172A` sobre `#FFFFFF`, ratio > 15:1), texto secundario (`#334155`, ratio 9.6:1), acento (`#0369A1`, ratio 5.9:1). Modo oscuro: Texto principal (`#F8FAFC` sobre `#131B2E`, ratio > 15:1), acento (`#38BDF8`, ratio 8.8:1). Supera nivel AA y alcanza nivel AAA. |
| **1.4.4 Cambio de tamaño del texto** | ✅ Cumple | Se incluyen botones flotantes dedicados (`A-`, `A`, `A+`) para ajustar el tamaño de fuente un 90%, 100% o 120% mediante variables CSS, preservando la diagramación sin desbordamientos. |
| **2.1.1 Teclado** | ✅ Cumple | Todos los enlaces, botones y campos del formulario son completamente operables mediante teclado (`Tab`, `Shift+Tab`, `Enter`, `Espacio`, `Escape`). |
| **2.1.2 Sin trampas para el foco** | ✅ Cumple | El foco se desplaza libremente por toda la página. El menú móvil se cierra con `Escape` devolviendo el foco al botón disparador. |
| **2.2.2 Pausar, detener, ocultar** | ✅ Cumple | No existen animaciones intermitentes, parpadeantes ni elementos en movimiento continuo automático. |
| **2.3.1 Umbral de tres destellos** | ✅ Cumple | Ningún elemento produce parpadeos ni destellos. |
| **2.4.1 Evitar bloques (Skip Link)** | ✅ Cumple | Enlace `"Saltar al contenido principal"` como primer elemento del DOM, visible al recibir foco de teclado y que transfiere el foco directamente a `<main id="main-content">`. |
| **2.4.4 Propósito del enlace** | ✅ Cumple | Todos los enlaces tienen textos contextuales claros (ej. `"Descargar CV (PDF)"`). Enlaces a redes externas advierten a lectores de pantalla: `<span class="sr-only">(se abre en una nueva pestaña)</span>`. |
| **2.4.7 Foco visible** | ✅ Cumple | Regla global `:focus-visible` con contorno de 3px de alto contraste y separación de 2px (`outline-offset`). |
| **3.3.1 Identificación de errores** | ✅ Cumple | Validación accesible en el formulario de contacto con mensajes descriptivos asociados mediante `aria-describedby` y foco automático en el primer campo inválido. |
| **3.3.2 Etiquetas o instrucciones** | ✅ Cumple | Cada campo del formulario cuenta con un `<label for="...">` explícito y marcas visibles de campos requeridos. |
| **4.1.2 Nombre, función, valor** | ✅ Cumple | El botón de tema tiene `aria-label` descriptivo y `aria-pressed="true|false"`. El botón de menú tiene `aria-expanded` y `aria-controls`. Las barras de progreso usan `role="progressbar"` con valores `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax="100"`. |
| **4.1.3 Mensajes de estado** | ✅ Cumple | Región dinámica `#a11y-announcer` con `aria-live="polite"` y `aria-atomic="true"` que anuncia cambios de tema, escala de texto y envío de mensajes. |
| **Preferencias del usuario** | ✅ Cumple | Respeto a `prefers-color-scheme` (detecta tema oscuro/claro del sistema operativo) y `prefers-reduced-motion` (desactiva transiciones y scroll suave para usuarios con trastornos vestibulares). |

---

## 📄 Licencia y Créditos
- **Autor**: Victor Moran
- **Desarrollo**: Front-End Vanilla con enfoque en Accesibilidad Web (WCAG 2.1 AA).