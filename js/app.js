// Свадебное приглашение Артём & Татьяна
// 26 сентября 2026
(() => {
  const targetNode = document.querySelector('[data-target]');
  if (targetNode) {
    const target = new Date(targetNode.dataset.target).getTime();
    const cells = {
      days: targetNode.querySelector('[data-unit="days"]'),
      hours: targetNode.querySelector('[data-unit="hours"]'),
      minutes: targetNode.querySelector('[data-unit="minutes"]'),
      seconds: targetNode.querySelector('[data-unit="seconds"]'),
    };
    const pad = (n, size) => String(Math.max(0, n)).padStart(size, '0');
    const tick = () => {
      const diff = target - Date.now();
      const total = Math.max(0, Math.floor(diff / 1000));
      cells.days.textContent = pad(Math.floor(total / 86400), 2);
      cells.hours.textContent = pad(Math.floor((total % 86400) / 3600), 2);
      cells.minutes.textContent = pad(Math.floor((total % 3600) / 60), 2);
      cells.seconds.textContent = pad(total % 60, 2);
    };
    tick();
    setInterval(tick, 1000);
  }

  // Календарь сентября 2026 (26-е — суббота)
  const cal = document.getElementById('calendar');
  if (cal) {
    const heads = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const first = new Date(Date.UTC(2026, 8, 1));
    const startWeekday = (first.getUTCDay() + 6) % 7;
    const daysInMonth = 30;
    const frag = document.createDocumentFragment();
    heads.forEach((h) => {
      const el = document.createElement('span');
      el.className = 'calendar__head';
      el.textContent = h;
      frag.appendChild(el);
    });
    for (let i = 0; i < startWeekday; i += 1) {
      const el = document.createElement('span');
      el.className = 'calendar__day is-empty';
      el.textContent = '·';
      frag.appendChild(el);
    }
    for (let d = 1; d <= daysInMonth; d += 1) {
      const el = document.createElement('span');
      if (d === 26) {
        el.className = 'calendar__day is-heart';
        const num = document.createElement('span');
        num.className = 'calendar__num';
        num.textContent = '26';
        const heart = document.createElement('span');
        heart.className = 'calendar__heart';
        heart.setAttribute('aria-hidden', 'true');
        heart.textContent = '♥';
        el.appendChild(num);
        el.appendChild(heart);
      } else {
        el.className = 'calendar__day';
        el.textContent = d;
      }
      frag.appendChild(el);
    }
    cal.appendChild(frag);
  }

  // Плавное появление блоков при прокрутке
  const reveals = document.querySelectorAll('.reveal');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();
