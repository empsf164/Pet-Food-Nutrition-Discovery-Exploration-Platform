/**
 * PAWFORM - Location Details Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const locId = urlParams.get('id') || 'loc-1';

  const data = window.PAWFORM_DATA;
  if (!data) return;

  const loc = data.locations.find(l => l.id === locId) || data.locations[0];

  // Set Page Title
  document.title = `${loc.name} | PAWFORM Nutrition Map`;

  // Hero & Header info
  const nameEl = document.getElementById('locationDetailName');
  if (nameEl) nameEl.textContent = loc.name;

  const imgEl = document.getElementById('locationDetailImg');
  if (imgEl) imgEl.src = loc.image;

  const catEl = document.getElementById('locationDetailCategory');
  if (catEl) catEl.textContent = loc.category;

  const addressEl = document.getElementById('locationDetailAddress');
  if (addressEl) addressEl.textContent = loc.address;

  const descEl = document.getElementById('locationDetailDesc');
  if (descEl) descEl.textContent = loc.description;

  const hoursEl = document.getElementById('locationDetailHours');
  if (hoursEl) hoursEl.textContent = loc.hours;

  const phoneEl = document.getElementById('locationDetailPhone');
  if (phoneEl) {
    phoneEl.textContent = loc.phone;
    phoneEl.href = `tel:${loc.phone}`;
  }

  const webEl = document.getElementById('locationDetailWebsite');
  if (webEl) {
    webEl.textContent = loc.website.replace('https://', '');
    webEl.href = loc.website;
  }

  const ratingEl = document.getElementById('locationDetailRating');
  if (ratingEl) ratingEl.textContent = `★ ${loc.rating} (${loc.reviewCount} reviews)`;

  // Save Bookmark Button
  const saveBtn = document.getElementById('locationSaveBtn');
  if (saveBtn) {
    saveBtn.setAttribute('data-type', 'locations');
    saveBtn.setAttribute('data-id', loc.id);
    saveBtn.setAttribute('data-title', loc.name);
  }

  // Services tags
  const servicesEl = document.getElementById('locationServicesList');
  if (servicesEl && loc.services) {
    servicesEl.innerHTML = loc.services.map(s => `
      <li class="d-flex align-items-center gap-2 mb-2">
        <i class="bi bi-check-circle-fill text-success"></i>
        <span>${s}</span>
      </li>
    `).join('');
  }

  // Mini Map
  const miniMapEl = document.getElementById('locationMiniMap');
  if (miniMapEl && typeof L !== 'undefined') {
    const miniMap = L.map('locationMiniMap', {
      zoomControl: false,
      scrollWheelZoom: false,
      dragging: false
    }).setView([loc.lat, loc.lng], 14);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const tileUrl = isDark 
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl).addTo(miniMap);
    L.marker([loc.lat, loc.lng]).addTo(miniMap);
  }

  // Directions button
  const dirBtn = document.getElementById('getDirectionsBtn');
  if (dirBtn) {
    dirBtn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`;
  }

  if (window.PAWFORM_BOOKMARKS) {
    window.PAWFORM_BOOKMARKS.updateUI();
  }
});
