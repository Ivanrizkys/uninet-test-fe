export default {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  moduleNameMapper: {
    "^@/(.*)": "<rootDir>/src/$1",
    "^src/(.*)": "<rootDir>/src/$1", // Optional for additional src patterns
  },
};
