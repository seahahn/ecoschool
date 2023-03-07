/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEB_URL || "https://example.cnrikorea.com",
  sourceDir: process.env.BUILD_DIR || ".next",
  generateRobotsTxt: true,
  exclude: ["/admin", "/admin/**", "/register/success", "/resetpw", "/resetpw/**"],
};
