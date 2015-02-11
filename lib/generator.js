'use strict';

var pagination = require('hexo-pagination');

module.exports = function(locals){
  var config = this.config;
  var posts = locals.posts.sort('-date');

  return pagination('', posts, {
    perPage: config.index_generator.per_page,
    layout: ['index', 'archive']
  });
};