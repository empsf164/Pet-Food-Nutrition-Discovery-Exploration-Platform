# PAWFORM — Pet Food Nutrition Discovery & Exploration Platform

> **“Discover Better Nutrition for Every Paw.”**

PAWFORM is a **professional, editorial-grade pet food nutrition discovery and exploration platform**. It combines the depth of a premium pet nutrition publication, the engagement of a cinematic video platform, the clarity of an evidence-based feeding guide library, and the utility of an interactive local exploration map.

---

## 🌟 The Core Journey

$$\text{DISCOVER} \longrightarrow \text{WATCH} \longrightarrow \text{EXPLORE} \longrightarrow \text{LEARN} \longrightarrow \text{MAP} \longrightarrow \text{SAVE} \longrightarrow \text{RETURN}$$

---

## 🧭 Key Features & Capabilities

1. **Editorial Discovery Hub (`discover.html`)**
   - Multi-faceted JavaScript filtering engine across species (*Dogs, Cats, Puppies, Kittens, Senior Pets*), content formats (*Videos, Guides, Locations*), and nutrition topics (*Protein, Food Labels, Hydration, Fresh Feeding, Supplements*).
   - Real-time sorting by *Trending, Recently Added, Most Viewed, and Editor's Picks*.
   - Global search omnibar query parameter synchronization (`?search=salmon`, `?topic=Protein`).

2. **Cinematic Video Platform (`videos.html` & `video-details.html`)**
   - Responsive video player with custom controls (play/pause overlay, timeline scrubbing, speed modulation, volume, fullscreen).
   - Interactive timestamped chapter markers that jump directly to video sections.
   - Synchronized expandable transcript with speaker labels and timestamps.
   - Related veterinary masterclass recommendations.

3. **Creator & Expert Network (`creators.html` & `creator-profile.html`)**
   - Curated directory of board-certified veterinary nutritionists, fresh pet chefs, and label watchdogs.
   - Filter by specialty (*Veterinarians & PhDs, Fresh Pet Chefs, Label Analysts, Raw Coaches, Holistic Wellness*).
   - Individual creator profiles featuring bio, verification badges, follower metrics, and tabs for video masterclasses & written guides.
   - Functional follow/unfollow toggle with immediate persistence in `localStorage`.

4. **Interactive Nutrition Map (`map.html` & `location-details.html`)**
   - Interactive Leaflet map with custom-styled category markers (*Nutrition Hubs, Fresh Kitchens, Organic Provisions, Educational Studios, Farmers Markets*).
   - Real-time map/list synchronization:
     - Selecting a location card pans the map to the pin and opens the interactive popup.
     - Clicking a marker on the map highlights and scrolls to the card in the list.
   - Detailed location pages with operating hours, services checklist, directions integration, and mini maps.

5. **Evidence-Based Guides Library (`guides.html` & `guide-details.html`)**
   - Long-form editorial reading experience with dynamic reading progress bar track.
   - Sticky Table of Contents navigation with smooth section scrolling.
   - Mathematical dry matter comparison tables (Guaranteed Analysis vs DMB).
   - Key takeaway summary boxes and academic references.

6. **Personalized Saved Collections (`saved.html`)**
   - Category tabs for saved *Videos, Guides, Creators, and Locations*.
   - Live bookmark count badge in sticky navbar.
   - Quick removal with animated toast feedback.

7. **Omni-Search Modal (`search.js`)**
   - Accessible via `Ctrl + K` / `Cmd + K` or search buttons throughout the site.
   - Live categorized search across videos, guides, creators, locations, and ingredient glossary items.
   - Keyword match highlighting.

8. **Theme System (Dark / Light Mode) (`theme.css` & `theme.js`)**
   - Curated light palette: *Warm Cream (`#FDFBF7`), Deep Forest Green (`#1A3628`), Soft Sage (`#758A7A`), Warm Terracotta (`#C85D3D`), Muted Gold (`#D6973D`)*.
   - Curated dark palette: *Deep Charcoal Night (`#121815`), Muted Sage, Ivory, Soft Terracotta*.
   - System preference detection and `localStorage` persistence.

