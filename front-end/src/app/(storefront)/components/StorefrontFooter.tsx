export default function StorefrontFooter() {
  return (
    <footer className="w-full pt-20 pb-12 bg-stone-200 text-red-950 font-body tracking-wide">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 max-w-screen-2xl mx-auto">
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-headline text-3xl font-black text-red-950 mb-4">Heritage Ginseng</h2>
          <p className="text-stone-700 hover:opacity-80 transition-opacity">
            Alchemizing tradition for modern vitality.
          </p>
        </div>
        <div className="col-span-1 md:col-span-2 flex flex-col md:items-end">
          <nav className="flex flex-col md:flex-row gap-6">
            <a
              className="text-stone-700 hover:text-red-900 underline decoration-stone-300 hover:opacity-80 transition-opacity"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-stone-700 hover:text-red-900 underline decoration-stone-300 hover:opacity-80 transition-opacity"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-stone-700 hover:text-red-900 underline decoration-stone-300 hover:opacity-80 transition-opacity"
              href="#"
            >
              Quality Certifications
            </a>
            <a
              className="text-stone-700 hover:text-red-900 underline decoration-stone-300 hover:opacity-80 transition-opacity"
              href="#"
            >
              Shipping &amp; Returns
            </a>
          </nav>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-stone-300 text-center px-12">
        <p className="text-stone-700">
          © 2024 Heritage Ginseng. Alchemizing tradition for modern vitality.
        </p>
      </div>
    </footer>
  );
}
