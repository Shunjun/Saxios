// 解析headers
export default function parseHeaders(headers: any) {
  const parsedHeaders: Store = {};
  if (!headers) {
    return parsedHeaders;
  }

  headers.split('/r/n').forEach((header: string) => {
    // eslint-disable-next-line prefer-const
    let [key, ...vals] = header.split(':');

    if (!key) return;

    key = key.trim().toLowerCase();
    const val = vals.join(':').trim();
    parsedHeaders[key] = val;
  });

  return parsedHeaders;
}
