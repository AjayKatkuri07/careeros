const PREFIX = "careeros_";

export function getItem(key) {
  const raw = localStorage.getItem(PREFIX + key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key);
}