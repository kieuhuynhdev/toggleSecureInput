// Constants
const MENU_ID = "toggleSecureInput";
const MENU_TITLE = "Toggle Secure Input";

// Khởi tạo context menu
function createContextMenu() {
  try {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: MENU_TITLE,
      contexts: ["editable"],
      documentUrlPatterns: ["<all_urls>"],
    });
  } catch (error) {
    console.error("Toggle Secure Input - Error creating context menu:", error);
  }
}

// Xử lý khi extension được cài đặt hoặc cập nhật
chrome.runtime.onInstalled.addListener((details) => {
  // Xóa menu cũ nếu có
  chrome.contextMenus.removeAll(() => {
    createContextMenu();
  });

  // Log thông tin cài đặt/cập nhật
  if (details.reason === "install") {
    console.log("Toggle Secure Input - Extension installed");
  } else if (details.reason === "update") {
    console.log(
      `Toggle Secure Input - Extension updated from ${
        details.previousVersion
      } to ${chrome.runtime.getManifest().version}`
    );
  }
});

// Xử lý khi người dùng click vào context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (!tab || !tab.id) {
    console.error("Toggle Secure Input - Invalid tab");
    return;
  }

  if (info.menuItemId === MENU_ID) {
    // Gửi message tới content script
    chrome.tabs.sendMessage(tab.id, { action: MENU_ID }, (response) => {
      // Xử lý phản hồi từ content script
      if (chrome.runtime.lastError) {
        console.error("Toggle Secure Input - Error:", chrome.runtime.lastError);
        return;
      }

      if (response && response.success) {
        console.log(
          `Toggle Secure Input - Successfully toggled to ${response.type} type`
        );
      } else {
        console.warn(
          "Toggle Secure Input - Toggle failed or invalid input element"
        );
      }
    });
  }
});

// Xử lý khi extension được kích hoạt
chrome.runtime.onStartup.addListener(() => {
  // Đảm bảo context menu luôn được tạo khi browser khởi động
  chrome.contextMenus.removeAll(() => {
    createContextMenu();
  });
});
