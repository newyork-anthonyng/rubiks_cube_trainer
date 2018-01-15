const npsUtils = require("nps-utils");

module.exports = {
  scripts: {
    default: "node app.js",

    dev: {
      default: {
        script: "webpack-dev-server --port 8000 --config webpack.dev.config.js --progress --inline --hot --open --history-api-fallback",
        description: "Run app with hot module replacement. localhost:8000"
      },

      server: "npm start build && npm start"
    },

    build: {
      default: "BABEL_ENV=production webpack",

      prod: "NODE_ENV=production BABEL_ENV=production webpack"
    },

    lint: "eslint src/",

    pretty: "prettier --write src/**.js",

    test: {
      default: "jest",

      cover: "jest --coverage",

      watch: "jest --watch",

      e2e: {
        script: "jest test/e2e.spec.js",
        description: "Use Puppeteer to run E2E tests"
      }
    },

    validate: {
      default: npsUtils.concurrent.nps("test.cover", "lint", "build"),

      // prepush: npsUtils.concurrent.nps("test.cover", "lint")
      prepush: npsUtils.concurrent.nps("lint")
    },

    lighthouse: "lighthouse https://arcane-forest-45179.herokuapp.com/ --view",

    afterSuccess: {
      default: "codecov"
    }
  }
};
