import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Penambahan fitur baru
        "fix", // Perbaikan bug
        "docs", // Perubahan dokumentasi
        "style", // Perubahan format kode
        "refactor", // Refactor tanpa menambah fitur atau memperbaiki bug
        "test", // Penambahan atau perbaikan test
        "chore", // Pembaruan tugas atau konfigurasi
        "build", // Perubahan build atau tool eksternal
        "ci", // Perubahan konfigurasi CI/CD
      ],
    ],
    "subject-case": [2, "never", ["start-case", "pascal-case"]],
  },
};

export default Configuration;
