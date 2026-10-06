/**
 * PAWFORM - Videos Feed & Discovery Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const videoGrid = document.getElementById('videosGridContainer');
  if (!videoGrid) return;

  const data = window.PAWFORM_DATA;
  if (!data) return;

  let activeCategory = 'all';

  function renderVideos() {
    const filtered = activeCategory === 'all' 
      ? data.videos 
      : data.videos.filter(v => v.category.toLowerCase() === activeCategory.toLowerCase() || v.topic.toLowerCase() === activeCategory.toLowerCase());

    let html = '';
    filtered.forEach(v => {
      const creator = data.creators.find(c => c.id === v.creatorId);
      html += `
        <div class="col-md-6 col-lg-4">
          <div class="paw-card video-card">
            <div class="card-thumb-wrap">
              <img src="${v.thumbnail}" alt="${v.title}" loading="lazy">
              <span class="video-category-tag">${v.category}</span>
              <span class="video-duration-badge">${v.duration}</span>
              <button class="btn-save-bookmark" data-type="videos" data-id="${v.id}" data-title="${v.title}">
                <i class="bi bi-bookmark"></i>
              </button>
              <a href="video-details.html?id=${v.id}" class="card-play-overlay">
                <div class="play-icon-circle"><i class="bi bi-play-fill"></i></div>
              </a>
            </div>
            <div class="card-body">
              <a href="video-details.html?id=${v.id}" class="card-title">${v.title}</a>
              <div class="creator-snippet">
                <img src="${creator?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'}" alt="${creator?.name}">
                <span class="creator-name">${creator?.name || 'PAWFORM Creator'}</span>
                <span class="video-views">${v.views} views</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    videoGrid.innerHTML = html;
    if (window.PAWFORM_BOOKMARKS) {
      window.PAWFORM_BOOKMARKS.updateUI();
    }
  }

  // Category filter tabs
  document.querySelectorAll('.video-cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.video-cat-filter-btn').forEach(b => b.classList.remove('active', 'btn-forest'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderVideos();
    });
  });

  renderVideos();
});
