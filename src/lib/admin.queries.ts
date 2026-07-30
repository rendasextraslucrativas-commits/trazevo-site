import { queryOptions } from "@tanstack/react-query";

import { getAnalytics } from "./analytics.functions";
import { getIntegrationsData } from "./integrations.functions";
import {
  getAdminContent,
  getAdminShowcase,
  getCrmData,
  getLeadActivities,
  getMe,
  getProjectsData,
  listMedia,
} from "./admin.functions";

export const leadActivitiesQuery = (leadId: string) =>
  queryOptions({
    queryKey: ["admin", "crm", "activities", leadId],
    queryFn: () => getLeadActivities({ data: { id: leadId } }),
  });


export const meQuery = queryOptions({
  queryKey: ["me"],
  queryFn: () => getMe(),
  staleTime: 30_000,
});

export const adminContentQuery = queryOptions({
  queryKey: ["admin", "content"],
  queryFn: () => getAdminContent(),
});

export const crmQuery = queryOptions({
  queryKey: ["admin", "crm"],
  queryFn: () => getCrmData(),
});

export const adminShowcaseQuery = queryOptions({
  queryKey: ["admin", "showcase"],
  queryFn: () => getAdminShowcase(),
});

export const mediaQuery = queryOptions({
  queryKey: ["admin", "media"],
  queryFn: () => listMedia(),
});

export const projectsQuery = queryOptions({
  queryKey: ["admin", "projects"],
  queryFn: () => getProjectsData(),
});

export const analyticsQuery = (days: number) =>
  queryOptions({
    queryKey: ["admin", "analytics", days],
    queryFn: () => getAnalytics({ data: { days } }),
  });

export const integrationsQuery = queryOptions({
  queryKey: ["admin", "integrations"],
  queryFn: () => getIntegrationsData(),
});
