import { signUp, signIn, signOut, getSession, onAuthStateChange, upsertProfile } from './auth.js';
import { saveUserPath, getUserPaths, updateUserPathCompleteness } from './database.js';
import { 
    showToast, renderChip, updateStep, showAuthError, toggleAuthLoading, 
    selectRoleUI, checkAnalyzeReady, startAnalysisAnim, initCanvas, spawnTrail 
} from './ui.js';

import { ROLE_DATA } from './data/roadmapData.js';

/* ─── STATE ─── */
let userSkills = [];
let selectedRole = null;
let analysisResult = null;
let currentSavedPathId = null;
let completedSkillsState = [];

/* ─── DOM ELEMENTS ─── */
const emailInput = document.getElementById('auth-email');
const passInput = document.getElementById('auth-pass');
const btnSignIn = document.getElementById('btn-signin');

const signupNameInput = document.getElementById('signup-name');
const signupEmailInput = document.getElementById('signup-email');
const signupPassInput = document.getElementById('signup-pass');
const btnSignUp = document.getElementById('btn-signup');

const btnSignOut = document.getElementById('btn-signout');

const pageLogin = document.getElementById('page-login');
const pageSignup = document.getElementById('page-signup');
const pageVerify = document.getElementById('page-verify');
const btnBackToLogin = document.getElementById('btn-back-to-login');

const pageDashboard = document.getElementById('page-dashboard');
const userNameDisplay = document.getElementById('user-display-name');
const userAvatar = document.getElementById('user-avatar');
const linkToSignup = document.getElementById('link-to-signup');
const linkToLogin = document.getElementById('link-to-login');

const navAnalyzer = document.getElementById('nav-analyzer');
const navSavedPaths = document.getElementById('nav-saved-paths');
const inputSection = document.getElementById('input-section');
const resultsSection = document.getElementById('results-section');
const savedPathsSection = document.getElementById('saved-paths-section');
const mainWrapper = document.getElementById('main-analyzer-wrapper');

const skillInput = document.getElementById('skill-input');
const btnAddSkill = document.querySelector('.skill-input-row .btn-add');
const btnAnalyze = document.getElementById('analyze-btn');
const btnSavePath = document.getElementById('btn-save-path');
const btnReset = document.getElementById('btn-reset');

/* ─── INITIALIZATION ─── */
function renderRoleCards() {
    const grid = document.getElementById('role-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    for (const [key, role] of Object.entries(ROLE_DATA)) {
        const div = document.createElement('div');
        div.className = 'role-card';
        div.dataset.role = key;
        
        let icon = '🚀';
        if (key === 'ml') icon = '🤖';
        if (key === 'fullstack' || key === 'react' || key.includes('node')) icon = '🖥️';
        if (key.includes('ios') || key.includes('android') || key === 'mobile') icon = '📱';
        if (key === 'security') icon = '🔐';
        if (key.includes('data')) icon = '📊';
        if (key.includes('devops') || key === 'qa') icon = '⚙️';
        if (key === 'blockchain') icon = '🔗';
        if (key === 'game') icon = '🎮';
        if (key === 'prompt' || key === 'aiprod') icon = '🧠';
        if (key === 'pm' || key.includes('eng')) icon = '📈';

        div.innerHTML = `
            <div class="role-icon">${icon}</div>
            <div class="role-name">${role.name}</div>
            <div class="role-desc">Demand: ${role.marketDemand || 'High'}</div>
        `;
        
        div.addEventListener('click', () => {
            selectedRole = key;
            selectRoleUI(div);
            checkAnalyzeReady(userSkills, selectedRole);
        });
        
        grid.appendChild(div);
    }
}

renderRoleCards();
initCanvas();

// Setup Cursor
const ring = document.getElementById('cursor-ring');
const dot = document.getElementById('cursor-dot');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  if(dot) { dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px'; }
  spawnTrail(mouseX, mouseY);
});

(function animate() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  if(ring) { ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px'; }
  requestAnimationFrame(animate);
})();

