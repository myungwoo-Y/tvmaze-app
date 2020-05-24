module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    "**/*.{png,ico,html,js,css,json,txt}"
  ],
  globIgnores: [
    "**/sw.js",
    "node_modules/**/*"
  ],
  swDest: 'build/service-worker.js',
  swSrc: 'public/sw.js',
};