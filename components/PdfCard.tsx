'use client';

import { FileText, Download, ExternalLink } from 'lucide-react';
import { useState } from 'react';

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
  const pdfUrl = `/api/pdf?letter=${letter}&filename=${filename}`;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleOpen = () => {
    setIsLoading(true);
    if (isMobile) {
      // En mobile, descargar el PDF
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = filename.replace('-clean.pdf', '.pdf');
      link.click();
    } else {
      // En desktop, abrir en nueva pestaña
      window.open(pdfUrl, '_blank');
    }
    setIsLoading(false);
  };

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
        ) : isMobile ? (
          <>
            <Download className="h-4 w-4" />
            Descargar
          </>
        ) : (
          <>
            <ExternalLink className="h-4 w-4" />
            Abrir
          </>
        )}
      </button>
    </div>
  );
}
