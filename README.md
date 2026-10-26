# FESTIVAL CONTROL · Expo Web + AWS Amplify Hosting

Aplicación React Native + Expo + TypeScript para gestionar una programación de festival con datos simulados. Conserva la identidad negra y rosa de [04-PILARES-SERVERLESS](https://github.com/albertohdezakkari/04-PILARES-SERVERLESS/blob/main/lessons/05-react-native.js).

Incluye dashboard, búsqueda por artista o ID, filtros por escenario, creación, edición, cambio de estado y eliminación. Los cambios existen **sólo en memoria** y desaparecen al recargar. Cada navegador tiene su propia demo. Las operaciones de eventos no llaman a una API.

## Inicio rápido

Instala Git y **Node.js 22.x (mínimo 22.13.0)** con npm. No necesitas Expo CLI global, AWS SDK, claves AWS ni un backend.

```bash
git clone https://github.com/albertohdezakkari/05-FESTIVAL-CONTROL-AMPLIFY.git
cd 05-FESTIVAL-CONTROL-AMPLIFY
node --version
npm ci
npm run typecheck
npm run web
```

Abre la dirección que indique Expo, habitualmente `http://localhost:8081`. Detén el servidor con `Ctrl+C`.

## Exportación estática

```bash
npm run build:web
npm run preview
```

Abre `http://localhost:4173`. Se sirve `dist/index.html` y su JavaScript; no abras el HTML con doble clic. La navegación usa estado local y una única URL.

## Guías

- [Instalación desde cero y diagnóstico](docs/INSTALACION.md).
- [Pruebas del alumno](docs/PRUEBAS-ALUMNO.md).
- [Publicación en Amplify Hosting](docs/AMPLIFY.md).
- [Guion de charla y demostración de CI/CD](docs/DEMO-CICD.md).
- [Auditoría e informe de pruebas](docs/INFORME-PRUEBAS.md).

## Comandos

| Comando | Función |
| --- | --- |
| `npm ci` | Instala exactamente `package-lock.json` |
| `npm run web` | Expo Web con recarga durante el desarrollo |
| `npm run typecheck` | Comprueba TypeScript sin generar archivos |
| `npx expo install --check` | Comprueba compatibilidad con el SDK instalado |
| `npx expo-doctor` | Revisa configuración y salud del proyecto |
| `npm run build:web` | Exporta a `dist/` |
| `npm run preview` | Sirve la exportación en el puerto 4173 |
| `npm run test:e2e` | Prueba Expo Web con Chromium |
| `npm run test:export` | Prueba `dist/` con Chromium; requiere exportar antes |

Para las pruebas automáticas, ejecuta una vez `npx playwright install chromium`; en Linux CI se usa `npx playwright install --with-deps chromium`. Las pruebas arrancan y detienen sus servidores. Deja libres 8081 y 4173 para una verificación aislada.

## Estructura

```text
App.tsx                         Interfaz, navegación y estado en memoria
src/data.ts                     Tipos y cuatro eventos iniciales
src/theme.ts                    Paleta original del producto
app.json                        Expo y salida web single
package.json / package-lock.json Dependencias y comandos reproducibles
.nvmrc                          Línea Node 22
amplify.yml                     Instalación, TypeScript y exportación para Hosting
tests/                          Pruebas funcionales y responsive
playwright*.config.ts            Configuración de navegador y servidores
docs/                           Guías y evidencia de auditoría
.github/workflows/verify.yml    Verificación automática de cada push/PR
```

Los cuatro escenarios son los disponibles en el formulario; el contador incluye RIVER STAGE aunque todavía no tenga eventos. “Próximos” muestra hasta tres eventos no cancelados en orden de jornada 12:00–11:59, situando la madrugada después de la noche. Es una programación simulada sin fecha ni comparación con el reloj actual.

## Amplify

Conecta este repositorio y la rama `main` en Amplify Hosting. El archivo `amplify.yml` selecciona Node 22, instala con `npm ci`, comprueba TypeScript y publica **`dist/`**. GitHub Actions valida el proyecto de forma independiente; Amplify realiza su propio build al recibir un push.

**URL pública de Amplify: pendiente de crear y verificar el despliegue en AWS.** Consulta la [guía de publicación](docs/AMPLIFY.md) antes de compartirla.
