/**
 * PORTFOLIO APPLICATION LOGIC
 * Dynamic Rendering, Filter State, Modal Handlers & Theme Management
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('Portfolio data not found.');
    return;
  }

  initTheme();
  renderProfile(data.profile);
  renderProjects(data.projects);
  initProjectFilters(data.projects);
  renderCertifications(data.certifications);
  renderSkills(data.skills);
  renderExperience(data.experience);
  renderEducation(data.education);
  renderReferences(data.references);
  initModals(data);
  initClipboardActions(data.profile);
  
  // Set current year
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

/* ==========================================================================
   THEME MANAGEMENT (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlEl = document.documentElement;

  // Check saved preference or system default
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(currentTheme);

  toggleBtn.addEventListener('click', () => {
    const newTheme = htmlEl.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });

  function setTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-moon';
      toggleBtn.title = 'Switch to Light Theme';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      toggleBtn.title = 'Switch to Dark Theme';
    }
  }
}

/* ==========================================================================
   PROFILE & HERO RENDERING
   ========================================================================== */
function renderProfile(profile) {
  // Navigation & Brand
  const brandName = document.getElementById('nav-brand-name');
  if (brandName) brandName.textContent = profile.shortName || profile.name;
  
  const navAvatar = document.getElementById('nav-avatar');
  if (navAvatar) {
    navAvatar.src = profile.avatar;
    navAvatar.alt = profile.name;
  }
  
  const navAvatarBox = document.getElementById('nav-avatar-box');
  if (navAvatarBox) {
    navAvatarBox.textContent = "MS";
  }

  // Hero Section
  const heroStatus = document.getElementById('hero-status');
  if (heroStatus) heroStatus.textContent = profile.statusBadge || profile.status;

  const heroName = document.getElementById('hero-name');
  if (heroName) heroName.textContent = profile.name;

  const heroTagline = document.getElementById('hero-tagline');
  if (heroTagline) heroTagline.textContent = profile.tagline;

  // Social Links
  const ghLink = document.getElementById('link-github');
  const liLink = document.getElementById('link-linkedin');
  const lcLink = document.getElementById('link-leetcode');
  const waLink = document.getElementById('link-whatsapp');
  const phoneLink = document.getElementById('link-phone');
  
  if (ghLink && profile.socials.github) ghLink.href = profile.socials.github;
  if (liLink && profile.socials.linkedin) liLink.href = profile.socials.linkedin;
  if (waLink && profile.socials.whatsapp) waLink.href = profile.socials.whatsapp;
  if (phoneLink && profile.phone) {
    phoneLink.href = `tel:${profile.phone}`;
    phoneLink.textContent = profile.phone;
  }

  // Footer & Contact
  const footerName = document.getElementById('footer-name');
  if (footerName) footerName.textContent = profile.name;

  const emailText = document.getElementById('contact-email-text');
  if (emailText) emailText.textContent = profile.directEmail;

  const emailBtn = document.getElementById('direct-email-btn');
  if (emailBtn) emailBtn.href = `mailto:${profile.directEmail}`;

  const contactLi = document.getElementById('contact-linkedin-btn');
  if (contactLi && profile.socials.linkedin) contactLi.href = profile.socials.linkedin;

  const contactWa = document.getElementById('contact-whatsapp-btn');
  if (contactWa && profile.socials.whatsapp) contactWa.href = profile.socials.whatsapp;
}

/* ==========================================================================
   PROJECTS RENDERING & FILTERING
   ========================================================================== */
