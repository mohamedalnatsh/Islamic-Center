(function () {
  // Read all time elements which must have `data-time="HH:MM"` in 24-hour format
  const timeEls = Array.from(document.querySelectorAll('.time[data-time]'));

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function to12Hour(hour, minute) {
    const suffix = hour < 12 ? 'ص' : 'م';
    const h12 = hour % 12 || 12;
    return { text: `${pad(h12)}:${pad(minute)}`, suffix };
  }

  function parseTodayAt(timeStr) {
    const [hh, mm] = timeStr.split(':').map(Number);
    const d = new Date();
    d.setHours(hh, mm, 0, 0);
    return d;
  }

  function formatCountdown(ms) {
    if (ms < 0) ms = 0;
    const totalSec = Math.floor(ms / 1000);
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60);
    const ss = totalSec % 60;
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}`;
  }

  // Initialize static displays
  const schedule = timeEls.map(el => {
    const timeStr = el.getAttribute('data-time');
    const date = parseTodayAt(timeStr);
    const [hh, mm] = timeStr.split(':').map(Number);
    const { text, suffix } = to12Hour(hh, mm);
    // set static display (12-hour) by default
    el.innerHTML = `<div class="static">${text}</div><div class="suffix">${suffix}</div>`;
    return { el, date, timeStr };
  });

  function findNextPrayer(now) {
    for (const item of schedule) {
      if (item.date.getTime() > now.getTime()) return item;
    }
    // If none left today, next is the first prayer tomorrow
    const first = schedule[0];
    const nextDate = new Date(first.date.getTime());
    nextDate.setDate(nextDate.getDate() + 1);
    return { el: first.el, date: nextDate, timeStr: first.timeStr };
  }

  let countdownTimer = null;

  function refresh() {
    const now = new Date();
    // Update schedule dates to today's date (for items that were set previously)
    schedule.forEach(item => {
      const [hh, mm] = item.timeStr.split(':').map(Number);
      const d = new Date();
      d.setHours(hh, mm, 0, 0);
      item.date = d;
    });

    const next = findNextPrayer(now);

    // For all elements, show static time
    schedule.forEach(item => {
      const [hh, mm] = item.timeStr.split(':').map(Number);
      const { text, suffix } = to12Hour(hh, mm);
      item.el.innerHTML = `<div class="static">${text}</div><div class="suffix">${suffix}</div>`;
    });

    // For the upcoming prayer, show countdown (live)
    function tick() {
      const now2 = new Date();
      const diff = next.date.getTime() - now2.getTime();
      if (diff <= 0) {
        // When it reaches, refresh to find the next one
        refresh();
        return;
      }
      const cd = formatCountdown(diff);
      next.el.innerHTML = `<div class="countdown">${cd}</div><div class="suffix">باقي</div>`;
    }

    // clear previous timer
    if (countdownTimer) clearInterval(countdownTimer);
    tick();
    countdownTimer = setInterval(tick, 1000);
  }

  // Start
  refresh();

})();
