import { useState } from 'react';

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat panel */}
      {open && (
        <div className="w-80 rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 bg-surface-container-lowest flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary-container px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="material-icons text-on-primary text-lg">support_agent</span>
              <div>
                <p className="text-body-sm font-body font-medium text-on-primary">Heritage Expert</p>
                <p className="text-label-sm font-body text-on-primary/70">Always online</p>
              </div>
            </div>
            <button
              aria-label="Đóng chat"
              onClick={() => setOpen(false)}
              className="text-on-primary/70 hover:text-on-primary transition-colors"
            >
              <span className="material-icons text-lg">close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 px-4 py-4 flex flex-col gap-3 max-h-64 overflow-y-auto">
            <div className="bg-surface-container rounded-lg px-3 py-2 max-w-[85%] self-start">
              <p className="text-body-sm font-body text-on-surface leading-relaxed">
                Xin chào quý khách! Tôi là chuyên gia tư vấn sức khỏe của Heritage Ginseng.
                Tôi có thể hỗ trợ gì cho quý khách hôm nay?
              </p>
              <p className="text-label-sm font-body text-on-surface-variant mt-1">10:24 SA</p>
            </div>
            <div className="bg-primary-container rounded-2xl rounded-tr-none px-3 py-2 max-w-[85%] self-end">
              <p className="text-body-sm font-body text-on-primary leading-relaxed">
                Tôi muốn hỏi về Tinh Chất Hồng Sâm để tăng năng lượng.
              </p>
              <p className="text-label-sm font-body text-on-primary/70 mt-1">10:25 SA</p>
            </div>
          </div>

          {/* Input */}
          <div className="border-t border-outline-variant/20 px-3 py-3 flex items-center gap-2">
            <input
              type="text"
              placeholder="Nhắn tin..."
              className="flex-1 rounded-lg border border-outline-variant/20 bg-surface-container-low px-3 py-2 text-body-sm font-body text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              aria-label="Gửi"
              className="p-2 rounded-full bg-primary-container text-on-primary hover:bg-primary transition-colors"
            >
              <span className="material-icons text-base">send</span>
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Mở tư vấn"
        className="flex items-center gap-2 rounded-full bg-primary-container px-4 py-3 text-on-primary shadow-xl hover:bg-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <span className="material-icons text-lg">chat</span>
        <span className="text-body-sm font-body font-medium">Tư vấn</span>
      </button>
    </div>
  );
}
