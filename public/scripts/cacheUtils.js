// To check if cached data is valid
function isCachedDataValid(cachedData) {
  const expiryTime = 24 * 60 * 60 * 1000; // 24 hours Cache Validity
  const cachedAt = JSON.parse(cachedData).cachedAt;
  return Date.now() - cachedAt < expiryTime;
}

// Store data in cache with a timestamp
function storeDataInCache(key, data) {
  localStorage.setItem(key, JSON.stringify({ data, cachedAt: Date.now() }));
}
