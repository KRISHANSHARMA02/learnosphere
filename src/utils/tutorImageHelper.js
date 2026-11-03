/**
 * Tutor Image Helper Utility
 * Handles tutor profile image formatting, server/client verification, and default avatar fallbacks.
 */

export const DEFAULT_AVATAR = "/default-avatar.png";
export const DEFAULT_MALE_AVATAR = DEFAULT_AVATAR;
export const DEFAULT_FEMALE_AVATAR = DEFAULT_AVATAR;

const urlValidityCache = new Map();

/**
 * Returns the single default avatar image path for all users.
 * @returns {string}
 */
export const getDefaultAvatar = () => {
  return DEFAULT_AVATAR;
};

/**
 * Checks if an image URL is missing, placeholder, or invalid.
 * @param {string|null|undefined} url
 * @returns {boolean}
 */
export const isPlaceholderOrInvalidUrl = (url) => {
  if (!url || typeof url !== "string") return true;
  const trimmed = url.trim();
  if (!trimmed) return true;

  const lower = trimmed.toLowerCase();
  if (
    lower === "null" ||
    lower === "undefined" ||
    lower === "none" ||
    lower === "false" ||
    lower === "[object object]"
  ) {
    return true;
  }

  // Detect generic placeholder images
  if (
    lower.includes("defaultavtar") ||
    lower.includes("defaultavatar") ||
    lower.includes("default-avatar") ||
    lower.includes("default-male") ||
    lower.includes("default-female") ||
    lower.includes("female-avatar") ||
    lower.includes("female avatar") ||
    lower.includes("tutor_profile.png") ||
    lower.includes("placeholder")
  ) {
    return true;
  }

  return false;
};

/**
 * Normalizes and safely encodes image URLs (handles unencoded spaces, etc.)
 * @param {string} url
 * @returns {string}
 */
export const normalizeImageUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  try {
    return encodeURI(decodeURI(trimmed));
  } catch {
    return encodeURI(trimmed);
  }
};

/**
 * Extracts raw image URL from a teacher entity or URL parameter.
 * @param {object|string|null|undefined} teacherOrUrl
 * @returns {string}
 */
export const extractRawImageUrl = (teacherOrUrl) => {
  if (!teacherOrUrl) return "";
  if (typeof teacherOrUrl === "string") return teacherOrUrl;
  if (typeof teacherOrUrl === "object") {
    return (
      teacherOrUrl.image ||
      teacherOrUrl.profileImage ||
      teacherOrUrl.imageUrl ||
      teacherOrUrl.profilePicture ||
      teacherOrUrl.photo ||
      ""
    );
  }
  return "";
};

/**
 * Extracts gender string from a teacher entity or explicit parameter.
 * @param {object|string|null|undefined} teacherOrGender
 * @param {string|null|undefined} [explicitGender]
 * @returns {string|null}
 */
export const extractGender = (teacherOrGender, explicitGender) => {
  if (explicitGender && typeof explicitGender === "string") {
    return explicitGender;
  }
  if (!teacherOrGender) return null;
  if (typeof teacherOrGender === "string") {
    const lower = teacherOrGender.trim().toLowerCase();
    if (["male", "female", "m", "f", "woman", "man"].includes(lower)) {
      return teacherOrGender;
    }
    return null;
  }
  if (typeof teacherOrGender === "object") {
    return (
      teacherOrGender.gender ||
      teacherOrGender.Gender ||
      teacherOrGender.sex ||
      null
    );
  }
  return null;
};

/**
 * Verifies if an image URL actually loads / is reachable.
 * Works in both Node.js (server) and browser (client).
 * @param {string} url
 * @returns {Promise<boolean>}
 */
