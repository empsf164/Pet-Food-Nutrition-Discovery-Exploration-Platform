/**
 * PAWFORM - Video Details & Custom Interactive Player Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get('id') || 'vid-1';

  const data = window.PAWFORM_DATA;
  if (!data) return;

  const video = data.videos.find(v => v.id === videoId) || data.videos[0];
  const creator = data.creators.find(c => c.id === video.creatorId);

  // Set Page Title
  document.title = `${video.title} | PAWFORM Video Platform`;

  // Populate Video Metadata
  const titleEl = document.getElementById('videoDetailTitle');
  if (titleEl) titleEl.textContent = video.title;

  const descEl = document.getElementById('videoDetailDesc');
  if (descEl) descEl.textContent = video.description;

  const viewsEl = document.getElementById('videoDetailViews');
  if (viewsEl) viewsEl.textContent = `${video.views} views • Published ${video.publishedDate}`;

  const categoryEl = document.getElementById('videoDetailCategory');
  if (categoryEl) categoryEl.textContent = video.category;

  // Populate Creator Metadata
  if (creator) {
    const avatarEl = document.getElementById('videoCreatorAvatar');
    if (avatarEl) {
      avatarEl.src = creator.avatar;
      avatarEl.alt = creator.name;
    }

    const nameEl = document.getElementById('videoCreatorName');
    if (nameEl) nameEl.textContent = creator.name;

    const specialtyEl = document.getElementById('videoCreatorSpecialty');
    if (specialtyEl) specialtyEl.textContent = `${creator.specialty} • ${(creator.followers / 1000).toFixed(1)}K followers`;

    const creatorLinkEl = document.getElementById('videoCreatorProfileLink');
    if (creatorLinkEl) creatorLinkEl.href = `creator-profile.html?id=${creator.id}`;

    const followBtn = document.getElementById('videoCreatorFollowBtn');
    if (followBtn) {
      followBtn.setAttribute('data-creator-id', creator.id);
      followBtn.setAttribute('data-creator-name', creator.name);
    }
  }

  // Populate Video Tags
  const tagsContainer = document.getElementById('videoDetailTags');
  if (tagsContainer && video.tags) {
    tagsContainer.innerHTML = video.tags.map(t => `<a href="discover.html?search=${encodeURIComponent(t)}" class="badge bg-surface text-dark border me-1 mb-1 font-sans fw-normal">#${t}</a>`).join('');
  }

  // Configure Bookmark Button
  const bookmarkBtn = document.getElementById('videoDetailBookmarkBtn');
  if (bookmarkBtn) {
    bookmarkBtn.setAttribute('data-type', 'videos');
    bookmarkBtn.setAttribute('data-id', video.id);
    bookmarkBtn.setAttribute('data-title', video.title);
  }

  // Populate Chapters
  const chaptersContainer = document.getElementById('videoChaptersList');
  if (chaptersContainer && video.chapters) {
    chaptersContainer.innerHTML = video.chapters.map((ch, idx) => `
      <div class="chapter-item ${idx === 0 ? 'active' : ''} p-2 border rounded-2 mb-2 bg-surface cursor-pointer d-flex justify-content-between align-items-center" data-sec="${ch.sec}">
        <span class="fw-semibold small">${ch.title}</span>
        <span class="chapter-timestamp font-monospace small text-forest bg-light px-2 py-1 rounded">${ch.time}</span>
      </div>
    `).join('');
  }

  // Populate Transcript
  const transcriptContainer = document.getElementById('videoTranscriptList');
  if (transcriptContainer && video.transcript) {
    transcriptContainer.innerHTML = video.transcript.map(tr => `
      <div class="p-2 border-bottom rounded bg-surface mb-1" data-time="${tr.time}">
        <div class="d-flex justify-content-between text-muted" style="font-size: 0.75rem;">
          <span class="fw-bold text-forest">${tr.speaker}</span>
          <span class="font-monospace">${tr.time}</span>
        </div>
        <p class="mb-0 text-dark small mt-1">${tr.text}</p>
      </div>
    `).join('');
  }

  // Custom Video Player Interactivity
  const videoElem = document.getElementById('mainHtml5Video');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const progressFilled = document.getElementById('videoProgressFilled');
  const progressTrack = document.getElementById('videoProgressBar');
  const timeDisplay = document.getElementById('videoTimeDisplay');
  const speedBtn = document.getElementById('videoSpeedBtn');
  const muteBtn = document.getElementById('videoMuteBtn');
  const fullscreenBtn = document.getElementById('videoFullscreenBtn');

  if (videoElem && playPauseBtn) {
    videoElem.poster = video.bannerImage || video.thumbnail;

    function togglePlay() {
      if (videoElem.paused) {
        videoElem.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      } else {
        videoElem.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';
      }
    }

    playPauseBtn.addEventListener('click', togglePlay);
    videoElem.addEventListener('click', togglePlay);

    videoElem.addEventListener('timeupdate', () => {
      const current = videoElem.currentTime;
      const total = videoElem.duration || video.durationSec || 100;
      const pct = (current / total) * 100;
      if (progressFilled) progressFilled.style.width = `${pct}%`;

      const curMins = Math.floor(current / 60);
      const curSecs = Math.floor(current % 60).toString().padStart(2, '0');
      const totMins = Math.floor(total / 60);
      const totSecs = Math.floor(total % 60).toString().padStart(2, '0');

      if (timeDisplay) {
        timeDisplay.textContent = `${curMins}:${curSecs} / ${totMins}:${totSecs}`;
      }
    });

    progressTrack?.addEventListener('click', (e) => {
      const rect = progressTrack.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const pct = clickX / rect.width;
      const total = videoElem.duration || video.durationSec || 100;
      videoElem.currentTime = pct * total;
    });

    const speeds = [1, 1.25, 1.5, 2];
    let speedIdx = 0;
    speedBtn?.addEventListener('click', () => {
      speedIdx = (speedIdx + 1) % speeds.length;
      videoElem.playbackRate = speeds[speedIdx];
      speedBtn.textContent = `${speeds[speedIdx]}x`;
    });

    muteBtn?.addEventListener('click', () => {
      videoElem.muted = !videoElem.muted;
      muteBtn.innerHTML = videoElem.muted 
        ? '<i class="bi bi-volume-mute-fill"></i>' 
        : '<i class="bi bi-volume-up-fill"></i>';
    });

    fullscreenBtn?.addEventListener('click', () => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoElem.parentElement.requestFullscreen();
      }
    });

    document.querySelectorAll('.chapter-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.chapter-item').forEach(c => c.classList.remove('border-forest'));
        item.classList.add('border-forest');
        const sec = parseInt(item.getAttribute('data-sec'), 10) || 0;
        videoElem.currentTime = sec;
        if (videoElem.paused) videoElem.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
      });
    });
  }

  // Populate Related Videos
  const relatedVideosContainer = document.getElementById('relatedVideosContainer');
  if (relatedVideosContainer) {
    const related = data.videos.filter(v => v.id !== video.id).slice(0, 3);
    relatedVideosContainer.innerHTML = related.map(rv => {
      const cr = data.creators.find(c => c.id === rv.creatorId);
      return `
        <div class="col-md-4">
          <div class="paw-card video-card">
            <div class="card-thumb-wrap">
              <img src="${rv.thumbnail}" alt="${rv.title}" loading="lazy">
              <span class="video-duration-badge">${rv.duration}</span>
              <button class="btn-save-bookmark" data-type="videos" data-id="${rv.id}" data-title="${rv.title}">
                <i class="bi bi-bookmark"></i>
              </button>
              <a href="video-details.html?id=${rv.id}" class="card-play-overlay">
                <div class="play-icon-circle"><i class="bi bi-play-fill"></i></div>
              </a>
            </div>
            <div class="card-body">
              <a href="video-details.html?id=${rv.id}" class="card-title">${rv.title}</a>
              <div class="creator-snippet">
                <img src="${cr?.avatar || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'}" alt="${cr?.name}">
                <span class="creator-name">${cr?.name || 'Creator'}</span>
                <span class="video-views">${rv.views} views</span>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  if (window.PAWFORM_BOOKMARKS) {
    window.PAWFORM_BOOKMARKS.updateUI();
  }
});
