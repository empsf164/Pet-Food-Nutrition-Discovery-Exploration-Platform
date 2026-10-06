/**
 * PAWFORM - Creators Directory Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('creatorsGridContainer');
  if (!container) return;

  const data = window.PAWFORM_DATA;
  if (!data) return;

  let activeCategory = 'all';
  const searchInput = document.getElementById('creatorSearchInput');

  function renderCreators() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = data.creators.filter(c => {
      const matchCat = activeCategory === 'all' || c.category === activeCategory;
      const matchQuery = !query || c.name.toLowerCase().includes(query) || c.specialty.toLowerCase().includes(query) || c.bio.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    let html = '';
    filtered.forEach(c => {
      html += `
        <div class="col-md-6 col-lg-4 col-xl-3">
          <div class="creator-card">
            <div class="creator-avatar-wrap">
              <img src="${c.avatar}" alt="${c.name}" loading="lazy">
              ${c.verification ? '<span class="creator-badge-verified"><i class="bi bi-check-lg"></i></span>' : ''}
            </div>
            <a href="creator-profile.html?id=${c.id}" class="text-decoration-none">
              <h5 class="font-serif mb-1 text-dark">${c.name}</h5>
            </a>
            <span class="creator-specialty">${c.specialty}</span>
            <p class="creator-bio-snippet">${c.bio}</p>
            
            <div class="creator-stats-bar">
              <div>
                <div class="stat-num">${(c.followers / 1000).toFixed(1)}K</div>
                <div class="stat-label">Followers</div>
              </div>
              <div>
                <div class="stat-num">${c.contentCount}</div>
                <div class="stat-label">Resources</div>
              </div>
            </div>

            <div class="d-flex gap-2 w-100 mt-auto">
              <button class="btn-follow flex-grow-1" data-creator-id="${c.id}" data-creator-name="${c.name}">
                <i class="bi bi-person-plus"></i> Follow
              </button>
              <a href="creator-profile.html?id=${c.id}" class="btn btn-sm btn-paw-outline px-3" title="View Profile">
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html || `
      <div class="col-12 text-center py-5">
        <p class="text-secondary">No creators match your filter.</p>
      </div>
    `;

    if (window.PAWFORM_FOLLOWS) {
      window.PAWFORM_FOLLOWS.updateFollowButtons();
    }
  }

  // Category buttons
  document.querySelectorAll('.creator-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.creator-cat-btn').forEach(b => b.classList.remove('active', 'btn-forest'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderCreators();
    });
  });

  searchInput?.addEventListener('input', renderCreators);

  renderCreators();
});
