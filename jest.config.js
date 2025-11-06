module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'react-native',
  setupFilesAfterEnv: ['./jest.setup.js'],
  setupFiles: ['./jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules', '/ios', 'android'],
  collectCoverageFrom: [
    '<rootDir>/src/components/**/*.{ts,tsx}',
    '!<rootDir>/src/components/**/*styles.ts',
    '!<rootDir>/src/components/**/*style.ts',
    '!<rootDir>/src/**/types/**/*.{ts,tsx}',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|rn-color-matrices|concat-color-matrices|@fortawesome|react-native|@react-native-community|@react-navigation/.*|react-native-size-matters|native-base|@sentry|@unform/.*)',
  ],
};
