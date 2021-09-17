module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            fontFamily: {
                body: "Nanum Gothic"
            },
            colors: {
                blue: {
                    DEFAULT: "#4f718f"
                },
                gray: {
                    DEFAULT: "#F2F2F2",
                    darker: "#7e7e7e",
                    fontgray: "#707070",
                    border: "#a5a5a5"
                },

                yellow: {
                    DEFAULT: "#ffbf7c"
                }
            },
            transitionProperty: {
                width: "width"
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
