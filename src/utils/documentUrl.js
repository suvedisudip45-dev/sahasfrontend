export function normalizeCloudinaryDocumentUrl(filePath) {
  if (!filePath || typeof filePath !== 'string') return filePath;

  if (!/^https?:\/\//i.test(filePath)) return filePath;

  if (filePath.includes('cloudinary.com') && filePath.includes('/image/upload/')) {
    return filePath.replace('/image/upload/', '/raw/upload/');
  }

  return filePath;
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
