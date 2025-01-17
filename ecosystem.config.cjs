//!!You need to close standalone output on next.config.mjs first
module.exports = {
  apps: [
    {
      name: "Lava_Web",
      script: "./node_modules/next/dist/bin/next",
      args: "start -p 3090",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
