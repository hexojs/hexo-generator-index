# hexo-generator-index

[![Build Status](https://github.com/hexojs/hexo-generator-index/workflows/Tester/badge.svg?branch=master)](https://github.com/hexojs/hexo-generator-index/actions?query=workflow%3ATester)
[![NPM version](https://badge.fury.io/js/hexo-generator-index.svg)](https://www.npmjs.com/package/hexo-generator-index)
[![Coverage Status](https://img.shields.io/coveralls/hexojs/hexo-generator-index.svg)](https://coveralls.io/r/hexojs/hexo-generator-index?branch=master)

Index generator for [Hexo].

It generates an archive of posts on your homepage, according to the `index` or `archive` layout of your theme.

## Installation

```bash
npm install hexo-generator-index --save
```

## Options

Add or modify the following section to your root `_config.yml` file.

```yaml
index_generator:
  path: ""
  per_page: 10
  order_by: -date
  pagination_dir: page
  layout: ["index", "archive"]
  single_lang_index: false
```

- **path**: Root path for your blog's index page.
  - default: `""`
- **per_page**: Posts displayed per page.
  - default: [`config.per_page`](https://hexo.io/docs/configuration.html#Pagination) as specified in the official Hexo docs (if present), otherwise `10`
  - `0` disables pagination.
- **order_by**: Posts order.
  - default: `-date` (date descending)
- **pagination_dir**: URL format.
  - default: `page`
  - e.g. set `awesome-page` makes the URL ends with `awesome-page/<page number>` for second page and beyond.
- **layout**: custom layout.
  - defalut: `["index", "archive"]`
- **single_lang_index**: Generate home page only the first language
  - default: `false`

## Usage

The `sticky` parameter in the post [Front-matter](https://hexo.io/docs/front-matter) will be used to pin the post to the top of the index page. Higher `sticky` means that it will be ranked first.

```yml
---
title: Hello World
date: 2013/7/13 20:46:25
sticky: 100
---
```

The `hidden` parameter can be used to hide a post from the index page. When `hidden: true` is set, the post will not appear in the index but will still be accessible in other ways (e.g., the archive page or via a direct link).

```yml
---  
title: Secret Post  
date: 2024/11/11 11:11:11  
hidden: true  
---  
```

## i18n index support

If you have multiple languages configured in your Hexo site, this plugin will generate an index page for each language defined in the `language` configuration.

For example, if your `_config.yml` has:

```yaml
language:
  - en
  - zh-CN
  - ja
```

This will generate:

- `index.html` (home index page, if `single_lang_index` is `false`, it contains all language post)
- `en/index.html` (for `en`)
- `zh-CN/index.html` (for `zh-CN`)
- `ja/index.html` (for `ja`)

Each index page will contain posts in that language.

To use language switch in some themes, there is some suggestion:
1. set your `_config.yml` option `permalink` with `:lang/` prefix, like `:lang/:title/`.
2. set your `new_post_name` option with `:lang`, like `: :lang/:title.md`, and you can use command like `hexo new post --lang zh-CN post.md` to add new post.
3. organized your post with structure:
```
- source
  - _posts
    - en
      - post.md
    - zh-CN
      - post.md
    - ja
      - post.md
```

## Note

If your theme define a non-archive `index` layout (e.g. About Me page), this plugin would follow that layout instead and not generate an archive. In that case, use [hexo-generator-archive](https://github.com/hexojs/hexo-generator-archive) to generate an archive according to the `archive` layout.

## License

MIT

[Hexo]: https://hexo.io/
