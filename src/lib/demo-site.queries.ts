import { queryOptions } from "@tanstack/react-query";

import { getDemoSite } from "./demo-site.functions";

export const demoSiteQuery = (slug: string) =>
  queryOptions({
    queryKey: ["demo-site", slug],
    queryFn: () => getDemoSite({ data: { slug } }),
    staleTime: 60_000,
  });
