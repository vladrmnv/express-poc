module.exports = function() {
  return {
    files: ['**/*.ts', '!coverage', '!**/*.test.ts'],
    tests: ['**/tests/**/*.test.ts'],
    env: {
      type: 'node'
    },
    testFramework: 'mocha',
    bootstrap: function(wallaby) {
      require('reflect-metadata');
      const mocha = wallaby.testFramework;
      mocha.slow(10);
      mocha.timeout(50);
    }
  };
};
