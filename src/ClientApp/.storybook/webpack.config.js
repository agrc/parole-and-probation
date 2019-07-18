module.exports = function (options) {
  var config = options.config
  config.plugins = config.plugins.filter(
    p => String(p.resourceRegExp) !== "/core-js/"
  );
  return config;
}
