# Valheim · Plan de farmeo

Aplicación web en español para preparar las batallas de Valheim: calcula materiales por jugador, descuenta inventario, muestra recetas, imágenes, comida, hidromiel, consejos y debilidades. Incluye un visor de mapa por semilla mediante Vegvisr.

## Publicar en GitHub Pages

1. Crea un repositorio llamado `valheim-farm-planner` en tu cuenta de GitHub.
2. Descomprime el paquete y sube **el contenido de esta carpeta**, no el ZIP. `index.html` debe quedar en la raíz del repositorio, junto a `app.js`, `icons/` y los demás archivos.
3. Abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama **main**, carpeta **/ (root)** y pulsa **Save**.
6. Cuando finalice la publicación, GitHub Pages mostrará la dirección de la app.

No requiere Node.js, instalación de dependencias, claves ni servidor. El archivo `.nojekyll` permite servir los archivos estáticos directamente. Las rutas relativas permiten usarla bajo la ruta del repositorio en Pages.

## Ejecutar localmente

Desde la carpeta del proyecto:

```sh
python -m http.server 8000
```

Abre `http://localhost:8000`.

## Archivos

- `index.html`: interfaz y estilos.
- `app.js`: planes, cálculos, inventario y comportamiento.
- `supplies.js`: recetas del equipo y las provisiones.
- `guides.js`: consejos de materiales.
- `icons.js` e `icons/`: imágenes locales.
- `worldmap.js`: semillas, filtros y visor externo.
- `supplies-source.json`: datos de referencia de las recetas.

## Datos y límites

El inventario y las preferencias se guardan en el navegador mediante `localStorage`. Cambiar de dominio no transfiere automáticamente ese progreso. La aplicación no modifica los guardados del juego.

Las recetas de equipo se calculan para calidad 1. Las mejoras y las estaciones no se incluyen automáticamente. Kall utiliza equipo alternativo de Tierras de Ceniza; las recetas nórdicas pueden añadirse manualmente. Los datos pueden variar con actualizaciones y mods.

## Créditos

Herramienta de comunidad, no afiliada con Iron Gate. Valheim y sus elementos gráficos pertenecen a Iron Gate AB. Recetas e iconos de referencia: https://valheim.gaming.tools/. Visor de mapa integrado: https://vegvisr.vercel.app/ (proyecto: https://github.com/aritropaul/vegvisr). Los servicios externos conservan su propia disponibilidad y condiciones.
