var merge = require('utils-merge');

hexo.config.index_generator = merge({
  per_page: hexo.config.per_page
}, hexo.config.index_generator);

hexo.extend.generator.register('index', require('./lib/generator'));