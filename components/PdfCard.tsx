'use client';

import { FileText } from 'lucide-react';
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

  const handleOpen = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Build URL: inline=true for desktop (view), inline=false for mobile (download)
    const pdfUrl = `/api/pdf?letter=${letter}&filename=${filename}&inline=${!isMobile}`;

    try {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleOpen();
        }
      }}
      role="button"
      tabIndex={0}
      className="flex flex-col items-start gap-2 rounded-lg border border-[#BEBBB2] bg-white p-4 shadow-sm transition-all hover:shadow-lg hover:border-[#8BBB46] cursor-pointer active:scale-95"
    >
      <div className="flex w-full items-start gap-3">
        <FileText className="h-6 w-6 flex-shrink-0 text-[#8BBB46]" />
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
            {name}
          </h3>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-[#8BBB46]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#8BBB46] border-t-transparent" />
          <span>Cargando...</span>
        </div>
      )}
    </div>
  );
}
