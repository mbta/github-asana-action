module.exports = {
    "env": {
        "node": true,
    },
    "parserOptions": {
        "ecmaVersion": 2017,
    },
    "extends": "eslint:recommended",
    "plugins": [
        "prettier",
    ],
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
    },
};
