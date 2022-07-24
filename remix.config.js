const netlify = {};

if (process.env.NETLIFY === true) {
  netlify.serverBuildTarget = "netlify";
  netlify.server = "./netlify-server.js";
}

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  ...netlify,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
