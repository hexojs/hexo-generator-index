'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  const config = this.config;
  const posts = locals.posts;
  posts.data = posts.data.sort(function(a, b) {
      if(a.priority && b.priority) {
          if(a.priority == b.priority) return b.date - a.date;
          else return b.priority - a.priority;
      }
      else if(a.priority && !b.priority) {
          return -1;
      }
      else if(!a.priority && b.priority) {
          return 1;
      }
      else return b.date - a.date;
  });
  
  const paginationDir = config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
