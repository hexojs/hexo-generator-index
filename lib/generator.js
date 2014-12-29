var pagination = require('hexo-pagination');

function indexGenerator(locals){
  var config = this.config;
  var posts = locals.posts.sort('-date');

  return pagination('', posts, {
    perPage: config.index_generator.per_page || config.per_page,
    layout: ['index', 'archive']
  });
}

module.exports = indexGenerator;