import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'calculator': "url('./images/calculator-bg.jpg')",
				'star-wars': "url('./images/star-wars-bg.jpg')"
			},
			boxShadow: {
				'3xl': '0px 5px 24px 0px rgba(0, 0, 0, 1)',
				'4xl': '0px 2px 25px 10px rgba(0, 0, 0, 1)'
			},
		},
	},
	plugins: [],
};
export default config;
