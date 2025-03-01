// Các type input có thể chuyển đổi
const TOGGLEABLE_TYPES = ["password", "text"];

// Lưu trữ element đang được focus và trạng thái
let focusedElement = null;
let originalType = null;

// Hàm kiểm tra xem input có thể toggle không
function isToggleable(element) {
  if (!element || element.tagName !== "INPUT") return false;

  // Kiểm tra các thuộc tính readonly và disabled
  if (element.readOnly || element.disabled) return false;

  // Kiểm tra type có hợp lệ không
  return TOGGLEABLE_TYPES.includes(element.type);
}

// Hàm toggle type của input
function toggleInputType(element) {
  if (!element || !isToggleable(element)) return;

  try {
    // Lưu type gốc nếu chưa có
    if (!originalType) {
      originalType = element.type;
    }

    // Toggle type
    element.type = element.type === "password" ? "text" : "password";

    // Thêm class để đánh dấu trạng thái
    element.classList.toggle("toggled-secure-input");

    // Focus lại vào input sau khi toggle
    element.focus();

    // Chọn toàn bộ text trong input để dễ kiểm tra
    element.select();

    return true;
  } catch (error) {
    console.error("Toggle Secure Input - Error:", error);
    return false;
  }
}

// Theo dõi sự kiện focus
document.addEventListener("focusin", (event) => {
  const target = event.target;
  if (isToggleable(target)) {
    focusedElement = target;
    originalType = target.type;
  }
});

document.addEventListener("focusout", (event) => {
  // Kiểm tra xem element đang mất focus có phải là element được toggle không
  if (event.target === focusedElement) {
    // Khôi phục type gốc khi mất focus
    if (focusedElement.classList.contains("toggled-secure-input")) {
      focusedElement.type = originalType;
      focusedElement.classList.remove("toggled-secure-input");
    }
    focusedElement = null;
    originalType = null;
  }
});

// Thêm style để đánh dấu input đang được toggle
const style = document.createElement("style");
style.textContent = `
  .toggled-secure-input {
    border-color: #4CAF50 !important;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5) !important;
  }
`;
document.head.appendChild(style);

// Lắng nghe message từ background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "toggleSecureInput") {
    if (!focusedElement) {
      console.warn("Toggle Secure Input - No input element focused");
      return;
    }

    const success = toggleInputType(focusedElement);

    // Gửi phản hồi về trạng thái toggle
    sendResponse({
      success,
      type: success ? focusedElement.type : null,
    });
  }
});
