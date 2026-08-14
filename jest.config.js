export default {
  clearMocks: true,
  transform: {},
  testEnvironment: "jsdom",
  coverageProvider: "v8",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/tests/e2e/",
    "<rootDir>/src/trophy/",
  ],
  modulePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/tests/e2e/",
    "<rootDir>/src/trophy/",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/tests/E2E/",
    "<rootDir>/src/trophy/",
  ],
};
