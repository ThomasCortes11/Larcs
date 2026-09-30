import eslintConfigPrettier from "eslint-config-prettier";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
	{
		ignores: ["node_modules/**", ".next/**", "out/**", "next-env.d.ts", "public/products/**", "src/Img/**"]
	},
	...nextCoreWebVitals,
	eslintConfigPrettier
];

export default eslintConfig;
