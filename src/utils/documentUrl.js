export function normalizeCloudinaryDocumentUrl(filePath) {
  if (!filePath || typeof filePath !== 'string') return filePath;

  const normalizedUrl = filePath.trim();
  if (!/^https?:\/\//i.test(normalizedUrl)) return normalizedUrl;

  if (normalizedUrl.includes('cloudinary.com')) {
    if (normalizedUrl.includes('/image/upload/')) {
      return normalizedUrl.replace('/image/upload/', '/raw/upload/');
    }

    if (normalizedUrl.includes('/image/upload')) {
      return normalizedUrl.replace('/image/upload', '/raw/upload');
    }
  }

  return normalizedUrl;
}

export function buildPdfFilename(name = 'document') {
  const rawName = String(name || 'document').trim();
  const cleanName = rawName
    .replace(/\.[pP][dD][fF]$/, '')
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/^_+|_+$/g, '');

  return `${cleanName || 'document'}.pdf`;
}

export function resolveDocumentUrl(baseUrl, filePath) {
  if (!filePath) return '#';

  if (/^https?:\/\//i.test(filePath)) {
    return normalizeCloudinaryDocumentUrl(filePath);
  }

  const cleanBase = (baseUrl || '').replace(/\/$/, '');
  const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;

  return `${cleanBase}${cleanPath}`;
}
