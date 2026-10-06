/**
 * PAWFORM - Personalization & Recommendation Engine
 */

const PAWFORM_PERSONALIZATION = (function() {
  const DEFAULT_PREFS = {
    species: ['Dogs'],
    topics: ['Nutrition', 'Protein', 'Food Labels']
  };

  function getPreferences() {
    const user = PAWFORM_AUTH ? PAWFORM_AUTH.getUser() : null;
    if (user && user.petInterests && user.contentInterests) {
      return {
        species: user.petInterests,
        topics: user.contentInterests
      };
    }
    try {
      const saved = localStorage.getItem('pawform_guest_prefs');
      return saved ? JSON.parse(saved) : DEFAULT_PREFS;
    } catch (e) {
      return DEFAULT_PREFS;
    }
  }

  function setPreferences(speciesArray, topicsArray) {
    const prefs = { species: speciesArray, topics: topicsArray };
    localStorage.setItem('pawform_guest_prefs', JSON.stringify(prefs));
    return prefs;
  }

  function scoreItem(item, prefs) {
    let score = 0;
    const itemSpecies = Array.isArray(item.species) ? item.species : [item.species];
    
    // Check species match
    if (itemSpecies && prefs.species) {
      itemSpecies.forEach(sp => {
        if (prefs.species.includes(sp)) score += 3;
      });
    }

    // Check topic match
    if (item.topic && prefs.topics && prefs.topics.includes(item.topic)) {
      score += 4;
    }
    if (item.category && prefs.topics && prefs.topics.includes(item.category)) {
      score += 3;
    }

    // Popularity / Editor pick bonus
    if (item.isEditorPick) score += 2;
    if (item.isTrending) score += 1;

    return score;
  }

  function rankList(items) {
    const prefs = getPreferences();
    return [...items].sort((a, b) => {
      const scoreA = scoreItem(a, prefs);
      const scoreB = scoreItem(b, prefs);
      return scoreB - scoreA;
    });
  }

  return {
    getPreferences,
    setPreferences,
    scoreItem,
    rankList
  };
})();

window.PAWFORM_PERSONALIZATION = PAWFORM_PERSONALIZATION;
