module.exports = {
  scripts: {
    default: "node app.js",

    dev: {
      script: "webpack-dev-server --port 8000 --config webpack.dev.config.js --progress --inline --hot",
      description: "Run app with hot module replacement. localhost:8000"
    },

    build: {
      default: "webpack"
    },

    lint: "eslint src/",

    pretty: "prettier --write src/**.js",

    test: {
      default: "jest",

      cover: "jest --coverage",

      watch: "jest --watch"
    }
  }
};
