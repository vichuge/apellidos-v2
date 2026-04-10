import fs from 'fs';
import path from 'path';

export interface PDFFile {
  name: string;
  filename: string;
  letter: string;
  isClean: boolean;
}

export interface PDFsByLetter {
  [letter: string]: PDFFile[];
}

/**
 * Get all PDF files organized by letter
 */
export async function getPDFsByLetter(): Promise<PDFsByLetter> {
  const apellidosDir = path.join(process.cwd(), 'apellidos');
  
  if (!fs.existsSync(apellidosDir)) {
    return {};
  }

  const result: PDFsByLetter = {};
  const letters = fs.readdirSync(apellidosDir).filter(
    (file) => fs.statSync(path.join(apellidosDir, file)).isDirectory()
  );

  for (const letter of letters) {
    const letterDir = path.join(apellidosDir, letter);
    const files = fs.readdirSync(letterDir).filter((f) => f.endsWith('.pdf'));

    result[letter] = files
      .filter((f) => !f.endsWith('.pdf:Zone.Identifier'))
      .filter((f) => f.includes('-clean.pdf'))
      .map((filename) => {
        const name = filename
          .replace('-clean.pdf', '')
          .replace('.pdf', '')
          .replace(/_/g, ' ');

        return {
          name: name.charAt(0).toUpperCase() + name.slice(1),
          filename,
          letter,
          isClean: true,
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

/**
 * Get PDF files for a specific letter
 */
export async function getPDFsByLetterCode(letter: string): Promise<PDFFile[]> {
  const pdfs = await getPDFsByLetter();
  return pdfs[letter.toUpperCase()] || [];
}

/**
 * Get all available letters
 */
export async function getAvailableLetters(): Promise<string[]> {
  const pdfs = await getPDFsByLetter();
  return Object.keys(pdfs).sort();
}

/**
 * Search PDFs by name
 */
export async function searchPDFs(query: string): Promise<PDFFile[]> {
  const pdfs = await getPDFsByLetter();
  const lowerQuery = query.toLowerCase();

  const results: PDFFile[] = [];
  for (const letter in pdfs) {
    results.push(
      ...pdfs[letter].filter((pdf) =>
        pdf.name.toLowerCase().includes(lowerQuery)
      )
    );
  }

  return results.sort((a, b) => a.name.localeCompare(b.name));
}
