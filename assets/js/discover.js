/**
 * PAWFORM - Discover Page Logic
 * Multi-faceted filtering (Species, Topic, Content Type, Sorting)
 */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('discoverContentGrid');
  if (!container) return;

  const data = window.PAWFORM_DATA;
  if (!data) return;

  // Filter Elements
  const speciesFilters = document.querySelectorAll('input[name="speciesFilter"]');
  const topicFilters = document.querySelectorAll('input[name="topicFilter"]');
  const typeFilters = document.querySelectorAll('input[name="typeFilter"]');
  const sortSelect = document.getElementById('discoverSortSelect');
  const searchInput = document.getElementById('discoverSearchInput');
  const clearBtn = document.getElementById('clearFiltersBtn');
  const resultsCount = document.getElementById('discoverResultsCount');

  // Read URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const initialTopic = urlParams.get('topic');
  const initialSpecies = urlParams.get('species');
  const initialSearch = urlParams.get('search');

  if (initialTopic) {
    topicFilters.forEach(cb => {
      if (cb.value.toLowerCase() === initialTopic.toLowerCase()) cb.checked = true;
    });
  }
  if (initialSpecies) {
    speciesFilters.forEach(cb => {
      if (cb.value.toLowerCase() === initialSpecies.toLowerCase()) cb.checked = true;
    });
  }
  if (initialSearch && searchInput) {
    searchInput.value = initialSearch;
  }

  function getSelectedValues(nodeList) {
    return Array.from(nodeList).filter(n => n.checked).map(n => n.value);
  }

  function buildUnifiedContentList() {
    const list = [];

    // Add Videos
    data.videos.forEach(v => {
      const creator = data.creators.find(c => c.id === v.creatorId);
      list.push({
        id: v.id,
        type: 'video',
        title: v.title,
        species: v.species,
        topic: v.topic || v.category,
        category: v.category,
        image: v.thumbnail,
        duration: v.duration,
        views: v.views,
        viewsNum: parseInt(v.views) * 1000 || 50000,
        creator: creator,
        authorName: creator?.name || 'PAWFORM Creator',
        authorAvatar: creator?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
        link: `video-details.html?id=${v.id}`,
        isFeatured: v.isFeatured,
        isTrending: v.isTrending,
        isEditorPick: v.isEditorPick,
        date: new Date(v.publishedDate).getTime() || Date.now()
      });
    });

    // Add Guides
    data.guides.forEach(g => {
      const author = data.creators.find(c => c.id === g.authorId);
      list.push({
        id: g.id,
        type: 'guide',
        title: g.title,
        species: Array.isArray(g.species) ? g.species : [g.species],
        topic: g.category,
        category: g.category,
        image: g.heroImage,
        readingTime: g.readingTime,
        summary: g.summary,
        creator: author,
        authorName: author?.name || 'PAWFORM Editor',
        authorAvatar: author?.avatar || 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        link: `guide-details.html?id=${g.id}`,
        isFeatured: g.isFeatured,
        isTrending: false,
        isEditorPick: g.isEditorPick,
        date: new Date(g.publishedDate).getTime() || Date.now()
      });
    });

    return list;
  }

  function renderGrid() {
    const allItems = buildUnifiedContentList();
    const selectedSpecies = getSelectedValues(speciesFilters);
    const selectedTopics = getSelectedValues(topicFilters);
    const selectedTypes = getSelectedValues(typeFilters);
    const sortVal = sortSelect ? sortSelect.value : 'trending';
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    let filtered = allItems.filter(item => {
      // Type filter
      if (selectedTypes.length > 0 && !selectedTypes.includes(item.type)) {
        return false;
      }

      // Species filter
      if (selectedSpecies.length > 0) {
        const itemSpecies = Array.isArray(item.species) ? item.species : [item.species];
        const match = itemSpecies.some(s => selectedSpecies.includes(s));
        if (!match) return false;
      }

      // Topic filter
      if (selectedTopics.length > 0) {
        if (!selectedTopics.includes(item.topic) && !selectedTopics.includes(item.category)) {
          return false;
        }
      }

      // Search query
      if (query) {
        const titleMatch = item.title.toLowerCase().includes(query);
        const topicMatch = (item.topic || '').toLowerCase().includes(query);
        const authorMatch = (item.authorName || '').toLowerCase().includes(query);
        if (!titleMatch && !topicMatch && !authorMatch) return false;
      }

      return true;
    });

    // Apply Sorting
    if (sortVal === 'trending') {
      filtered.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    } else if (sortVal === 'newest') {
      filtered.sort((a, b) => b.date - a.date);
    } else if (sortVal === 'most-viewed') {
      filtered.sort((a, b) => (b.viewsNum || 0) - (a.viewsNum || 0));
    } else if (sortVal === 'editor') {
      filtered.sort((a, b) => (b.isEditorPick ? 1 : 0) - (a.isEditorPick ? 1 : 0));
    }

    if (resultsCount) {
      resultsCount.textContent = `${filtered.length} Discoveries Found`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-5 bg-surface border rounded-3 text-center">
            <i class="bi bi-funnel fs-1 text-muted"></i>
            <h4 class="mt-3">No matching nutrition content</h4>
            <p class="text-secondary small">Try relaxing some filters or search for another keyword.</p>
            <button class="btn btn-paw-outline btn-sm mt-2" id="resetFiltersEmptyBtn">Clear All Filters</button>
          </div>
        </div>
      `;
      document.getElementById('resetFiltersEmptyBtn')?.addEventListener('click', resetFilters);
      return;
    }

    let html = '';
    filtered.forEach(item => {
      if (item.type === 'video') {
        html += `
          <div class="col-md-6 col-lg-4">
            <div class="paw-card video-card">
              <div class="card-thumb-wrap">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="video-category-tag">${item.category}</span>
                <span class="video-duration-badge">${item.duration}</span>
                <button class="btn-save-bookmark" data-type="videos" data-id="${item.id}" data-title="${item.title}">
                  <i class="bi bi-bookmark"></i>
                </button>
                <a href="${item.link}" class="card-play-overlay">
                  <div class="play-icon-circle"><i class="bi bi-play-fill"></i></div>
                </a>
              </div>
              <div class="card-body">
                <a href="${item.link}" class="card-title">${item.title}</a>
                <div class="creator-snippet">
                  <img src="${item.authorAvatar}" alt="${item.authorName}">
                  <span class="creator-name">${item.authorName}</span>
                  <span class="video-views">${item.views} views</span>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (item.type === 'guide') {
        html += `
          <div class="col-md-6 col-lg-4">
            <div class="paw-card guide-card">
              <div class="guide-thumb-wrap">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <span class="video-category-tag">${item.category}</span>
                <span class="guide-read-badge"><i class="bi bi-clock me-1"></i>${item.readingTime}</span>
                <button class="btn-save-bookmark" data-type="guides" data-id="${item.id}" data-title="${item.title}">
                  <i class="bi bi-bookmark"></i>
                </button>
              </div>
              <div class="card-body">
                <a href="${item.link}" class="card-title">${item.title}</a>
                <div class="creator-snippet">
                  <img src="${item.authorAvatar}" alt="${item.authorName}">
                  <span class="creator-name">${item.authorName}</span>
                  <a href="${item.link}" class="text-forest fw-semibold small ms-auto">Read Guide →</a>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    });

    container.innerHTML = html;
    if (window.PAWFORM_BOOKMARKS) {
      window.PAWFORM_BOOKMARKS.updateUI();
    }
  }

  function resetFilters() {
    speciesFilters.forEach(cb => cb.checked = false);
    topicFilters.forEach(cb => cb.checked = false);
    typeFilters.forEach(cb => cb.checked = false);
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'trending';
    renderGrid();
  }

  // Event Listeners
  speciesFilters.forEach(cb => cb.addEventListener('change', renderGrid));
  topicFilters.forEach(cb => cb.addEventListener('change', renderGrid));
  typeFilters.forEach(cb => cb.addEventListener('change', renderGrid));
  sortSelect?.addEventListener('change', renderGrid);
  searchInput?.addEventListener('input', renderGrid);
  clearBtn?.addEventListener('click', resetFilters);

  // Initial render
  renderGrid();
});
