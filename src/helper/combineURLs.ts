export default function combineURLs(baseURL: string, relativeURL: string) {
  if (relativeURL.length === 0) {
    return baseURL.replace(/\/+$/, '');
  }
  return `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`;
}
