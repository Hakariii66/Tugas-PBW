// ===================== CARD SLIDER =====================
(function () {
    const wrapper      = document.querySelector('.card-wrapper');
    const container    = document.querySelector('.slider-track-container');
    const btnPrev      = document.getElementById('slider-prev');
    const btnNext      = document.getElementById('slider-next');
    const dotsContainer= document.querySelector('.slider-dots');

    if (!wrapper || !container) return;

    const CARDS_VISIBLE = 5;        // berapa card yang terlihat sekaligus
    const cards         = wrapper.querySelectorAll('a.link');
    const totalCards    = cards.length;
    const maxIndex      = totalCards - CARDS_VISIBLE; // max posisi geser

    let currentIndex = 0;

    // Buat dots sesuai jumlah posisi
    const totalDots = maxIndex + 1;
    for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    }

    function getCardWidth() {
        const firstCard = wrapper.querySelector('a.link');
        if (!firstCard) return 236;
        const style   = getComputedStyle(wrapper);
        const gap     = parseFloat(style.gap) || 16;
        return firstCard.offsetWidth + gap;
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const offset = currentIndex * getCardWidth();
        wrapper.style.transform = `translateX(-${offset}px)`;

        // Update dots
        dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === currentIndex);
        });

        // Enable/disable buttons
        btnPrev.disabled = currentIndex === 0;
        btnNext.disabled = currentIndex === maxIndex;
        btnPrev.style.opacity = btnPrev.disabled ? '0.4' : '1';
        btnNext.style.opacity = btnNext.disabled ? '0.4' : '1';
    }

    btnPrev.addEventListener('click', () => goTo(currentIndex - 1));
    btnNext.addEventListener('click', () => goTo(currentIndex + 1));

    // Init
    goTo(0);

    // Re-adjust on resize
    window.addEventListener('resize', () => goTo(currentIndex));
})();