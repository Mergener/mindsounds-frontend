export function processPathName(pathname: string) {
  pathname = pathname.toLowerCase();
  if (pathname.endsWith(".html")) {
    pathname = pathname.slice(0, -5);
  }
  return pathname;
}