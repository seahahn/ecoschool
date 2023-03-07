// cf. https://nextjs.org/docs/testing#setting-up-jest-with-the-rust-compiler
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/store/(.*)$': '<rootDir>/store/$1',
    '^@/api/(.*)$': '<rootDir>/api/$1',
    '^@/constants/(.*)$': '<rootDir>/constants/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
    '^@/tools/(.*)$': '<rootDir>/tools/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/mocks/(.*)$': '<rootDir>/mocks/$1',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'json'],
  testMatch: [
    '<rootDir>/**/*.test.(js|jsx|ts|tsx)',
    '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
