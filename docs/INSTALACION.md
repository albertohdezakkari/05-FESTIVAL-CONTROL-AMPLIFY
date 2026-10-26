# Instalación desde cero

## 1. Preparar el equipo

Instala Git y Node.js 22.x con npm. Comprueba en una terminal nueva:

```bash
git --version
node --version
npm --version
```

Node debe mostrar `v22...`, con versión mínima 22.13.0. El proyecto se ha probado con Node 22.23.4 y npm 10.9.9. Node 18 no es compatible con React Native 0.81. Si ya utilizas nvm en macOS/Linux, desde la carpeta del proyecto puedes ejecutar `nvm install` y `nvm use`; `.nvmrc` selecciona la línea 22. En Windows instala Node 22 o selecciónalo con tu gestor habitual.

## 2. Obtener el proyecto

```bash
git clone https://github.com/albertohdezakkari/05-FESTIVAL-CONTROL-AMPLIFY.git
cd 05-FESTIVAL-CONTROL-AMPLIFY
npm ci
```

`npm ci` utiliza el lockfile y elimina una instalación anterior de `node_modules`. No borres `package-lock.json` y no ejecutes `expo install --fix` como paso rutinario: modificaría las versiones auditadas.

## 3. Comprobar antes de abrir

```bash
npx expo install --check
npm run typecheck
npm run web
```

Debes ver “Dependencies are up to date”, una salida de TypeScript sin errores y una dirección local de Expo. Abre esa dirección: aparecerán FESTIVAL CONTROL, LIVE DEMO y los contadores 04 eventos, 03 confirmados, 01 retrasado y 04 escenarios.

Realiza la [prueba del alumno](PRUEBAS-ALUMNO.md). Los cambios desaparecen al recargar.

## 4. Generar la web publicable

Detén Expo con `Ctrl+C` y ejecuta:

```bash
npm run build:web
npm run preview
```

Debe existir `dist/index.html` y un bundle bajo `dist/_expo/static/js/web/`. Abre `http://localhost:4173` y repite el ciclo de eventos. Este servidor sólo permite revisar los archivos estáticos en tu equipo; no es el despliegue público.

## 5. Pruebas automáticas opcionales para el alumno

```bash
npx playwright install chromium
npm run test:e2e
npm run build:web
npm run test:export
```

Cada suite ejecuta 12 casos en perfiles de escritorio y móvil. En Linux puede ser necesario `npx playwright install --with-deps chromium`. Los fallos conservan trazas en `test-results/`; abre una con `npx playwright show-trace RUTA_AL_TRACE.zip`.

## Diagnóstico

| Síntoma | Acción |
| --- | --- |
| `EBADENGINE` o fallos de Metro con Node antiguo | Seleccionar Node 22, abrir terminal nueva y repetir `npm ci` |
| `npm ci` indica que falta o no coincide el lockfile | Confirmar que se clonó este repositorio y que no se modificaron sus manifests |
| Puerto ocupado | Cerrar el servidor anterior; para desarrollo se puede usar `npm run web -- --port 8082` |
| Pantalla antigua durante desarrollo | Detener Expo y arrancar `npm run web -- --clear` |
| HTML vacío abierto desde el explorador de archivos | Usar `npm run preview` y una URL HTTP local |
| No aparece un evento | Borrar búsqueda y elegir TODOS; guardar un formulario ya restablece ambos |
| Avisos de `npm audit` | Consultar el informe; no ejecutar `npm audit fix --force`, que propone cambios incompatibles |
| Playwright no encuentra Chromium | Ejecutar `npx playwright install chromium` en este proyecto |

Checkpoint: instalación limpia, TypeScript correcto, cuatro eventos iniciales, ciclo completo y exportación navegable. Continúa con [Amplify Hosting](AMPLIFY.md).
