'use strict';

var assign = require('object-assign');

hexo.config.index_generator = assign({
  per_page: hexo.config.per_page
}, hexo.config.index_generator);

hexo.extend.generator.register('index', require('./lib/generator'));