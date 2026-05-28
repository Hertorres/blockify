'use strict';

(function () {
  /** @type {HTMLElement | null} */
  const countdownEl = document.querySelector('[data-launch-date]');
  /** @type {HTMLElement | null} */
  const yearEl = document.getElementById('current-year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  if (!countdownEl) return;

  const launchDate = new Date(countdownEl.dataset.launchDate + 'T00:00:00');

  if (isNaN(launchDate.getTime())) {
    console.warn('[Blockify] data-launch-date inválido. Formato esperado: YYYY-MM-DD');
    return;
  }

  const elements = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds'),
  };

  /**
   * Rellena un número con ceros a la izquierda hasta 2 dígitos.
   * @param {number} value
   * @returns {string}
   */
  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function updateCountdown() {
    const diff = launchDate.getTime() - Date.now();

    if (diff <= 0) {
      countdownEl.hidden = true;
      clearInterval(intervalId);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days    = Math.floor(totalSeconds / 86400);
    const hours   = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    elements.days.textContent    = pad(days);
    elements.hours.textContent   = pad(hours);
    elements.minutes.textContent = pad(minutes);
    elements.seconds.textContent = pad(seconds);
  }

  updateCountdown();
  const intervalId = setInterval(updateCountdown, 1000);
})();
