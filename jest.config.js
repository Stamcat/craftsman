const config = {
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
    coveragePathIgnorePatterns: [],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0,
        },
    },
    fakeTimers: {
        enableGlobally: true,
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/assetsTransformer.js",
        "\\.svg": "<rootDir>/src/__mocks__/svg.js",
        "^.+\\.(css|less|scss)$": "babel-jest",
        "@src/(.*)": "<rootDir>/src/$1",
    },
    modulePaths: ["<rootDir>"],
    setupFiles: ["<rootDir>/setupTests.ts"],
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/src/**/__tests__/**/*[^i].(js|ts|tsx)", "<rootDir>/src/**/?(*.)+(spec|test).(jsx?|tsx?)"],
    testPathIgnorePatterns: ["<rootDir>/lib/", "<rootDir>/node_modules/"],
    testEnvironmentOptions: {
        url: "https://www.test.com",
    },
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    verbose: true,
};
module.exports = {
    ...config,
};
