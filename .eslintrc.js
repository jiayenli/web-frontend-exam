module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended' // <<< 加這個
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error', // <<< 讓 Prettier 規則也進 ESLint 檢查
    // 其他你的 ESLint 規則...
  }
};