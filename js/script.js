document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const backTop = document.getElementById("backTop");
  const toast = document.getElementById("toast");
  const contactForm = document.getElementById("contactForm");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  // Mobile menu
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  });

  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });

  // Logo + "Inicio" always reset the page cleanly back to the top,
  // regardless of scroll position, open menu or open modal.
  document.querySelectorAll('a[href="#inicio"]').forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");

      if (modalOverlay && modalOverlay.classList.contains("open")) {
        closeModal();
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
      history.replaceState(null, "", window.location.pathname + window.location.search);
    });
  });

  // Header shadow + back-to-top
  const onScroll = () => {
    const scrolled = window.scrollY > 20;
    header.classList.toggle("scrolled", scrolled);
    backTop.classList.toggle("visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Reveal animations
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Toast helper
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 4000);
  }

  // Legacy [data-message] buttons (kept for compatibility)
  document.querySelectorAll("[data-message]").forEach(button => {
    button.addEventListener("click", () => {
      showToast(button.dataset.message);
    });
  });

  // Demonstration contact form
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = contactForm.elements.nombre.value.trim();

    if (!name) {
      showToast("Por favor, escribe tu nombre.");
      return;
    }

    showToast(`Gracias, ${name}. El formulario está listo para conectarse con el correo institucional.`);
    contactForm.reset();
  });

  /* =========================================================
     POLICY TABS
     ========================================================= */
  const policyTabs = document.querySelectorAll(".policy-tab");
  const policyPanels = document.querySelectorAll(".policy-panel");

  policyTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      policyTabs.forEach(t => { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      policyPanels.forEach(p => p.classList.remove("active"));

      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      const panel = document.querySelector(`.policy-panel[data-panel="${tab.dataset.tab}"]`);
      if (panel) panel.classList.add("active");
    });
  });

  /* =========================================================
     MODAL: roles, políticas y publicaciones
     ========================================================= */
  const modalOverlay = document.getElementById("modalOverlay");
  const modalBody = document.getElementById("modalBody");
  const modalClose = document.getElementById("modalClose");

  const content = {
    /* ---- ESTRUCTURA ORGANIZACIONAL ---- */
    "rol-director": `
      <span class="modal-eyebrow">Nivel directivo · Proceso estratégico</span>
      <h3>Director/a del Observatorio</h3>
      <p><strong>Propósito principal:</strong> garantizar la visión estratégica, la sostenibilidad financiera, la integridad ética y la ejecución de la agenda de investigación del Observatorio, actuando como principal vocero institucional.</p>
      <h4>Funciones específicas</h4>
      <ul>
        <li><strong>Planeación y agenda:</strong> define y aprueba la agenda de investigación anual y los indicadores clave, con orientación práctica y contextual a las problemáticas del Bajo Cauca.</li>
        <li><strong>Gobernanza y ética:</strong> convoca y coordina el Consejo Asesor Externo y el Comité de Ética, supervisando el cumplimiento de todas las políticas.</li>
        <li><strong>Sostenibilidad financiera:</strong> lidera la consecución de fondos y las decisiones financieras conforme a la Política de Sustentabilidad Financiera.</li>
        <li><strong>Garantía de calidad:</strong> aprueba la metodología y la versión final de todos los productos antes de su publicación.</li>
        <li><strong>Vocería y rendición de cuentas:</strong> representa al OEBC y es el canal de rendición de cuentas ante la comunidad.</li>
      </ul>`,
    "rol-analista": `
      <span class="modal-eyebrow">Nivel operativo · Proceso misional (núcleo)</span>
      <h3>Analista de Datos y Estadísticas</h3>
      <p><strong>Propósito principal:</strong> liderar la implementación técnica de las metodologías de investigación, el procesamiento riguroso de la información y asegurar la integridad y neutralidad de los datos analizados.</p>
      <h4>Funciones específicas</h4>
      <ul>
        <li><strong>Metodología y recolección:</strong> implementa la metodología de recolección y mantiene actualizada la ficha técnica de cada indicador.</li>
        <li><strong>Rigor y control de calidad:</strong> ejecuta las etapas técnicas de recolección y análisis, garantizando rigor científico.</li>
        <li><strong>Procesamiento de datos:</strong> realiza el procesamiento estadístico, cruces de variables y generación de indicadores clave.</li>
        <li><strong>Soporte académico:</strong> acompaña como mentor metodológico a los semilleros de investigación.</li>
        <li><strong>Documentación:</strong> elabora la nota metodológica estándar y asegura los metadatos y la trazabilidad de cada producto.</li>
      </ul>`,
    "rol-gestor": `
      <span class="modal-eyebrow">Nivel operativo · Proceso de apoyo (comunicación)</span>
      <h3>Gestor(a) de Contenido y Divulgación</h3>
      <p><strong>Propósito principal:</strong> administrar los canales de divulgación, transformar el contenido técnico en productos accesibles y gestionar la comunicación externa e interna del Observatorio.</p>
      <h4>Funciones específicas</h4>
      <ul>
        <li><strong>Diseño y publicación:</strong> transforma informes técnicos en boletines, infografías y otros productos con lenguaje claro.</li>
        <li><strong>Gestión web y transparencia:</strong> mantiene el sitio web actualizado con los productos y la información financiera.</li>
        <li><strong>Programa de difusión:</strong> ejecuta la difusión por canales digitales, citando correctamente las fuentes.</li>
        <li><strong>Promoción académica:</strong> apoya la logística de la Feria Anual de Investigación y los eventos con el sector productivo.</li>
        <li><strong>Atención de consultas:</strong> administra las solicitudes de información del público.</li>
      </ul>`,
    "rol-administrador": `
      <span class="modal-eyebrow">Nivel operativo · Proceso de apoyo (financiero)</span>
      <h3>Administrador(a) Financiero(a)</h3>
      <p><strong>Propósito principal:</strong> ejecutar diligentemente el presupuesto, la contabilidad y la gestión administrativa, garantizando la transparencia y responsabilidad financiera del Observatorio.</p>
      <h4>Funciones específicas</h4>
      <ul>
        <li><strong>Gestión financiera:</strong> ejecuta fondos y presupuesto conforme a la Política de Sustentabilidad Financiera.</li>
        <li><strong>Reporte contable:</strong> elabora el informe financiero anual y mantiene pública la lista de financiación primaria.</li>
        <li><strong>Gestión contractual:</strong> administra contratación, compras y convenios, especialmente con universidades.</li>
        <li><strong>Apoyo administrativo:</strong> brinda soporte logístico a la Dirección y al equipo operativo.</li>
        <li><strong>Cumplimiento:</strong> vela por los aspectos de seguridad de la información en la gestión documental.</li>
      </ul>`,
    "rol-semilleros": `
      <span class="modal-eyebrow">Nivel colaborativo · Proceso misional (soporte)</span>
      <h3>Coordinadores y miembros de semilleros de investigación</h3>
      <p><strong>Propósito principal:</strong> aportar capacidad investigativa de campo y generar insumos de análisis primario al Observatorio, bajo el marco de la investigación formativa.</p>
      <h4>Funciones específicas</h4>
      <ul>
        <li><strong>Investigación formativa:</strong> ejecutan los proyectos definidos en la agenda del Observatorio.</li>
        <li><strong>Recolección primaria:</strong> aplican las técnicas e instrumentos validados por el Analista de Datos.</li>
        <li><strong>Cumplimiento ético:</strong> se adhieren a los procedimientos de confidencialidad y protección de datos.</li>
        <li><strong>Generación de insumos:</strong> producen borradores de análisis, notas cortas y píldoras de investigación.</li>
        <li><strong>Difusión académica:</strong> participan en la Feria Anual de Investigación y eventos de vínculo con el sector productivo.</li>
      </ul>`,
    "rol-grupos": `
      <span class="modal-eyebrow">Nivel operativo/colaborativo · Proceso misional (soporte)</span>
      <h3>Grupos de Investigación</h3>
      <p><strong>Propósito principal:</strong> ejecutar la agenda de investigación formativa aplicando rigor científico y procedimientos éticos, para generar datos primarios e insumos analíticos.</p>
      <h4>Funciones específicas</h4>
      <ul>
        <li><strong>Planeación de proyectos:</strong> participan en la definición de proyectos con orientación práctica a problemáticas locales.</li>
        <li><strong>Aplicación metodológica:</strong> ejecutan encuestas, entrevistas y grupos focales con instrumentos validados.</li>
        <li><strong>Integridad ética:</strong> cuidan la confidencialidad y evitan conflictos de interés o sesgos.</li>
        <li><strong>Análisis y producción:</strong> generan documentos base, informes sectoriales y píldoras de investigación.</li>
        <li><strong>Difusión y vínculo:</strong> participan en la Feria Anual de Investigación y eventos con el sector productivo.</li>
        <li><strong>Documentación:</strong> entregan al Analista de Datos las bases primarias, limpias y documentadas.</li>
      </ul>`,

    /* ---- PROCESO DE INVESTIGACIÓN (5 ETAPAS) ---- */
    "etapa-1": `
      <span class="modal-eyebrow">Etapa 1 de 5</span>
      <h3>Planificación del estudio</h3>
      <p><strong>Paso 1. Se definen los objetivos:</strong> se establecen objetivos SMART (específicos, medibles, alcanzables, relevantes y temporales) que respondan a las necesidades del Observatorio y la región.</p>
      <p><strong>Paso 2. Se escogen las metodologías pertinentes:</strong> se seleccionan los métodos de adquisición y análisis de datos aceptados por la comunidad científica.</p>
      <p><strong>Paso 3. Se revisa el diseño del estudio:</strong> un comité interno con expertos en metodología revisa que la investigación sea viable y cumpla los principios éticos y técnicos.</p>`,
    "etapa-2": `
      <span class="modal-eyebrow">Etapa 2 de 5</span>
      <h3>Recolección de información</h3>
      <p><strong>Paso 1. Entrenamiento para el equipo de campo:</strong> los integrantes que recolectan la información reciben capacitación en técnicas de investigación y en aspectos éticos y culturales.</p>
      <p><strong>Paso 2. Comprobación de instrumentos de campo:</strong> se verifica que encuestas, entrevistas y cuestionarios sean legibles, no sesgados y estén ajustados a la escala regional.</p>`,
    "etapa-3": `
      <span class="modal-eyebrow">Etapa 3 de 5</span>
      <h3>Análisis de información</h3>
      <p><strong>Paso 1. Auditoría técnica de datos:</strong> se depuran los datos de forma metódica, eliminando errores, duplicados o vacíos de información.</p>
      <p><strong>Paso 2. Métodos estadísticos y analíticos:</strong> se aplican las principales herramientas utilizadas hoy en la comunidad de análisis de datos.</p>
      <p><strong>Paso 3. Validez cruzada:</strong> se comparan los datos recopilados con fuentes secundarias y con estudios similares previamente realizados.</p>`,
    "etapa-4": `
      <span class="modal-eyebrow">Etapa 4 de 5</span>
      <h3>Fidelidad de resultados</h3>
      <p><strong>Paso 1. Revisión interna:</strong> los investigadores someten los resultados a revisión de expertos en la materia para verificar calidad y precisión.</p>
      <p><strong>Paso 2. Consulta externa:</strong> en estudios de alto impacto, expertos o instituciones académicas externas verifican la autenticidad de los resultados.</p>
      <p><strong>Paso 3. Retroalimentación de la comunidad:</strong> se comparten resultados provisionales con empresarios, líderes comunitarios e instituciones para validar los hallazgos.</p>`,
    "etapa-5": `
      <span class="modal-eyebrow">Etapa 5 de 5</span>
      <h3>Difusión y presentación de la información</h3>
      <p><strong>Paso 1. Revisión editorial:</strong> antes de publicar, los informes pasan por una revisión que garantiza claridad, precisión y accesibilidad.</p>
      <p><strong>Paso 2. Cumplimiento de estándares éticos:</strong> se garantiza que los estudios publicados respeten la confidencialidad y los derechos de los participantes.</p>
      <p><strong>Paso 3. Control de calidad en la divulgación:</strong> se aseguran canales de comunicación adecuados y mensajes claros para la audiencia objetivo.</p>`,

    /* ---- PUBLICACIONES ---- */
    "pub-boletines": `
      <span class="modal-eyebrow">Publicación periódica</span>
      <h3>Boletines</h3>
      <p>Publicaciones periódicas con estructura estándar: resumen ejecutivo, contexto, metodología, resultados, discusión y limitaciones, conclusiones y recomendaciones, anexos técnicos, referencias y ficha técnica.</p>
      <p>Cada boletín incluye identificador de versión, fecha de publicación y registro de cambios, disponible en PDF descargable bajo licencia <strong>CC BY 4.0</strong>.</p>`,
    "pub-infografias": `
      <span class="modal-eyebrow">Formato visual</span>
      <h3>Infografías</h3>
      <p>Piezas visuales que traducen los hallazgos técnicos en gráficos, tablas y narrativas explicativas, con leyendas, escalas y unidades claramente especificadas.</p>
      <p>Se diseñan en lenguaje claro y accesible para públicos no especializados, cuidando el contraste, el texto alternativo y la inclusión.</p>`,
    "pub-pildoras": `
      <span class="modal-eyebrow">Formato breve</span>
      <h3>Píldoras de investigación</h3>
      <p>Notas cortas y precisas escritas por estudiantes y docentes de los semilleros sobre hallazgos e ideas innovadoras.</p>
      <p>Son revisadas por el Analista de Datos y Estadísticas antes de su publicación y sirven de insumo para estudios más amplios del Observatorio.</p>`,
    "pub-informes": `
      <span class="modal-eyebrow">Producto técnico</span>
      <h3>Informes</h3>
      <p>Documentos técnicos completos que pasan por las cinco etapas de validación y control de calidad del Observatorio: planificación, recolección, análisis, fidelidad de resultados y difusión.</p>
      <p>Incluyen metodología detallada, resultados, indicadores y anexos, disponibles en formatos abiertos (CSV, JSON) y, cuando corresponda, mediante API pública.</p>`,

    /* ---- POLÍTICAS COMPLETAS ---- */
    "pol-etica": `
      <span class="modal-eyebrow">Política institucional</span>
      <h3>Política de Consideraciones Éticas y de Integridad de la Información</h3>
      <p class="modal-meta">Versión 1.0 · 2026</p>
      <p><strong>Objetivo:</strong> sentar los principios y valores que rigen la conducta de todas las personas relacionadas con el Observatorio, con los más altos estándares de transparencia, imparcialidad y responsabilidad.</p>
      <p><strong>Alcance:</strong> de cumplimiento obligatorio para personal directivo, investigador, técnico, administrativo, contratistas, voluntarios, estudiantes en práctica y cualquier colaborador externo.</p>
      <h4>Principios y compromisos fundamentales</h4>
      <ul>
        <li><strong>Integridad y neutralidad:</strong> declaración de conflictos de interés y rechazo estricto de incentivos que puedan sesgar decisiones.</li>
        <li><strong>Transparencia y accesibilidad a la información:</strong> metodologías, fuentes y resultados disponibles al público.</li>
        <li><strong>Confidencialidad y protección de datos:</strong> anonimato y agregación cuidadosa de información sensible, conforme a la Ley 1581 de 2012.</li>
        <li><strong>Rigor científico y calidad:</strong> metodologías sólidas y mejora continua de los procesos.</li>
        <li><strong>Responsabilidad social con el Bajo Cauca:</strong> impacto positivo y sostenible en la subregión.</li>
        <li><strong>Respeto por la diversidad y los derechos humanos:</strong> inclusión sin distinción de género, etnia, religión u orientación.</li>
        <li><strong>Rendición de cuentas:</strong> informes regulares sobre actividades, resultados y uso de recursos.</li>
      </ul>
      <h4>Supervisión y revisión</h4>
      <p>Un Comité de Ética interno supervisa el cumplimiento del código y resuelve dilemas éticos; cualquier persona puede reportar violaciones de forma confidencial. La política se revisa anualmente.</p>`,
    "pol-recoleccion": `
      <span class="modal-eyebrow">Política institucional</span>
      <h3>Política de Recolección de Información</h3>
      <p><strong>Objetivo:</strong> determinar directrices sobre métodos, técnicas y consideraciones éticas para la recolección de información empresarial, de forma que sea certera, significativa y útil para la toma de decisiones subregionales.</p>
      <h4>Principios rectores</h4>
      <ul>
        <li>Ética, alineada al direccionamiento estratégico del Observatorio.</li>
        <li>Transparencia y rigor científico en el tratamiento de la información.</li>
        <li>Consentimiento informado y documentado de los participantes.</li>
        <li>Relevancia y pertinencia respecto a los objetivos del Observatorio.</li>
        <li>Accesibilidad y divulgación responsable.</li>
      </ul>
      <h4>Metodología y fuentes</h4>
      <p>Cada estudio se caracteriza por tipo (básica o aplicada), enfoque (cuantitativo, cualitativo o mixto), nivel (descriptivo, exploratorio, correlacional o explicativo) y diseño (experimental, cuasiexperimental o no experimental). Se trabaja con fuentes primarias y secundarias, y técnicas como encuestas, entrevistas, observación participativa, análisis de contenido, datos de panel y, en estudios avanzados, Big Data y machine learning.</p>
      <h4>Validación y control de calidad</h4>
      <ol>
        <li>Planificación del estudio</li>
        <li>Recolección de información</li>
        <li>Análisis de información</li>
        <li>Fidelidad de resultados</li>
        <li>Difusión y presentación de la información</li>
      </ol>
      <h4>Marco normativo</h4>
      <p>Ley 1581 de 2012 y Decreto 1377 de 2013 (datos personales), Ley 1266 de 2008 (Habeas Data), Ley 1712 de 2014 (transparencia), el Reglamento General de Protección de Datos (RGPD) y el artículo 12 de la Declaración Universal de Derechos Humanos.</p>`,
    "pol-publicacion": `
      <span class="modal-eyebrow">Política institucional</span>
      <h3>Política de Publicación de la Información</h3>
      <p><strong>Objetivo:</strong> asegurar la transparencia, la accesibilidad y la calidad de la información generada, fomentando el desarrollo sostenible y la toma de decisiones informadas en la subregión.</p>
      <h4>Acceso y calidad</h4>
      <ul>
        <li>Acceso público, abierto y gratuito a la información producida y recabada.</li>
        <li>Datos precisos, pertinentes, actualizados y útiles, con procesos de validación y revisión científica.</li>
        <li>Publicaciones periódicas según los cronogramas del plan de trabajo.</li>
        <li>Formatos accesibles: gráficos, infografías, resúmenes ejecutivos, PDF y texto alternativo.</li>
        <li>Estrategia multicanal: sitio web, materiales físicos, talleres y eventos locales.</li>
      </ul>
      <h4>Procedimientos éticos</h4>
      <ul>
        <li>Transparencia y acceso imparcial a la información.</li>
        <li>Confidencialidad y protección de los datos recibidos.</li>
        <li>Responsabilidad social subregional.</li>
        <li>Integridad y neutralidad frente a conflictos de interés.</li>
        <li>Respeto a la diversidad y los derechos humanos.</li>
        <li>Cooperación y participación ética con instituciones y empresas.</li>
        <li>Rendición de cuentas a la comunidad.</li>
        <li>Compromiso ambiental en los estudios y actividades.</li>
      </ul>
      <p>Un comité de ética interno supervisa su cumplimiento y promueve la mejora continua de los procesos de publicación.</p>`,
    "pol-presentacion": `
      <span class="modal-eyebrow">Política institucional</span>
      <h3>Políticas de Presentación de Información por Distintos Medios</h3>
      <p><strong>Alcance:</strong> aplica a toda la información generada, procesada o compilada por el Observatorio en cualquier medio: página web, boletines, informes, redes sociales, seminarios, visualizaciones interactivas, API y bases de datos descargables.</p>
      <h4>Principios</h4>
      <ul>
        <li>Veracidad de la información y metodologías abiertas.</li>
        <li>Transparencia metodológica y calendario público de recopilación.</li>
        <li>Accesibilidad web conforme a los criterios WCAG 2.1 AA.</li>
        <li>Neutralidad, sin sesgos ni conflictos de interés editoriales.</li>
        <li>Salvaguarda de datos sensibles mediante anonimato.</li>
        <li>Interoperabilidad y trazabilidad de la información.</li>
      </ul>
      <h4>Estructura del sitio web</h4>
      <ul>
        <li>Inicio: resumen ejecutivo de novedades y enlaces a informes recientes.</li>
        <li>Datos e indicadores: catálogo con buscador y descargas en CSV, JSON y API.</li>
        <li>Informes y boletines: repositorio con versiones, fechas e identificador persistente.</li>
        <li>Metodologías, Gobernanza y calidad, Acerca de, y Participación y contacto.</li>
      </ul>
      <h4>Boletines e informes técnicos</h4>
      <p>Estructura base: resumen ejecutivo, contexto, metodología, resultados, discusión/limitaciones, conclusiones y recomendaciones, anexos técnicos, referencias y ficha técnica.</p>
      <h4>Gobernanza y licenciamiento</h4>
      <p>Un Comité de Publicación, un Editor Web y de Datos, un Protector de Datos, el Equipo Metodológico, la Unidad de TI y el equipo de Comunicación garantizan la calidad del proceso. Se aplica la licencia <strong>CC BY 4.0</strong> y las solicitudes de información se responden en un máximo de <strong>10 días hábiles</strong>.</p>`,
    "pol-financiera": `
      <span class="modal-eyebrow">Política institucional</span>
      <h3>Política de Sustentabilidad Financiera</h3>
      <p class="modal-meta">Versión 1.0 · 2026</p>
      <p><strong>Objetivo:</strong> comunicar los lineamientos y criterios que permitan la gestión eficiente y responsable de los recursos financieros, garantizando la independencia y sostenibilidad a largo plazo del Observatorio.</p>
      <h4>Principios rectores</h4>
      <ul>
        <li><strong>Independencia:</strong> ninguna fuente de financiamiento condiciona metodologías, resultados o conclusiones.</li>
        <li><strong>Diversificación:</strong> se evita depender de un único financiador.</li>
        <li><strong>Transparencia:</strong> el origen de los fondos es público y accesible en el sitio web.</li>
        <li><strong>Eficiencia:</strong> los recursos se administran de forma responsable y austera.</li>
      </ul>
      <h4>Fuentes permitidas de financiación</h4>
      <ul>
        <li>Fondos públicos municipales, departamentales y nacionales.</li>
        <li>Cooperación nacional e internacional (agencias, fundaciones y ONG).</li>
        <li>Recursos de entidades privadas, gremios y fundaciones empresariales.</li>
        <li>Venta de servicios y experticias a la medida, sin exclusividad para el pagador.</li>
      </ul>
      <h4>Criterios para la selección y aceptación de fondos</h4>
      <ul>
        <li>Alineación plena entre la misión del financiador y la del Observatorio.</li>
        <li>Rechazo de fondos que impongan condicionamientos metodológicos.</li>
        <li>Análisis reputacional del financiador.</li>
        <li>Dominio público de los estudios financiados por terceros.</li>
      </ul>
      <p><strong>Transparencia y responsabilidad:</strong> el Observatorio publica un informe de gestión anual con el detalle financiero y mantiene una lista accesible de su financiación primaria. La política se revisa cada dos años.</p>`,
    "pol-academica": `
      <span class="modal-eyebrow">Política institucional</span>
      <h3>Política de Promoción Académica</h3>
      <p><strong>Objetivo:</strong> fomentar una cultura de investigación sostenible con enfoque territorial que fortalezca las capacidades de investigación en docentes y estudiantes del Bajo Cauca Antioqueño.</p>
      <h4>Población objetivo</h4>
      <p>Docentes de educación media, técnica, tecnológica y superior; estudiantes de los grados 10º y 11º; estudiantes técnicos, tecnológicos, universitarios y de posgrado; rectores y coordinadores educativos; semilleros de investigación; y entidades como el SENA, las IES, colegios, cámaras de comercio y empresas.</p>
      <h4>Ejes programáticos</h4>
      <ul>
        <li>Formación por competencias transversales, técnicas y de transferencia.</li>
        <li>Semilleros de Investigación con tutoría del Observatorio.</li>
        <li>Comunidades de práctica para docentes investigadores.</li>
        <li>Clubes de datos juveniles.</li>
        <li>Bancos de proyectos con rúbricas y criterios de evaluación.</li>
        <li>Retos temáticos anuales sobre productividad, innovación y empleo juvenil.</li>
        <li>Integración curricular interdisciplinaria.</li>
      </ul>
      <h4>Producción y difusión académica</h4>
      <ul>
        <li>Píldoras de investigación elaboradas por estudiantes y docentes.</li>
        <li>Feria Anual de Investigación del Bajo Cauca.</li>
        <li>Vínculo con el sector productivo y público mediante charlas y capacitaciones.</li>
      </ul>
      <p>Todo el material educativo se publica en acceso abierto bajo licencia <strong>CC BY 4.0</strong>.</p>`
  };

  function openModal(key) {
    const html = content[key];
    if (!html) return;
    modalBody.innerHTML = html;
    modalOverlay.classList.add("open");
    modalOverlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
    modalBody.scrollTop = 0;
  }

  function closeModal() {
    modalOverlay.classList.remove("open");
    modalOverlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  }

  document.querySelectorAll("[data-modal]").forEach(trigger => {
    trigger.addEventListener("click", (event) => {
      const key = trigger.dataset.modal;
      if (!content[key]) return;
      event.preventDefault();

      // If the trigger also points to a policy tab, activate that tab first.
      if (key.startsWith("pol-")) {
        const tabKey = key.replace("pol-", "");
        const tab = document.querySelector(`.policy-tab[data-tab="${tabKey}"]`);
        if (tab) tab.click();
      }

      openModal(key);
    });
  });

  modalClose.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modalOverlay.classList.contains("open")) closeModal();
  });
});
