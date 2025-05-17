module.exports = {
    preset: 'jest-expo',
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@env$': '<rootDir>/__mocks__/@env.js',
    },
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  };
  