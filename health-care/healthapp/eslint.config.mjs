import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Include Next.js recommended rules
  ...compat.extends("next/core-web-vitals"),

  // Custom project-wide settings
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // 👇 Disable this ESLint rule globally
      "react/no-unescaped-entities": "off",

      // Optional — disable common annoying ones
      "@next/next/no-img-element": "off",
      "react/display-name": "off",
    },
  },
];

export default eslintConfig;
