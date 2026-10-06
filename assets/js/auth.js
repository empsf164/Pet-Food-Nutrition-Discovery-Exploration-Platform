/**
 * PAWFORM - Authentication & User State
 */

const PAWFORM_AUTH = (function() {
  const STORAGE_KEY = 'pawform_user';

  function getUser() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  function isLoggedIn() {
    return getUser() !== null;
  }

  function login(email, name = 'Sarah Jenkins', prefs = null) {
    const user = {
      id: 'usr-' + Date.now(),
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      petInterests: prefs?.species || ['Dogs', 'Senior Pets'],
      contentInterests: prefs?.topics || ['Nutrition', 'Ingredients', 'Food Labels'],
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    updateAuthUI();
    if (typeof showToast === 'function') {
      showToast('Welcome back!', `Signed in as ${user.name}`, 'success');
    }
    return user;
  }

  function signup(formData) {
    const user = {
      id: 'usr-' + Date.now(),
      name: formData.name || 'New Member',
      email: formData.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      petInterests: formData.species || ['Dogs'],
      contentInterests: formData.topics || ['Nutrition', 'Ingredients'],
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    updateAuthUI();
    if (typeof showToast === 'function') {
      showToast('Account Created!', `Welcome to PAWFORM, ${user.name}!`, 'success');
    }
    return user;
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    updateAuthUI();
    if (typeof showToast === 'function') {
      showToast('Logged Out', 'You have been signed out successfully.', 'info');
    }
  }

  function updateAuthUI() {
    const user = getUser();
    const authContainers = document.querySelectorAll('.nav-auth-container');

    authContainers.forEach(container => {
      if (user) {
        container.innerHTML = `
          <div class="dropdown">
            <button class="user-profile-pill dropdown-toggle border-0 bg-transparent" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="${user.avatar}" alt="${user.name}">
              <span class="d-none d-lg-inline fw-semibold font-sans small">${user.name.split(' ')[0]}</span>
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow-lg border-light" style="min-width: 220px;">
              <li class="px-3 py-2 border-bottom">
                <div class="fw-bold small text-dark">${user.name}</div>
                <div class="text-muted" style="font-size: 0.75rem;">${user.email}</div>
                <div class="mt-1 badge bg-light text-success border border-success-subtle" style="font-size: 0.68rem;">
                  ${user.petInterests.join(' • ')}
                </div>
              </li>
              <li><a class="dropdown-item py-2" href="saved.html"><i class="bi bi-bookmark me-2 text-warning"></i> Saved Collections</a></li>
              <li><a class="dropdown-item py-2" href="discover.html?forYou=true"><i class="bi bi-sparkles me-2 text-primary"></i> For You Recommendations</a></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item text-danger py-2" id="pawformLogoutBtn"><i class="bi bi-box-arrow-right me-2"></i> Sign Out</button></li>
            </ul>
          </div>
        `;
      } else {
        container.innerHTML = `
          <a href="login.html" class="nav-link-paw font-sans fw-semibold">Log In</a>
          <a href="signup.html" class="btn-paw-secondary font-sans small py-2 px-3">Sign Up</a>
        `;
      }
    });

    // Attach logout listener
    document.querySelectorAll('#pawformLogoutBtn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        setTimeout(() => window.location.reload(), 300);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
  });

  return {
    getUser,
    isLoggedIn,
    login,
    signup,
    logout,
    updateAuthUI
  };
})();

window.PAWFORM_AUTH = PAWFORM_AUTH;
