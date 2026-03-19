// ui.js
export function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = '✓ ' + msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
}

export function renderChip(skill, onRemove) {
    const cloud = document.getElementById('skills-cloud');
    const chip = document.createElement('div');
    chip.className = 'skill-chip has-chip';
    const id = 'chip-' + skill.replace(/[^a-z0-9]/gi, '_');
    chip.id = id;
    
    chip.innerHTML = `${skill}<span class="remove">×</span>`;
    chip.querySelector('.remove').addEventListener('click', () => {
        onRemove(skill);
        chip.remove();
    });
    cloud.appendChild(chip);
}

export function updateStep(n) {
    document.querySelectorAll('.step-item').forEach((el, i) => {
        el.classList.remove('active', 'done');
        if (i + 1 < n) el.classList.add('done');
        if (i + 1 === n) el.classList.add('active');
    });
    document.querySelectorAll('.step-line').forEach((el, i) => {
        el.style.background = i < n - 1 ? 'var(--accent)' : '';
    });
}

export function showAuthError(msg) {
    const err = document.getElementById('auth-error');
    if (err) {
        err.textContent = msg;
        err.style.display = msg ? 'block' : 'none';
    }
}

export function toggleAuthLoading(isLoading) {
    const loader = document.getElementById('auth-loading');
    const btns = [document.getElementById('btn-signin'), document.getElementById('btn-signup')];
    if (loader) loader.style.display = isLoading ? 'block' : 'none';
    btns.forEach(b => {
        if(b) b.disabled = isLoading;
    });
}

export function selectRoleUI(el) {
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    if(el) el.classList.add('selected');
}

export function checkAnalyzeReady(userSkills, selectedRole) {
    const btn = document.getElementById('analyze-btn');
    if(btn) btn.disabled = !(userSkills.length > 0 && selectedRole);
}

export function startAnalysisAnim(callback) {
    document.getElementById('input-section').style.display = 'none';
    const as = document.getElementById('analyzing-section');
    as.style.display = 'block';
    updateStep(2);

    const steps = ['al1', 'al2', 'al3', 'al4'];
    steps.forEach((id, i) => {
        setTimeout(() => {
            const el = document.getElementById(id);
            if(el) el.classList.add('show');
            if (i === 1) updateStep(2);
            if (i === 2) updateStep(3);
            if (i === 3) updateStep(4);
        }, i * 900);
    });

    setTimeout(() => {
        as.style.display = 'none';
        callback();
    }, 3600);
}

// Background animation
export function initCanvas() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - .5) * .3,
            vy: (Math.random() - .5) * .3,
            r: Math.random() * 1.5 + .5,
            o: Math.random() * 0.4 + 0.1
        });
    }

    function drawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(77,208,225,${p.o})`;
            ctx.fill();
        });
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(77,208,225,${0.06 * (1 - dist / 110)})`;
                    ctx.lineWidth = .6;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(drawCanvas);
    }
    drawCanvas();
}

// Cursor trail
let trailTimer = 0;
export function spawnTrail(x, y) {
    if (Date.now() - trailTimer < 30) return;
    trailTimer = Date.now();
    const d = document.createElement('div');
    d.className = 'trail-dot';
    d.style.left = x + 'px';
    d.style.top = y + 'px';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 600);
}
