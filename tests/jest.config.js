const path = require('path');

module.exports = {
    rootDir: path.resolve(__dirname, '../'),
    moduleFileExtensions: [
        "js",
        "vue"
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^assets/(.*)$': '<rootDir>/src/assets/$1',
        '@util-script': '<rootDir>/test/dummy/util-script.js',
        '@test': '<rootDir>/test'
    },
    transform: {
        "^.+\\.js$": "babel-jest",
        "^.+\\.vue$": "vue-jest"
    },
    collectCoverageFrom: [
        // '<rootDir>/src/App.vue',
        "src/modules/moduleArticle.js"
    ]
};