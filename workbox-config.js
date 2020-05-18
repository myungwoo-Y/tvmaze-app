module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    "**/*.{ico,html,js,css}"
  ],
  globIgnores: [
    "**/sw.js",
    "node_modules/**/*"
  ],
  swDest: 'build/sw.js',
  swSrc: 'src/sw.js',
};