/**
 * PAWFORM - Creator Profile Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const creatorId = urlParams.get('id') || 'dr-maya-lin';

  const data = window.PAWFORM_DATA;
  if (!data) return;

  const creator = data.creators.find(c => c.id === creatorId) || data.creators[0];

  // Set Page Title
  document.title = `${creator.name} | PAWFORM Nutrition Creator`;

  // Cover & Avatar
  const coverEl = document.getElementById('creatorCoverImg');
  if (coverEl) coverEl.src = creator.coverImage;

  const avatarEl = document.getElementById('creatorAvatarImg');
  if (avatarEl) {
    avatarEl.src = creator.avatar;
    avatarEl.alt = creator.name;
  }

  // Name & Verification
  const nameEl = document.getElementById('creatorProfileName');
  if (nameEl) nameEl.textContent = creator.name;

  const handleEl = document.getElementById('creatorProfileHandle');
  if (handleEl) handleEl.textContent = creator.handle;

  const specialtyEl = document.getElementById('creatorProfileSpecialty');
  if (specialtyEl) specialtyEl.textContent = creator.specialty;

  const bioEl = document.getElementById('creatorProfileBio');
  if (bioEl) bioEl.textContent = creator.bio;

  const locationEl = document.getElementById('creatorProfileLocation');
  if (locationEl) locationEl.textContent = creator.location || 'United States';

  // Stats
  const followersEl = document.getElementById('creatorFollowersCount');
  if (followersEl) followersEl.textContent = (creator.followers / 1000).toFixed(1) + 'K';

  const contentCountEl = document.getElementById('creatorContentCount');
  if (contentCountEl) contentCountEl.textContent = creator.contentCount;

  // Follow Button
  const followBtn = document.getElementById('creatorProfileFollowBtn');
  if (followBtn) {
    followBtn.setAttribute('data-creator-id', creator.id);
    followBtn.setAttribute('data-creator-name', creator.name);
  }

  // Badges
  const badgesContainer = document.getElementById('creatorBadgesList');
  if (badgesContainer && creator.badges) {
    badgesContainer.innerHTML = creator.badges.map(b => `<span class="badge bg-secondary-subtle text-forest border me-2 mb-2 p-2">${b}</span>`).join('');
  }

  // Populate Creator Videos Tab
  const videosContainer = document.getElementById('creatorVideosContainer');
  if (videosContainer) {
    const creatorVideos = data.videos.filter(v => v.creatorId === creator.id);
    if (creatorVideos.length > 0) {
      videosContainer.innerHTML = creatorVideos.map(v => `
        <div class="col-md-6 col-lg-4">
          <div class="paw-card video-card">
            <div class="card-thumb-wrap">
              <img src="${v.thumbnail}" alt="${v.title}">
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
                <span class="video-views">${v.views} views</span>
              </div>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      videosContainer.innerHTML = `<div class="col-12 text-center py-4 text-muted">No videos published yet by this creator.</div>`;
    }
  }

  // Populate Creator Guides Tab
  const guidesContainer = document.getElementById('creatorGuidesContainer');
  if (guidesContainer) {
    const creatorGuides = data.guides.filter(g => g.authorId === creator.id);
    if (creatorGuides.length > 0) {
      guidesContainer.innerHTML = creatorGuides.map(g => `
        <div class="col-md-6 col-lg-4">
          <div class="paw-card guide-card">
            <div class="guide-thumb-wrap">
              <img src="${g.heroImage}" alt="${g.title}">
              <span class="guide-read-badge">${g.readingTime}</span>
              <button class="btn-save-bookmark" data-type="guides" data-id="${g.id}" data-title="${g.title}">
                <i class="bi bi-bookmark"></i>
              </button>
            </div>
            <div class="card-body">
              <span class="sub-heading-pill mb-2">${g.category}</span>
              <a href="guide-details.html?id=${g.id}" class="card-title">${g.title}</a>
              <p class="text-secondary small line-clamp-2 mt-2">${g.summary}</p>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      guidesContainer.innerHTML = `<div class="col-12 text-center py-4 text-muted">No guides published yet by this creator.</div>`;
    }
  }

  if (window.PAWFORM_BOOKMARKS) {
    window.PAWFORM_BOOKMARKS.updateUI();
  }
  if (window.PAWFORM_FOLLOWS) {
    window.PAWFORM_FOLLOWS.updateFollowButtons();
  }
});
