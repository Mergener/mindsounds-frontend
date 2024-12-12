import { processPathName } from "./lib/utils";

function route() {
  const unprocessedPathname = location.pathname;
  const pathname = processPathName(unprocessedPathname);
  if (pathname != unprocessedPathname) {
    location.href = pathname;
    return;
  }
}

route();
