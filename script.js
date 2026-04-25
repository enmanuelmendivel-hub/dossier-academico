// ===== PARTICLES BACKGROUND =====
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 229, 255, ${0.05 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== REVEAL ANIMATIONS ON SCROLL =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('revealed');
            }, parseInt(delay));
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-up, .reveal-item').forEach(el => {
    revealObserver.observe(el);
});

// ===== COUNTER ANIMATION =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current);
                    }
                }, 16);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) counterObserver.observe(statsEl);

// ===== PROJECTS DATA FOR MODAL =====
const projectsData = {
    proj0: {
        category: '★ Portafolio Completo',
        fullTitle: 'Dossier General',
        content: `
            <div class="pdf-viewer-wrapper">
                <div class="pdf-toolbar">
                    <div class="pdf-toolbar-left">
                        <i class="fa-solid fa-book-open" style="color:#fbbf24"></i>
                        <span>Dossier General — Portafolio Completo</span>
                    </div>
                    <div class="pdf-toolbar-right">
                        <a href="assets/dossier_general.pdf" download class="pdf-btn"><i class="fa-solid fa-download"></i> Descargar</a>
                        <a href="assets/dossier_general.pdf" target="_blank" class="pdf-btn"><i class="fa-solid fa-up-right-from-square"></i> Abrir</a>
                    </div>
                </div>
                <div class="pdf-frame-wrapper">
                    <iframe src="assets/dossier_general.pdf#toolbar=0&navpanes=0" class="pdf-frame"></iframe>
                </div>
                <p class="pdf-note"><i class="fa-solid fa-circle-info"></i> Recopilación integral de todos los proyectos del ciclo universitario.</p>
            </div>
        `
    },
    proj1: {
        category: 'Documento PDF',
        fullTitle: 'Identidad Universitaria y Liderazgo Académico',
        content: `
            <div class="pdf-viewer-wrapper">
                <div class="pdf-toolbar">
                    <div class="pdf-toolbar-left">
                        <i class="fa-solid fa-file-pdf" style="color:var(--accent-primary)"></i>
                        <span>Semana 01 — Identidad y Liderazgo</span>
                    </div>
                    <div class="pdf-toolbar-right">
                        <a href="assets/semana1.pdf" download class="pdf-btn"><i class="fa-solid fa-download"></i> Descargar</a>
                        <a href="assets/semana1.pdf" target="_blank" class="pdf-btn"><i class="fa-solid fa-up-right-from-square"></i> Abrir</a>
                    </div>
                </div>
                <div class="pdf-frame-wrapper">
                    <iframe src="assets/semana1.pdf#toolbar=0&navpanes=0" class="pdf-frame"></iframe>
                </div>
                <p class="pdf-note"><i class="fa-solid fa-circle-info"></i> Análisis sobre la identidad universitaria y el rol del liderazgo en la formación académica.</p>
            </div>
        `
    },
    proj2: {
        category: 'Documento PDF',
        fullTitle: 'Liderazgo Académico y Trabajo en Equipo',
        content: `
            <div class="pdf-viewer-wrapper">
                <div class="pdf-toolbar">
                    <div class="pdf-toolbar-left">
                        <i class="fa-solid fa-file-pdf" style="color:var(--accent-primary)"></i>
                        <span>Semana 02 — Liderazgo y Equipo</span>
                    </div>
                    <div class="pdf-toolbar-right">
                        <a href="assets/semana2.pdf" download class="pdf-btn"><i class="fa-solid fa-download"></i> Descargar</a>
                        <a href="assets/semana2.pdf" target="_blank" class="pdf-btn"><i class="fa-solid fa-up-right-from-square"></i> Abrir</a>
                    </div>
                </div>
                <div class="pdf-frame-wrapper">
                    <iframe src="assets/semana2.pdf#toolbar=0&navpanes=0" class="pdf-frame"></iframe>
                </div>
                <p class="pdf-note"><i class="fa-solid fa-circle-info"></i> Estudio sobre las dinámicas de equipo y la colaboración en proyectos universitarios.</p>
            </div>
        `
    },
    proj3: {
        category: 'Producción Video',
        fullTitle: 'Mejora de las Técnicas de Estudio',
        content: `
            <div class="pdf-viewer-wrapper">
                <div class="pdf-toolbar">
                    <div class="pdf-toolbar-left">
                        <i class="fa-solid fa-video" style="color:var(--accent-primary)"></i>
                        <span>Semana 03 — Técnicas de Estudio</span>
                    </div>
                </div>
                <video controls class="video-player">
                    <source src="assets/semana3.mp4" type="video/mp4">
                    Tu navegador no soporta videos.
                </video>
                <p class="pdf-note"><i class="fa-solid fa-circle-info"></i> Métodos validados para mejorar la retención y comprensión de temas complejos.</p>
            </div>
        `
    },
    proj4: {
        category: 'Presentación Interactiva',
        fullTitle: 'Fortalecimiento de Hábitos de Estudio',
        isSlideshow: true,
        slides: [
            { type: 'image', src: 'assets/semana4/1.png' },
            { type: 'video', src: 'assets/semana4/2.mp4' },
            { type: 'video', src: 'assets/semana4/3.mp4' },
            { type: 'video', src: 'assets/semana4/4.mp4' },
            { type: 'image', src: 'assets/semana4/5.png' },
            { type: 'image', src: 'assets/semana4/6.png' },
            { type: 'image', src: 'assets/semana4/7.png' },
            { type: 'video', src: 'assets/semana4/8.mp4' },
            { type: 'image', src: 'assets/semana4/9.png' },
            { type: 'image', src: 'assets/semana4/10.png' },
            { type: 'image', src: 'assets/semana4/11.png' }
        ],
        note: 'Guía interactiva sobre hábitos de alto rendimiento académico. Usa las flechas para navegar.'
    }
};

