/**
 * PAWFORM - Guide Details & Editorial Reader Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const guideId = urlParams.get('id') || 'guide-1';

  const data = window.PAWFORM_DATA;
  if (!data) return;

  const guide = data.guides.find(g => g.id === guideId) || data.guides[0];
  const author = data.creators.find(c => c.id === guide.authorId);

  // Set Page Title
  document.title = `${guide.title} | PAWFORM Editorial Guides`;

  // Populate Header
  const titleEl = document.getElementById('guideDetailTitle');
  if (titleEl) titleEl.textContent = guide.title;

  const catEl = document.getElementById('guideDetailCategory');
  if (catEl) catEl.textContent = guide.category;

  const readTimeEl = document.getElementById('guideDetailReadTime');
  if (readTimeEl) readTimeEl.textContent = guide.readingTime;

  const dateEl = document.getElementById('guideDetailDate');
  if (dateEl) dateEl.textContent = `Updated ${guide.publishedDate}`;

  const heroImgEl = document.getElementById('guideDetailHeroImg');
  if (heroImgEl) {
    heroImgEl.src = guide.heroImage;
    heroImgEl.alt = guide.title;
  }

  // Author Info
  if (author) {
    const authorImgEl = document.getElementById('guideAuthorAvatar');
    if (authorImgEl) {
      authorImgEl.src = author.avatar;
      authorImgEl.alt = author.name;
    }

    const authorNameEl = document.getElementById('guideAuthorName');
    if (authorNameEl) authorNameEl.textContent = author.name;

    const authorSpecialtyEl = document.getElementById('guideAuthorSpecialty');
    if (authorSpecialtyEl) authorSpecialtyEl.textContent = author.specialty;

    const authorProfileLink = document.getElementById('guideAuthorProfileLink');
    if (authorProfileLink) authorProfileLink.href = `creator-profile.html?id=${author.id}`;

    const authorBioEl = document.getElementById('guideAuthorBio');
    if (authorBioEl) authorBioEl.textContent = author.bio;
  }

  // Key Takeaways Box
  const takeawaysContainer = document.getElementById('guideTakeawaysList');
  if (takeawaysContainer && guide.keyTakeaways) {
    takeawaysContainer.innerHTML = guide.keyTakeaways.map(t => `
      <li class="d-flex align-items-start gap-2 mb-2">
        <i class="bi bi-check-circle-fill text-success mt-1"></i>
        <span>${t}</span>
      </li>
    `).join('');
  }

  // Table of Contents & Dynamic Sections
  const tocContainer = document.getElementById('guideTableOfContents');
  const sectionsContainer = document.getElementById('guideSectionsContainer');

  if (guide.sections) {
    if (tocContainer) {
      tocContainer.innerHTML = guide.sections.map((sec, idx) => `
        <a href="#section-${idx}" class="toc-link d-block py-1 text-secondary text-decoration-none small hover-text-forest">
          ${sec.heading}
        </a>
      `).join('');
    }

    if (sectionsContainer) {
      sectionsContainer.innerHTML = guide.sections.map((sec, idx) => `
        <div id="section-${idx}" class="guide-section-block mb-5">
          <h3 class="font-serif fs-4 mb-3 text-dark">${sec.heading}</h3>
          <div class="section-body text-secondary">${sec.content}</div>
        </div>
      `).join('');
    }
  }

  // Comparison Table
  const tableContainer = document.getElementById('guideComparisonTableWrap');
  if (tableContainer && guide.comparisonTable) {
    const table = guide.comparisonTable;
    tableContainer.innerHTML = `
      <div class="my-4">
        <h5 class="font-serif mb-2">${table.title}</h5>
        <div class="table-responsive">
          <table class="paw-table">
            <thead>
              <tr>${table.headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>
              ${table.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // Save Bookmark Button
  const saveBtn = document.getElementById('guideSaveBookmarkBtn');
  if (saveBtn) {
    saveBtn.setAttribute('data-type', 'guides');
    saveBtn.setAttribute('data-id', guide.id);
    saveBtn.setAttribute('data-title', guide.title);
  }

  // Reading Progress Bar
  const progressBar = document.getElementById('guideReadingProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0 && progressBar) {
      const progress = (window.scrollY / totalHeight) * 100;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  });

  // Related Video
  const relatedVideoContainer = document.getElementById('guideRelatedVideoWrap');
  if (relatedVideoContainer && guide.relatedVideoId) {
    const relVid = data.videos.find(v => v.id === guide.relatedVideoId);
    if (relVid) {
      relatedVideoContainer.innerHTML = `
        <div class="p-3 bg-secondary rounded-3 border">
          <div class="text-uppercase small fw-bold text-muted mb-2"><i class="bi bi-camera-video me-1"></i> Companion Video</div>
          <div class="d-flex gap-3 align-items-center">
            <img src="${relVid.thumbnail}" class="rounded-2" style="width: 100px; height: 65px; object-fit: cover;" alt="${relVid.title}">
            <div>
              <a href="video-details.html?id=${relVid.id}" class="fw-bold text-dark font-serif small d-block mb-1">${relVid.title}</a>
              <span class="text-muted small">${relVid.duration} • <a href="video-details.html?id=${relVid.id}" class="text-forest fw-semibold">Watch Now →</a></span>
            </div>
          </div>
        </div>
      `;
    }
  }

  if (window.PAWFORM_BOOKMARKS) {
    window.PAWFORM_BOOKMARKS.updateUI();
  }
});