export async function verifyImageUrl(url) {
  if (!url || typeof url !== "string") return false;
  const trimmed = url.trim();
  if (isPlaceholderOrInvalidUrl(trimmed)) return false;

  if (urlValidityCache.has(trimmed)) {
    return urlValidityCache.get(trimmed);
  }

  // If it's a relative path to public folder, it's local & valid
  if (trimmed.startsWith("/") || trimmed.startsWith("data:")) {
    urlValidityCache.set(trimmed, true);
    return true;
  }

  if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
    urlValidityCache.set(trimmed, false);
    return false;
  }

  // If in browser environment
  if (typeof window !== "undefined" && typeof window.Image === "function") {
    return new Promise((resolve) => {
      const img = new window.Image();
      let settled = false;
      const timeout = setTimeout(() => {
        if (!settled) {
          settled = true;
          urlValidityCache.set(trimmed, false);
          resolve(false);
        }
      }, 1500);

      img.onload = () => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          urlValidityCache.set(trimmed, true);
          resolve(true);
        }
      };
      img.onerror = () => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          urlValidityCache.set(trimmed, false);
          resolve(false);
        }
      };
      img.src = normalizeImageUrl(trimmed);
    });
  }

  // If in Node.js server environment
  try {
    const encoded = normalizeImageUrl(trimmed);
    const res = await fetch(encoded, {
      method: "HEAD",
      signal: AbortSignal.timeout(3500),
    });
    const isValid = res.ok;
    urlValidityCache.set(trimmed, isValid);
    return isValid;
  } catch {
    urlValidityCache.set(trimmed, false);
    return false;
  }
}

/**
 * Verifies and ensures a teacher object has a working image URL or default avatar.
 * @param {object} teacher
 * @returns {Promise<object>}
 */
export async function verifyTeacherImage(teacher) {
  if (!teacher) return teacher;
  const rawUrl = extractRawImageUrl(teacher);

  if (!rawUrl || isPlaceholderOrInvalidUrl(rawUrl)) {
    return {
      ...teacher,
      image: DEFAULT_AVATAR,
      profileImage: DEFAULT_AVATAR,
      imageUrl: DEFAULT_AVATAR,
    };
  }

  const isValid = await verifyImageUrl(rawUrl);
  if (!isValid) {
    return {
      ...teacher,
      image: DEFAULT_AVATAR,
      profileImage: DEFAULT_AVATAR,
      imageUrl: DEFAULT_AVATAR,
    };
  }

  const normalized = normalizeImageUrl(rawUrl);
  return {
    ...teacher,
    image: normalized,
    profileImage: normalized,
    imageUrl: normalized,
  };
}

/**
 * Batch verifies an array of teachers in parallel.
 * @param {Array} teachers
 * @returns {Promise<Array>}
 */
export async function verifyTeachersImages(teachers) {
  if (!Array.isArray(teachers) || teachers.length === 0) return teachers;
  return Promise.all(teachers.map(verifyTeacherImage));
}

/**
 * Synchronous resolver for tutor image source.
 * @param {object|string|null|undefined} teacherOrUrl
 * @returns {string}
 */
export const getTutorImageSrc = (teacherOrUrl) => {
  const rawUrl = extractRawImageUrl(teacherOrUrl);

  if (isPlaceholderOrInvalidUrl(rawUrl)) {
    return DEFAULT_AVATAR;
  }

  // If already checked and cached as invalid, immediately return default avatar
  if (urlValidityCache.get(rawUrl) === false) {
    return DEFAULT_AVATAR;
  }

  if (
    rawUrl.includes("default-male.png") ||
    rawUrl.includes("default-female.png") ||
    rawUrl.includes("default-female.jpg") ||
    rawUrl.includes("female-avatar.jpg") ||
    rawUrl.includes("Female avatar.jpg") ||
    rawUrl.includes("DefaultAvtar.jpg") ||
    rawUrl.includes("default-avatar.png")
  ) {
    return DEFAULT_AVATAR;
  }

  return normalizeImageUrl(rawUrl);
};

/**
 * Error event handler for tutor image tags.
 * Falls back to the single default avatar whenever an image fails to load.
 * @param {object} e - SyntheticEvent
 */
export const handleTutorImageError = (e) => {
  const target = e?.currentTarget || e?.target;
  if (!target) return;

  const brokenSrc = target.src;
  if (brokenSrc) {
    urlValidityCache.set(brokenSrc, false);
  }

  // Prevent infinite error loops if already showing the default avatar
  if (target.src?.endsWith(DEFAULT_AVATAR) || target.dataset?.fallbackAttempted === "true") {
    target.onerror = null;
    return;
  }

  target.dataset.fallbackAttempted = "true";
  target.src = DEFAULT_AVATAR;
};
