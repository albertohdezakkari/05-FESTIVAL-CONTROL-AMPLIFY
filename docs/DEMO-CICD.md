# Guion de demostración · 120 minutos

## Preparación antes de la charla

Instala y verifica el repositorio en el ordenador de la charla. Descarga Chromium si vas a ejecutar pruebas. Comprueba la conexión GitHub, el acceso a AWS Amplify y que podrás elegir el repositorio. Ten abiertos terminal, editor, GitHub y consola Amplify. Conserva una exportación local probada para mostrarla si la red falla; sólo atribuye un despliegue a AWS cuando termine realmente.

## Recorrido

| Minutos | Demostración | Evidencia |
| --- | --- | --- |
| 0–15 | Presentar Festival Control, dashboard y datos en memoria | Crear y recargar: el evento desaparece |
| 15–30 | Mostrar estructura, `npm ci`, TypeScript y `npm run web` | Aplicación local y ciclo de TECHNO TITANS |
| 30–55 | Conectar GitHub y main con Amplify Hosting | Repositorio, rama y amplify.yml correctos |
| 55–80 | Leer logs del primer build y abrir dominio generado | Publicación finalizada y prueba en URL real |
| 80–105 | Modificar un texto visible, comprobar, commit y push | Commit visible en GitHub y build nuevo |
| 105–120 | Abrir el mismo dominio tras terminar el build | Texto actualizado y ciclo de eventos correcto |

## Cambio pequeño para demostrar CI/CD

En `App.tsx`, sustituye únicamente `THE NIGHT` por `FEEL THE NIGHT`. Mantén la paleta, los datos y las operaciones.

Antes de guardar el commit:

```bash
npm run typecheck
npm run build:web
npm run test:export
git diff -- App.tsx
```

Revisa el cambio visual localmente con `npm run preview`, detén el servidor y publica:

```bash
git add App.tsx
git commit -m "Actualiza titular para demostrar CI/CD"
git push origin main
```

En un fork, confirma antes que `origin` corresponde a tu repositorio y que Amplify sigue esa rama. Comprueba el commit en GitHub y después el nuevo build en Amplify. GitHub Actions y Amplify arrancan de forma independiente: un fallo de Actions no bloquea automáticamente el despliegue de Amplify. El propio amplify.yml sí comprueba TypeScript y exportación.

Cuando Amplify marque el despliegue completado, abre la misma URL HTTPS y comprueba `FEEL THE NIGHT`. Haz una recarga completa si ves una versión anterior. Registra commit, build y URL; no tomes el éxito del push como evidencia del despliegue.

Para recuperar el titular original, usa `git revert` sobre el commit de demostración y haz push; observa el nuevo despliegue. Evita reescribir el historial con force push.

## Explicación para el alumnado

GitHub guarda el código. Amplify detecta el push, instala las versiones bloqueadas, compila y publica la exportación estática. El navegador ejecuta la app. Crear un evento cambia la memoria del navegador, sin modificar GitHub ni los archivos alojados. Esta charla demuestra Hosting y CI/CD.

## Cierre y WhatsApp

Falta una URL hasta completar la conexión y la publicación en AWS. Una vez verificada, copia exactamente la dirección HTTPS mostrada por Amplify y envíala con este texto, sustituyendo el marcador: “Festival Control: [URL REAL VERIFICADA]. Puedes crear y editar eventos de prueba; los cambios se reinician al recargar.”
