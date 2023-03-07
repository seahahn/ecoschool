module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.eslint.json",
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules"],
      },
      typescript: {},
    },
  },
  plugins: ["react", "@typescript-eslint", "prettier", "import"],
  rules: {
    // 0: off, 1: warning, 2: error
    "prettier/prettier": [
      2,
      {
        endOfLine: "lf",
        semi: true,
        trailingComma: "es5",
        singleQuote: false,
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        bracketSpacing: false,
        bracketSameLine: true,
      },
    ],
    "react/react-in-jsx-scope": 0,
    "react/display-name": 0,
    "react/jsx-filename-extension": [1, {extensions: [".jsx", ".tsx"]}],
    "react/destructuring-assignment": [1, "always"],
    "react/jsx-props-no-spreading": 0,
    "react/function-component-definition": [
      2,
      {namedComponents: ["function-declaration", "arrow-function"]},
    ],
    "react/require-default-props": [1, {forbidDefaultForRequired: true}],
    "import/extensions": [2, "never"], // 에러로 표시, 확장자 사용 안함
    "import/prefer-default-export": 0,
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.config.+(js|ts)",
          "**/*-setup.+(js|ts)",
          "**/*.test.ts",
          "**/*.spec.ts",
        ],
      },
    ], // package.json에 있는 패키지만 import 하도록 설정. object에는 예외 사항을 설정할 수 있음
    "no-underscore-dangle": [2, {allowAfterThis: true, allowFunctionParams: false}],
    "no-use-before-define": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "no-unused-vars": 0, // @typescript-eslint/no-unused-vars 사용을 위해 off
    "@typescript-eslint/no-unused-vars": [
      1,
      {vars: "all", args: "none", ignoreRestSiblings: false},
    ],
    "no-unused-expressions": 0, // @typescript-eslint/no-unused-expressions 사용을 위해 off
    "@typescript-eslint/no-unused-expressions": [2, {allowShortCircuit: true, allowTernary: true}],
    "@typescript-eslint/restrict-plus-operands": [
      1,
      {checkCompoundAssignments: true, allowAny: true},
    ],
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksConditionals: false,
        checksVoidReturn: false,
      },
    ],
    "@typescript-eslint/no-floating-promises": [1, {ignoreVoid: true}],
    eqeqeq: 2, // ===, !== 만 쓰기
    "no-void": ["error", {allowAsStatement: true}],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelAttributes: ["label"],
      },
    ],
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "no-nested-ternary": 0,
    "no-param-reassign": ["warn", {props: false}],
    "no-explicit-any": 0, // @typescript-eslint/no-explicit-any 사용을 위해 off
    // 이하 항목들은 평소에는 "off", 급한 불 다 껐으면 "warn"으로 하여 코드 정리해보기
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-var-requires": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/lines-between-class-members": "off",
  },
};
