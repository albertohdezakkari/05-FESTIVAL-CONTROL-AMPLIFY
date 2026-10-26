# Publicar Festival Control en Amplify Hosting

## Antes de abrir AWS

Comprueba `npm ci`, `npm run typecheck`, `npm run build:web` y `npm run test:export`. Necesitas una cuenta AWS con acceso a Amplify Hosting y autorización para conectar el repositorio GitHub. Un alumno puede conectar su propio fork. La app no requiere variables de entorno ni credenciales AWS en el código.

## Conectar y desplegar

1. Abre la consola AWS y entra en **AWS Amplify**. Selecciona crear una nueva aplicación y el proveedor **GitHub**.
2. Autoriza la conexión con GitHub y da acceso al repositorio `05-FESTIVAL-CONTROL-AMPLIFY` (o a tu fork).
3. Selecciona el repositorio y la rama `main`. La aplicación está en la raíz: no es un monorepo.
4. Revisa que se use el `amplify.yml` del repositorio. El build debe ejecutar Node 22, `npm ci`, `npm run typecheck` y `npm run build:web`. La carpeta de publicación es **dist**, con todos sus archivos.
5. Utiliza una imagen de build compatible con Node 22 y nvm, como la imagen Amazon Linux 2023 de Amplify. Guarda y despliega.
6. Espera a que termine el build y la publicación. Revisa los logs: instalación correcta, TypeScript sin errores, “Exported: dist” y `dist/index.html` existente.
7. Abre el enlace HTTPS del dominio que **la consola haya generado**. Comprueba los cuatro eventos y ejecuta la guía del alumno. Recarga y vuelve a abrir desde el móvil.
8. Guarda la URL real y el commit desplegado como evidencia. Sólo entonces compártela por WhatsApp.

Los nombres exactos de las pantallas pueden variar. Se usa Hosting para archivos estáticos; no hace falta inicializar un backend Amplify Gen 2.

## Qué hace amplify.yml

- Selecciona la línea Node 22 mediante nvm.
- Instala el árbol bloqueado con `npm ci`.
- Detiene el build si falla TypeScript o la exportación.
- Comprueba que existe `dist/index.html`.
- Publica `dist/**/*` y conserva la caché de descargas npm `.npm/`. No almacena `node_modules`, que `npm ci` reinstala.

La aplicación navega mediante estado de React en una sola página. No genera rutas como `/events`; no necesita reglas adicionales para esas rutas. Publica el contenido de `dist` en la raíz del dominio.

## Si falla

| Fallo | Revisar |
| --- | --- |
| Repositorio no visible | Permisos de la integración GitHub y acceso al repositorio o fork |
| `nvm` o Node no disponible | Imagen de build y selección de Node 22 |
| Dependencias incompatibles | Node y lockfile del commit desplegado; reproducir con `npm ci` |
| No se encuentran artefactos | `baseDirectory: dist` y salida de `npm run build:web` |
| Página vacía o bundle 404 | Consola del navegador y publicación de todos los archivos de dist, conservando sus carpetas |
| Push sin nuevo build | Rama conectada y despliegues automáticos de Amplify |
| Se ven datos iniciales tras recargar | Comportamiento esperado de esta demo en memoria |

## Estado de esta entrega

La exportación y sus interacciones están verificadas localmente. No se ha creado ni verificado un despliegue en una cuenta AWS durante esta auditoría. **No hay URL pública confirmada.** Falta conectar GitHub desde la cuenta AWS, completar el primer despliegue y validar el enlace generado.

Fuentes oficiales: [Expo Web](https://docs.expo.dev/workflow/web/), [especificación de amplify.yml](https://docs.aws.amazon.com/amplify/latest/userguide/yml-specification-syntax.html), [despliegue continuo de Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html).
