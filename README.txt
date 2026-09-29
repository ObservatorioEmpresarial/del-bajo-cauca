# Observatorio Empresarial del Bajo Cauca

Página web institucional responsive construida con HTML, CSS y JavaScript puro.

## Estructura

- `index.html` — estructura y contenido (incluye secciones de estructura organizacional,
  investigación, políticas institucionales, publicaciones y transparencia financiera).
- `css/styles.css` — diseño, colores, responsive, animaciones, pestañas y ventanas modales.
- `js/script.js` — menú móvil, animaciones al hacer scroll, botón volver arriba, toast,
  pestañas de políticas, ventanas modales con el contenido completo de cada política/rol/
  producto, y formulario demostrativo.
- `assets/logo.png` — logo institucional (versión azul/rojo, coherente con el organigrama).
- `assets/favicon-32.png` y `assets/favicon-192.png` — ícono del sitio en distintos tamaños.
- `assets/estructura-organizacional.jpg` — organigrama oficial del Observatorio.

## Cómo abrir

1. Descomprime la carpeta.
2. Abre `index.html` en Chrome, Edge o Firefox (todas las rutas son relativas, por lo que
   funciona directamente desde el explorador de archivos, sin necesidad de servidor).
3. No requiere Node.js ni instalación de dependencias.

## Contenido incorporado desde los documentos institucionales

- Misión, visión, valores y estructura organizacional (con manuales de funciones por cargo,
  accesibles desde botones "Ver funciones y procesos").
- Proceso de investigación en 5 etapas de validación y control de calidad.
- Metodología de recolección: fuentes, técnicas y enfoques de estudio.
- Ejes de formación y promoción académica (semilleros, retos temáticos, feria anual, etc.).
- Las 6 políticas institucionales completas, organizadas en pestañas con acceso a su
  contenido íntegro mediante ventanas modales:
  1. Consideraciones éticas y de integridad de la información
  2. Recolección de la información
  3. Publicación de la información
  4. Presentación de información por distintos medios
  5. Sustentabilidad financiera
  6. Promoción académica
- Sección de transparencia financiera (principios, fuentes de financiación permitidas,
  criterios de aceptación de fondos y compromiso de rendición de cuentas).
- Tipologías de publicaciones (boletines, infografías, píldoras de investigación e informes)
  con su estructura y licenciamiento (CC BY 4.0).

## Para producción

El formulario de contacto sigue siendo demostrativo (así se indica en el propio formulario).
Debe conectarse a un backend, servicio de formularios o correo institucional.

Los apartados de publicaciones están preparados para incorporar los boletines, infografías,
informes y píldoras de investigación reales a medida que el Observatorio los produzca.
