// ─── GALERI PUBLIKASI ──────────────────────────────────────
(function () {
    const preview    = document.getElementById('previewImg');
    const thumbnails = document.querySelectorAll('.thumbnails img');

    thumbnails.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
            // Ganti gambar preview
            preview.style.opacity = '0';
            setTimeout(function () {
                preview.src = thumb.src;
                preview.alt = thumb.alt;
                preview.style.opacity = '1';
            }, 150);

            // Tandai thumbnail aktif
            thumbnails.forEach(function (t) { t.classList.remove('active'); });
            thumb.classList.add('active');
        });
    });
})();