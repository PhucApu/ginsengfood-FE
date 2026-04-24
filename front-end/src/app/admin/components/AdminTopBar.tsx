import Image from 'next/image';

const ADMIN_AVATAR_URL =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBbq0UjAHfN-UDP5F4gi10ZlpdZHjwqa8rMk25p5Cduv5Z_c5nM5sdfOy7MzITaNeY3N7k887CJE1UC7_iersr2F2MpoCdJ8H0-fjL0krLizAixtlwfAHIdwfPLyRChGTfxI1mRN1Ii9reL73ow961dsoSJe6RXunLjgKvPr_k1_Gy8BI6a3ozekraA5qRsn_tSgTPIErXjkBkcKWG7qT2tG2ozicQLWWV0ZfE2fZSDxUBqnl0_Fxjz3NusGYqG4_zcVjQMrKCOeac';

export default function AdminTopBar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl border-b border-outline-variant/20 md:hidden">
      <div className="flex justify-between items-center px-8 h-16 w-full">
        <span className="font-serif italic font-bold text-primary text-2xl tracking-tighter">
          Ginsengfood
        </span>
        <div className="flex items-center space-x-4">
          <span className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-200 p-2 rounded-full cursor-pointer">
            notifications
          </span>
          <span className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-200 p-2 rounded-full cursor-pointer">
            settings
          </span>
          <span className="material-symbols-outlined text-on-surface-variant hover:bg-surface-container transition-colors active:scale-95 duration-200 p-2 rounded-full cursor-pointer">
            help
          </span>
          <Image
            src={ADMIN_AVATAR_URL}
            alt="Admin profile photo"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full border border-outline-variant/20"
          />
        </div>
      </div>
    </header>
  );
}
