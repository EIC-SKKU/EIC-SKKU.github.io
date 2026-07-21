import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const news = (await getCollection("news")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: "EIC Lab — News",
    description:
      "News & updates from the Efficient & Intelligent Computing Lab at Sungkyunkwan University.",
    site: context.site!,
    items: news.map((item) => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.date,
      link: `/news/#post-${item.id}`,
    })),
  });
}
