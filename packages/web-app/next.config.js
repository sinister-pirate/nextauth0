const withTM = require('next-transpile-modules')
const withSass = require('@zeit/next-sass')
const withCSS = require('@zeit/next-css')
// https://www.npmjs.com/package/next-transpile-modules 
module.exports = withCSS({
  cssLoaderOptions: {
    url: false
  },
  ...withSass(),
  ...withTM({ transpileModules: ['bar'] })
})