function renderProjects(projects, activeFilter = 'all') {
  const container = document.getElementById('projects-container');
  
  const filtered = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase().includes(activeFilter.toLowerCase()));

  container.innerHTML = filtered.map(p => `
    <article class="project-card" data-category="${p.category}">
      <div class="project-thumbnail">
        <img src="${escapeHTML(p.image)}" alt="${escapeHTML(p.title)}" class="project-img" loading="lazy">
        <span class="project-badge">${escapeHTML(p.badge || p.category)}</span>
      </div>
      <div class="project-content">
        <h3 class="project-title">${escapeHTML(p.title)}</h3>
        ${p.stats ? `<div class="project-stats-banner"><i class="fa-solid fa-gauge-high"></i> ${escapeHTML(p.stats)}</div>` : ''}
        <p class="project-desc">${escapeHTML(p.shortDescription)}</p>
        
        <div class="project-tech-stack">
          ${p.tags.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('')}
        </div>

        <div class="project-footer">
          <div class="project-links">
            ${p.liveUrl ? `
              <a href="${escapeHTML(p.liveUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="Open Live Interactive Demo">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> Demo
              </a>
            ` : (p.isInternalCompany ? `
              <span class="project-nda-tag" title="Enterprise internal initiative (Confidential / Protected under NDA)">
                <i class="fa-solid fa-lock"></i> Enterprise Internal
              </span>
            ` : '')}
            ${p.githubUrl ? `
              <a href="${escapeHTML(p.githubUrl)}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View GitHub Source Code">
                <i class="fa-brands fa-github"></i> Code
              </a>
            ` : ''}
          </div>
          
          <button class="case-study-btn" data-project-id="${p.id}">
            <span>Case Study</span> <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');

  // Attach modal listeners to "Case Study" buttons
  container.querySelectorAll('.case-study-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project-id');
      const project = projects.find(p => p.id === projectId);
      if (project) openCaseStudyModal(project);
    });
  });
}

function initProjectFilters(projects) {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProjects(projects, filter);
    });
  });
}

/* ==========================================================================
   SKILLS MATRIX RENDERING (Matching the 5 Standardized Categories)
   ========================================================================== */
function renderSkills(skills) {
  const container = document.getElementById('skills-container');

  // Fallback / adapt for skills structure
  const programming = skills.programming || skills.languages || [];
  const analytics = skills.analyticsBI || skills.frameworks || [];
  const platforms = skills.platformsEngineering || skills.infrastructure || [];
  const statistics = skills.statisticalAnalysis || skills.foundations || [];
  const tools = skills.devTools || [];

  container.innerHTML = `
    <!-- Programming & Querying -->
    <div class="skill-category-card">
      <div class="category-icon-header">
        <div class="category-icon"><i class="fa-solid fa-code"></i></div>
        <h3 class="category-title">Programming & Querying</h3>
      </div>
      <div class="skill-items-list">
        ${programming.map(s => `
          <div class="skill-item">
            <span class="skill-name">
              ${s.highlighted ? '<span class="skill-badge-highlight" title="Core Strength"></span>' : ''}
              ${escapeHTML(s.name)}
            </span>
            <span class="skill-level">${escapeHTML(s.level)}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Data Analytics & Business Intelligence -->
    <div class="skill-category-card">
      <div class="category-icon-header">
        <div class="category-icon"><i class="fa-solid fa-chart-column"></i></div>
        <h3 class="category-title">Analytics & Business Intelligence</h3>
      </div>
      <div class="skill-items-list">
        ${analytics.map(s => `
          <div class="skill-item">
            <span class="skill-name">
              ${s.highlighted ? '<span class="skill-badge-highlight" title="Core Strength"></span>' : ''}
              ${escapeHTML(s.name)}
            </span>
            <span class="skill-level">${escapeHTML(s.level)}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Data Platforms & Data Engineering -->
    <div class="skill-category-card">
      <div class="category-icon-header">
        <div class="category-icon"><i class="fa-solid fa-snowflake"></i></div>
        <h3 class="category-title">Data Platforms & Engineering</h3>
      </div>
      <div class="skill-items-list">
        ${platforms.map(s => `
          <div class="skill-item">
            <span class="skill-name">
              ${s.highlighted ? '<span class="skill-badge-highlight" title="Core Strength"></span>' : ''}
              ${escapeHTML(s.name)}
            </span>
            <span class="skill-level">${escapeHTML(s.level)}</span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Statistical Analysis -->
    <div class="skill-category-card">
      <div class="category-icon-header">
        <div class="category-icon"><i class="fa-solid fa-square-root-variable"></i></div>
        <h3 class="category-title">Statistical Analysis</h3>
      </div>
      <div class="skill-items-list" style="gap: 0.75rem;">
        ${statistics.map(f => `
          <div class="foundation-item">
            <div class="foundation-title">${escapeHTML(f.name)}</div>
            <div class="foundation-detail">${escapeHTML(f.detail || f.level || '')}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- Development & Collaboration Tools -->
    <div class="skill-category-card">
      <div class="category-icon-header">
        <div class="category-icon"><i class="fa-solid fa-toolbox"></i></div>
        <h3 class="category-title">Development & Collaboration</h3>
      </div>
      <div class="skill-items-list">
        ${tools.map(t => `
          <div class="skill-item">
            <span class="skill-name">
              ${t.highlighted ? '<span class="skill-badge-highlight" title="Core Strength"></span>' : ''}
              ${escapeHTML(t.name)}
            </span>
            <span class="skill-level">${escapeHTML(t.level)}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

/* ==========================================================================
   EXPERIENCE & TIMELINE
   ========================================================================== */
function renderExperience(experienceList) {
  const container = document.getElementById('experience-timeline');

  container.innerHTML = experienceList.map(exp => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-header">
          <div>
            <h3 class="timeline-role">${escapeHTML(exp.role)}</h3>
            <div class="timeline-company">${escapeHTML(exp.organization)}</div>
          </div>
          <div class="timeline-meta">
            <div>${escapeHTML(exp.period)}</div>
            <div style="color: var(--text-secondary); font-size: 0.75rem;">${escapeHTML(exp.location)}</div>
          </div>
        </div>
        <ul class="timeline-bullets">
          ${exp.highlights.map(h => `<li>${escapeHTML(h)}</li>`).join('')}
        </ul>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   EDUCATION & RECOMMENDATIONS
   ========================================================================== */
function renderEducation(edu) {
  const container = document.getElementById('education-card');
  container.innerHTML = `
    <div class="category-icon-header">
      <div class="category-icon"><i class="fa-solid fa-graduation-cap"></i></div>
      <h3 class="category-title">Education & Honors</h3>
    </div>
    <div style="margin-bottom: 1.25rem;">
      <h4 style="font-size: 1.1rem;">${escapeHTML(edu.degree)}</h4>
      <div style="color: var(--accent-secondary); font-weight: 600; font-size: 0.95rem;">${escapeHTML(edu.institution)}</div>
      <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted); margin-top: 0.2rem;">
        ${escapeHTML(edu.period)} · GPA: ${escapeHTML(edu.gpa)}
      </div>
    </div>
    <div style="margin-bottom: 1.5rem;">
      <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Honors & Recognitions</div>
      <ul class="timeline-bullets" style="gap: 0.4rem;">
        ${edu.honors.map(h => `<li style="font-size: 0.88rem;">${escapeHTML(h)}</li>`).join('')}
      </ul>
    </div>
    <div>
      <div style="font-size: 0.8rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 0.5rem;">Relevant Coursework</div>
      <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
        ${edu.relevantCoursework.map(c => `<span class="tech-tag">${escapeHTML(c)}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderReferences(refs) {
  const container = document.getElementById('references-card') || document.getElementById('recommendations-card');
  if (!container || !refs) return;

  container.innerHTML = `
    <div class="category-icon-header">
      <div class="category-icon"><i class="fa-solid fa-address-book"></i></div>
      <h3 class="category-title">Academic & Professional References</h3>
    </div>
    <div style="display: flex; flex-direction: column; gap: 1.25rem;">
      ${refs.map(ref => `
        <div class="reference-item-box">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.35rem;">
            <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">${escapeHTML(ref.name)}</div>
            ${ref.relationship ? `<span class="tag-pill" style="font-size: 0.72rem; padding: 0.2rem 0.6rem;">${escapeHTML(ref.relationship)}</span>` : ''}
          </div>
          <div style="color: var(--accent-secondary); font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${escapeHTML(ref.title)}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.85rem;">
            ${escapeHTML(ref.department ? ref.department + ', ' : '')}${escapeHTML(ref.institution)}
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
            ${ref.phone ? `
              <a href="tel:${escapeHTML(ref.phone)}" class="ref-contact-chip" title="Call ${escapeHTML(ref.name)}">
                <i class="fa-solid fa-phone"></i>
                <span>${escapeHTML(ref.phone)}</span>
              </a>
            ` : ''}
            ${ref.email ? `
              <a href="mailto:${escapeHTML(ref.email)}" class="ref-contact-chip" title="Email ${escapeHTML(ref.name)}">
                <i class="fa-solid fa-envelope"></i>
                <span>${escapeHTML(ref.email)}</span>
              </a>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

/* ==========================================================================
   PROFESSIONAL CERTIFICATIONS (MATCHING REFERENCE UI)
   ========================================================================== */
function renderCertifications(certs) {
  const container = document.getElementById('certifications-container');
  if (!container || !certs) return;

  container.innerHTML = certs.map(cert => `
    <div class="cert-card" id="cert-${escapeHTML(cert.id)}">
      <div class="cert-preview-box">
        <img src="${escapeHTML(cert.previewImage)}" alt="${escapeHTML(cert.title)}" class="cert-preview-img" loading="lazy">
        ${cert.badgeText ? `
          <span class="cert-badge-floating">
            <i class="fa-solid fa-circle-check"></i> ${escapeHTML(cert.badgeText)}
          </span>
        ` : ''}
      </div>
      <div class="cert-card-body">
        <div class="cert-org-tag">${escapeHTML(cert.org)}</div>
        <h3 class="cert-card-title">${escapeHTML(cert.title)}</h3>
        <p class="cert-card-desc">${escapeHTML(cert.description)}</p>
        
        ${cert.credentialId || cert.issueDate ? `
          <div class="cert-meta-info">
            ${cert.credentialId ? `<div><strong>Credential ID:</strong> ${escapeHTML(cert.credentialId)}</div>` : ''}
            ${cert.certNumber ? `<div><strong>Certification No:</strong> ${escapeHTML(cert.certNumber)}</div>` : ''}
            <div><strong>Issued:</strong> ${escapeHTML(cert.issueDate)} · <strong>Valid to:</strong> ${escapeHTML(cert.expiryDate)}</div>
          </div>
        ` : ''}

        <div class="cert-card-actions">
          <a href="${escapeHTML(cert.pdfUrl || cert.previewImage)}" target="_blank" rel="noopener noreferrer" class="btn-cert-view" title="Open Official Certificate PDF in new tab">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
            <span>View Certificate</span>
          </a>
          ${cert.verifyUrl ? `
            <a href="${escapeHTML(cert.verifyUrl)}" target="_blank" rel="noopener noreferrer" class="btn-cert-verify" title="Verify on Microsoft Learn Portal">
              <i class="fa-solid fa-shield-halved"></i>
              <span>Verify on MS Learn</span>
            </a>
          ` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

/* ==========================================================================
   MODALS: CASE STUDY & ATS RESUME
   ========================================================================== */
function initModals(data) {
  // Case Study Modal
  const caseStudyModal = document.getElementById('case-study-modal');
  const caseStudyCloseBtn = document.getElementById('modal-close-btn');

  caseStudyCloseBtn.addEventListener('click', () => {
    caseStudyModal.classList.remove('open');
  });

  caseStudyModal.addEventListener('click', (e) => {
    if (e.target === caseStudyModal) {
      caseStudyModal.classList.remove('open');
    }
  });

  // Resume Modal (Official Resume PDF only)
  const resumeModal = document.getElementById('resume-modal');
  const resumeCloseBtn = document.getElementById('resume-close-btn');
  const navResumeBtn = document.getElementById('nav-resume-btn');
  const heroResumeBtn = document.getElementById('hero-resume-btn');
  const cardResumeBtn = document.getElementById('card-resume-btn');
  const cardContactBtn = document.getElementById('card-contact-btn');

  function openResume() {
    if (resumeModal) resumeModal.classList.add('open');
  }

  if (navResumeBtn) navResumeBtn.addEventListener('click', openResume);
  if (heroResumeBtn) heroResumeBtn.addEventListener('click', openResume);
  if (cardResumeBtn) cardResumeBtn.addEventListener('click', openResume);
  
  if (cardContactBtn) {
    cardContactBtn.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  if (resumeCloseBtn) {
    resumeCloseBtn.addEventListener('click', () => {
      if (resumeModal) resumeModal.classList.remove('open');
    });
  }

  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      resumeModal.classList.remove('open');
    }
  });

  // Global ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      caseStudyModal.classList.remove('open');
      resumeModal.classList.remove('open');
    }
  });
}

function openCaseStudyModal(project) {
  const modal = document.getElementById('case-study-modal');
  const cs = project.caseStudy || {};

  document.getElementById('modal-tag').textContent = `${project.category} · Case Study`;
  const demoBtn = document.getElementById('modal-demo-btn');
  const githubBtn = document.getElementById('modal-github-btn');

  if (project.liveUrl) {
    demoBtn.href = project.liveUrl;
    demoBtn.style.display = 'inline-flex';
  } else {
    demoBtn.style.display = 'none';
  }

  if (project.githubUrl) {
    githubBtn.href = project.githubUrl;
    githubBtn.style.display = 'inline-flex';
  } else {
    githubBtn.style.display = 'none';
  }

  document.getElementById('modal-problem').textContent = cs.problem || project.shortDescription;
  document.getElementById('modal-solution').textContent = cs.solution || 'Engineered an optimized solution using best practices.';

  // Business Impact ("So What?" Factor)
  const impactBox = document.getElementById('modal-impact-box');
  const impactText = document.getElementById('modal-impact-text');
  if (impactBox && impactText) {
    if (cs.businessImpact) {
      impactText.textContent = cs.businessImpact;
      impactBox.style.display = 'block';
    } else {
      impactBox.style.display = 'none';
    }
  }

  // Visual Architecture Flow Diagram
  const diagramContainer = document.getElementById('modal-diagram-container');
  if (diagramContainer) {
    if (cs.diagramFlow && cs.diagramFlow.length > 0) {
      diagramContainer.innerHTML = `
        <div class="architecture-diagram-card">
          <div class="diagram-flow">
            ${cs.diagramFlow.map((step, idx) => `
              <div class="diagram-node">
                <div class="node-icon"><i class="${escapeHTML(step.icon)}"></i></div>
                <div class="node-title">${escapeHTML(step.title)}</div>
                <div class="node-sub">${escapeHTML(step.sub)}</div>
              </div>
              ${idx < cs.diagramFlow.length - 1 ? '<div class="diagram-connector"><i class="fa-solid fa-arrow-right"></i></div>' : ''}
            `).join('')}
          </div>
        </div>
      `;
      diagramContainer.style.display = 'block';
    } else {
      diagramContainer.innerHTML = '';
      diagramContainer.style.display = 'none';
    }
  }

  // Architecture list
  const archList = document.getElementById('modal-architecture');
  archList.innerHTML = (cs.architecture || project.tags).map(item => `<li>${escapeHTML(item)}</li>`).join('');

  // Challenges list
  const chalList = document.getElementById('modal-challenges');
  chalList.innerHTML = (cs.technicalChallenges || [
    'Benchmarked concurrent requests to identify performance bottlenecks.',
    'Structured dimensional models to optimize query execution speed.'
  ]).map(item => `<li>${escapeHTML(item)}</li>`).join('');

  // Metrics list
  const metList = document.getElementById('modal-metrics');
  metList.innerHTML = (cs.metrics || [project.stats || 'Validated enterprise analytics']).map(item => `<li>${escapeHTML(item)}</li>`).join('');

  modal.classList.add('open');
}

function renderResumeBody(data) {
  const p = data.profile;
  const edu = data.education;
  const container = document.getElementById('resume-preview-body');

  container.innerHTML = `
    <div style="border-bottom: 2px solid var(--text-primary); padding-bottom: 1rem; margin-bottom: 1.5rem;">
      <h2 style="font-size: 1.75rem; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.25rem;">${escapeHTML(p.name)}</h2>
      <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 0.35rem; font-size: 1.05rem;">Bachelor of Science with Honours (Statistics) | Data & AI</div>
      <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary);">
        ${escapeHTML(p.location)} | ${escapeHTML(p.phone)}<br>
        <a href="mailto:${escapeHTML(p.directEmail)}" style="color: var(--accent-primary);">${escapeHTML(p.directEmail)}</a> | <a href="${escapeHTML(p.socials.linkedin)}" target="_blank" style="color: var(--accent-primary);">${escapeHTML(p.socials.linkedin)}</a>
      </div>
    </div>

    <!-- Professional Summary -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem; letter-spacing: 0.05em; color: var(--accent-primary);">Professional Summary</h3>
      <p style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.6;">
        ${escapeHTML(p.bio)}
      </p>
    </div>

    <!-- Education Background -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem; letter-spacing: 0.05em; color: var(--accent-primary);">Education</h3>
      
      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>UNIVERSITI KEBANGSAAN MALAYSIA</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">August 2022 – October 2026</span>
        </div>
        <div style="font-size: 0.9rem;">Bachelor of Science with Honors (Statistics) | <strong>CGPA: 3.41</strong></div>
        <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.2rem;">
          <strong>Relevant Coursework:</strong> Time Series Analysis, Regression Analysis, Economy and Social Statistics
        </div>
      </div>

      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>KOLEJ MATRIKULASI PERLIS</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">July 2021 – May 2022</span>
        </div>
        <div style="font-size: 0.9rem;">Life Science | <strong>CGPA 4.00</strong> | Dean's List - All semesters</div>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>KOLEJ ISLAM SULTAN ALAM SHAH</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">2019 – 2020</span>
        </div>
        <div style="font-size: 0.9rem;">Enrolled in pure science stream</div>
      </div>
    </div>

    <!-- Work Experience -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem; letter-spacing: 0.05em; color: var(--accent-primary);">Work Experience</h3>
      
      <div style="margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>YTL CEMENT SHARED SERVICES</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">March 2026 – August 2026</span>
        </div>
        <div style="font-size: 0.9rem; font-weight: 600; color: var(--text-primary);">Intern, Data & AI Team</div>
        <div style="font-size: 0.85rem; color: var(--accent-secondary); font-family: var(--font-mono); margin: 0.2rem 0;">
          Skills Related: Snowflake, SQL, Python, Streamlit, Git, VS Code, Kiro
        </div>
        <ul style="padding-left: 1.25rem; margin-top: 0.4rem; font-size: 0.9rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.45rem;">
          <li><strong>Smart AI Dashboard:</strong> Developed an AI-powered dashboard using Snowflake data to visualize business performance and generate actionable analytical insights.</li>
          <li><strong>Permit-To-Work on Snowflake Cowork:</strong> Developed an AI-powered analytics agent using Snowflake semantic views and fact tables to enable natural-language data analysis, reporting, and visualization.</li>
          <li><strong>NOSW Project:</strong> Developed and analyzed Snowflake data models for waste management data, supporting reporting, data transformation, and AI-driven business analysis.</li>
          <li><strong>Streamlit Reporting Projects:</strong> Developed interactive dashboards and self-service reports using Python and Streamlit, integrated with Snowflake for dynamic data exploration and visualization.</li>
        </ul>
      </div>
    </div>

    <!-- Extracurricular Activities -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem; letter-spacing: 0.05em; color: var(--accent-primary);">Extracurricular Activities</h3>
      
      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>Statistics Club — Vice President</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">October 2024 – June 2025</span>
        </div>
        <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.88rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
          <li>Collaborated with executives to organize club activities throughout the semester through regular strategic planning meetings.</li>
          <li>Served as liaison between the President and committee, translating strategic goals into actionable departmental tasks.</li>
          <li>Coordinated key operational deliverables by implementing a centralized tracking system for deadlines and budget approvals.</li>
        </ul>
      </div>

      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>Malam Variasi Bintang — Director</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">June 2025</span>
        </div>
        <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.88rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.25rem;">
          <li>Directed the inaugural annual grand dinner at Bangi Golf Resort, overseeing vendor coordination, event logistics, and programme execution.</li>
          <li>Coordinated the hosting of international delegates from Universitas Airlangga (UNAIR) and documented an operational and financial framework for future editions.</li>
        </ul>
      </div>

      <div style="margin-bottom: 0.85rem;">
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>Statistics Together Across Region (STAR) — Vice Director</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">April 2025</span>
        </div>
        <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.88rem; color: var(--text-secondary);">
          <li>Co-directed a five-day international academic and cultural mobility programme with Universitas Airlangga, Surabaya, including travel, budgeting, programme coordination, and delegate management.</li>
        </ul>
      </div>

      <div>
        <div style="display: flex; justify-content: space-between; font-weight: 700;">
          <span>Omarian Aspirational International Synergy (OASIS) Thailand — Multimedia Executive</span>
          <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">July 2024</span>
        </div>
        <ul style="padding-left: 1.25rem; margin-top: 0.25rem; font-size: 0.88rem; color: var(--text-secondary);">
          <li>Managed multimedia and social-media content for an international mobility programme, including promotional materials, photography, videos, and real-time programme updates.</li>
        </ul>
      </div>
    </div>

    <!-- Awards and Achievements -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem; letter-spacing: 0.05em; color: var(--accent-primary);">Awards and Achievements</h3>
      <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.35rem;">
        <li><strong>Microsoft Certified: Power BI Data Analyst Associate-Microsoft</strong> — December 2025</li>
        <li><strong>Microsoft Power BI certificate from Trainocate Malaysia-UKM Karrier</strong> — November 2025</li>
        <li><strong>First Place in Ultimate Frisbee - UKM Sport</strong> — October 2025</li>
        <li><strong>First Place in Ultimate Frisbee - Inter Faculty Sport</strong> — June 2025</li>
      </ul>
    </div>

    <!-- Skills and Language -->
    <div style="margin-bottom: 1.5rem;">
      <h3 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem; letter-spacing: 0.05em; color: var(--accent-primary);">Skills and Language</h3>
      <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.8;">
        <div><strong>Programming & Querying:</strong> Python | SQL | R | C++</div>
        <div><strong>Data Analytics & Business Intelligence:</strong> Power BI | Microsoft Excel | Streamlit</div>
        <div><strong>Data Platforms & Data Engineering:</strong> Snowflake | Data Modelling | Data Transformation</div>
        <div><strong>Statistical Analysis:</strong> Time Series Analysis | Regression Analysis | Minitab | SAS</div>
        <div><strong>Development & Collaboration Tools:</strong> Git | VS Code | Kiro</div>
      </div>
    </div>

    <!-- Reference -->
    <div>
      <h3 style="font-size: 1rem; text-transform: uppercase; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.25rem; margin-bottom: 0.5rem; letter-spacing: 0.05em; color: var(--accent-primary);">Reference</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; font-size: 0.88rem; color: var(--text-secondary);">
        <div style="background: var(--bg-card); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <strong style="color: var(--text-primary); font-size: 0.92rem;">Dr. Nor Hamizah binti Miswan</strong><br>
          Lecturer of Statistics<br>
          Faculty of Science and Technology, UKM<br>
          <i class="fa-solid fa-phone" style="font-size: 0.75rem;"></i> +60197101136<br>
          <i class="fa-solid fa-envelope" style="font-size: 0.75rem;"></i> <a href="mailto:norhamizah@ukm.edu.my" style="color: var(--accent-primary);">norhamizah@ukm.edu.my</a>
        </div>
        <div style="background: var(--bg-card); padding: 0.85rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
          <strong style="color: var(--text-primary); font-size: 0.92rem;">Vivian Yang Poh Chin</strong><br>
          Data Engineering Lead<br>
          YTL Cement Shared Services<br>
          <i class="fa-solid fa-phone" style="font-size: 0.75rem;"></i> +60179383188<br>
          <i class="fa-solid fa-envelope" style="font-size: 0.75rem;"></i> <a href="mailto:vivian.yang@ytlcement.com.my" style="color: var(--accent-primary);">vivian.yang@ytlcement.com.my</a>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   CLIPBOARD ACTIONS & NOTIFICATIONS
   ========================================================================== */
function initClipboardActions(profile) {
  const emailBadge = document.getElementById('contact-email-badge');
  const heroCopyBtn = document.getElementById('hero-copy-email-btn');

  function copyEmail() {
    navigator.clipboard.writeText(profile.directEmail).then(() => {
      showToast(`Copied ${profile.directEmail} to clipboard!`);
    }).catch(err => {
      console.warn('Clipboard write failed:', err);
      showToast(`Email: ${profile.directEmail}`);
    });
  }

  if (emailBadge) emailBadge.addEventListener('click', copyEmail);
  if (heroCopyBtn) heroCopyBtn.addEventListener('click', copyEmail);
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--accent-success);"></i> <span>${escapeHTML(message)}</span>`;
  
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Security helper to prevent XSS
function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
