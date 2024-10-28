import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "build", "ci"],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case"]],
  },
};

export default Configuration;
