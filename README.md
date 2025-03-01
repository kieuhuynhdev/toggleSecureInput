# Toggle Secure Input Chrome Extension

Extension cho phép người dùng chuyển đổi giữa type password và text trong các ô input password để kiểm tra mật khẩu đã nhập.

## Cài đặt

1. Tải source code về máy
2. Mở Chrome và truy cập `chrome://extensions/`
3. Bật chế độ "Developer mode" ở góc phải trên cùng
4. Click "Load unpacked" và chọn thư mục chứa source code

## Cách sử dụng

1. Click chuột phải vào ô input password bất kỳ
2. Chọn "Toggle Secure Input" từ menu
3. Type của ô input sẽ chuyển đổi giữa password và text

## Lưu ý bảo mật

- Chỉ sử dụng tính năng này khi bạn đang ở trong môi trường an toàn
- Đảm bảo không có ai đang nhìn vào màn hình của bạn khi toggle password
- Luôn chuyển lại về type password sau khi kiểm tra xong

## Cấu trúc thư mục

```
├── manifest.json     # File cấu hình extension
├── background.js     # Background script xử lý context menu
├── content.js        # Content script xử lý DOM
└── icons/           # Thư mục chứa icons
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```
