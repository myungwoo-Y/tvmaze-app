module.exports = {
  globDirectory: 'public/',
  globPatterns: [
    "**/*.{png,ico,html,js,css,json,txt}"
  ],
  globIgnores: [
    "**/sw.js",
    "node_modules/**/*"
  ],
  swDest: 'public/service-worker.js',
  swSrc: 'public/sw.js',
};