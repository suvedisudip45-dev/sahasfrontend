import { normalizeCloudinaryDocumentUrl, buildPdfFilename } from './documentUrl';

describe('documentUrl helpers', () => {
  test('converts Cloudinary image URLs into raw PDF URLs', () => {
    const url = 'https://res.cloudinary.com/demo/image/upload/v123/report.pdf';
    expect(normalizeCloudinaryDocumentUrl(url)).toBe(
      'https://res.cloudinary.com/demo/raw/upload/v123/report.pdf'
    );
  });

  test('ensures download filename ends with .pdf', () => {
    expect(buildPdfFilename('Quarterly Report')).toBe('Quarterly_Report.pdf');
    expect(buildPdfFilename('Annual Report.pdf')).toBe('Annual_Report.pdf');
  });
});
