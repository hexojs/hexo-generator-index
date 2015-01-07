var should = require('chai').should();
var Hexo = require('hexo');

describe('Index generator', function(){
  var hexo = new Hexo(__dirname, {silent: true});
  var Post = hexo.model('Post');
  var generator = require('../lib/generator').bind(hexo);
  var posts;

  // Default config
  hexo.config.index_generator = {
    per_page: 10
  };

  before(function(){
    return Post.insert([
      {source: 'foo', slug: 'foo', date: 1e8},
      {source: 'bar', slug: 'bar', date: 1e8 + 1},
      {source: 'baz', slug: 'baz', date: 1e8 - 1}
    ]).then(function(data){
      posts = Post.sort('-date');
    });
  });

  it('pagination enabled', function(){
    hexo.config.index_generator.per_page = 2;

    var result = generator(hexo.locals);

    result.length.should.eql(2);

    for (var i = 0, len = result.length; i < len; i++){
      result[i].layout.should.eql(['index', 'archive']);
      result[i].data.current.should.eql(i + 1);
      result[i].data.base.should.eql('');
      result[i].data.total.should.eql(2);
    }

    result[0].path.should.eql('');
    result[0].data.current_url.should.eql('');
    result[0].data.posts.should.eql(posts.limit(2))
    result[0].data.prev.should.eql(0);
    result[0].data.prev_link.should.eql('');
    result[0].data.next.should.eql(2);
    result[0].data.next_link.should.eql('page/2/');

    result[1].path.should.eql('page/2/');
    result[1].data.current_url.should.eql('page/2/');
    result[1].data.posts.should.eql(posts.skip(2));
    result[1].data.prev.should.eql(1);
    result[1].data.prev_link.should.eql('');
    result[1].data.next.should.eql(0);
    result[1].data.next_link.should.eql('');
  });

  it('pagination disabled', function(){
    hexo.config.index_generator.per_page = 0;

    var result = generator(hexo.locals);

    result.length.should.eql(1);

    result[0].path.should.eql('');
    result[0].layout.should.eql(['index', 'archive']);
    result[0].data.base.should.eql('');
    result[0].data.total.should.eql(1);
    result[0].data.current.should.eql(1);
    result[0].data.current_url.should.eql('');
    result[0].data.posts.should.eql(posts);
    result[0].data.prev.should.eql(0);
    result[0].data.prev_link.should.eql('');
    result[0].data.next.should.eql(0);
    result[0].data.next_link.should.eql('');
  });
});