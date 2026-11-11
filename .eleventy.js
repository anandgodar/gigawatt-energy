const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });

  // Blog collection, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/blog/posts/*.md").sort((a, b) => b.date - a.date)
  );

  // Date filters
  eleventyConfig.addFilter("readableDate", (d) =>
    DateTime.fromJSDate(d, { zone: "Australia/Melbourne" }).toFormat("d LLLL yyyy")
  );
  eleventyConfig.addFilter("isoDate", (d) =>
    DateTime.fromJSDate(d, { zone: "utc" }).toISODate()
  );
  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  // YouTube embed shortcode: {% youtube "VIDEO_ID", "Title" %}
  eleventyConfig.addShortcode("youtube", (id, title = "Video") => {
    return `<div class="video-embed"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
