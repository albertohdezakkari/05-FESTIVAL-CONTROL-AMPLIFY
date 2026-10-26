# Prueba de aceptación del alumno

Ejecuta esta secuencia en Expo Web y repítela sobre `npm run preview` después de exportar. Al disponer de una URL pública, repítela también allí.

| Paso | Acción | Resultado esperado |
| --- | --- | --- |
| 1 | Recargar y abrir Dashboard | 04 eventos, 03 confirmados, 01 retrasado y 04 escenarios |
| 2 | Abrir Eventos | NEON WAVES, MIDNIGHT SESSION, ELECTRIC SUNSET y BASS THEORY |
| 3 | Elegir MAIN STAGE | Dos eventos: NEON WAVES y ELECTRIC SUNSET |
| 4 | Buscar `evt-101` | Sólo NEON WAVES; la búsqueda no distingue mayúsculas |
| 5 | Buscar un artista inexistente | Mensaje de lista vacía |
| 6 | Abrir + NUEVO EVENTO y guardar sin artista | Error visible; no se crea ningún evento |
| 7 | Introducir TECHNO TITANS, MAIN STAGE, 21:45, CONFIRMED y crear | Aparece el evento con ID propio; búsqueda y filtro se restablecen |
| 8 | Abrir Dashboard | 05 eventos y 04 confirmados; TECHNO TITANS entra en el orden de programación |
| 9 | Abrir Eventos, editar TECHNO TITANS y guardar 23:00 | Misma tarjeta e ID, nueva hora |
| 10 | Pulsar CAMBIAR ESTADO una vez | DELAYED, en ámbar; dashboard: 03 confirmados y 02 retrasados |
| 11 | Pulsar dos veces más | CANCELLED rojo y después CONFIRMED verde |
| 12 | Editar artista, escenario o estado y cancelar | Se conservan los valores anteriores |
| 13 | Editar y probar 24:00, 12:60 y 9:30 | No permite guardar; exige HH:MM válido |
| 14 | Eliminar TECHNO TITANS | Desaparece y quedan los cuatro eventos iniciales |
| 15 | Filtrar GARDEN, WAREHOUSE y RIVER STAGE | Uno, uno y ninguno, respectivamente, con búsqueda vacía |
| 16 | Eliminar un evento inicial y recargar | Reaparecen los cuatro eventos iniciales; no hay persistencia |

La edición permite cambiar artista, escenario, hora y estado. El artista se guarda sin espacios exteriores y en mayúsculas. El botón de estado recorre CONFIRMED → DELAYED → CANCELLED → CONFIRMED.

En Dashboard se excluyen los cancelados de “Próximos eventos”. La jornada simulada empieza a las 12:00: 00:30 se coloca después de 23:15. No representa eventos futuros respecto al reloj del dispositivo.

Repite en ventana estrecha: navegación accesible, tarjetas legibles, formulario utilizable y filtros con desplazamiento horizontal. Elimina todos los eventos para comprobar los mensajes de vacío; recarga para restaurarlos.

Anota navegador, fecha, modo (Expo/exportación/Amplify), resultado y captura si hay un fallo. Una confirmación visual demuestra un cambio en memoria; esta aplicación no verifica DynamoDB, SNS ni ningún servicio backend.
