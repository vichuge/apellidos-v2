'use client';

import { FileText, Download, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PdfCardProps {
  name: string;
  letter: string;
  filename: string;
}

export default function PdfCard({
  name,
  letter,
  filename,
}: PdfCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Only run detection after component mounts
  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isSmallScreen = typeof window !== 'undefined' && window.innerWidth < 768;
      setIsMobile(mobileRegex.test(userAgent) || isSmallScreen);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOpen = () => {
    setIsLoading(true);
    
    // Build URL: inline=true for desktop (view), inline=false for mobile (download)
    const pdfUrl = `/api/pdf?letter=${letter}&filename=${filename}&inline=${!isMobile}`;

    if (isMobile) {
      // On mobile, create a download link
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename.replace('-clean.pdf', '.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // On desktop, open in new tab to view
      window.open(pdfUrl, '_blank');
    }
    
    setIsLoading(false);
  };

  // Avoid hydration mismatch by only showing interactive content after client mount
  const buttonLabel = !isClient ? 'Abrir' : (isMobile ? 'Descargar' : 'Abrir');
  const Icon = !isClient ? ExternalLink : (isMobile ? Download : ExternalLink);

  return (
    <div className="flex flex-col items-start gap-2 rounded-lg border border-gray-300 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex w-full items-start gap-3">
        <FileText className="h-6 w-6 flex-shrink-0 text-red-500" />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {name}
          </h3>
        </div>
      </div>

      <button
        onClick={handleOpen}
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Cargando...
          </>
        ) : (
          <>
            <Icon className="h-4 w-4" />
            {buttonLabel}
          </>
        )}
      </button>
    </div>
  );
}
