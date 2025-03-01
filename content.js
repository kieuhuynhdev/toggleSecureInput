// Lưu trữ element đang được focus
let focusedElement = null;

// Theo dõi sự kiện focus trên các input
document.addEventListener("focusin", (event) => {
  if (event.target.tagName === "INPUT") {
    focusedElement = event.target;
  }
});

document.addEventListener("focusout", () => {
  focusedElement = null;
});

// Lắng nghe message từ background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleSecureInput" && focusedElement) {
    // Kiểm tra xem element có phải là input type password không
    if (focusedElement.type === "password") {
      focusedElement.type = "text";
    } else if (focusedElement.type === "text") {
      focusedElement.type = "password";
    }
  }
});
