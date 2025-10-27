module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Tipo de commit
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nueva funcionalidad
        "fix", // Corrección de bugs
        "docs", // Documentación
        "style", // Formato, punto y coma faltante, etc.
        "refactor", // Refactorización de código
        "perf", // Mejoras de rendimiento
        "test", // Agregar o corregir tests
        "build", // Cambios en el sistema de build
        "ci", // Cambios en CI/CD
        "chore", // Tareas de mantenimiento
        "revert", // Revertir commits
      ],
    ],

    // Formato del tipo
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-max-length": [2, "always", 20],

    // Formato del scope (opcional)
    "scope-case": [2, "always", "lower-case"],
    "scope-max-length": [2, "always", 20],
    "scope-enum": [2, "always", ["api", "web", "ui", "config", "docs"]],

    // Formato del subject
    "subject-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 50],
    "subject-min-length": [2, "always", 10],

    // Formato del header
    "header-case": [2, "always", "lower-case"],
    "header-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 72],
    "header-min-length": [2, "always", 20],
    "header-trim": [2, "always"],

    // Formato del body (opcional)
    "body-case": [2, "always", "sentence-case"],
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],

    // Formato del footer (opcional)
    "footer-leading-blank": [2, "always"],
    "footer-max-line-length": [2, "always", 100],

    // Breaking changes - usar subject-exclamation-mark en su lugar
    "subject-exclamation-mark": [2, "never"],
  },
};