function attachHover() {
  document.querySelectorAll('button, a, input, .role-card, .course-card, .avatar, .nav-btn, .saved-path-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}
attachHover();

/* ─── AUTHENTICATION LOGIC ─── */
onAuthStateChange((event, session) => {
    if (session) {
        // Logged In
        upsertProfile(session.user);
        
        pageLogin.style.opacity = '0';
        pageSignup.style.opacity = '0';
        pageVerify.style.opacity = '0';
        setTimeout(() => {
            pageLogin.classList.remove('active');
            pageSignup.classList.remove('active');
            pageVerify.classList.remove('active');
            pageDashboard.classList.add('active');
            pageDashboard.style.display = 'flex';
        }, 500);
        
        const name = session.user.user_metadata?.full_name || session.user.email.split('@')[0];
        userNameDisplay.textContent = name;
        userAvatar.textContent = name.substring(0,2).toUpperCase();
        loadSavedPaths();
    } else {
        // Logged Out
        pageDashboard.classList.remove('active');
        pageDashboard.style.display = 'none';
        pageSignup.classList.remove('active');
        pageVerify.classList.remove('active');
        
        pageLogin.style.opacity = '1';
        pageLogin.classList.add('active');
    }
});

// Auth Navigation
linkToSignup.addEventListener('click', () => {
    pageLogin.classList.remove('active');
    pageLogin.style.opacity = '';
    pageSignup.style.opacity = '1';
    pageSignup.classList.add('active');
});

linkToLogin.addEventListener('click', () => {
    pageSignup.classList.remove('active');
    pageSignup.style.opacity = '';
    pageVerify.classList.remove('active');
    pageVerify.style.opacity = '';
    pageLogin.style.opacity = '1';
    pageLogin.classList.add('active');
});

btnBackToLogin.addEventListener('click', () => {
    pageVerify.classList.remove('active');
    pageVerify.style.opacity = '';
    pageLogin.style.opacity = '1';
    pageLogin.classList.add('active');
});

// Email Login
btnSignIn.addEventListener('click', async () => {
    try {
        toggleAuthLoading(true);
        showAuthError('');
        const e = emailInput.value.trim();
        const p = passInput.value.trim();
        if(!e || !p) throw new Error("Email and password required!");
        await signIn(e, p);
    } catch(err) {
        showAuthError(err.message);
    } finally {
        toggleAuthLoading(false);
    }
});

// Email Signup
btnSignUp.addEventListener('click', async () => {
    try {
        const loadingEl = document.getElementById('signup-loading');
        const errorEl = document.getElementById('signup-error');
        loadingEl.style.display = 'block';
        errorEl.style.display = 'none';
        
        const n = signupNameInput.value.trim();
        const e = signupEmailInput.value.trim();
        const p = signupPassInput.value.trim();
        if(!e || !p || !n) throw new Error("Name, Email, and password required!");
        if(p.length < 6) throw new Error("Password must be at least 6 characters.");
        
        const result = await signUp(e, p, n);
        
        if (result?.verifyRequired) {
             pageSignup.classList.remove('active');
             pageSignup.style.opacity = '';
             pageVerify.style.opacity = '1';
             pageVerify.classList.add('active');
        } else {
             showToast('Account created! You are logged in.');
        }
    } catch(err) {
        const errorEl = document.getElementById('signup-error');
        errorEl.textContent = err.message;
        errorEl.style.display = 'block';
    } finally {
        const loadingEl = document.getElementById('signup-loading');
        loadingEl.style.display = 'none';
    }
});



btnSignOut.addEventListener('click', async () => {
    await signOut();
});


/* ─── NAVIGATION LOGIC ─── */
navAnalyzer.addEventListener('click', () => {
    navAnalyzer.classList.add('active');
    navSavedPaths.classList.remove('active');
    savedPathsSection.style.display = 'none';
    mainWrapper.style.display = 'block';
});

navSavedPaths.addEventListener('click', () => {
    navSavedPaths.classList.add('active');
    navAnalyzer.classList.remove('active');
    mainWrapper.style.display = 'none';
    savedPathsSection.style.display = 'block';
    loadSavedPaths();
});

/* ─── SKILL INPUT ─── */
function handleAddSkill() {
    const val = skillInput.value.trim();
    if (!val) return;
    const skills = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
    skills.forEach(s => {
        if (!userSkills.includes(s)) {
            userSkills.push(s);
            renderChip(s, (skillToRemove) => {
                userSkills = userSkills.filter(sk => sk !== skillToRemove);
                checkAnalyzeReady(userSkills, selectedRole);
            });
        }
    });
    skillInput.value = '';
    checkAnalyzeReady(userSkills, selectedRole);
    showToast(`Added: ${skills.join(', ')}`);
}

skillInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleAddSkill(); });
btnAddSkill.addEventListener('click', handleAddSkill);
// Render roles logic was moved to renderRoleCards()

