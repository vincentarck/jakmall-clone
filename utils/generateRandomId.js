export function generateUID(length) {
  return window
    .btoa(
      Array.from(window.crypto.getRandomValues(new Uint8Array(length * 2)))
        .map(String.fromCharCode)
        .join("")
    )
    .replace(/[+/]/g, "")
    .substring(0, length);
}
