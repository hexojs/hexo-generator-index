var merge = require('utils-merge');

hexo.config.index_generator = merge({
  per_page: 10
}, hexo.config.index_generator);

hexo.extend.generator.register('index', require('./lib/generator'));