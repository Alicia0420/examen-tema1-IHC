document.addEventListener("DOMContentLoaded", () => {

  const voiceBtn = document.getElementById("voiceBtn");
  const gestureBtn = document.getElementById("gestureBtn");

  voiceBtn.addEventListener("click", () => {
    window.location.href = "voz.html";
  });

  gestureBtn.addEventListener("click", () => {
    window.location.href = "gestos.html";
  });

});