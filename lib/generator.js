'use strict';

const pagination = require('hexo-pagination');
const path = require('path');

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
  const langs = [].concat(config.language);

  if (langs.length <= 1) {
    return generateIndexPage(indexPath, posts, config);
  }

  // Generate default index page
  let indexPages = generateIndexPage(
    indexPath,
    posts, 
    config
  );

  // Generate index pages for each language
  indexPages = [].concat(
    indexPages, 
    ...langs.map(lang => generateIndexPage(
      path.join(lang, indexPath),
      posts.filter(post => post.lang === lang),
      config
    ))
  );

  return indexPages;
};
