/* ─── FUNCTION UNTUK CARD FLIP ──────────────────────────────────────────────── */
(function () {
    const container = document.querySelector('.img-cardflips');
    if (!container) return;

    const cards = Array.from(container.querySelectorAll('a'));
    if (cards.length === 0) return;

    // Buat dot indicators
    const dotsWrapper = document.createElement('div');
    dotsWrapper.className = 'cardflip-dots';
    cards.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrapper.appendChild(dot);
    });
    container.appendChild(dotsWrapper);

    const dots = Array.from(dotsWrapper.querySelectorAll('span'));
    let current = 0;
    let timer;

    function goTo(index) {
        cards[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (index + cards.length) % cards.length;
        cards[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function next() {
        goTo(current + 1);
    }

    function startTimer() {
        timer = setInterval(next, 1500);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    // Init
    cards[0].classList.add('active');

    // Pause on hover
    container.addEventListener('mouseenter', stopTimer);
    container.addEventListener('mouseleave', startTimer);

    startTimer();
})();