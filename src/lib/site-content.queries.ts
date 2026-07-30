import { queryOptions } from "@tanstack/react-query";

import { getBlogPost, getPortfolioItem, listBlogPosts, getSiteContent } from "./site-content.functions";

export const siteContentQuery = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
});

export const blogPostsQuery = queryOptions({
  queryKey: ["blog", "list"],
  queryFn: () => listBlogPosts(),
  staleTime: 60_000,
});

export const blogPostQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog", "post", slug],
    queryFn: () => getBlogPost({ data: { slug } }),
    staleTime: 60_000,
  });

export const portfolioItemQuery = (slug: string) =>
  queryOptions({
    queryKey: ["portfolio", slug],
    queryFn: () => getPortfolioItem({ data: { slug } }),
    staleTime: 60_000,
  });
