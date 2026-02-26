# Instituto Tecnológico de Pachuca 
## Ingeniería en tecnologías de la Información y Comunicaciones
### Interacción Humano - Computadora

#### Aplicación web de reconocimiento de gestos  y voz en tiempo real para control inteligente mediante visión y reconocimiento de audio por computadora.
#### El usuario puede cambiar entre ambos modos desde la interfaz, manteniendo una experiencia visual unificada y fluida.


Profesor: **Víctor Manuel Pinedo Fernández**

Práctica: **1.5 Examen Tema 1**

Autor: **Alicia Yamileth Mariano Reséndiz**

Fecha: **26/02/2026**

 ## Modo Control por Voz  
  
Este módulo utiliza la API de reconocimiento de voz del navegador (`SpeechRecognition`) para capturar comandos hablados en español.  
  
Las órdenes detectadas se envían a la API de OpenAI para clasificarlas estrictamente en acciones de movimiento como:  
  
- avanzar  
- retroceder  
- detener  
- vuelta derecha / izquierda  
- 90° derecha / izquierda  
- 360° derecha / izquierda  
  
El sistema incluye:  
  
- Activación automática del micrófono  
- Suspensión por inactividad  
- Reactivación mediante palabra clave ("Lenny")  
- Historial de comandos  
- Interfaz visual con animación de estado del micrófono

## Modo Control por Gestos  
  
Este módulo utiliza **MediaPipe Tasks Vision** para reconocer gestos de mano en tiempo real a través de la cámara.  
  
Se detecta:  
  
- Mano abierta → Avanzar  
- Puño cerrado → Detener  
- Índice arriba (según mano) → Giro  
- Señal de victoria → 90°  
- Pulgar arriba / abajo → 360°  
  
Características principales:  
  
- Detección en tiempo real  
- Identificación de mano izquierda/derecha  
- Suspensión automática tras 5 segundos sin detección  
- Indicador visual de estado