// ===== MODAL LOGIC =====
const modal = document.getElementById('projectModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-modal');

let currentSlideIndex = 0;

window.openModal = function(id) {
    const data = projectsData[id];
    
    if (data.isSlideshow) {
        currentSlideIndex = 0;
        const slidesHtml = data.slides.map((slide, index) => `
            <div class="slide">
                ${slide.type === 'image' 
                    ? `<img src="${slide.src}" alt="Slide ${index + 1}">` 
                    : `<video controls class="video-player"><source src="${slide.src}" type="video/mp4"></video>`}
            </div>
        `).join('');

        modalBody.innerHTML = `
            <span class="modal-tag">${data.category}</span>
            <h2 class="modal-title">${data.fullTitle}</h2>
            <div class="slider-container">
                <div class="slides-wrapper" id="slidesWrapper">
                    ${slidesHtml}
                </div>
                
                <!-- Floating Nav Buttons -->
                <button class="slider-nav-btn prev-btn" onclick="changeSlide(-1)"><i class="fa-solid fa-chevron-left"></i></button>
                <button class="slider-nav-btn next-btn" onclick="changeSlide(1)"><i class="fa-solid fa-chevron-right"></i></button>
                
                <!-- Subtle Counter -->
                <div class="slider-counter-subtle">
                    <span id="currentSlideNum">1</span> / ${data.slides.length}
                </div>
            </div>
            <p class="pdf-note"><i class="fa-solid fa-circle-info"></i> ${data.note}</p>
        `;
    } else {
        modalBody.innerHTML = `
            <span class="modal-tag">${data.category}</span>
            <h2 class="modal-title">${data.fullTitle}</h2>
            ${data.content}
        `;
    }
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

window.changeSlide = function(direction) {
    const wrapper = document.getElementById('slidesWrapper');
    const totalSlides = wrapper.children.length;
    
    // Pause any playing videos in the current slide
    const currentSlide = wrapper.children[currentSlideIndex];
    const video = currentSlide.querySelector('video');
    if (video) video.pause();

    currentSlideIndex = (currentSlideIndex + direction + totalSlides) % totalSlides;
    
    wrapper.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    document.getElementById('currentSlideNum').textContent = currentSlideIndex + 1;
};

// Stop videos/reset content on close
function closeModal() {
    modalBody.innerHTML = '';
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeBtn.onclick = closeModal;

window.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
});

