module.exports = {
  extends: ['airbnb', 'airbnb/hooks'],
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  rules: {
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'linebreak-style': 0,
    'react/react-in-jsx-scope': 0,
    'import/no-extraneous-dependencies': 0,
    'no-alert': 0,
  },
};
