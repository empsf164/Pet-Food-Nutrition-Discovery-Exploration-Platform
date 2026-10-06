/**
 * PAWFORM - Guides Catalog Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('guidesGridContainer');
  if (!container) return;

  const data = window.PAWFORM_DATA;
  if (!data) return;

  let activeCategory = 'all';
  const searchInput = document.getElementById('guideSearchInput');

  function renderGuides() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = data.guides.filter(g => {
      const matchCat = activeCategory === 'all' || g.category.toLowerCase() === activeCategory.toLowerCase();
      const matchQuery = !query || g.title.toLowerCase().includes(query) || g.summary.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    let html = '';
    filtered.forEach(g => {
      const author = data.creators.find(c => c.id === g.authorId);
      html += `
        <div class="col-md-6 col-lg-4">
          <div class="paw-card guide-card">
            <div class="guide-thumb-wrap">
              <img src="${g.heroImage}" alt="${g.title}" loading="lazy">
              <span class="video-category-tag">${g.category}</span>
              <span class="guide-read-badge"><i class="bi bi-clock me-1"></i>${g.readingTime}</span>
              <button class="btn-save-bookmark" data-type="guides" data-id="${g.id}" data-title="${g.title}">
                <i class="bi bi-bookmark"></i>
              </button>
            </div>
            <div class="card-body">
              <a href="guide-details.html?id=${g.id}" class="card-title">${g.title}</a>
              <div class="creator-snippet">
                <img src="${author?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80'}" alt="${author?.name}">
                <span class="creator-name">By ${author?.name || 'PAWFORM Editor'}</span>
                <a href="guide-details.html?id=${g.id}" class="text-forest fw-semibold small ms-auto">Read Guide →</a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html || `
      <div class="col-12 text-center py-5 text-secondary">
        <p>No guides match this filter.</p>
      </div>
    `;

    if (window.PAWFORM_BOOKMARKS) {
      window.PAWFORM_BOOKMARKS.updateUI();
    }
  }

  // Category filter tabs
  document.querySelectorAll('.guide-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.guide-cat-btn').forEach(b => b.classList.remove('active', 'btn-forest'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderGuides();
    });
  });

  searchInput?.addEventListener('input', renderGuides);

  renderGuides();
});