// Close with Escape and handle Arrow keys for slider
window.addEventListener('keydown', (e) => {
    if (modal.style.display === 'block') {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'ArrowLeft') changeSlide(-1);
    }
});

// ===== SCROLL SPY =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });
});

// ===== TILT EFFECT ON CARDS =====
document.querySelectorAll('.large-rect-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== MODAL STYLES (Injected) =====
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .modal-tag {
        color: var(--accent-primary);
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-weight: 700;
        display: block;
        margin-bottom: 0.5rem;
    }
    .modal-title {
        font-family: var(--font-heading);
        font-size: 2.5rem;
        margin-bottom: 2rem;
        background: linear-gradient(135deg, #fff, var(--accent-primary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        line-height: 1.2;
    }
    .modal-viewer {
        width: 100%;
    }
    .modal-info h3 {
        font-family: var(--font-heading);
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--accent-primary);
    }
    .modal-info p {
        color: var(--text-dim);
        margin-bottom: 1.5rem;
        line-height: 1.7;
        font-size: 1.1rem;
    }
    @media (max-width: 768px) {
        .modal-content { padding: 2rem; padding-top: 4rem; }
        .modal-title { font-size: 1.8rem; }
        iframe { height: 350px; }
    }
`;
document.head.appendChild(modalStyle);

// ===== TEAM HOVER LOGIC =====
const teamData = {
    m1: {
        name: 'Parravecino Suarez Yessica Alexia',
        role: 'Mi rol es avanzar y mejorar, ser responsable y darle mucha dedicación a la carrera.',
        qualities: '✨ Empática  •  📋 Organizada',
        email: 'pendiente'
    },
    m2: {
        name: 'Julian Enriquez Leyra Verenitse',
        role: 'Mi rol es seguir mejorando, aprender cada día más y esforzarme por cumplir mis metas académicas con responsabilidad y dedicación.',
        qualities: '💪 Perseverante  •  💞 Empática',
        email: '100227565@cientifica.edu.pe'
    },
    m3: {
        name: 'Mata Quispe Francis Nicoll',
        role: 'Mi rol es construir conocimiento mediante la reflexión y entregar a tiempo las evidencias.',
        qualities: '✅ Responsable  •  🎯 Disciplinada',
        email: 'pendiente'
    },
    m4: {
        name: 'Mercado Quispe Grecia Giuliana',
        role: 'Mi papel es aprender, crecer y cumplir con mis responsabilidades.',
        qualities: '✅ Responsable  •  🤝 Comprometida',
        email: '100227579@cientifica.edu.pe'
    },
    m5: {
        name: 'Mendivel Navarro Enmanuel de Jesus',
        role: 'Mi rol es aprender, entender y cuestionar.',
        qualities: '🤲 Solidario  •  💞 Empático',
        email: '100228550@cientifica.edu.pe'
    },
    m6: {
        name: 'Andrade la Madrid Ariana Samar',
        role: 'Mi rol es aprender de manera constante, desarrollar mis habilidades y asumir con responsabilidad mis estudios.',
        qualities: '⏰ Puntual  •  💞 Empática',
        email: '100225946@cientifica.edu.pe'
    }
};

const memberCards = document.querySelectorAll('.member-card');
const infoPlaceholder = document.querySelector('.info-placeholder');
const infoActiveContent = document.getElementById('team-content');
const mName = document.getElementById('m-name');
const mRole = document.getElementById('m-role');
const mQualities = document.getElementById('m-qualities');
const mEmail = document.getElementById('m-email');

memberCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const id = card.getAttribute('data-member');
        const data = teamData[id];

        if (data) {
            // Update content
            mName.textContent = data.name;
            mRole.textContent = data.role;
            mQualities.textContent = data.qualities;
            mEmail.innerHTML = `<a href="mailto:${data.email}" style="color: var(--accent-primary); text-decoration: none; transition: 0.3s;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">${data.email}</a>`;

            // Toggle visibility
            if(infoPlaceholder) infoPlaceholder.style.display = 'none';
            if(infoActiveContent) infoActiveContent.style.display = 'block';
        }
    });
});

