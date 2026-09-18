export function resolveDocumentUrl(baseUrl, filePath) {
  if (!filePath) return '#';

  if (/^https?:\/\//i.test(filePath)) {
    return filePath;
  }

  const cleanBase = (baseUrl || '').replace(/\/$/, '');
  const cleanPath = filePath.startsWith('/') ? filePath : `/${filePath}`;

  return `${cleanBase}${cleanPath}`;
}
