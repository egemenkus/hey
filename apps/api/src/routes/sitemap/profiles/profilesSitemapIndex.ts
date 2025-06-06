import { Errors } from "@hey/data/errors";
import type { Context } from "hono";
import { create } from "xmlbuilder2";

const sitemaps = [{ path: "/sitemap/profiles/1.xml", priority: "1" }];

const profilesSitemapIndex = async (ctx: Context) => {
  try {
    const currentTime = new Date().toISOString();

    const sitemapIndex = create({ version: "1.0", encoding: "UTF-8" }).ele(
      "sitemapindex",
      {
        xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9"
      }
    );

    for (const sitemap of sitemaps) {
      sitemapIndex
        .ele("sitemap")
        .ele("loc")
        .txt(`https://hey.xyz${sitemap.path}`)
        .up()
        .ele("lastmod")
        .txt(currentTime)
        .up();
    }

    ctx.header("Content-Type", "application/xml");
    return ctx.body(sitemapIndex.end({ prettyPrint: true }));
  } catch {
    return ctx.body(Errors.SomethingWentWrong);
  }
};

export default profilesSitemapIndex;
