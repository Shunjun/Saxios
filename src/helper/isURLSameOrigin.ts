interface URLOrigin {
  host: string;
  protocol: string;
}

const urlParsingNode = document.createElement('a');
const currentOrigin = resolveURL(window.location.href);

function resolveURL(url: Url): URLOrigin {
  urlParsingNode.setAttribute('href', url);
  const { host, protocol } = urlParsingNode;

  return {
    host,
    protocol,
  };
}

function isURLSameOrigin(requestURL: Url): boolean {
  const parsedOrigin = resolveURL(requestURL);

  return (
    parsedOrigin.protocol === currentOrigin.protocol && parsedOrigin.host === currentOrigin.host
  );
}

export default isURLSameOrigin;
