const nextJest = require('next/jest')

const createJestConfig = nextJest({ dir: './' })

// プロジェクト固有の設定
const customJestConfig = {
  // ...
}

module.exports = createJestConfig(customJestConfig)
