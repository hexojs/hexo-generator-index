'use strict';

const eslintConfigHexo = require('eslint-config-hexo/eslint');
const testConfig = require('eslint-config-hexo/test');

module.exports = [
  ...eslintConfigHexo,
  {
    files: ['test/**/*.js'],
    rules: {
      'no-unused-expressions': 'off'
    }
  },
  // Configurations applied only to test files
  ...testConfig.map(config => ({
    ...config,
    files: ['test/**/*.js']
  }))
];
