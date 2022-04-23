require("esbuild")
  .build({
    entryPoints: ["index.js"],
    bundle: true,
    outdir: "./build",
    outfile: "comic.js",
    minify: true,
    sourcemap: true,
  })
  .catch(() => process.exit(1));
