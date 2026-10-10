// src/utils/popupValidationService.js

export const POPUP_TYPES = {
  COURSE: 'course',
  BOOK_EDUCATOR: 'bookEducator',
  SYLLABUS: 'syllabus',
  SAMPLE_PAPER: 'samplePaper',
};

const POPUP_CONFIG = {
  [POPUP_TYPES.COURSE]: { delayMs: 5 * 60 * 1000 },
  [POPUP_TYPES.BOOK_EDUCATOR]: { delayMs: 5 * 60 * 1000 },
  [POPUP_TYPES.SYLLABUS]: { delayMs: 5 * 60 * 1000 },
  [POPUP_TYPES.SAMPLE_PAPER]: { delayMs: 50 * 60 * 1000 },
};

/**
 * Validates if a popup should be shown based on user status and time rules.
 * 
 * @param {string} type - The type of popup (from POPUP_TYPES)
 * @param {Object} user - The logged-in user object (if available)
 * @param {boolean} hasActionCompleted - If the user has already purchased the course (for COURSE) or booked the educator (for BOOK_EDUCATOR).
 * @returns {boolean} - True if popup should be shown, false otherwise
 */
export const canShowPopup = (type, user = null, hasActionCompleted = false) => {
  try {
    if (typeof window === 'undefined') return false; // Don't show popups during SSR

    // 1. If purchased (COURSE) or booked (BOOK_EDUCATOR), NEVER show popup
    if ((type === POPUP_TYPES.COURSE || type === POPUP_TYPES.BOOK_EDUCATOR) && hasActionCompleted) {
      return false;
    }

    const config = POPUP_CONFIG[type];
    if (!config) return false; // Invalid type

    const identifier = user?.email || user?._id || 'guest';
    
    // 2. Detect Logout -> Login cycle to reset cooldowns
    const currentSessionUser = sessionStorage.getItem('current_popup_user');
    
    if (currentSessionUser !== identifier) {
      // If the user has changed in this session (e.g., Guest -> Logged In, or Logged In -> Guest)
      // Reset all popup cooldowns for this specific new identifier so they see popups again
      sessionStorage.setItem('current_popup_user', identifier);
      
      // Only clear if transitioning to a logged-in user, or clear always? 
      // Requirement: "If the user logs out and then logs in again, reset the popup cooldown"
      Object.values(POPUP_TYPES).forEach(popupType => {
        localStorage.removeItem(`popup_last_shown_${popupType}_${identifier}`);
      });
    }

    // 3. Check time interval rule
    const storageKey = `popup_last_shown_${type}_${identifier}`;
    const lastShown = localStorage.getItem(storageKey);
    const now = Date.now();

    if (lastShown) {
      const timeSinceLastShown = now - parseInt(lastShown, 10);
      if (timeSinceLastShown < config.delayMs) {
        return false; // Time limit has not yet passed
      }
    }

    return true;
  } catch (error) {
    console.error("Error in popupValidationService.canShowPopup:", error);
    return true; 
  }
};

/**
 * Marks a popup as shown at the current time for the user.
 * 
 * @param {string} type - The type of popup (from POPUP_TYPES)
 * @param {Object} user - The logged-in user object (if available)
 */
export const markPopupShown = (type, user = null) => {
  try {
    if (typeof window === 'undefined') return;
    
    const identifier = user?.email || user?._id || 'guest';
    const storageKey = `popup_last_shown_${type}_${identifier}`;
    
    localStorage.setItem(storageKey, Date.now().toString());
  } catch (error) {
    console.error("Error saving popup time in popupValidationService.markPopupShown:", error);
  }
};

/**
 * Manually reset all popup cooldowns for a specific user.
 * Useful if explicitly called during a logout or login function.
 * 
 * @param {Object} user - The logged-in user object
 */
export const resetPopupCooldowns = (user = null) => {
  try {
    if (typeof window === 'undefined') return;
    const identifier = user?.email || user?._id || 'guest';
    Object.values(POPUP_TYPES).forEach(type => {
      localStorage.removeItem(`popup_last_shown_${type}_${identifier}`);
    });
  } catch (error) {
    console.error("Error resetting popups:", error);
  }
};
