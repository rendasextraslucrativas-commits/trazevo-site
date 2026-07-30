import { queryOptions } from "@tanstack/react-query";

import { listDemoSites } from "./demo-admin.functions";

export const demoSitesQuery = queryOptions({
  queryKey: ["admin", "demo-sites"],
  queryFn: () => listDemoSites(),
});
