/* ═══ SHARED JS — Theme Persistence & Nav Logic ═══ */

// ═══ THEME STATE ═══
let currentExpertise = localStorage.getItem('av_expertise') || 'android';
let currentMode = localStorage.getItem('av_mode') || 'dark';

function applyTheme() {
  document.body.className = currentExpertise + '-' + currentMode;
  // Update toggle UI
  const toggle = document.getElementById('expertiseToggle');
  if (toggle) toggle.dataset.active = currentExpertise;
  document.querySelectorAll('.expertise-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.expertise === currentExpertise);
  });
  // Update sun/moon
  const sun = document.getElementById('sunIcon');
  const moon = document.getElementById('moonIcon');
  if (sun) sun.style.display = currentMode === 'dark' ? 'none' : 'block';
  if (moon) moon.style.display = currentMode === 'dark' ? 'block' : 'none';
}

function setExpertise(exp) {
  currentExpertise = exp;
  localStorage.setItem('av_expertise', exp);
  applyTheme();
}

function toggleTheme() {
  currentMode = currentMode === 'dark' ? 'light' : 'dark';
  localStorage.setItem('av_mode', currentMode);
  applyTheme();
}

// ═══ MOBILE MENU ═══
function toggleMobile() {
  document.getElementById('mobileOverlay').classList.toggle('open');
}
function closeMobile() {
  document.getElementById('mobileOverlay').classList.remove('open');
}

// ═══ INIT ═══
document.addEventListener('DOMContentLoaded', () => {
  applyTheme();
});

// ═══ NAV HTML INJECTOR ═══
// Call injectNav() from each page to render the shared nav + mobile overlay + footer
function getNavHTML(activePage) {
  // activePage: 'home' | 'case-studies' | 'blog' | ''
  const root = getPageRoot();
  const baseRoot = window.location.origin
  return `
  <div class="mobile-overlay" id="mobileOverlay">
    <a href="${baseRoot}" onclick="closeMobile()">Home</a>
    <a href="${baseRoot}/case-studies/" onclick="closeMobile()">Case Studies</a>
    <a href="${baseRoot}/blog/" onclick="closeMobile()">Blog</a>
    <a href="${baseRoot}#contact" onclick="closeMobile()">Contact</a>
  </div>
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="${baseRoot}" class="nav-logo">AV.</a>
      <div class="nav-links">
        <a href="${baseRoot}" class="${activePage==='home'?'active':''}">Home</a>
        <a href="${baseRoot}/case-studies/" class="${activePage==='case-studies'?'active':''}">Case Studies</a>
        <a href="${baseRoot}/blog/" class="${activePage==='blog'?'active':''}">Blog</a>
        <a href="${baseRoot}#contact">Contact</a>
      </div>
      <div class="nav-controls">
        <div class="expertise-toggle" data-active="android" id="expertiseToggle">
          <div class="expertise-slider"></div>
          <button class="expertise-btn active" data-expertise="android" onclick="setExpertise('android')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-2.12-1.1-3.99-2.77-5.08l.3.24zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
            <span class="label">Android</span>
          </button>
          <button class="expertise-btn" data-expertise="flutter" onclick="setExpertise('flutter')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.314 0zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z"/></svg>
            <span class="label">Flutter</span>
          </button>
        </div>
        <button class="theme-btn" onclick="toggleTheme()" aria-label="Toggle theme">
          <svg id="sunIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
          <svg id="moonIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>
        <button class="mobile-menu-btn" onclick="toggleMobile()" aria-label="Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
        </button>
      </div>
    </div>
  </nav>`;
}

function getFooterHTML() {
  return `<footer class="footer"><p>Designed & Built by Akash Verma</p></footer>`;
}

// Detect depth: pages in /blog/ or /case-studies/ need "../" prefix,
// pages in /blog/slug/ or /case-studies/slug/ need "../../"
function getPageRoot() {
  const path = window.location.pathname;
  // Count depth from root
  const parts = path.replace(/\/+$/,'').split('/').filter(Boolean);
  // The / and folders are at root level
  // /blog/index.html → depth 1 → ../
  // /blog/slug/index.html → depth 2 → ../../
  // /case-studies/index.html → depth 1 → ../
  // /case-studies/slug/index.html → depth 2 → ../../
  if (parts.length <= 1) return './';
  return '../'.repeat(parts.length - 1);
}

function injectNav(activePage) {
  // Insert nav at top of body
  document.body.insertAdjacentHTML('afterbegin', getNavHTML(activePage || ''));
  // Append footer
  document.body.insertAdjacentHTML('beforeend', getFooterHTML());
  // Apply saved theme
  applyTheme();
}

// Arrow SVG helper for links
function arrowSVG() {
  return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
}