/* ─── ANALYSIS & RESULTS ─── */
btnAnalyze.addEventListener('click', () => {
    completedSkillsState = [];
    currentSavedPathId = null; 
    startAnalysisAnim(() => showResults(true));
});

function showResults(animateBars = true) {
    if(!selectedRole) return;
    const role = ROLE_DATA[selectedRole];
    
    // Flatten categories into a required array of objects
    const requiredList = Object.values(role.categories).flat();
    const required = requiredList.map(s => s.name);

    const normalizedUser = userSkills.map(s => s.toLowerCase().trim());
    const have = required.filter(r => normalizedUser.some(u => u.includes(r.toLowerCase()) || r.toLowerCase().includes(u)));
    const missing = required.filter(r => !have.includes(r));
    const matchPct = Math.round((have.length / required.length) * 100);
    const timeMonths = Math.ceil((missing.length / required.length) * 8);

    analysisResult = { have, missing, matchPct, timeMonths };

    // Stats
    document.getElementById('stat-have').textContent = have.length;
    document.getElementById('stat-miss').textContent = missing.length;
    document.getElementById('stat-match').textContent = matchPct + '%';
    document.getElementById('stat-time').textContent = timeMonths || 1;

    if (animateBars) {
        setTimeout(() => {
            const pb1 = document.getElementById('pb1');
            const pb2 = document.getElementById('pb2');
            const pb3 = document.getElementById('pb3');
            if(pb1) pb1.style.width = (have.length / required.length * 100) + '%';
            if(pb2) pb2.style.width = (missing.length / required.length * 100) + '%';
            if(pb3) pb3.style.width = matchPct + '%';
        }, 300);
        
        const circle = document.getElementById('ring-circle');
        const circumference = 2 * Math.PI * 60;
        setTimeout(() => {
            const offset = circumference * (1 - matchPct / 100);
            if(circle) circle.style.strokeDashoffset = offset;
            document.getElementById('ring-pct').textContent = matchPct + '%';
            document.getElementById('ring-role').textContent = role.name.split(' ')[0];
        }, 400);
    } else {
        const pb1 = document.getElementById('pb1');
        const pb2 = document.getElementById('pb2');
        const pb3 = document.getElementById('pb3');
        if(pb1) pb1.style.width = (have.length / required.length * 100) + '%';
        if(pb2) pb2.style.width = (missing.length / required.length * 100) + '%';
        if(pb3) pb3.style.width = matchPct + '%';
        const circle = document.getElementById('ring-circle');
        const circumference = 2 * Math.PI * 60;
        if(circle) circle.style.strokeDashoffset = circumference * (1 - matchPct / 100);
        document.getElementById('ring-pct').textContent = matchPct + '%';
        document.getElementById('ring-role').textContent = role.name.split(' ')[0];
    }

    const msgs = [
        [0,30,"You're just getting started — great time to learn!"],
        [30,60,"Solid base — targeted learning will accelerate you fast."],
        [60,85,"Strong profile! A few more skills and you're job-ready."],
        [85,101,"Outstanding — you're highly competitive for this role! 🚀"]
    ];
    const msg = msgs.find(([a,b]) => matchPct >= a && matchPct < b);
    document.getElementById('match-msg').textContent = msg ? msg[2] : '';

    // Have list
    const haveList = document.getElementById('have-list');
    haveList.innerHTML = '';
    have.forEach((s,i) => {
        const div = document.createElement('div');
        div.className = 'skill-row';
        if(animateBars) div.style.animationDelay = (i * 0.07) + 's';
        const sObj = requiredList.find(r => r.name === s);
        const descHtml = sObj ? `<div style="font-size:12px; opacity:0.7; margin-top:2px; font-weight:normal;">${sObj.description}</div>` : '';
        div.innerHTML = `<div class="skill-top"><div class="skill-name" style="line-height:1.2"><div class="dot dot-green"></div><div>${s}${descHtml}</div></div><span class="level">✓ Verified</span></div><div class="skill-bar-wrap"><div class="skill-bar bar-green" style="width:0%" data-w="${60 + Math.random()*40}"></div></div>`;
        haveList.appendChild(div);
    });

    // Missing list
    const missList = document.getElementById('missing-list');
    missList.innerHTML = '';
    missing.forEach((s,i) => {
        const div = document.createElement('div');
        div.className = 'skill-row';
        if(animateBars) div.style.animationDelay = (i * 0.07) + 's';
        
        const sObj = requiredList.find(r => r.name === s);
        const importance = sObj ? sObj.priority : 'Medium Priority';
        const isHigh = importance.toLowerCase().includes('high');
        const descHtml = sObj ? `<div style="font-size:12px; opacity:0.7; margin-top:2px; font-weight:normal;">${sObj.description}</div>` : '';

        div.innerHTML = `<div class="skill-top"><div class="skill-name" style="line-height:1.2"><div class="dot dot-${isHigh?'red':'orange'}"></div><div>${s}${descHtml}</div></div><span class="level">${importance}</span></div><div class="skill-bar-wrap"><div class="skill-bar bar-red" style="width:0%" data-w="${isHigh ? (60 + Math.random()*30) : (30 + Math.random()*30)}" data-color="${isHigh?'var(--accent3)':'var(--accent2)'}"></div></div>`;
        missList.appendChild(div);
    });

    if (animateBars) {
        setTimeout(() => {
            document.querySelectorAll('.skill-bar[data-w]').forEach(bar => {
                bar.style.width = bar.dataset.w + '%';
                if (bar.dataset.color) bar.style.background = bar.dataset.color;
            });
        }, 500);
    } else {
        document.querySelectorAll('.skill-bar[data-w]').forEach(bar => {
            bar.style.width = bar.dataset.w + '%';
            if (bar.dataset.color) bar.style.background = bar.dataset.color;
        });
    }

    // Courses (Dynamic Fallback based on Categories)
    const coursesGrid = document.getElementById('courses-grid');
    if (coursesGrid) {
        coursesGrid.innerHTML = '';
        const catKeys = Object.keys(role.categories);
        const displayCourses = catKeys.map(cat => ({
            platform: "YouTube / Google",
            title: `Mastering ${cat}`,
            duration: "Self-paced",
            level: "All Levels",
            skill: cat,
            priority: "high"
        }));
        
        displayCourses.slice(0,6).forEach((c,i) => {
            const div = document.createElement('div');
            div.className = 'course-card';
            if(animateBars) div.style.animationDelay = (i * 0.1) + 's';
            div.innerHTML = `
            <div class="course-platform">🎓 ${c.platform}</div>
            <div class="course-title">${c.title}</div>
            <div class="course-meta"><span>⏱ ${c.duration}</span><span>📚 ${c.level}</span></div>
            <div class="course-tag">${c.skill}</div>
            <div class="course-priority pri-${c.priority}">${c.priority === 'high' ? '🔴 HIGH' : c.priority === 'med' ? '🟡 MEDIUM' : '🟢 LOW'}</div>
            `;
            div.onclick = () => window.open(`https://www.google.com/search?q=${encodeURIComponent(c.title + ' ' + c.platform + ' course')}`, '_blank');
            coursesGrid.appendChild(div);
        });
    }

    // Roadmap with Checkboxes (Mapped from Categories)
    const rm = document.getElementById('roadmap');
    rm.innerHTML = '';
    const catKeys = Object.keys(role.categories);
    catKeys.forEach((catName, i) => {
        const div = document.createElement('div');
        div.className = 'roadmap-step';
        if (i===0) div.classList.add('done');
        if (animateBars) div.style.animationDelay = (i * 0.15) + 's';
        
        const catSkills = role.categories[catName].map(s => s.name);
        const mappedSkills = catSkills.map(s => {
            const isCompleted = completedSkillsState.includes(s) || have.includes(s);
            const disabledAttr = have.includes(s) ? 'disabled' : '';
            return `<label class="rm-skill ${isCompleted ? 'skill-completed' : ''}" style="cursor:pointer; display:inline-flex; align-items:flex-start; gap:6px;">
                <input type="checkbox" value="${s}" ${isCompleted ? 'checked' : ''} ${disabledAttr} class="rm-skill-checkbox" style="margin-top:4px;">
                <span>${s}</span>
            </label>`;
        }).join('');

        const descStr = role.learningOrder && role.learningOrder[i] ? role.learningOrder[i] : `Focus on ${catName} concepts.`;

        div.innerHTML = `
        <div class="rm-phase">Phase ${i+1}</div>
        <div class="rm-title">${catName}</div>
        <div class="rm-desc">${descStr}</div>
        <div class="rm-skills" style="margin-top:8px;">${mappedSkills}</div>
        `;
        rm.appendChild(div);
    });

    // Handle Checkboxes
    document.querySelectorAll('.rm-skill-checkbox').forEach(chk => {
        chk.addEventListener('change', async (e) => {
            const s = e.target.value;
            if (e.target.checked) {
                if (!completedSkillsState.includes(s)) completedSkillsState.push(s);
                e.target.parentElement.classList.add('skill-completed');
            } else {
                completedSkillsState = completedSkillsState.filter(sk => sk !== s);
                e.target.parentElement.classList.remove('skill-completed');
            }
            
            // Recompute purely visually for the ring graph
            const roleObj = ROLE_DATA[selectedRole];
            if (roleObj) {
                const totalReq = Object.values(roleObj.categories).flat().map(sk => sk.name);
                const normalizedUser = userSkills.map(us => us.toLowerCase().trim());
                const haveBase = totalReq.filter(r => normalizedUser.some(u => u.includes(r.toLowerCase()) || r.toLowerCase().includes(u)));
                const allHave = new Set([...haveBase, ...completedSkillsState]);
                const newMatchPct = Math.min(100, Math.round((allHave.size / totalReq.length) * 100));
                
                // Update ring
                const circle = document.getElementById('ring-circle');
                const circumference = 2 * Math.PI * 60;
                const offset = circumference * (1 - newMatchPct / 100);
                if(circle) {
                    circle.style.transition = 'stroke-dashoffset 0.8s ease-out';
                    circle.style.strokeDashoffset = offset;
                }
                document.getElementById('ring-pct').textContent = newMatchPct + '%';

                // Update text stats
                const newMissCount = Math.max(0, totalReq.length - allHave.size);
                document.getElementById('stat-have').textContent = allHave.size;
                document.getElementById('stat-miss').textContent = newMissCount;
                document.getElementById('stat-match').textContent = newMatchPct + '%';

                // Update Horizontal Bars
                const pb1 = document.getElementById('pb1');
                const pb2 = document.getElementById('pb2');
                const pb3 = document.getElementById('pb3');
                
                if(pb1) pb1.style.width = ((allHave.size / totalReq.length) * 100) + '%';
                if(pb2) pb2.style.width = ((newMissCount / totalReq.length) * 100) + '%';
                if(pb3) pb3.style.width = newMatchPct + '%';

                // Also update individual missing skill bars
                document.querySelectorAll('#missing-list .skill-row').forEach(row => {
                   const nameDiv = row.querySelector('.skill-name > div:not(.dot)');
                   if (!nameDiv) return;
                   const skillName = nameDiv.childNodes[0].textContent.trim();
                   if (allHave.has(skillName)) {
                        const dot = row.querySelector('.dot');
                        const bar = row.querySelector('.skill-bar');
                        const level = row.querySelector('.level');
                        
                        if (dot) {
                            dot.dataset.orig = dot.className;
                            dot.className = 'dot dot-green';
                        }
                        if (bar) {
                            bar.className = 'skill-bar bar-green';
                            bar.style.background = 'var(--accent)';
                            bar.style.width = '100%'; 
                        }
                        if (level) {
                            level.dataset.original = level.dataset.original || level.textContent;
                            level.textContent = '✓ Just Completed';
                            level.style.color = 'var(--accent)';
                        }
                   } else {
                       const dot = row.querySelector('.dot');
                       const bar = row.querySelector('.skill-bar');
                       const level = row.querySelector('.level');
                       if (level && level.textContent === '✓ Just Completed') {
                           if (dot && dot.dataset.orig) dot.className = dot.dataset.orig;
                           if (bar) {
                               bar.className = 'skill-bar bar-red';
                               bar.style.background = bar.dataset.color || 'var(--accent2)';
                               bar.style.width = bar.dataset.w + '%';
                           }
                           if (level) {
                               level.textContent = level.dataset.original || 'Medium Priority';
                               level.style.color = '';
                           }
                       }
                   }
                });
            }

            if (currentSavedPathId) {
                await updateSavedPathCompleteness(currentSavedPathId, completedSkillsState);
            }
        });
    });

    resultsSection.classList.add('active');
    if(animateBars) {
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    attachHover();
}

btnReset.addEventListener('click', () => {
    userSkills = [];
    selectedRole = null;
    completedSkillsState = [];
    currentSavedPathId = null;
    document.getElementById('skills-cloud').innerHTML = '';
    resultsSection.classList.remove('active');
    inputSection.style.display = '';
    document.querySelectorAll('.role-card').forEach(c => c.classList.remove('selected'));
    btnAnalyze.disabled = true;
    updateStep(1);
    document.getElementById('page-dashboard').scrollTo({ top: 0, behavior: 'smooth' });
});

/* ─── SAVED PATHS LOGIC ─── */
btnSavePath.addEventListener('click', async () => {
    const originalText = btnSavePath.innerHTML;
    try {
        btnSavePath.innerHTML = 'Saving...';
        btnSavePath.disabled = true;
        const res = await saveUserPath(selectedRole, userSkills, completedSkillsState);
        currentSavedPathId = res.id;
        showToast('Path saved to your profile!');
    } catch(err) {
        showToast('Failed to save path!');
        console.error(err);
    } finally {
        btnSavePath.innerHTML = originalText;
        btnSavePath.disabled = false;
    }
});

async function updateSavedPathCompleteness() {
    try {
        await updateUserPathCompleteness(currentSavedPathId, completedSkillsState);
        showToast('Progress updated!');
    } catch (err) {
        console.error("Failed to update completeness:", err);
    }
}

async function loadSavedPaths() {
    const list = document.getElementById('saved-paths-list');
    const loading = document.getElementById('saved-paths-loading');
    list.innerHTML = '';
    loading.style.display = 'block';

    try {
        const paths = await getUserPaths();
        loading.style.display = 'none';

        if(paths.length === 0) {
            list.innerHTML = '<div style="color:var(--muted);text-align:center;padding:20px;">No saved paths yet. Evaluate some skills first!</div>';
            return;
        }

        // JS side deduplication for older items saved before we added upsert logic
        const uniquePathsMap = new Map();
        paths.forEach(p => {
             if (!uniquePathsMap.has(p.selected_role)) {
                 uniquePathsMap.set(p.selected_role, p);
             }
        });
        const uniquePaths = Array.from(uniquePathsMap.values());

        uniquePaths.forEach(p => {
            const roleObj = ROLE_DATA[p.selected_role];
            const roleName = roleObj ? roleObj.name : p.selected_role;
            const dt = new Date(p.updated_at).toLocaleDateString();

            const d = document.createElement('div');
            d.className = 'section-card saved-path-card';
            d.style.marginBottom = '0';
            d.style.cursor = 'pointer';
            d.innerHTML = `
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                    <strong style="font-family:'Syne',sans-serif;font-size:16px;">${roleName}</strong>
                    <span style="font-size:11px;color:var(--muted);">${dt}</span>
                </div>
                <div style="font-size:13px;color:var(--muted);margin-bottom:12px;">Skills: ${p.skills.join(', ') || 'None'}</div>
                <div style="font-size:13px;color:var(--accent);">Completed: ${p.completed_skills.length} skills</div>
            `;
            d.addEventListener('click', () => {
                restorePath(p);
            });
            list.appendChild(d);
        });
        attachHover();
    } catch(err) {
        loading.style.display = 'none';
        list.innerHTML = '<div style="color:var(--accent3);">Failed to load paths</div>';
    }
}

function restorePath(pathData) {
    // Reset Current
    userSkills = pathData.skills || [];
    selectedRole = pathData.selected_role;
    completedSkillsState = pathData.completed_skills || [];
    currentSavedPathId = pathData.id;

    document.getElementById('skills-cloud').innerHTML = '';
    userSkills.forEach(s => {
        renderChip(s, (skillToRemove) => {
            userSkills = userSkills.filter(sk => sk !== skillToRemove);
            checkAnalyzeReady(userSkills, selectedRole);
        });
    });

    document.querySelectorAll('.role-card').forEach(c => {
        c.classList.remove('selected');
        if (c.dataset.role === selectedRole) c.classList.add('selected');
    });

    navAnalyzer.click();
    inputSection.style.display = 'none';
    showResults(false);
}

// Prefill some demo data if on local and unauth
// No longer populating because auth handles user flow

// Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar[data-w]').forEach(bar => {
        bar.style.width = bar.dataset.w + '%';
      });
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.section-card').forEach(el => observer.observe(el));
