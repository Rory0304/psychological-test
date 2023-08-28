/* eslint-env node */
module.exports = {
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    rules: {
        // Ref: https://typescript-eslint.io/rules/no-restricted-imports/
        "no-restricted-imports": "off",
        "@typescript-eslint/no-restricted-imports": [
            "warn",
            {
                name: "react-redux",
                importNames: ["useSelector", "useDispatch"],
                message: "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
            }
        ]
    }
};