9. **Health & Nutrition Positioning**
   - Responsible educational language avoiding diagnostic overclaiming.
   - Prominent disclaimer: *"PAWFORM provides educational information and is not a substitute for veterinary advice."*

---

## 📁 Project File Structure

```text
pawform/
├── index.html                  # Editorial Homepage
├── discover.html               # Multi-Filter Discovery Hub
├── videos.html                 # Cinematic Video Feed
├── video-details.html          # Interactive Video Player, Chapters, Transcript
├── creators.html               # Curated Creators Directory
├── creator-profile.html        # Creator Profile & Media Tabs
├── map.html                    # Interactive Map & Synchronized Locations
├── location-details.html       # Location Detail, Hours, Mini Map
├── guides.html                 # Educational Guides Library
├── guide-details.html          # Long-form Reader with Comparison Tables & TOC
├── saved.html                  # Personal Saved Collections Archive
├── about.html                  # Mission, Creator Standards & Disclaimer
├── contact.html                # Inquiries, Location Submissions & FAQs
├── login.html                  # Sign In & Google UI Demo
├── signup.html                 # Onboarding with Pet Species & Interests
├── forgot-password.html        # Reset Password Flow & Success State
├── 404.html                    # Brand Error Page
├── coming-soon.html            # Community Features Preview
│
├── assets/
│   ├── css/
│   │   ├── theme.css           # Design Tokens, Light & Dark Theme Variables
│   │   ├── style.css           # Master Stylesheet, Cards, Components, Player, Reader
│   │   └── responsive.css      # Offcanvas Mobile Menu, Breakpoints, Touch Scaling
│   │
│   ├── js/
│   │   ├── data.js             # Unified Mock Database (Videos, Creators, Guides, Locations, Ingredients)
│   │   ├── theme.js            # Light/Dark Theme Switcher & Persistence
│   │   ├── bookmarks.js        # Central Bookmarks Engine & UI Broadcaster
│   │   ├── auth.js             # Authentication State & Nav Pill Renderer
│   │   ├── personalization.js  # Recommendation & Species Scoring
│   │   ├── search.js           # Global Omnibar Search (Ctrl+K)
│   │   ├── main.js             # Toast Notifications, Mobile Drawer, Follows, GSAP
│   │   ├── discover.js         # Multi-filter Grid Engine
│   │   ├── videos.js           # Video Feed Filtering
│   │   ├── video-details.js    # HTML5 Video Controls, Chapters, Transcript
│   │   ├── creators.js         # Creators Directory Logic
│   │   ├── creator-profile.js  # Profile Loader & Media Tabs
│   │   ├── map.js              # Leaflet Map Synchronization
│   │   ├── location-details.js # Location Details Loader & Mini Map
│   │   ├── guides.js           # Guides Catalog Filter
│   │   ├── guide-details.js    # Guide Reader, TOC, Progress Bar
│   │   └── saved.js            # Saved Items Collections Manager
│
└── README.md
```

---

## 🛠️ Technology Stack

- **HTML5 & CSS3** (Semantic layout, modern CSS variables, responsive typography)
- **Bootstrap 5.3.3** (Grid system, utilities, interactive modals)
- **Bootstrap Icons 1.11.3** (Visual clarity and iconography)
- **Leaflet 1.9.4** (Interactive map engine with CartoDB Voyager and Positron tiles)
- **GSAP 3.12.5** (Smooth scroll and entrance micro-animations)
- **Vanilla JavaScript (ES6+)** (Modular architecture, state persistence via `localStorage`)
- **Google Fonts** (`DM Serif Display` + `Inter`)

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser or run a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Navigate to `http://localhost:8000` to explore the platform.
