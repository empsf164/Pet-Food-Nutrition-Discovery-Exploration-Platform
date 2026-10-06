/**
 * PAWFORM - Interactive Map Engine & Synchronized Location Directory
 */

document.addEventListener('DOMContentLoaded', () => {
  const mapContainer = document.getElementById('pawformLeafletMap');
  const listContainer = document.getElementById('mapLocationsList');
  if (!mapContainer || !listContainer) return;

  const data = window.PAWFORM_DATA;
  if (!data) return;

  let map = null;
  let markers = {};
  let activeFilter = 'all';

  // Category Colors
  const catColors = {
    'nutrition-specialists': '#1A3628',
    'fresh-food-providers': '#C85D3D',
    'pet-food-stores': '#758A7A',
    'educational-locations': '#D6973D',
    'pet-markets': '#2E7D32'
  };

  const catIcons = {
    'nutrition-specialists': 'bi-heart-pulse',
    'fresh-food-providers': 'bi-fire',
    'pet-food-stores': 'bi-shop',
    'educational-locations': 'bi-mortarboard',
    'pet-markets': 'bi-basket3'
  };

  // Initialize Leaflet Map
  function initMap() {
    if (typeof L === 'undefined') {
      console.warn('Leaflet library not loaded.');
      return;
    }

    // Default center around US average
    map = L.map('pawformLeafletMap', {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView([39.8283, -98.5795], 4);

    // High quality CartoDB Voyager / Positron tiles for editorial look
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const tileUrl = isDark 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    renderLocations();
  }

  function createCustomIcon(loc, isActive = false) {
    const color = catColors[loc.categoryKey] || '#1A3628';
    const iconClass = catIcons[loc.categoryKey] || 'bi-geo-alt';

    return L.divIcon({
      className: 'custom-leaflet-marker-wrapper',
      html: `
        <div class="custom-paw-marker ${isActive ? 'active' : ''}" style="background-color: ${color};" id="marker-${loc.id}">
          <i class="bi ${iconClass}"></i>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 19],
      popupAnchor: [0, -20]
    });
  }

  function renderLocations() {
    const searchInput = document.getElementById('mapSearchInput');
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const filtered = data.locations.filter(loc => {
      const matchCat = activeFilter === 'all' || loc.categoryKey === activeFilter;
      const matchQuery = !query || 
        loc.name.toLowerCase().includes(query) || 
        loc.city.toLowerCase().includes(query) || 
        loc.category.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    // Clear existing markers
    Object.values(markers).forEach(m => map.removeLayer(m));
    markers = {};

    let listHtml = '';
    const bounds = L.latLngBounds([]);

    filtered.forEach(loc => {
      // 1. Add Marker to Map
      const marker = L.marker([loc.lat, loc.lng], {
        icon: createCustomIcon(loc, false)
      }).addTo(map);

      const popupContent = `
        <div class="p-1" style="max-width: 240px;">
          <img src="${loc.image}" alt="${loc.name}" class="rounded w-100 mb-2" style="height: 100px; object-fit: cover;">
          <div class="fw-bold font-serif fs-6 mb-1">${loc.name}</div>
          <div class="badge bg-light text-dark border mb-1" style="font-size: 0.7rem;">${loc.category}</div>
          <div class="text-muted small mb-2"><i class="bi bi-geo-alt text-danger"></i> ${loc.city}, ${loc.state}</div>
          <div class="d-flex justify-content-between align-items-center">
            <span class="text-warning small fw-bold">★ ${loc.rating} (${loc.reviewCount})</span>
            <a href="location-details.html?id=${loc.id}" class="btn btn-sm btn-paw-outline py-1 px-2" style="font-size: 0.75rem;">Details</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        highlightLocationCard(loc.id);
      });

      markers[loc.id] = marker;
      bounds.extend([loc.lat, loc.lng]);

      // 2. Build Sidebar Card HTML
      listHtml += `
        <div class="location-card mb-3 p-3" id="loc-card-${loc.id}" data-id="${loc.id}">
          <div class="d-flex gap-3">
            <img src="${loc.image}" class="rounded-3" style="width: 90px; height: 90px; object-fit: cover; flex-shrink: 0;" alt="${loc.name}">
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between align-items-start">
                <span class="badge bg-light text-forest border mb-1" style="font-size: 0.72rem;">${loc.category}</span>
                <button class="btn-save-bookmark" data-type="locations" data-id="${loc.id}" data-title="${loc.name}" style="width: 28px; height: 28px; font-size: 0.85rem;">
                  <i class="bi bi-bookmark"></i>
                </button>
              </div>
              <h6 class="mb-1 fw-bold text-dark font-serif fs-6">${loc.name}</h6>
              <div class="text-muted small mb-1" style="font-size: 0.78rem;">
                <i class="bi bi-geo-alt"></i> ${loc.address}
              </div>
              <div class="d-flex align-items-center justify-content-between mt-2 pt-2 border-top">
                <span class="text-warning small fw-bold">★ ${loc.rating}</span>
                <span class="loc-status-indicator ${loc.isOpen ? 'open' : 'closed'}">
                  <span class="status-dot ${loc.isOpen ? 'open' : 'closed'}"></span> ${loc.isOpen ? 'Open Now' : 'Closed'}
                </span>
                <a href="location-details.html?id=${loc.id}" class="btn btn-sm btn-paw-outline py-0 px-2" style="font-size: 0.75rem;">View</a>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = listHtml || `
      <div class="text-center py-5 text-muted">
        <i class="bi bi-geo fs-1"></i>
        <p class="mt-2">No locations found matching this filter.</p>
      </div>
    `;

    // Fit map bounds if markers exist
    if (filtered.length > 0 && map) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 12 });
    }

    // Attach card click handlers
    document.querySelectorAll('.location-card[id^="loc-card-"]').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-save-bookmark') || e.target.closest('a')) return;
        const id = card.getAttribute('data-id');
        focusMarker(id);
      });
    });

    // Update location count label
    const countEl = document.getElementById('mapLocationsCount');
    if (countEl) countEl.textContent = `${filtered.length} Locations`;

    if (window.PAWFORM_BOOKMARKS) {
      window.PAWFORM_BOOKMARKS.updateUI();
    }
  }

  function focusMarker(locId) {
    const loc = data.locations.find(l => l.id === locId);
    const marker = markers[locId];
    if (loc && marker && map) {
      map.flyTo([loc.lat, loc.lng], 14, { duration: 1.2 });
      marker.openPopup();
      highlightLocationCard(locId);
    }
  }

  function highlightLocationCard(locId) {
    document.querySelectorAll('.location-card').forEach(c => c.classList.remove('active-selected'));
    const targetCard = document.getElementById(`loc-card-${locId}`);
    if (targetCard) {
      targetCard.classList.add('active-selected');
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  // Category Filter Buttons
  document.querySelectorAll('.map-cat-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.map-cat-filter-btn').forEach(b => b.classList.remove('active', 'btn-forest'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-cat');
      renderLocations();
    });
  });

  // Search input
  const searchInput = document.getElementById('mapSearchInput');
  searchInput?.addEventListener('input', renderLocations);

  initMap();
});
