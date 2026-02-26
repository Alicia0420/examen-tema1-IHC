import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest";

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const gestureResult = document.getElementById("gestureResult");
const interpretation = document.getElementById("interpretation");
const modeBadge = document.getElementById("modeBadge");

let gestureRecognizer;
let running = true;
let lastDetectionTime = Date.now();
let suspended = false;

/* ============================= */
/* CREAR RECONOCEDOR */
/* ============================= */

async function createGestureRecognizer() {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task"
    },
    runningMode: "VIDEO",
    numHands: 1
  });
}

/* ============================= */

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
  video.addEventListener("loadeddata", predictWebcam);
}

/* ============================= */
/* MAPEO DE GESTOS */
/* ============================= */

function mapGesture(categoryName, handedness) {

  switch (categoryName) {

    case "Open_Palm":
      return "Avanzar";

    case "Closed_Fist":
      return "Detener";

    case "Pointing_Up":
      if (handedness === "Left") return "Vuelta izquierda";
      else return "Vuelta derecha";

    case "Victory":
      if (handedness === "Left") return "90° izquierda";
      else return "90° derecha";

    case "Thumb_Up":
      return "360° derecha";

    case "Thumb_Down":
      return "360° izquierda";

    default:
      return "Orden no reconocida";
  }
}

/* ============================= */
/* LOOP PRINCIPAL */
/* ============================= */

async function predictWebcam() {

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const now = performance.now();
  const results = gestureRecognizer.recognizeForVideo(video, now);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (results.gestures.length > 0) {

    if (suspended) {
      suspended = false;
      modeBadge.innerText = "Activo";
      modeBadge.className = "badge bg-success";
    }

    lastDetectionTime = Date.now();

    const drawingUtils = new DrawingUtils(ctx);

    for (let i = 0; i < results.landmarks.length; i++) {

      drawingUtils.drawLandmarks(results.landmarks[i]);
      drawingUtils.drawConnectors(
        results.landmarks[i],
        GestureRecognizer.HAND_CONNECTIONS
      );

      const gestureName = results.gestures[i][0].categoryName;
      const handedness = results.handedness[i][0].categoryName;

      const mapped = mapGesture(gestureName, handedness);

      gestureResult.innerText = mapped;
      interpretation.innerText =
        `Detectado: ${gestureName} | Mano: ${handedness}`;
    }

  } else {

    if (Date.now() - lastDetectionTime > 5000) {
      suspended = true;
      gestureResult.innerText = "Sistema suspendido";
      interpretation.innerText = "Sin detección de mano";
      modeBadge.innerText = "Suspendido";
      modeBadge.className = "badge bg-warning text-dark";
    }
  }

  if (running) {
    window.requestAnimationFrame(predictWebcam);
  }
}

/* ============================= */

await createGestureRecognizer();
await startCamera();
/* ============================= */
/* TRANSICIÓN A MODO VOZ */
/* ============================= */

const goToVoiceBtn = document.getElementById("goToVoiceBtn");

goToVoiceBtn.addEventListener("click", () => {
  document.body.classList.add("fade-out");

  setTimeout(() => {
    window.location.href = "voz.html";
  }, 400);
});