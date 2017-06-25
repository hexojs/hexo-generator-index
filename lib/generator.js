'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals) {
  var config = this.config;
  var posts = locals.posts.sort(config.index_generator.order_by);
  var paginationDir = config.pagination_dir || 'page';
  var path = config.index_generator.path || '';

  // Order by top.
  posts.data = posts.data.sort(function(a, b) {
    if(a.top && b.top) {
      if(a.top === b.top) {
        return b.date - a.date;
      }
      return b.top - a.top;
    } else if(a.top && !b.top) {
      return -1;
    } else if(!a.top && b.top) {
      return 1;
    }
    return b.date - a.date;
  });

  return pagination(path, posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive'],
    format: paginationDir + '/%d/',
    data: {
      __index: true
    }
  });
};
