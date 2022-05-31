const PROD = process.env.NODE_ENV === 'production';

const netlify = {};

if (PROD) {
  netlify.serverBuildTarget = "netlify";
  netlify.server = "./server.js";
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
