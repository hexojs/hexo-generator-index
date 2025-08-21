'use strict';

const pagination = require('hexo-pagination');

function generateIndexPage(indexPath, posts, config) {
  const paginationDir = config.index_generator.pagination_dir || config.pagination_dir || 'page';

  return pagination(indexPath, posts, {
    perPage: config.index_generator.per_page,
    layout: config.index_generator.layout || ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  })
}

module.exports = function(locals) {
  const config = this.config;
  const posts = locals.posts.filter(post => !post.hidden).sort(config.index_generator.order_by);

  posts.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  const indexPath = config.index_generator.path || '';
  return generateIndexPage(indexPath, posts, config);
};
