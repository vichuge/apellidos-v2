'use client';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#8BBB46] bg-[#8BBB46] py-8">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-center gap-2 text-center text-sm text-white">
          <p>© {currentYear} Todos los derechos reservados.</p>
          <p>
            Aplicación hecha por{' '}
            <a
              href="https://www.linkedin.com/in/vpa12345/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline decoration-white decoration-2 underline-offset-2 transition-all hover:text-gray-100 hover:opacity-80 cursor-pointer"
            >
              Victor Pacheco
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
