/**
 * PAWFORM - Saved Collections Manager Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('savedItemsGrid');
  if (!container) return;

  const data = window.PAWFORM_DATA;
  if (!data) return;

  let activeTab = 'all';

  function renderSaved() {
    const store = window.PAWFORM_BOOKMARKS ? window.PAWFORM_BOOKMARKS.get() : { videos: [], guides: [], creators: [], locations: [] };

    // Update Counts in tabs
    const videoCount = store.videos?.length || 0;
    const guideCount = store.guides?.length || 0;
    const creatorCount = store.creators?.length || 0;
    const locCount = store.locations?.length || 0;
    const totalCount = videoCount + guideCount + creatorCount + locCount;

    document.getElementById('savedCountAll') && (document.getElementById('savedCountAll').textContent = totalCount);
    document.getElementById('savedCountVideos') && (document.getElementById('savedCountVideos').textContent = videoCount);
    document.getElementById('savedCountGuides') && (document.getElementById('savedCountGuides').textContent = guideCount);
    document.getElementById('savedCountCreators') && (document.getElementById('savedCountCreators').textContent = creatorCount);
    document.getElementById('savedCountLocations') && (document.getElementById('savedCountLocations').textContent = locCount);

    let html = '';

    // Render Videos
    if (activeTab === 'all' || activeTab === 'videos') {
      (store.videos || []).forEach(id => {
        const v = data.videos.find(item => item.id === id);
        if (v) {
          const cr = data.creators.find(c => c.id === v.creatorId);
          html += `
            <div class="col-md-6 col-lg-4" id="saved-card-${v.id}">
              <div class="paw-card video-card">
                <div class="card-thumb-wrap">
                  <img src="${v.thumbnail}" alt="${v.title}">
                  <span class="video-duration-badge">${v.duration}</span>
                  <button class="btn-save-bookmark saved" data-type="videos" data-id="${v.id}" data-title="${v.title}">
                    <i class="bi bi-bookmark-fill"></i>
                  </button>
                  <a href="video-details.html?id=${v.id}" class="card-play-overlay">
                    <div class="play-icon-circle"><i class="bi bi-play-fill"></i></div>
                  </a>
                </div>
                <div class="card-body">
                  <span class="badge bg-light text-forest border align-self-start mb-2">${v.category}</span>
                  <a href="video-details.html?id=${v.id}" class="card-title">${v.title}</a>
                  <div class="creator-snippet">
                    <span class="creator-name">${cr?.name || 'Creator'}</span>
                    <button class="btn btn-sm text-danger p-0 border-0 ms-auto remove-saved-btn" data-type="videos" data-id="${v.id}" data-title="${v.title}">
                      <i class="bi bi-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      });
    }

    // Render Guides
    if (activeTab === 'all' || activeTab === 'guides') {
      (store.guides || []).forEach(id => {
        const g = data.guides.find(item => item.id === id);
        if (g) {
          html += `
            <div class="col-md-6 col-lg-4" id="saved-card-${g.id}">
              <div class="paw-card guide-card">
                <div class="guide-thumb-wrap">
                  <img src="${g.heroImage}" alt="${g.title}">
                  <span class="guide-read-badge">${g.readingTime}</span>
                  <button class="btn-save-bookmark saved" data-type="guides" data-id="${g.id}" data-title="${g.title}">
                    <i class="bi bi-bookmark-fill"></i>
                  </button>
                </div>
                <div class="card-body">
                  <span class="badge bg-light text-forest border align-self-start mb-2">${g.category}</span>
                  <a href="guide-details.html?id=${g.id}" class="card-title">${g.title}</a>
                  <div class="creator-snippet mt-auto">
                    <a href="guide-details.html?id=${g.id}" class="text-forest fw-semibold small">Read Guide →</a>
                    <button class="btn btn-sm text-danger p-0 border-0 ms-auto remove-saved-btn" data-type="guides" data-id="${g.id}" data-title="${g.title}">
                      <i class="bi bi-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      });
    }

    // Render Creators
    if (activeTab === 'all' || activeTab === 'creators') {
      (store.creators || []).forEach(id => {
        const c = data.creators.find(item => item.id === id);
        if (c) {
          html += `
            <div class="col-md-6 col-lg-4" id="saved-card-${c.id}">
              <div class="creator-card">
                <div class="creator-avatar-wrap">
                  <img src="${c.avatar}" alt="${c.name}">
                </div>
                <h5 class="font-serif mb-1">${c.name}</h5>
                <span class="creator-specialty">${c.specialty}</span>
                <div class="d-flex gap-2 w-100 mt-3">
                  <a href="creator-profile.html?id=${c.id}" class="btn btn-sm btn-paw-outline flex-grow-1">View Profile</a>
                  <button class="btn btn-sm btn-outline-danger px-2 remove-saved-btn" data-type="creators" data-id="${c.id}" data-title="${c.name}">
                    <i class="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          `;
        }
      });
    }

    // Render Locations
    if (activeTab === 'all' || activeTab === 'locations') {
      (store.locations || []).forEach(id => {
        const l = data.locations.find(item => item.id === id);
        if (l) {
          html += `
            <div class="col-md-6 col-lg-4" id="saved-card-${l.id}">
              <div class="paw-card location-card">
                <div class="loc-thumb">
                  <img src="${l.image}" alt="${l.name}">
                  <div class="loc-rating-tag"><i class="bi bi-star-fill"></i> ${l.rating}</div>
                  <button class="btn-save-bookmark saved" data-type="locations" data-id="${l.id}" data-title="${l.name}">
                    <i class="bi bi-bookmark-fill"></i>
                  </button>
                </div>
                <div class="card-body p-3">
                  <span class="badge bg-light text-forest border align-self-start mb-2">${l.category}</span>
                  <a href="location-details.html?id=${l.id}" class="card-title fw-bold fs-6 mb-2">${l.name}</a>
                  <div class="text-muted small mb-2"><i class="bi bi-geo-alt"></i> ${l.address}</div>
                  <div class="d-flex justify-content-between align-items-center mt-auto pt-2 border-top">
                    <a href="location-details.html?id=${l.id}" class="btn btn-sm btn-paw-outline">View Details</a>
                    <button class="btn btn-sm text-danger p-0 border-0 remove-saved-btn" data-type="locations" data-id="${l.id}" data-title="${l.name}">
                      <i class="bi bi-trash"></i> Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }
      });
    }

    if (!html) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-5 bg-surface border rounded-3 text-center">
            <i class="bi bi-bookmark-heart fs-1 text-muted"></i>
            <h4 class="mt-3">No saved items in this category</h4>
            <p class="text-muted">Explore pet food nutrition videos, expert guides, creators, or locations and click the bookmark icon to save them here.</p>
            <div class="d-flex justify-content-center gap-3 mt-3">
              <a href="discover.html" class="btn btn-paw-primary">Discover Content</a>
              <a href="videos.html" class="btn btn-paw-secondary">Watch Videos</a>
            </div>
          </div>
        </div>
      `;
      return;
    }

    container.innerHTML = html;

    // Attach quick remove buttons
    document.querySelectorAll('.remove-saved-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = btn.getAttribute('data-type');
        const id = btn.getAttribute('data-id');
        const title = btn.getAttribute('data-title') || 'Item';
        if (window.PAWFORM_BOOKMARKS && type && id) {
          window.PAWFORM_BOOKMARKS.toggleSave(type, id, title);
          renderSaved();
        }
      });
    });
  }

  // Tab buttons
  document.querySelectorAll('.saved-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.saved-tab-btn').forEach(b => b.classList.remove('active', 'btn-forest'));
      btn.classList.add('active');
      activeTab = btn.getAttribute('data-tab');
      renderSaved();
    });
  });

  // Listen for bookmark changes from other components
  window.addEventListener('pawform:bookmarks-changed', renderSaved);

  renderSaved();
});
