const CACHE_EXPIRATION = 60 * 60 * 24000; // 1 day

export function isCacheValid(timestamp) {
  const currentTime = new Date().getTime();
  return currentTime - timestamp < CACHE_EXPIRATION;
}

export function getCachedData(key) {
  const cachedData = localStorage.getItem(key);
  const cachedTimestamp = localStorage.getItem(`${key}_timestamp`);

  if (cachedData && cachedTimestamp && isCacheValid(cachedTimestamp)) {
    return JSON.parse(cachedData);
  }

  return null;
}

export function setCachedData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
  localStorage.setItem(`${key}_timestamp`, new Date().getTime());
}
