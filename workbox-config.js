module.exports = {
  globDirectory: 'build/',
  globPatterns: [
    "**/*.{png,ico,html,js,css,json}"
  ],
  globIgnores: [
    "**/sw.js",
    "node_modules/**/*"
  ],
  swDest: 'public/sw-build.js',
  swSrc: 'public/sw.js',
};