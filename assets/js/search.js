/**
 * PAWFORM - Global Omnibar Search Engine
 */

const PAWFORM_SEARCH = (function() {
  let searchModal = null;
  let searchInput = null;
  let searchResultsContainer = null;
  let activeCategoryFilter = 'all';

  function init() {
    createModalHTML();
    bindEvents();
  }

  function createModalHTML() {
    if (document.getElementById('pawformSearchModal')) return;

    const modal = document.createElement('div');
    modal.id = 'pawformSearchModal';
    modal.className = 'paw-search-modal';
    modal.innerHTML = `
      <div class="search-dialog-box">
        <div class="search-modal-header">
          <i class="bi bi-search fs-5 text-muted"></i>
          <input type="text" class="search-modal-input" id="pawformSearchQuery" placeholder="Search food, ingredients, creators, topics, locations..." autocomplete="off">
          <span class="badge bg-light text-muted border d-none d-md-inline" style="font-size: 0.72rem;">ESC to close</span>
          <button type="button" class="btn-close ms-2" id="pawformCloseSearch" aria-label="Close"></button>
        </div>

        <div class="px-4 pt-3 pb-2 border-bottom bg-secondary-subtle d-flex gap-2 flex-wrap" id="searchCategoryTabs">
          <button class="btn btn-sm btn-outline-secondary rounded-pill active search-cat-btn" data-cat="all">All</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill search-cat-btn" data-cat="videos">Videos</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill search-cat-btn" data-cat="guides">Guides</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill search-cat-btn" data-cat="creators">Creators</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill search-cat-btn" data-cat="locations">Locations</button>
          <button class="btn btn-sm btn-outline-secondary rounded-pill search-cat-btn" data-cat="ingredients">Ingredients</button>
        </div>

        <div class="search-modal-results" id="pawformSearchResults">
          <div class="text-muted small py-3 text-center">
            <p class="mb-2"><i class="bi bi-compass fs-2 text-muted"></i></p>
            <p class="mb-1 fw-semibold">Try searching for: <span class="text-forest">"Protein"</span>, <span class="text-forest">"Salmon"</span>, <span class="text-forest">"Hydration"</span>, <span class="text-forest">"Dr. Maya"</span>, or <span class="text-forest">"New York"</span></p>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    searchModal = modal;
    searchInput = document.getElementById('pawformSearchQuery');
    searchResultsContainer = document.getElementById('pawformSearchResults');
  }

  function bindEvents() {
    // Open triggers
    document.querySelectorAll('.nav-search-trigger, [data-action="open-search"]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    // Keyboard shortcut (Cmd/Ctrl + K)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (searchModal && searchModal.classList.contains('active')) {
          closeModal();
        } else {
          openModal();
        }
      }
      if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
        closeModal();
      }
    });

    // Close button and backdrop click
    document.getElementById('pawformCloseSearch')?.addEventListener('click', closeModal);
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeModal();
    });

    // Search query live input
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value.trim());
    });

    // Category filter tabs
    document.querySelectorAll('.search-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.search-cat-btn').forEach(b => b.classList.remove('active', 'btn-forest'));
        btn.classList.add('active');
        activeCategoryFilter = btn.getAttribute('data-cat');
        performSearch(searchInput.value.trim());
      });
    });
  }

  function openModal(defaultQuery = '') {
    if (!searchModal) init();
    searchModal.classList.add('active');
    document.body.classList.add('scroll-locked');
    if (defaultQuery) {
      searchInput.value = defaultQuery;
      performSearch(defaultQuery);
    }
    setTimeout(() => searchInput.focus(), 50);
  }

  function closeModal() {
    if (searchModal) {
      searchModal.classList.remove('active');
      document.body.classList.remove('scroll-locked');
    }
  }

  function highlightText(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="bg-warning-subtle text-dark p-0 rounded-1">$1</mark>');
  }

  function performSearch(query) {
    if (!query) {
      searchResultsContainer.innerHTML = `
        <div class="text-muted small py-4 text-center">
          <p class="mb-2"><i class="bi bi-compass fs-2 text-muted"></i></p>
          <p class="mb-1 fw-semibold">Try searching for: <span class="text-forest">"Protein"</span>, <span class="text-forest">"Salmon"</span>, <span class="text-forest">"Hydration"</span>, <span class="text-forest">"Dr. Maya"</span>, or <span class="text-forest">"New York"</span></p>
        </div>
      `;
      return;
    }

    const q = query.toLowerCase();
    const data = window.PAWFORM_DATA;
    if (!data) return;

    let html = '';

    // Search Videos
    if (activeCategoryFilter === 'all' || activeCategoryFilter === 'videos') {
      const matchVideos = data.videos.filter(v => 
        v.title.toLowerCase().includes(q) || 
        v.category.toLowerCase().includes(q) || 
        v.description.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q))
      );

      if (matchVideos.length > 0) {
        html += `<div class="search-result-group mb-3">
          <div class="text-uppercase small fw-bold text-muted mb-2"><i class="bi bi-play-circle me-1"></i> Videos (${matchVideos.length})</div>
          <div class="list-group list-group-flush">`;
        matchVideos.forEach(v => {
          const creator = data.creators.find(c => c.id === v.creatorId);
          html += `
            <a href="video-details.html?id=${v.id}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2 px-2 rounded-2">
              <img src="${v.thumbnail}" class="rounded-2" style="width: 58px; height: 38px; object-fit: cover;" alt="${v.title}">
              <div class="flex-grow-1">
                <div class="fw-semibold text-dark small line-clamp-1">${highlightText(v.title, query)}</div>
                <div class="text-muted" style="font-size: 0.75rem;">${creator?.name || 'PAWFORM'} • ${v.duration} • <span class="badge bg-light text-secondary border">${v.category}</span></div>
              </div>
              <i class="bi bi-chevron-right text-muted small"></i>
            </a>
          `;
        });
        html += `</div></div>`;
      }
    }

    // Search Guides
    if (activeCategoryFilter === 'all' || activeCategoryFilter === 'guides') {
      const matchGuides = data.guides.filter(g => 
        g.title.toLowerCase().includes(q) || 
        g.category.toLowerCase().includes(q) || 
        g.summary.toLowerCase().includes(q)
      );

      if (matchGuides.length > 0) {
        html += `<div class="search-result-group mb-3">
          <div class="text-uppercase small fw-bold text-muted mb-2"><i class="bi bi-journal-text me-1"></i> Guides & Articles (${matchGuides.length})</div>
          <div class="list-group list-group-flush">`;
        matchGuides.forEach(g => {
          html += `
            <a href="guide-details.html?id=${g.id}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2 px-2 rounded-2">
              <img src="${g.heroImage}" class="rounded-2" style="width: 58px; height: 38px; object-fit: cover;" alt="${g.title}">
              <div class="flex-grow-1">
                <div class="fw-semibold text-dark small line-clamp-1">${highlightText(g.title, query)}</div>
                <div class="text-muted" style="font-size: 0.75rem;">${g.readingTime} • <span class="badge bg-light text-secondary border">${g.category}</span></div>
              </div>
              <i class="bi bi-chevron-right text-muted small"></i>
            </a>
          `;
        });
        html += `</div></div>`;
      }
    }

    // Search Creators
    if (activeCategoryFilter === 'all' || activeCategoryFilter === 'creators') {
      const matchCreators = data.creators.filter(c => 
        c.name.toLowerCase().includes(q) || 
        c.specialty.toLowerCase().includes(q) || 
        c.bio.toLowerCase().includes(q)
      );

      if (matchCreators.length > 0) {
        html += `<div class="search-result-group mb-3">
          <div class="text-uppercase small fw-bold text-muted mb-2"><i class="bi bi-person-badge me-1"></i> Creators & Experts (${matchCreators.length})</div>
          <div class="list-group list-group-flush">`;
        matchCreators.forEach(c => {
          html += `
            <a href="creator-profile.html?id=${c.id}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2 px-2 rounded-2">
              <img src="${c.avatar}" class="rounded-circle" style="width: 40px; height: 40px; object-fit: cover;" alt="${c.name}">
              <div class="flex-grow-1">
                <div class="fw-semibold text-dark small">${highlightText(c.name, query)} <i class="bi bi-patch-check-fill text-success" style="font-size: 0.75rem;"></i></div>
                <div class="text-muted" style="font-size: 0.75rem;">${highlightText(c.specialty, query)} • ${(c.followers / 1000).toFixed(1)}K followers</div>
              </div>
              <i class="bi bi-chevron-right text-muted small"></i>
            </a>
          `;
        });
        html += `</div></div>`;
      }
    }

    // Search Locations
    if (activeCategoryFilter === 'all' || activeCategoryFilter === 'locations') {
      const matchLocations = data.locations.filter(l => 
        l.name.toLowerCase().includes(q) || 
        l.city.toLowerCase().includes(q) || 
        l.category.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
      );

      if (matchLocations.length > 0) {
        html += `<div class="search-result-group mb-3">
          <div class="text-uppercase small fw-bold text-muted mb-2"><i class="bi bi-geo-alt me-1"></i> Nutrition Locations (${matchLocations.length})</div>
          <div class="list-group list-group-flush">`;
        matchLocations.forEach(l => {
          html += `
            <a href="location-details.html?id=${l.id}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2 px-2 rounded-2">
              <img src="${l.image}" class="rounded-2" style="width: 58px; height: 38px; object-fit: cover;" alt="${l.name}">
              <div class="flex-grow-1">
                <div class="fw-semibold text-dark small">${highlightText(l.name, query)}</div>
                <div class="text-muted" style="font-size: 0.75rem;">${l.city}, ${l.state} • <span class="text-warning">★ ${l.rating}</span> • ${l.category}</div>
              </div>
              <i class="bi bi-chevron-right text-muted small"></i>
            </a>
          `;
        });
        html += `</div></div>`;
      }
    }

    // Search Ingredients
    if (activeCategoryFilter === 'all' || activeCategoryFilter === 'ingredients') {
      const matchIngredients = data.ingredients.filter(i => 
        i.name.toLowerCase().includes(q) || 
        i.category.toLowerCase().includes(q) || 
        i.summary.toLowerCase().includes(q) ||
        i.tags.some(t => t.toLowerCase().includes(q))
      );

      if (matchIngredients.length > 0) {
        html += `<div class="search-result-group mb-3">
          <div class="text-uppercase small fw-bold text-muted mb-2"><i class="bi bi-basket3 me-1"></i> Ingredients & Nutrition Glossary (${matchIngredients.length})</div>
          <div class="list-group list-group-flush">`;
        matchIngredients.forEach(i => {
          html += `
            <a href="discover.html?search=${encodeURIComponent(i.name)}" class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2 px-2 rounded-2">
              <div class="rounded-circle bg-light text-forest d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; flex-shrink: 0;">
                <i class="bi bi-flower1"></i>
              </div>
              <div class="flex-grow-1">
                <div class="fw-semibold text-dark small">${highlightText(i.name, query)} <span class="badge bg-secondary-subtle text-dark ms-1" style="font-size: 0.7rem;">${i.rating}</span></div>
                <div class="text-muted" style="font-size: 0.75rem;">${i.category} • ${i.type}</div>
              </div>
              <i class="bi bi-arrow-right-circle text-muted small"></i>
            </a>
          `;
        });
        html += `</div></div>`;
      }
    }

    if (!html) {
      html = `
        <div class="text-center py-5">
          <i class="bi bi-search-heart fs-1 text-muted"></i>
          <h5 class="mt-3">No matching nutrition content found</h5>
          <p class="text-muted small">We couldn't find results matching "<strong>${query}</strong>". Try searching for general terms like <em>salmon</em>, <em>labels</em>, or <em>kibble</em>.</p>
          <a href="discover.html" class="btn btn-sm btn-paw-outline mt-2">Explore All Discoveries</a>
        </div>
      `;
    }

    searchResultsContainer.innerHTML = html;
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    open: openModal,
    close: closeModal,
    search: performSearch
  };
})();

window.PAWFORM_SEARCH = PAWFORM_SEARCH;
