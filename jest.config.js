const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

// プロジェクト固有の設定
const customJestConfig = {
  "roots": [
    "<rootDir>/src"
  ],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}

module.exports = createJestConfig(customJestConfig)
