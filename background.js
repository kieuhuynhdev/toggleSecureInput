// Tạo context menu item khi extension được cài đặt
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "toggleSecureInput",
    title: "Toggle Secure Input",
    contexts: ["editable"],
  });
});

// Xử lý khi người dùng click vào context menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "toggleSecureInput") {
    // Gửi message tới content script
    chrome.tabs.sendMessage(tab.id, {
      action: "toggleSecureInput",
    });
  }
});
