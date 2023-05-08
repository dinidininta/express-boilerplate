module.exports = {
  testEnvironment: 'node',
  coveragePathIgnorePatterns: [
    '/dist/',
    '/bin/'
  ],
  modulePathIgnorePatterns: [
    '/dist/',
    '/bin/'
  ],
  globalSetup: '<rootDir>/setupTests.js',
  globalTeardown: '<rootDir>/teardownTests.js',
  setupFilesAfterEnv: ['<rootDir>/setupAfterEnv.js']
};
