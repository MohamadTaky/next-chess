export function getCookie(cookie: string) {
  const regex = new RegExp(`${cookie}=([^;]+)`);
  const results = regex.exec(document.cookie);
  return results ? results[1] : null;
}

export function setCookie(cookie: string) {
  document.cookie = cookie;
}
