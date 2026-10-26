# Auditoría y pruebas · 26 de octubre de 2026

## Alcance y punto de partida

Repositorio auditado: `albertohdezakkari/05-FESTIVAL-CONTROL-AMPLIFY`. Se clonó la rama `main`, limpia, en el commit `6c5c639` (“Implementa dashboard interactivo Expo Web Festival Control”). Los archivos descritos en el contexto existían. No había lockfile, pruebas automatizadas ni evidencia de instalación o despliegue. No se modificaron los otros repositorios.

Se leyó como referencia el bloque `lessons/05-react-native.js` del cuaderno 04-PILARES-SERVERLESS mediante GitHub. Coinciden la paleta, el tratamiento de tarjetas y la tipografía contundente. Se conserva esa identidad y la aplicación existente.

## Correcciones realizadas

- Se mantiene Expo SDK 54: el verificador confirma compatibilidad con React 19.1.0, React Native 0.81.5 y React Native Web 0.21.4. La versión instalada de Expo es 54.0.38.
- Se añade `@expo/metro-runtime` mediante `expo install`, en su versión compatible 6.1.2.
- Se registra el árbol completo en `package-lock.json`, se declara Node 22 en `engines` y `.nvmrc`, y se utiliza `npm ci` en Amplify y GitHub Actions.
- Se retira del README el paso rutinario `expo install --fix`.
- Los IDs locales son secuenciales por sesión desde EVT-105, sin depender de marcas de tiempo truncadas.
- Guardar un formulario restablece búsqueda y escenario para mostrar el resultado. Se conserva la búsqueda por artista e ID sin distinguir mayúsculas y se ignoran espacios exteriores en la consulta.
- Próximos eventos se ordena por jornada simulada 12:00–11:59, con madrugada al final y cancelados excluidos. Se muestra el criterio en pantalla.
- Se corrige el interlineado del titular grande, el ajuste de la fila de sección en móvil y la ubicación/color del error de formulario.
- Los controles de filtros y opciones declaran su rol y selección; se mantiene la navegación en memoria.
- Se añade previsualización estática, pruebas Playwright, workflow de verificación y las guías de instalación, pruebas, Amplify y charla.
- Amplify comprueba TypeScript y `dist/index.html`, publica `dist/**/*` y almacena la caché de descargas npm.

## Entorno ejecutado

macOS, Node **22.23.4**, npm **10.9.9**, TypeScript **5.9.3**, Playwright **1.64.1**, Chromium. Perfiles Desktop Chrome y Pixel 7 (emulación de navegador, sin dispositivo físico). El primer `npm install` reveló que la terminal utilizaba Node 18.20.8; se repitió la instalación limpia y toda la validación con Node 22.

## Resultados locales

| Comprobación | Resultado |
| --- | --- |
| `npm ci` | Correcto: instalación desde lockfile, 792 paquetes añadidos |
| `npx expo install --check` | Dependencies are up to date |
| `npx expo-doctor` | 18/18 comprobaciones correctas |
| `npm run typecheck` | Sin errores |
| `npm run test:e2e` | 12/12 casos correctos sobre Expo Web |
| `npm run build:web` | Exportación correcta a dist |
| `test -f dist/index.html` | Archivo existente |
| `npm run test:export` | 12/12 casos correctos contra servidor de archivos de dist |
| Revisión de capturas | Dashboard en escritorio/móvil y tarjetas de eventos en móvil: identidad conservada y contenido legible |
| `git diff --check` | Sin errores de espacios |
| AWS Amplify | No ejecutado en una cuenta AWS; URL pública pendiente |

Cada suite comprueba: datos iniciales, orden nocturno, crear TECHNO TITANS, contadores tras crear, editar artista/hora/escenario/estado, normalización del artista, ciclo de los tres estados, cancelar una edición, eliminar, buscar por ID, combinar búsqueda y escenario, estado sin resultados, validación de artista y horas inválidas, vaciado completo, exclusión de cancelados y restauración de los datos al recargar. El flujo CRUD también comprueba ausencia de excepciones JavaScript del navegador.

Se comprueba ausencia de desbordamiento horizontal del documento a 320, 390, 860 y 1440 px en dashboard y formulario. No equivale a certificar todos los navegadores ni los binarios nativos Android/iOS. Las pruebas automatizadas no validan una cuenta AWS.

Las capturas se generan en `test-results/` (carpeta local ignorada por Git). En caso de fallo se conservan trazas de Playwright. Para reproducir los resultados:

```bash
npm ci
npx expo install --check
npx expo-doctor
npx playwright install chromium
npm run typecheck
npm run test:e2e
npm run build:web
npm run test:export
```

## Dependencias: avisos pendientes

`npm audit` devuelve **5 avisos altos**, sin críticos, moderados ni bajos, tras aplicar correcciones compatibles. No es un árbol libre de vulnerabilidades.

Se fijaron overrides de **PostCSS 8.5.31** y **compression 1.8.2**, dentro de sus líneas mayores existentes, y se repitieron las comprobaciones funcionales y de exportación.

Los avisos restantes corresponden a `image-size`, `node-forge` y tres paquetes que dependen de ellos (`@expo/cli`, `@expo/code-signing-certificates`, `expo`). Afectan al árbol de herramientas de Expo/Metro: esta app no procesa imágenes de usuarios ni utiliza firma de actualizaciones. No se ha probado la explotación ni se afirma ausencia de riesgo. La exportación publicada contiene archivos estáticos, no ejecuta el servidor de desarrollo ni las herramientas Node.

- [image-size: bucles en parsers JXL/HEIF](https://github.com/advisories/GHSA-5p2g-fcmc-qvqq) y [ICNS](https://github.com/advisories/GHSA-w3rx-r6r6-pgpr). Metro utiliza 1.2.1; la corrección disponible está en la línea 2.x. No se fuerza ese cambio de API en esta auditoría.
- [node-forge: verificación de firmas RSA](https://github.com/advisories/GHSA-86w9-cpqp-85rv). El informe marca afectadas las versiones publicadas disponibles en el árbol auditado.

`npm audit fix --force` propone Expo 44, incompatible con la configuración actual; no se ejecutó. La actualización de SDK o sustitución de estas dependencias necesita una revisión propia de compatibilidad. Vuelve a consultar `npm audit` antes de la charla: el estado de los avisos puede cambiar.

## Publicación y límites de la evidencia

El workflow `.github/workflows/verify.yml` está preparado para instalar, comprobar versiones, verificar TypeScript, exportar y probar la exportación en Ubuntu. La primera ejecución remota también terminó correctamente: [Verify Expo Web · 40266430743](https://github.com/albertohdezakkari/05-FESTIVAL-CONTROL-AMPLIFY/actions/runs/40266430743), commit `0ddbc43`. Completó instalación, compatibilidad Expo, TypeScript, exportación y las 12 pruebas de la exportación en Ubuntu. Tras esa ejecución se fijó Ubuntu 24.04 y se actualizaron checkout/setup-node a sus líneas v7 publicadas, eliminando el uso de acciones basadas en Node 20 obsoleto.

El archivo `amplify.yml` se ha revisado contra la [especificación oficial de Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/yml-specification-syntax.html). Los comandos equivalentes de instalación, TypeScript y exportación se han ejecutado localmente; no se ha probado el contenedor de Amplify.

Para obtener una URL pública faltan la conexión GitHub desde la cuenta AWS, selección de rama main, build/publicación completados y prueba del enlace HTTPS generado. Sigue [AMPLIFY.md](AMPLIFY.md) y registra el commit desplegado antes de compartirlo por WhatsApp.
