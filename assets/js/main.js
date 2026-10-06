/**
 * PAWFORM - Main Application Scripts
 * Master Utilities, Mobile Nav, Toast Notifications, Animations
 */

// Global Toast Notification Helper
function showToast(title, message, type = 'info') {
  let container = document.getElementById('pawformToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'pawformToastContainer';
    container.className = 'paw-toast-container';
    document.body.appendChild(container);
  }

  const iconMap = {
    success: 'bi-check-circle-fill text-success',
    info: 'bi-info-circle-fill text-primary',
    warning: 'bi-exclamation-triangle-fill text-warning',
    danger: 'bi-x-circle-fill text-danger'
  };

  const toast = document.createElement('div');
  toast.className = 'paw-toast';
  toast.innerHTML = `
    <i class="bi ${iconMap[type] || iconMap.info} fs-5"></i>
    <div class="flex-grow-1">
      <div class="fw-bold small">${title}</div>
      <div class="text-white-50 small" style="font-size: 0.8rem;">${message}</div>
    </div>
    <button type="button" class="btn-close btn-close-white ms-2" style="font-size: 0.7rem;" aria-label="Close"></button>
  `;

  toast.querySelector('.btn-close').addEventListener('click', () => {
    toast.remove();
  });

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// Follow Creator System
const PAWFORM_FOLLOWS = (function() {
  const STORAGE_KEY = 'pawform_followed_creators';

  function getFollowed() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : ['dr-maya-lin'];
    } catch (e) {
      return ['dr-maya-lin'];
    }
  }

  function isFollowing(creatorId) {
    return getFollowed().includes(creatorId);
  }

  function toggleFollow(creatorId, creatorName = 'Creator') {
    const list = getFollowed();
    const idx = list.indexOf(creatorId);
    let following = false;

    if (idx > -1) {
      list.splice(idx, 1);
      following = false;
      showToast('Unfollowed', `You unfollowed ${creatorName}.`, 'info');
    } else {
      list.push(creatorId);
      following = true;
      showToast('Following', `You are now following ${creatorName}!`, 'success');
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    updateFollowButtons();
    return following;
  }

  function updateFollowButtons() {
    document.querySelectorAll('.btn-follow').forEach(btn => {
      const id = btn.getAttribute('data-creator-id');
      if (id) {
        const following = isFollowing(id);
        btn.classList.toggle('following', following);
        btn.innerHTML = following 
          ? `<i class="bi bi-check2"></i> Following` 
          : `<i class="bi bi-person-plus"></i> Follow`;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateFollowButtons();

    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-follow');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const id = btn.getAttribute('data-creator-id');
        const name = btn.getAttribute('data-creator-name') || 'Creator';
        if (id) {
          toggleFollow(id, name);
        }
      }
    });
  });

  return { getFollowed, isFollowing, toggleFollow, updateFollowButtons };
})();

// DOM Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar Scroll
  const navbar = document.querySelector('.paw-navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Active Link Highlighter
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link-paw, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile Drawer Navigation Setup
  const mobileToggle = document.getElementById('pawformMobileToggle');
  const mobileDrawer = document.getElementById('pawformMobileDrawer');
  const mobileBackdrop = document.getElementById('pawformDrawerBackdrop');
  const mobileClose = document.getElementById('pawformCloseDrawer');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      mobileBackdrop?.classList.add('active');
      document.body.classList.add('scroll-locked');
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      mobileBackdrop?.classList.remove('active');
      document.body.classList.remove('scroll-locked');
    }
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  // Submenu Accordion for Mobile
  document.querySelectorAll('.mobile-submenu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const submenu = document.getElementById(targetId);
      if (submenu) {
        submenu.classList.toggle('open');
        const icon = btn.querySelector('.bi-chevron-down');
        if (icon) {
          icon.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // Share Modal / Clipboard helper
  document.querySelectorAll('[data-action="share"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link Copied!', 'Page URL copied to your clipboard.', 'success');
      } else {
        showToast('Share Link', window.location.href, 'info');
      }
    });
  });

  // Quick Hero Search Form submission
  document.querySelectorAll('.hero-search-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="text"]');
      if (input && input.value.trim()) {
        window.location.href = `discover.html?search=${encodeURIComponent(input.value.trim())}`;
      }
    });
  });

  // GSAP Entrance Animations if available
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-editorial h1', { opacity: 0, y: 30, duration: 0.8, ease: 'power2.out' });
    gsap.from('.hero-editorial .text-editorial-lead', { opacity: 0, y: 20, duration: 0.8, delay: 0.2, ease: 'power2.out' });
    gsap.from('.hero-search-box', { opacity: 0, scale: 0.95, duration: 0.8, delay: 0.35, ease: 'power2.out' });
    gsap.from('.hero-visual-cluster', { opacity: 0, x: 40, duration: 1, delay: 0.3, ease: 'power2.out' });
  }
});

// Expose globally
window.showToast = showToast;
window.PAWFORM_FOLLOWS = PAWFORM_FOLLOWS;
