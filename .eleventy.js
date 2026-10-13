module.exports = function (eleventyConfig) {
  const preview = process.env.PREVIEW === "1";
  // Where the site lives: "/" at the root of a domain, "/repo-name/" on a
  // project page, with "preview/" added for the preview build.
  let prefix = process.env.PATH_PREFIX || (preview ? "/preview/" : "/");
  prefix = ("/" + prefix + "/").replace(/\/+/g, "/");

  // Static files copied as they are
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Posts marked draft are left out of the live site, shown on the preview site
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && !preview) return false;
  });

  eleventyConfig.addGlobalData("preview", preview);

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  );

  // Image paths from the CMS may be "/assets/img/x.jpg" or just "x.jpg"
  eleventyConfig.addFilter("img", (v) => {
    if (!v) return "";
    if (/^https?:\/\//.test(v)) return v;
    if (v.startsWith("/")) return v;
    return "/assets/img/" + v;
  });

  // Links typed in the admin panel: "/join-us/" gets the preview prefix, full URLs pass through
  eleventyConfig.addFilter("link", (v) => {
    if (!v) return "#";
    if (v.startsWith("/")) return prefix.replace(/\/$/, "") + v;
    return v;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    pathPrefix: prefix,
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid"
  };
};
