module.exports = {
  env: {
    browser: true,
    es2022: true,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    'standard-with-typescript',
    "plugin:jsx-a11y/recommended",
    'plugin:react/recommended',
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "next/core-web-vitals",
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: ".",
    project: ["./tsconfig.json"],
    sourceType: 'module'
  },
  plugins: [
    'react',
    "jest",
    "jsx-a11y",
    '@typescript-eslint',
    "react-hooks"
  ],
  rules: {
    "@typescript-eslint/triple-slash-reference": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-var-requires": "off",
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "overrides": [
    {
      "files": ["*.tsx"],
      "rules": {
        "react/prop-types": "off"
      }
    },
    {
      "files": [
        "src/**/__tests__/**/*.(ts,tsx)",
      ],
      env: {
        "jest/globals": true,
      },
      "extends": [
        "plugin:jest/recommended",
        "plugin:jest/style"
      ],
      "plugins": ["jest"]
    }
  ]
}
