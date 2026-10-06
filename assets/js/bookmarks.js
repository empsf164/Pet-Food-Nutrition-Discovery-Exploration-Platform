/**
 * PAWFORM - Bookmarking & Saved Items Engine
 */

const PAWFORM_BOOKMARKS = (function() {
  const STORAGE_KEY = 'pawform_bookmarks';

  const defaultBookmarks = {
    videos: ['vid-1', 'vid-4'],
    guides: ['guide-1', 'guide-2'],
    creators: ['dr-maya-lin'],
    locations: ['loc-1']
  };

  function getStore() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : defaultBookmarks;
    } catch (e) {
      return defaultBookmarks;
    }
  }

  function saveStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
      updateUI();
      window.dispatchEvent(new CustomEvent('pawform:bookmarks-changed', { detail: store }));
    } catch (e) {
      console.error("Could not persist bookmarks:", e);
    }
  }

  function isSaved(type, id) {
    const store = getStore();
    return Array.isArray(store[type]) && store[type].includes(id);
  }

  function toggleSave(type, id, title = 'Item') {
    const store = getStore();
    if (!store[type]) store[type] = [];

    const index = store[type].indexOf(id);
    let saved = false;

    if (index > -1) {
      store[type].splice(index, 1);
      saved = false;
    } else {
      store[type].push(id);
      saved = true;
    }

    saveStore(store);

    if (typeof showToast === 'function') {
      const typeLabel = type.slice(0, -1);
      if (saved) {
        showToast('Saved to Collection', `"${title}" has been added to your saved ${type}.`, 'success');
      } else {
        showToast('Removed', `"${title}" was removed from your saved items.`, 'info');
      }
    }

    return saved;
  }

  function getTotalCount() {
    const store = getStore();
    return Object.values(store).reduce((total, arr) => total + (Array.isArray(arr) ? arr.length : 0), 0);
  }

  function updateUI() {
    const store = getStore();
    const total = getTotalCount();

    // Update navbar badges
    document.querySelectorAll('.nav-saved-badge, .nav-badge-count').forEach(badge => {
      badge.textContent = total;
      badge.style.display = total > 0 ? 'flex' : 'none';
    });

    // Update all bookmark buttons on the page
    document.querySelectorAll('.btn-save-bookmark').forEach(btn => {
      const type = btn.getAttribute('data-type');
      const id = btn.getAttribute('data-id');
      if (type && id) {
        const saved = isSaved(type, id);
        btn.classList.toggle('saved', saved);
        btn.setAttribute('aria-label', saved ? 'Remove from saved' : 'Save to collection');
        btn.setAttribute('title', saved ? 'Saved' : 'Save');
      }
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    // Delegate click for save buttons
    document.body.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-save-bookmark');
      if (btn) {
        e.preventDefault();
        e.stopPropagation();
        const type = btn.getAttribute('data-type');
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title') || 'Content';

        if (type && id) {
          toggleSave(type, id, title);
          btn.classList.add('pop-animation');
          setTimeout(() => btn.classList.remove('pop-animation'), 400);
        }
      }
    });
  });

  return {
    get: getStore,
    isSaved,
    toggleSave,
    getTotalCount,
    updateUI
  };
})();

window.PAWFORM_BOOKMARKS = PAWFORM_BOOKMARKS;
