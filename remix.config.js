/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverBuildTarget: "netlify",
  server: "./server.js",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
