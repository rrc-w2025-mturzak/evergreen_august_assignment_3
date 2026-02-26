
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testMatch: ["**/*.test.ts"],
    collectCoverageFrom: [
        "src/**/*.ts",
        "!src/server.ts",
        "!src/types/**/*.ts",
    ],
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1"
    }
};
