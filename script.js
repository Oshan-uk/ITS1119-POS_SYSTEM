const form = document.getElementById('form');
const btn  = document.getElementById('btn');
const err  = document.getElementById('err');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const u = document.getElementById('user').value.trim();
    const p = document.getElementById('pass').value;

    err.classList.remove('show');
    btn.textContent = 'Signing in...';
    btn.classList.add('loading');

    await new Promise(r => setTimeout(r, 900));
    btn.classList.remove('loading');

    if (u === 'admin' && p === '1234') {
        btn.textContent = '✓  Welcome!';
        btn.style.background = 'linear-gradient(135deg, #68d391, #38b2ac)';
    } else {
        btn.textContent = 'Enter correct username and password';
        btn.textContent = 'Login';
        btn.style.background = '';
        void err.offsetWidth;
        err.classList.add('show');
    }
});

['user', 'pass'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        err.classList.remove('show');
        btn.textContent = 'Login';
        btn.style.background = '';
    });
});
