/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/dist',
  },
  plugins: ['@snowpack/plugin-babel', '@snowpack/plugin-dotenv'],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    // The build is meant for GitHub pages, so we need to set the path to the
    // GitHub pages URL as `baseUrl`
    baseUrl: '/lit-state/docs/build/',
    metaDir: 'snowpack'
  },
  proxy: {
    /* ... */
  },
  alias: {
    "@app": "./src"
  },
};
