function validate06C() {
    var pesanError = document.getElementById('pesanError');
    var nomor      = document.getElementById('Nomor').value.trim();
    var judul      = document.getElementById('judul').value.trim();
    var tanggal    = document.getElementById('tanggal').value;

    var pesan = [];

    // ── Validasi Nomor ──────────────────────────────────────
    if (nomor === '') {
        pesan.push('Nomor tidak boleh kosong.');
    } else if (!/^\d+$/.test(nomor)) {
        // Tolak huruf apapun termasuk 'e'
        pesan.push('Masukkan nomor dalam angka.');
    }

    // ── Validasi Judul ──────────────────────────────────────
    if (judul === '') {
        pesan.push('Judul tidak boleh kosong.');
    } else if (!/^[a-zA-Z0-9 :\-]+$/.test(judul)) {
        // Hanya huruf, angka, spasi, titik dua (:), dan strip (-)
        pesan.push('Terdapat karakter yang tidak valid pada judul.');
    }

    // ── Validasi Tanggal Rilis ──────────────────────────────
    if (tanggal === '') {
        pesan.push('Tanggal rilis tidak boleh kosong.');
    }

    // ── Tampilkan atau sembunyikan pesan error ──────────────
    if (pesan.length > 0) {
        pesanError.innerHTML   = pesan.join('<br>');
        pesanError.style.display = 'block';
        return false; // Hentikan submit form
    } else {
        pesanError.style.display = 'none';
        pesanError.innerHTML   = '';
        return true;  // Lanjutkan submit
    }
}