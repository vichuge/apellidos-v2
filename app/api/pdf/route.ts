import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const letter = searchParams.get('letter');
  const filename = searchParams.get('filename');
  const inline = searchParams.get('inline') === 'true';

  if (!letter || !filename) {
    return NextResponse.json(
      { error: 'Missing letter or filename parameter' },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(
      process.cwd(),
      'apellidos',
      letter.toUpperCase(),
      filename
    );

    // Security check: ensure the file is within the apellidos directory
    const apellidosDir = path.join(process.cwd(), 'apellidos');
    if (!filePath.startsWith(apellidosDir)) {
      return NextResponse.json(
        { error: 'Invalid file path' },
        { status: 403 }
      );
    }

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);
    const response = new NextResponse(fileBuffer);
    response.headers.set('Content-Type', 'application/pdf');
    
    // Use 'inline' to display in browser, 'attachment' to download
    const disposition = inline ? 'inline' : 'attachment';
    response.headers.set('Content-Disposition', `${disposition}; filename="${filename}"`);
    response.headers.set('Cache-Control', 'public, max-age=31536000');

    return response;
  } catch (error) {
    console.error('Error serving PDF:', error);
    return NextResponse.json(
      { error: 'Error serving PDF' },
      { status: 500 }
    );
  }
}
