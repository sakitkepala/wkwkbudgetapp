export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/wkwkworker.js');
  }
}
