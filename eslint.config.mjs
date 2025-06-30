import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Reuse Next.js + TypeScript recommended configs
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add your custom rule configuration:
  {
    files: ["**/*.{js,jsx,ts,tsx}"], // apply to JS/TS files
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "../*", // ban imports going up
            "./*"   // optionally ban same-folder relative imports
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
