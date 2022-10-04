const installBtn = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  window.deferredPrompt = event;
  installBtn.classList.toggle("hidden", false);
});

// TODO: Implement a click event handler on the `installBtn` element
installBtn.addEventListener("click", async (event) => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  window.deferredPrompt = null;

  installBtn.classList.toggle("hidden", true);
  installBtn.setAttribute("disabled", true);
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("App installed!", event);
  window.deferredPrompt = null;
});
