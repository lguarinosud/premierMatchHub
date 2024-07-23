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

export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) {
  parentElement.insertAdjacentHTML("afterbegin", template);

  if (callback) {
    callback(data);
  };
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

// function to dynamically load the header and footer into a page
export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const headerElement = document.querySelector("#main-header");
  const footerTemplate = await loadTemplate("../partials/footer.html");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}
