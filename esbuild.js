require("esbuild")
  .build({
    entryPoints: ["index.js"],
    bundle: true,
    outdir: "./build",
    minify: true,
    sourcemap: true,
  })
  .catch(() => process.exit(1));
