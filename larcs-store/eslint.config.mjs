import eslintConfigPrettier from "eslint-config-prettier";

export default [
	{
		ignores: ["node_modules/**", ".next/**", "out/**"]
	},
	eslintConfigPrettier
];
