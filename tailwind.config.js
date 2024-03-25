const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#F26D21",
				"semi-black": "#494949",
				gray: "#6D6D6D",
				smoke: "#F1F3F5",
			},
		},
	},

	plugins: [
		plugin(function ({ addComponents }) {
			addComponents({
				".btn": {
					borderRadius: "8px",
					padding: "10px 24px",
					height: "48px",
					width: "100%",
					fontWeight: "700",
					fontSize: "18px",
				},
				".btn-primary": {
					backgroundColor: "#F26D21",
					color: "#fff",

					"&:hover": {
						backgroundColor: "#F26D21 !important",
						color: "#fff !important",
						borderColor: "#F26D21 !important",
						opacity: "0.7",
					},
				},
				".btn-disabled": {},
				".btn-red": {
					backgroundColor: "#e3342f",
					color: "#fff",
					"&:hover": {
						backgroundColor: "#cc1f1a",
					},
				},
				".btn-outline": {
					backgroundColor: "#fff",
					borderColor: "#F26D21",
					color: "#F26D21",
				},
			});
		}),
	],
};
