require("esbuild")
  .build({
    entryPoints: ["index.js", "plugin.js"],
    bundle: true,
    outdir: "./build",
    minify: true,
    sourcemap: true,
  })
  .catch(() => process.exit(1));
