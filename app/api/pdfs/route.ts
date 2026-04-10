import { getAvailableLetters, getPDFsByLetter, searchPDFs } from '@/lib/pdfs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  const letter = searchParams.get('letter');
  const query = searchParams.get('query');

  try {
    if (action === 'search' && query) {
      const results = await searchPDFs(query);
      return NextResponse.json(results);
    }

    if (action === 'letter' && letter) {
      const pdfs = await getPDFsByLetter();
      return NextResponse.json(pdfs[letter.toUpperCase()] || []);
    }

    if (action === 'letters') {
      const letters = await getAvailableLetters();
      return NextResponse.json(letters);
    }

    // Default: return all PDFs organized by letter
    const pdfs = await getPDFsByLetter();
    return NextResponse.json(pdfs);
  } catch (error) {
    console.error('Error fetching PDFs:', error);
    return NextResponse.json(
      { error: 'Error fetching PDFs' },
      { status: 500 }
    );
  }
}
