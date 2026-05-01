// ─── KREDENSIAL ────────────────────────────────────────────
const VALID_USER = 'test';
const VALID_PASS = 'bps123';

// ─── ELEMEN ─────────────────────────────────────────────────
const form       = document.getElementById('loginForm');
const inpUser    = document.getElementById('username');
const inpPass    = document.getElementById('password');
const errUser    = document.getElementById('errUsername');
const errPass    = document.getElementById('errPassword');
const alertBox   = document.getElementById('alertError');
const alertMsg   = document.getElementById('alertMsg');
const btnLogin   = document.getElementById('btnLogin');
const togglePass = document.getElementById('togglePass');
const eyeIcon    = document.getElementById('eyeIcon');

// ─── TOGGLE SHOW/HIDE PASSWORD ──────────────────────────────
togglePass.addEventListener('click', () => {
    const isPassword = inpPass.type === 'password';
    inpPass.type = isPassword ? 'text' : 'password';
    eyeIcon.className = isPassword ? 'bi bi-eye-slash' : 'bi bi-eye';
});

// ─── CLEAR ERROR ON INPUT ───────────────────────────────────
inpUser.addEventListener('input', () => {
    errUser.textContent = '';
    hideAlert();
});

inpPass.addEventListener('input', () => {
    errPass.textContent = '';
    hideAlert();
});

// ─── HELPERS ────────────────────────────────────────────────
function showAlert(msg) {
    alertMsg.textContent = msg;
    alertBox.classList.add('show');
    // re-trigger shake animation
    alertBox.style.animation = 'none';
    alertBox.offsetHeight; // reflow
    alertBox.style.animation = '';
}

function hideAlert() {
    alertBox.classList.remove('show');
}

function setLoading(state) {
    btnLogin.disabled = state;
    btnLogin.querySelector('.btn-text').textContent = state ? 'Memproses...' : 'Masuk';
}

// ─── VALIDASI ────────────────────────────────────────────────
function validate() {
    let valid = true;

    if (!inpUser.value.trim()) {
        errUser.textContent = 'Username tidak boleh kosong.';
        valid = false;
    }

    if (!inpPass.value.trim()) {
        errPass.textContent = 'Password tidak boleh kosong.';
        valid = false;
    }

    return valid;
}

// ─── SUBMIT ──────────────────────────────────────────────────
form.addEventListener('submit', (e) => {
    e.preventDefault();
    hideAlert();

    if (!validate()) return;

    setLoading(true);

    // Simulasi async (misal: fetch ke server)
    setTimeout(() => {
        setLoading(false);

        const username = inpUser.value.trim();
        const password = inpPass.value;

        if (username === VALID_USER && password === VALID_PASS) {
            // Simpan sesi jika "Ingat saya" dicentang
            if (document.getElementById('remember').checked) {
                localStorage.setItem('bps_user', username);
            }
            // Redirect ke halaman utama
            window.location.href = '../index.html';
        } else {
            if (username !== VALID_USER) {
                errUser.textContent = 'Username tidak ditemukan.';
            } else {
                errPass.textContent = 'Password salah.';
            }
            showAlert('Login gagal. Periksa kembali username dan password Anda.');
            inpPass.value = '';
            inpPass.focus();
        }
    }, 800);
});

// ─── AUTO-FILL JIKA "INGAT SAYA" PERNAH AKTIF ───────────────
(function () {
    const saved = localStorage.getItem('bps_user');
    if (saved) {
        inpUser.value = saved;
        document.getElementById('remember').checked = true;
        inpPass.focus();
    }
})();