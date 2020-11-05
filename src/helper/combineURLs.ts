export default function combineURLs(baseURL: string, relativeURL: string) {
  return `${baseURL.replace(/\/+$/, '')}/${relativeURL.replace(/^\/+/, '')}`;
}
